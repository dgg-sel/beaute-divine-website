import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

import { env } from "@/lib/env";

const client = new MercadoPagoConfig({
  accessToken: env.mpAccessToken,
});

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("data.id") || url.searchParams.get("id");
    const topic = url.searchParams.get("type") || url.searchParams.get("topic");

    // 1. Validación de firma HMAC SHA-256 (obligatoria, fail-closed)
    const signature = req.headers.get("x-signature");
    const xRequestId = req.headers.get("x-request-id");

    if (!signature || !xRequestId || !id) {
      console.error("[Webhook] Faltan headers de seguridad o ID.");
      return NextResponse.json({ message: "Missing security headers" }, { status: 400 });
    }

    const secret = env.mpWebhookSecret;

    const parts = signature.split(",");
    let ts = "";
    let v1 = "";
    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key?.trim() === "ts") ts = value;
      if (key?.trim() === "v1") v1 = value;
    });

    const manifest = `id:${id};request-id:${xRequestId};ts:${ts};`;
    const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    // Comparación en tiempo constante: evita filtrar la firma por timing. El
    // chequeo de longitud es necesario porque timingSafeEqual tira si los
    // buffers no miden igual.
    const expectedBuf = Buffer.from(expected);
    const receivedBuf = Buffer.from(v1 || "");
    if (
      expectedBuf.length !== receivedBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, receivedBuf)
    ) {
      console.error("[Webhook] Firma HMAC inválida. Posible ataque o clave secreta incorrecta.");
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    // 2. Procesamiento del Pago
    if (topic === "payment") {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id });
      const orderId = paymentData.external_reference;
      const paymentId = paymentData.id?.toString();

      if (!orderId) {
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Si el pago es exitoso
      if (paymentData.status === "approved") {
        // Idempotencia: reclamar la orden SOLO si sigue PENDING. `updateMany`
        // con count es atómico: dos notificaciones simultáneas no pueden ambas
        // "reclamar" y duplicar mails/procesamiento.
        const claimed = await prisma.order.updateMany({
          where: { id: orderId, status: "PENDING" },
          data: { status: "PAID", paymentId },
        });

        if (claimed.count === 0) {
          // No estaba PENDING: o ya fue procesada (notificación repetida) o
          // estaba CANCELLED y este pago aprobado la reactiva.
          const current = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } } },
          });

          if (!current) {
            console.error("[Webhook] Pago aprobado para una orden inexistente:", orderId);
            return NextResponse.json({ received: true }, { status: 200 });
          }

          // Notificación repetida sobre una orden ya PAID/despachada: no
          // reprocesar (ni duplicar mails ni vaciar carrito de nuevo).
          if (current.status !== "CANCELLED") {
            return NextResponse.json({ received: true }, { status: 200 });
          }

          // Pago aprobado sobre una orden CANCELLED: su stock ya fue devuelto por
          // la cancelación/limpieza, así que hay que volver a descontarlo o se
          // produce sobreventa silenciosa.
          const sinStock: string[] = [];
          await prisma.$transaction(async (tx) => {
            for (const item of current.items) {
              const updated = await tx.product.updateMany({
                where: { id: item.productId, stock: { gte: item.quantity } },
                data: { stock: { decrement: item.quantity } },
              });
              if (updated.count === 0) {
                sinStock.push(item.product?.title ?? item.productId);
              }
            }
            await tx.order.update({
              where: { id: orderId },
              data: { status: "PAID", paymentId },
            });
          });

          if (sinStock.length > 0) {
            try {
              const { sendEmail } = await import("@/lib/email");
              await sendEmail({
                to: env.salesEmails,
                subject: `⚠️ Sobreventa potencial en la orden #${orderId}`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #dc2626;">Pago aprobado sin stock suficiente</h2>
                    <p>Se aprobó el pago de la orden <strong>#${orderId}</strong>, pero su reserva había expirado y ya no hay stock suficiente de:</p>
                    <ul>${sinStock.map((n) => `<li>${n}</li>`).join("")}</ul>
                    <p>Revisá el inventario y contactá al cliente para reponer o reembolsar.</p>
                  </div>
                `,
              });
            } catch (error) {
              console.error("Error enviando alerta de sobreventa:", error);
            }
          }
        }

        // A esta altura la orden quedó PAID (recién reclamada o reactivada).
        // Cargamos la orden completa para vaciar carrito y mandar mails UNA vez.
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            user: true,
            items: { include: { product: true } },
          },
        });

        if (!order) {
          return NextResponse.json({ received: true }, { status: 200 });
        }

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
          const salesEmails = env.salesEmails;

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

        if (order) {
          // Transición atómica PENDING -> CANCELLED + devolución de stock en una
          // sola transacción. El `updateMany` con guarda por count evita que dos
          // notificaciones simultáneas dupliquen la devolución de stock.
          await prisma.$transaction(async (tx) => {
            const cancelled = await tx.order.updateMany({
              where: { id: orderId, status: "PENDING" },
              data: { status: "CANCELLED", paymentId },
            });

            if (cancelled.count === 1) {
              for (const item of order.items) {
                await tx.product.update({
                  where: { id: item.productId },
                  data: { stock: { increment: item.quantity } },
                });
              }
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
