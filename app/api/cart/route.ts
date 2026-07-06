import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ items: [] });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cart: {
          include: {
            items: {
              include: { product: true }
            }
          }
        }
      }
    });

    if (!user || !user.cart) {
      return NextResponse.json({ items: [] });
    }

    const items = user.cart.items.map(item => ({
      id: item.productId,
      title: item.product.title,
      price: item.price,
      image: item.product.image,
      quantity: item.quantity,
      stock: item.product.stock
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { items } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Ejecutar atómicamente para prevenir condición de carrera en requests concurrentes
    await prisma.$transaction(async (tx) => {
      // Upsert cart
      const cart = await tx.cart.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {}
      });

      // Delete existing items
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      // Insert new items
      if (items && items.length > 0) {
        await tx.cartItem.createMany({
          data: items.map((item: any) => ({
            cartId: cart.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
