"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Token inválido o faltante.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Contraseña actualizada exitosamente. Ahora puedes iniciar sesión.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.message || "Error al restablecer la contraseña.");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-body-md border border-red-200">
          Enlace de recuperación inválido o incompleto.
        </div>
        <Link href="/forgot-password" className="text-primary hover:text-primary/80 transition-colors font-medium border-b border-primary/30 pb-0.5">
          Solicitar nuevo enlace
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8 border-b border-primary/10 pb-6">
        <h1 className="font-display-lg text-headline-lg text-primary mb-2 uppercase tracking-widest text-2xl">
          Nueva Contraseña
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Ingresa tu nueva contraseña para acceder a tu cuenta.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-body-md border border-red-200">
          {error}
        </div>
      )}

      {message ? (
        <div className="text-center">
          <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm font-body-md border border-green-200">
            {message}
          </div>
          <p className="text-sm text-on-surface-variant italic">Redirigiendo al inicio de sesión...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-xs text-primary mb-2 uppercase tracking-widest">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 bg-surface border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface pr-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 font-label-sm text-[10px] uppercase tracking-widest rounded-lg metallic-edge hover:opacity-90 transition-opacity disabled:opacity-70 mt-4"
          >
            {loading ? "Guardando..." : "Restablecer contraseña"}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="bg-surface flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <div className="max-w-md w-full bg-surface-container p-8 rounded-2xl soft-glow border border-primary/10 my-8">
        <Suspense fallback={<div className="text-center py-8">Cargando...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
