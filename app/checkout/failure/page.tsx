"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutFailurePage() {
 return (
 <div className="bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#EAE5DF] max-w-md w-full text-center">
 <div className="flex justify-center mb-6">
 <XCircle className="w-20 h-20 text-red-500" />
 </div>
 <h1 className="text-3xl font-light text-[#4A4238] mb-4">Pago Rechazado</h1>
 <p className="text-[#8C8377] mb-8">
 Lo sentimos, no pudimos procesar tu pago. Por favor, intenta nuevamente con otro medio de pago.
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
