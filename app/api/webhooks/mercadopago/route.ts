import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "TEST-mock",
});

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("data.id") || url.searchParams.get("id");
    const topic = url.searchParams.get("type") || url.searchParams.get("topic");

    if (topic === "payment" && id) {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id });

      if (paymentData.status === "approved") {
        const orderId = paymentData.external_reference;

        if (orderId) {
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

          // Determinar nombre y email del destinatario cliente
          const clienteName = order.customerName || order.user?.name || null;
          const clienteEmail = order.customerEmail || order.user?.email || null;

          // Construir desglose de ítems
          const subtotal = order.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          const itemsHtml = order.items
            .map(
              (item) =>
                `<li>${item.quantity}x ${item.product.title} — $${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join("");

          const shippingRow =
            order.shippingCost > 0
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

          const addressRow = addressFormatted
            ? `<p><strong>Dirección de envío:</strong> ${addressFormatted}</p>`
            : "";

          // Enviar mails de notificación
          try {
            const { sendEmail } = await import("@/lib/email");
            const salesEmails =
              process.env.SALES_EMAILS || "dario.geier@gmail.com";

            // Mail al administrador / ventas
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

            // Mail al cliente (si tenemos su email)
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
