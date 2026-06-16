"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Auto login after register
        const signInRes = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInRes?.error) {
          setError("Registro exitoso, pero hubo un error al iniciar sesión.");
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        const data = await res.json();
        setError(data.message || "Error al registrarse");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container p-8 rounded-sm soft-glow border border-primary/10 my-8">
        <div className="text-center mb-8 border-b border-primary/10 pb-6">
          <h1 className="font-display-lg text-headline-lg text-primary mb-2 uppercase tracking-widest">Crear Cuenta</h1>
          <p className="font-body-md text-sm text-on-surface-variant">Sumate a Beauté Divine Espace.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 text-sm font-body-md border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              autoFocus
              className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
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
              minLength={6}
            />
          </div>

          <div>
            <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 font-label-sm text-[10px] uppercase tracking-widest metallic-edge hover:opacity-90 transition-opacity disabled:opacity-70 mt-4"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center font-body-md text-sm text-on-surface-variant">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium border-b border-primary/30 pb-0.5">
            Iniciá sesión acá
          </Link>
        </div>
      </div>
    </main>
  );
}
