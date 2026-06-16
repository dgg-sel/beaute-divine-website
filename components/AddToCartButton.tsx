"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      ...product,
      quantity: 1,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`px-4 py-2 font-label-sm text-[10px] uppercase tracking-widest metallic-edge transition-opacity ${
        isAdded
          ? "bg-secondary-container text-on-secondary-container"
          : "bg-primary text-on-primary hover:opacity-90"
      }`}
    >
      {isAdded ? "Añadido ✓" : "Añadir al Carrito"}
    </button>
  );
}
