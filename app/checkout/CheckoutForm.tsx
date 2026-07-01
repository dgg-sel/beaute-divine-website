"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProductImage from "@/components/ProductImage";
import { MapPin, Package, CreditCard, ChevronLeft } from "lucide-react";

interface CheckoutFormProps {
  shippingCost: number;
}

export default function CheckoutForm({ shippingCost }: CheckoutFormProps) {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Evitar hydration mismatch con Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prellenar nombre/email si el usuario está logueado
  useEffect(() => {
    if (session?.user) {
      setCustomerName(session.user.name || "");
      setCustomerEmail(session.user.email || "");
    }
  }, [session]);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/catalogo");
    }
  }, [mounted, items, router]);

  if (!mounted || items.length === 0) return null;

  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const handlePagar = async () => {
    setError(null);

    if (!shippingAddress.trim()) {
      setError("Por favor ingresá tu dirección de envío.");
      return;
    }
    if (!session && !customerEmail.trim()) {
      setError("Por favor ingresá tu email para recibir la confirmación.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: shippingAddress.trim(),
          customerName: customerName.trim() || null,
          customerEmail:
            customerEmail.trim() || session?.user?.email || null,
        }),
      });

      const data = await res.json();

      if (res.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError(data.message || "Ocurrió un error al procesar el pago.");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      {/* ── Columna izquierda: Formulario ── */}
      <div className="lg:col-span-3 space-y-8">
        {/* Datos del cliente (solo para guests) */}
        {!session && (
          <section className="bg-white border border-[#EAE5DF] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-[#c49e62]" />
              <h2 className="text-lg font-medium text-[#4A4238]">Tus datos</h2>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-2">
                Nombre y apellido
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej: María González"
                className="w-full border border-[#EAE5DF] rounded-xl px-4 py-3 text-[#4A4238] placeholder-[#C5BFB8] focus:outline-none focus:border-[#c49e62] transition-colors bg-[#FDFBF7]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full border border-[#EAE5DF] rounded-xl px-4 py-3 text-[#4A4238] placeholder-[#C5BFB8] focus:outline-none focus:border-[#c49e62] transition-colors bg-[#FDFBF7]"
              />
            </div>
          </section>
        )}

        {/* Dirección de envío */}
        <section className="bg-white border border-[#EAE5DF] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="w-5 h-5 text-[#c49e62]" />
            <h2 className="text-lg font-medium text-[#4A4238]">
              Dirección de envío
            </h2>
          </div>
          <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-2">
            Dirección completa <span className="text-red-400">*</span>
          </label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Ej: Av. Corrientes 1234, Piso 3, Dpto B — CABA"
            rows={3}
            className="w-full border border-[#EAE5DF] rounded-xl px-4 py-3 text-[#4A4238] placeholder-[#C5BFB8] focus:outline-none focus:border-[#c49e62] transition-colors bg-[#FDFBF7] resize-none"
          />
          <p className="text-xs text-[#8C8377] mt-2">
            Incluí calle, número, piso/dpto y localidad.
          </p>
        </section>

        {/* Resumen de productos */}
        <section className="bg-white border border-[#EAE5DF] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-5 h-5 text-[#c49e62]" />
            <h2 className="text-lg font-medium text-[#4A4238]">
              Tu pedido
            </h2>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F0EB] shrink-0">
                  <ProductImage
                    src={item.image || "/logo.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#4A4238] line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#8C8377] mt-0.5">
                    Cant.: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#4A4238] shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Columna derecha: Resumen + Pago ── */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-[#EAE5DF] rounded-2xl p-6 sticky top-28">
          <h2 className="text-lg font-medium text-[#4A4238] mb-6">
            Resumen
          </h2>

          {/* Desglose de costos */}
          <div className="space-y-3 pb-4 border-b border-[#EAE5DF]">
            <div className="flex justify-between text-sm text-[#8C8377]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#8C8377]">
              <span>Envío</span>
              <span>
                {shippingCost > 0
                  ? `$${shippingCost.toFixed(2)}`
                  : "Gratis"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 mb-6">
            <span className="font-medium text-[#4A4238]">Total</span>
            <span className="text-2xl font-light text-[#4A4238]">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
              {error}
            </p>
          )}

          {/* Botón de pago */}
          <button
            onClick={handlePagar}
            disabled={isProcessing}
            className="w-full bg-[#4A4238] text-white py-4 rounded-xl font-medium hover:bg-[#3A332C] transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mb-3"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pagar con Mercado Pago
              </>
            )}
          </button>

          <p className="text-xs text-center text-[#8C8377] mt-3 leading-relaxed">
            Serás redirigida a Mercado Pago para completar el pago de forma segura.
          </p>
        </div>
      </div>
    </div>
  );
}
