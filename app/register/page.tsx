"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-[#EAE5DF]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-[#4A4238] mb-2">Crear Cuenta</h1>
          <p className="text-[#8C8377]">Únite a Beauté Divine Espace y comienza tu viaje hacia el bienestar.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#4A4238] mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:ring-2 focus:ring-[#D4C3B3] focus:border-transparent outline-none transition-all bg-[#FDFBF7]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A4238] mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:ring-2 focus:ring-[#D4C3B3] focus:border-transparent outline-none transition-all bg-[#FDFBF7]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A4238] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:ring-2 focus:ring-[#D4C3B3] focus:border-transparent outline-none transition-all bg-[#FDFBF7]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A4238] text-white py-3 rounded-xl hover:bg-[#3A332C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#8C8377]">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-[#4A4238] hover:underline font-medium">
            Iniciá sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
