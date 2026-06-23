"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const { items, removeItem, updateQuantity, getTotal, getCartCount } = useCartStore();

  // Para evitar errores de hidratación con Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      
      if (res.ok && data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point;
      } else {
        alert(data.message || "Ocurrió un error al procesar el pago");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {getCartCount() > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
            {getCartCount()}
          </span>
        )}
      </button>

      {/* Renderizar el contenido del Drawer en el body usando un Portal */}
      {mounted && typeof window !== "undefined" && createPortal(
        <>
          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-[120] backdrop-blur-sm transition-opacity"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[130] transform transition-transform duration-300 ease-in-out flex flex-col ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#EAE5DF]">
              <h2 className="text-xl font-medium text-[#4A4238]">Tu Carrito</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#8C8377]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center text-[#8C8377] mt-10">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <ProductImage
                        src={item.image || "/logo.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-sm text-[#4A4238] line-clamp-2">{item.title}</h3>
                        <p className="text-[#8C8377] text-sm mt-1">${item.price.toFixed(2)}</p>
                        <p className="text-[10px] text-[#8C8377]/70 mt-0.5">${(item.price / 1.21).toFixed(2)} sin impuestos</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#EAE5DF] rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50 text-[#8C8377]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className={`p-1 text-[#8C8377] ${item.quantity >= item.stock ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#EAE5DF] bg-[#FDFBF7]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#8C8377]">Subtotal</span>
                  <span className="text-xl font-medium text-[#4A4238]">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6 text-sm text-[#8C8377]/70">
                  <span>Sin impuestos</span>
                  <span>${(getTotal() / 1.21).toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#4A4238] text-white py-4 rounded-xl font-medium hover:bg-[#3A332C] transition-colors disabled:opacity-70 flex justify-center items-center mb-3"
                >
                  {isCheckingOut ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Finalizar Compra"
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isCheckingOut}
                  className="w-full bg-transparent border border-[#EAE5DF] text-[#4A4238] py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Seguir Comprando
                </button>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
