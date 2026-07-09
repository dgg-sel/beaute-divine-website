import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "TEST-mock", // Requerido en prod, mock en dev
});

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("data.id") || url.searchParams.get("id");
    const topic = url.searchParams.get("type") || url.searchParams.get("topic");

    // 1. HMAC SHA-256 Signature Validation (Obligatorio)
    const signature = req.headers.get("x-signature");
    const xRequestId = req.headers.get("x-request-id");
    
    if (!signature || !xRequestId || !id) {
      console.error("[Webhook] Faltan headers de seguridad o ID.");
      return NextResponse.json({ message: "Missing security headers" }, { status: 400 });
    }

    const secret = process.env.MP_WEBHOOK_SECRET?.trim();
    if (!secret) {
      console.error("[Webhook] MP_WEBHOOK_SECRET no está configurada.");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const parts = signature.split(",");
    let ts = "";
    let v1 = "";
    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key === "ts") ts = value;
      if (key === "v1") v1 = value;
    });

    const manifest = `id:${id};request-id:${xRequestId};ts:${ts};`;
    const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    if (hmac !== v1) {
      console.error("[Webhook] Firma HMAC inválida. Posible ataque o clave secreta incorrecta.");
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    // 2. Procesamiento del Pago
    if (topic === "payment") {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id });
      const orderId = paymentData.external_reference;

      if (!orderId) {
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Si el pago es exitoso
      if (paymentData.status === "approved") {
        const order = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paymentId: paymentData.id?.toString(),
          },
          include: {
            user: true,
            items: { include: { product: true } },
          },
        });

        // Vaciamos carrito si el usuario estaba logueado
        if (order.userId) {
          const cart = await prisma.cart.findUnique({ where: { userId: order.userId } });
          if (cart) {
            await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
          }
        }

        // Envío de correos
        const clienteName = order.customerName || order.user?.name || null;
        const clienteEmail = order.customerEmail || order.user?.email || null;

        const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const itemsHtml = order.items
          .map((item) => `<li>${item.quantity}x ${item.product.title} — $${(item.price * item.quantity).toFixed(2)}</li>`)
          .join("");

        const shippingRow = order.shippingCost > 0
          ? `<p><strong>Envío:</strong> $${order.shippingCost.toFixed(2)}</p>`
          : `<p><strong>Envío:</strong> Gratis</p>`;

        const addressParts = [
          order.shippingStreet ? `${order.shippingStreet} ${order.shippingNumber || ''}`.trim() : null,
          order.shippingApartment ? `Piso/Depto: ${order.shippingApartment}` : null,
          order.shippingCity,
          order.shippingProvince,
          order.shippingZipCode ? `CP: ${order.shippingZipCode}` : null,
        ].filter(Boolean);
        const addressFormatted = addressParts.join(" - ");
        const addressRow = addressFormatted ? `<p><strong>Dirección de envío:</strong> ${addressFormatted}</p>` : "";

        try {
          const { sendEmail } = await import("@/lib/email");
          const salesEmails = process.env.SALES_EMAILS || "info@sanacionenluz.com";

          // Al admin
          await sendEmail({
            to: salesEmails,
            subject: `¡Nueva compra recibida! Orden #${order.id}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #c49e62;">¡Nueva Compra Confirmada!</h2>
                <p>Se ha registrado un nuevo pago exitoso a través de Mercado Pago.</p>
                ${clienteName ? `<p><strong>Cliente:</strong> ${clienteName}${clienteEmail ? ` (${clienteEmail})` : ""}</p>` : ""}
                <h3>Detalle de la orden:</h3>
                <ul>${itemsHtml}</ul>
                <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                ${shippingRow}
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                ${addressRow}
              </div>
            `,
          });

          // Al cliente
          if (clienteEmail) {
            await sendEmail({
              to: clienteEmail,
              subject: `Tu compra en Beauté Divine Espace fue confirmada`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2 style="color: #c49e62;">¡Gracias por tu compra${clienteName ? `, ${clienteName}` : ""}!</h2>
                  <p>Tu pago se ha procesado con éxito y estamos preparando tu pedido.</p>
                  <h3>Resumen de tu pedido:</h3>
                  <ul>${itemsHtml}</ul>
                  <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                  ${shippingRow}
                  <p><strong>Total pagado:</strong> $${order.total.toFixed(2)}</p>
                  ${addressRow}
                  <p style="margin-top: 16px;">Nos pondremos en contacto con vos a la brevedad para coordinar el envío.</p>
                </div>
              `,
            });
          }
        } catch (error) {
          console.error("Error enviando email de confirmación:", error);
        }
      } 
      // Si el pago falla o es cancelado de forma terminal
      else if (["rejected", "cancelled", "refunded", "charged_back"].includes(paymentData.status || "")) {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        // Solo restauramos stock si la orden estaba pendiente. Si ya estaba CANCELLED, evitamos duplicar la devolución.
        if (order && order.status === "PENDING") {
          await prisma.$transaction(async (tx) => {
            // Cancelar orden
            await tx.order.update({
              where: { id: orderId },
              data: { status: "CANCELLED" },
            });
            // Devolver stock
            for (const item of order.items) {
              await tx.product.update({
                where: { id: item.productId },
                data: { stock: { increment: item.quantity } },
              });
            }
          });
          console.log(`[Webhook] Stock devuelto para la orden rechazada/cancelada: ${orderId}`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Error procesando el webhook" },
      { status: 500 }
    );
  }
}
