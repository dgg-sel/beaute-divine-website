"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CheckoutSuccessPage() {
 const clearCart = useCartStore((state) => state.clearCart);

 useEffect(() => {
 // Vaciar el carrito cuando el pago es exitoso
 clearCart();
 }, [clearCart]);

 return (
 <div className="bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#EAE5DF] max-w-md w-full text-center">
 <div className="flex justify-center mb-6">
 <CheckCircle className="w-20 h-20 text-green-500" />
 </div>
 <h1 className="text-3xl font-light text-[#4A4238] mb-4">¡Pago Exitoso!</h1>
 <p className="text-[#8C8377] mb-8">
 Tu orden ha sido procesada correctamente. Te hemos enviado un correo con los detalles de tu compra.
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
