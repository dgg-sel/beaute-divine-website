"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
        setEmail("");
      } else {
        setError(data.message || "Ocurrió un error. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-surface flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <div className="max-w-md w-full bg-surface-container p-8 rounded-2xl soft-glow border border-primary/10 my-8">
        <div className="text-center mb-8 border-b border-primary/10 pb-6">
          <h1 className="font-display-lg text-headline-lg text-primary mb-2 uppercase tracking-widest text-2xl">
            Recuperar Contraseña
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-body-md border border-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm font-body-md border border-green-200">
            {message}
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
              className="w-full px-4 py-3 bg-surface border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 font-label-sm text-[10px] uppercase tracking-widest rounded-lg metallic-edge hover:opacity-90 transition-opacity disabled:opacity-70 mt-4"
          >
            {loading ? "Enviando enlace..." : "Enviar enlace de recuperación"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center font-body-md text-sm text-on-surface-variant">
          ¿Te acordaste tu contraseña?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium border-b border-primary/30 pb-0.5">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
