import { prisma } from "@/lib/prisma";

export async function releaseExpiredReservations() {
  try {
    const stockReservationMinutes = parseInt(process.env.STOCK_RESERVATION_MINUTES || "15", 10);
    const expirationDate = new Date(Date.now() - stockReservationMinutes * 60 * 1000);

    // Find all PENDING orders older than expirationDate
    const expiredOrders = await prisma.order.findMany({
      where: {
        status: "PENDING",
        createdAt: {
          lt: expirationDate
        }
      },
      include: { items: true }
    });

    if (expiredOrders.length === 0) return;

    // For each order, restore stock and mark as CANCELLED
    await prisma.$transaction(async (tx) => {
      for (const order of expiredOrders) {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } }
          });
        }
        await tx.order.update({
          where: { id: order.id },
          data: { status: "CANCELLED" }
        });
      }
    });

    console.log(`[Stock Cleanup] Liberadas ${expiredOrders.length} reservas expiradas.`);
  } catch (error) {
    console.error("[Stock Cleanup] Error liberando reservas:", error);
  }
}
