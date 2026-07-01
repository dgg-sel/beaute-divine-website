import Link from "next/link";
import { XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams.orderId;

  if (orderId) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (order?.status === "PENDING") {
        await prisma.$transaction(async (tx) => {
          for (const item of order.items) {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          }
          await tx.order.update({
            where: { id: orderId },
            data: { status: "CANCELLED" },
          });
        });
        console.log(`[Checkout Failure] Stock restaurado para la orden ${orderId}`);
      }
    } catch (error) {
      console.error("[Checkout Failure] Error restaurando stock:", error);
    }
  }

  return (
    <div className="bg-[#FDFBF7] flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#EAE5DF] max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-light text-[#4A4238] mb-4">Pago Rechazado o Cancelado</h1>
        <p className="text-[#8C8377] mb-8">
          Tu pago no se pudo procesar o cancelaste la operación. Tu reserva ha sido liberada.
        </p>
        <Link
          href="/catalogo"
          className="inline-block w-full bg-[#4A4238] text-white py-3 rounded-xl font-medium hover:bg-[#3A332C] transition-colors"
        >
          Volver al Catálogo
        </Link>
      </div>
    </div>
  );
}
