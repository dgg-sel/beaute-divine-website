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
 <div className="bg-surface flex items-center justify-center min-h-[50vh]">
 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!session) {
 return null;
 }

 return (
 <div className="bg-surface pt-20 pb-16 px-4 min-h-screen">
 <div className="max-w-3xl mx-auto">
 <h1 className="font-display-lg text-headline-lg text-primary mb-8 text-center md:text-left">Mi Cuenta</h1>
 
 <div className="bg-surface-container-low rounded-2xl soft-glow border border-primary/10 p-8">
 <div className="flex items-center gap-6 mb-8 pb-8 border-b border-primary/10">
 <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center border border-primary/20">
 <User className="w-8 h-8 text-primary" />
 </div>
 <div>
 <h2 className="font-headline-md text-2xl text-on-surface">{session.user?.name || "Usuario"}</h2>
 <p className="font-body-md text-on-surface-variant mt-1">{session.user?.email}</p>
 </div>
 </div>

 <div className="space-y-6">
 <div>
 <h3 className="font-headline-md text-xl text-primary mb-4 uppercase tracking-widest">Información Personal</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-surface p-5 rounded-xl border border-primary/10">
 <p className="font-label-sm text-[10px] text-primary uppercase tracking-widest mb-2">Nombre</p>
 <p className="font-body-md text-on-surface">{session.user?.name || "-"}</p>
 </div>
 <div className="bg-surface p-5 rounded-xl border border-primary/10">
 <p className="font-label-sm text-[10px] text-primary uppercase tracking-widest mb-2">Email</p>
 <p className="font-body-md text-on-surface">{session.user?.email}</p>
 </div>
 </div>
 </div>
 
 <div className="pt-8 mt-8 border-t border-primary/10">
 <button
 onClick={() => {
 clearCart(false); // Vacía localmente pero no sobreescribe la base de datos
 signOut({ callbackUrl: "/" });
 }}
 className="flex items-center gap-2 text-error hover:text-error/80 font-label-sm text-[10px] uppercase tracking-widest transition-colors"
 >
 <LogOut className="w-4 h-4" />
 Cerrar Sesión
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
