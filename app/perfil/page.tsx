"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4A4238] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light text-[#4A4238] mb-8">Mi Cuenta</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-[#EAE5DF] p-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#EAE5DF]">
            <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center border border-[#EAE5DF]">
              <User className="w-8 h-8 text-[#8C8377]" />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-[#4A4238]">{session.user?.name || "Usuario"}</h2>
              <p className="text-[#8C8377] mt-1">{session.user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#4A4238] mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DF]">
                  <p className="text-xs text-[#8C8377] uppercase tracking-wider mb-1">Nombre</p>
                  <p className="text-[#4A4238] font-medium">{session.user?.name || "-"}</p>
                </div>
                <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DF]">
                  <p className="text-xs text-[#8C8377] uppercase tracking-wider mb-1">Email</p>
                  <p className="text-[#4A4238] font-medium">{session.user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 mt-8 border-t border-[#EAE5DF]">
              <button
                onClick={() => {
                  clearCart();
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
