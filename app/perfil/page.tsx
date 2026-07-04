"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { LogOut, User, MapPin, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import AddressModal from "@/components/AddressModal";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch("/api/user/addresses");
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAddresses(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchAddresses();
    }
  }, [status, router, fetchAddresses]);

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("¿Seguro que querés eliminar esta dirección?")) return;
    try {
      const res = await fetch(`/api/user/addresses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddresses(addresses.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar", err);
    }
  };

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
    <div className="bg-surface pt-[100px] pb-12 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-display-lg text-headline-lg text-primary text-center md:text-left mb-2">Mi Cuenta</h1>

        {/* Sección Personal */}
        <div className="bg-surface-container-low rounded-xl soft-glow border border-primary/10 p-5 md:p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-primary/10">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border border-primary/20">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-headline-md text-xl text-on-surface">{session.user?.name || "Usuario"}</h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-0.5">{session.user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-headline-md text-lg text-primary mb-3 uppercase tracking-widest">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-lg border border-primary/10">
                  <p className="font-label-sm text-[10px] text-primary uppercase tracking-widest mb-1">Nombre</p>
                  <p className="font-body-md text-on-surface">{session.user?.name || "-"}</p>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-primary/10">
                  <p className="font-label-sm text-[10px] text-primary uppercase tracking-widest mb-1">Email</p>
                  <p className="font-body-md text-on-surface">{session.user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Direcciones */}
        <div className="bg-surface-container-low rounded-xl soft-glow border border-primary/10 p-5 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-xl text-primary uppercase tracking-widest">Mis Direcciones</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-label-sm text-[10px] uppercase tracking-widest transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva
            </button>
          </div>

          {loadingAddresses ? (
            <div className="py-8 text-center text-on-surface-variant font-body-md">Cargando direcciones...</div>
          ) : addresses.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant font-body-md border border-dashed border-primary/20 rounded-xl">
              No tenés direcciones guardadas aún.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-surface p-4 rounded-lg border border-primary/10 relative group">
                  <button 
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                    title="Eliminar dirección"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-headline-sm text-primary mb-1">{addr.name}</p>
                      <p className="font-body-md text-on-surface font-medium">
                        {addr.street} {addr.number} {addr.apartment ? `Dpto ${addr.apartment}` : ""}
                      </p>
                      <p className="font-body-md text-sm text-on-surface-variant mt-1">
                        {addr.city}, {addr.province} ({addr.zipCode})
                      </p>
                      {addr.phone && (
                        <p className="font-body-md text-sm text-on-surface-variant mt-1">
                          Tel: {addr.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección Cerrar Sesión */}
        <div className="bg-surface-container-low rounded-2xl soft-glow border border-primary/10 p-8">
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

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newAddr) => setAddresses([newAddr, ...addresses])}
      />
    </div>
  );
}
