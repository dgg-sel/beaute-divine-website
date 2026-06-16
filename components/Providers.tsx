"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";

function CartHydrator() {
  const { data: session, status } = useSession();
  const fetchUserCart = useCartStore((state) => state.fetchUserCart);
  
  useEffect(() => {
    // Si la sesión está autenticada, traer el carrito de la DB
    if (status === "authenticated") {
      fetchUserCart();
    }
  }, [status, fetchUserCart]);
  
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartHydrator />
      {children}
    </SessionProvider>
  );
}
