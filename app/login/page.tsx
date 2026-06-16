"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
 const router = useRouter();
 const [formData, setFormData] = useState({ email: "", password: "" });
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError("");

 try {
 const res = await signIn("credentials", {
 email: formData.email,
 password: formData.password,
 redirect: false,
 });

 if (res?.error) {
 setError(res.error);
 } else {
 router.push("/");
 router.refresh();
 }
 } catch (err) {
 setError("Ocurrió un error inesperado");
 } finally {
 setLoading(false);
 }
 };

 return (
 <main className="bg-surface flex items-center justify-center p-4">
 <div className="max-w-md w-full bg-surface-container p-8 rounded-sm soft-glow border border-primary/10 my-8">
 <div className="text-center mb-8 border-b border-primary/10 pb-6">
 <h1 className="font-display-lg text-headline-lg text-primary mb-2 uppercase tracking-widest">Bienvenido</h1>
 <p className="font-body-md text-sm text-on-surface-variant">Iniciá sesión para continuar en Beauté Divine Espace.</p>
 </div>

 {error && (
 <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 text-sm font-body-md border border-red-200">
 {error}
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
 Correo Electrónico
 </label>
 <input
 type="email"
 required
 autoFocus
 className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 placeholder="tu@correo.com"
 />
 </div>

 <div>
 <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
 Contraseña
 </label>
 <input
 type="password"
 required
 className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
 value={formData.password}
 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
 placeholder="••••••••"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-primary text-on-primary py-3 font-label-sm text-[10px] uppercase tracking-widest metallic-edge hover:opacity-90 transition-opacity disabled:opacity-70 mt-4"
 >
 {loading ? "Ingresando..." : "Iniciar Sesión"}
 </button>
 </form>

 <div className="mt-8 flex items-center justify-center space-x-4">
 <div className="h-px bg-primary/10 flex-1"></div>
 <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">O continuá con</span>
 <div className="h-px bg-primary/10 flex-1"></div>
 </div>

 <button
 onClick={() => signIn("google", { callbackUrl: "/" })}
 className="mt-6 w-full flex items-center justify-center space-x-3 bg-surface border border-primary/20 text-primary py-3 rounded-sm hover:bg-primary/5 transition-colors font-label-sm text-[10px] uppercase tracking-widest"
 >
 <svg className="w-4 h-4" viewBox="0 0 24 24">
 <path
 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
 fill="#4285F4"
 />
 <path
 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
 fill="#34A853"
 />
 <path
 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
 fill="#FBBC05"
 />
 <path
 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
 fill="#EA4335"
 />
 </svg>
 <span>Google</span>
 </button>

 <div className="mt-8 pt-6 border-t border-primary/10 text-center font-body-md text-sm text-on-surface-variant">
 ¿No tenés una cuenta?{" "}
 <Link href="/register" className="text-primary hover:text-primary/80 transition-colors font-medium border-b border-primary/30 pb-0.5">
 Registrate acá
 </Link>
 </div>
 </div>
 </main>
 );
}
