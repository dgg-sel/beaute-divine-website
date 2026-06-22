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
              items: { include: { product: true } }
            }
          });

          // Enviar mails de notificación
          try {
            const { sendEmail } = await import("@/lib/email");
            const adminEmails = process.env.ADMIN_EMAILS || "dario.geier@gmail.com";
            const itemsHtml = order.items.map(item => `<li>${item.quantity}x ${item.product.title} - $${item.price}</li>`).join("");
            
            // Mail al administrador
            await sendEmail({
              to: adminEmails,
              subject: `¡Nueva compra recibida! Orden #${order.id}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2 style="color: #c49e62;">¡Nueva Compra Confirmada!</h2>
                  <p>Se ha registrado un nuevo pago exitoso a través de Mercado Pago.</p>
                  ${order.user?.name ? `<p><strong>Cliente:</strong> ${order.user.name} (${order.user.email})</p>` : ""}
                  <h3>Detalle de la orden:</h3>
                  <ul>${itemsHtml}</ul>
                  <p><strong>Total:</strong> $${order.total}</p>
                </div>
              `
            });

            // Mail al cliente (si está registrado)
            if (order.user?.email) {
              await sendEmail({
                to: order.user.email,
                subject: `Tu compra en Beauté Divine Espace fue confirmada`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #c49e62;">¡Gracias por tu compra!</h2>
                    <p>Tu pago se ha procesado con éxito y estamos preparando tu pedido.</p>
                    <h3>Resumen de tu pedido:</h3>
                    <ul>${itemsHtml}</ul>
                    <p><strong>Total pagado:</strong> $${order.total}</p>
                    <p>Nos pondremos en contacto contigo a la brevedad.</p>
                  </div>
                `
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
