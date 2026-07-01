import CheckoutForm from "./CheckoutForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const shippingCost = parseFloat(process.env.SHIPPING_COST || "0");

  return (
    <main className="pt-24 pb-16 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-[#8C8377] hover:text-[#4A4238] transition-colors mb-10 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <h1 className="text-3xl font-light text-[#4A4238] mb-10 tracking-wide">
          Finalizar Compra
        </h1>

        <CheckoutForm shippingCost={shippingCost} />
      </div>
    </main>
  );
}
