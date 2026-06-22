"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [isAdded, setIsAdded] = useState(false);

  const currentItem = items.find((i) => i.id === product.id);
  const currentQuantity = currentItem?.quantity || 0;
  const isOutOfStock = currentQuantity >= product.stock || product.stock <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;

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
      disabled={isOutOfStock}
      className={`px-3 py-1.5 font-label-sm text-[9px] uppercase tracking-widest metallic-edge transition-opacity ${
        isAdded
          ? "bg-secondary-container text-on-secondary-container"
          : isOutOfStock
          ? "bg-surface-variant text-on-surface-variant/50 cursor-not-allowed opacity-70"
          : "bg-primary text-on-primary hover:opacity-90"
      }`}
    >
      {isAdded ? "Añadido ✓" : isOutOfStock ? "Sin Stock" : "Añadir al Carrito"}
    </button>
  );
}
