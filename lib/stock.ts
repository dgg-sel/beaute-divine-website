import { prisma } from "./prisma";

export async function releaseExpiredReservations() {
  const minutes = Number(process.env.STOCK_RESERVATION_MINUTES || 15);
  const expirationTime = new Date(Date.now() - minutes * 60 * 1000);

  const expiredOrders = await prisma.order.findMany({
    where: {
      status: "PENDING",
      createdAt: {
        lt: expirationTime,
      },
    },
    include: {
      items: true,
    },
  });

  if (expiredOrders.length === 0) return;

  for (const order of expiredOrders) {
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED" },
      });

      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    });
  }
}
