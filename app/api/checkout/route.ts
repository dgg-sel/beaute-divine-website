import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getShippingCost } from "@/lib/settings";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "TEST-mock",
  options: { timeout: 5000, idempotencyKey: "abc" },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { 
      items, 
      shippingStreet, 
      shippingNumber, 
      shippingApartment, 
      shippingCity, 
      shippingProvince, 
      shippingZipCode, 
      customerName, 
      customerEmail 
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Limpieza perezosa: liberar stock de órdenes viejas
    const { releaseExpiredReservations } = await import("@/lib/stock");
    await releaseExpiredReservations();

    // Costo fijo de envío desde la base de datos (con fallback a env)
    const shippingCost = await getShippingCost();


    const subtotal = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );
    const total = subtotal + shippingCost;

    // Crear la orden en la BD y descontar stock atómicamente
    let order;
    try {
      order = await prisma.$transaction(async (tx) => {
        // 1. Verificamos stock
        for (const item of items) {
          const product = await tx.product.findUnique({ where: { id: item.id } });
          if (!product || product.stock < item.quantity) {
            throw new Error(`Sin stock suficiente para ${item.title}`);
          }
        }

        // 2. Restamos stock (Reserva)
        for (const item of items) {
          await tx.product.update({
            where: { id: item.id },
            data: { stock: { decrement: item.quantity } },
          });
        }

        // 3. Creamos orden con datos de envío y cliente
        return await tx.order.create({
          data: {
            total,
            shippingCost,
            shippingStreet: shippingStreet || null,
            shippingNumber: shippingNumber || null,
            shippingApartment: shippingApartment || null,
            shippingCity: shippingCity || null,
            shippingProvince: shippingProvince || null,
            shippingZipCode: shippingZipCode || null,
            customerName: customerName || null,
            customerEmail: customerEmail || null,
            userId: (session?.user as any)?.id || null,
            items: {
              create: items.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
        });
      });

      // Si el usuario está logueado, vaciamos su carrito en la BD inmediatamente
      const userId = (session?.user as any)?.id;
      if (userId) {
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (cart) {
          await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
      }

    } catch (error: any) {
      console.error("Error validando stock:", error);
      return NextResponse.json(
        { message: error.message || "Error al verificar stock" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Armar ítems para la preferencia de MP
    const mpItems: any[] = items.map((item: any) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "ARS",
    }));

    // Agregar ítem de envío si el costo es mayor a 0
    if (shippingCost > 0) {
      mpItems.push({
        id: "ENVIO",
        title: "Envío",
        quantity: 1,
        unit_price: shippingCost,
        currency_id: "ARS",
      });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: mpItems,
        payer: (customerEmail || customerName) ? {
          ...(customerEmail ? { email: customerEmail } : {}),
          ...(customerName ? { name: customerName } : {}),
        } : undefined,
        back_urls: {
          success: `${baseUrl}/checkout/success?orderId=${order.id}`,
          failure: `${baseUrl}/checkout/failure?orderId=${order.id}`,
          pending: `${baseUrl}/checkout/pending?orderId=${order.id}`,
        },
        auto_return: "approved",
        external_reference: order.id,
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error: any) {
    console.error("Error creating checkout preference:", error?.message || error);
    if (error?.response) {
      console.error("MP Response Error:", JSON.stringify(error.response, null, 2));
    }
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
