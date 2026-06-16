"use client";

import Link from "next/link";
import { Clock } from "lucide-react";

export default function CheckoutPendingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#EAE5DF] max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Clock className="w-20 h-20 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-light text-[#4A4238] mb-4">Pago Pendiente</h1>
        <p className="text-[#8C8377] mb-8">
          Tu pago está siendo procesado. Te notificaremos en cuanto se confirme la transacción.
        </p>
        <Link
          href="/"
          className="inline-block w-full bg-[#4A4238] text-white py-3 rounded-xl font-medium hover:bg-[#3A332C] transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
