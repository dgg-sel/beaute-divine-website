import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // ID del producto
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: (sync?: boolean) => void;
  getTotal: () => number;
  getCartCount: () => number;
  fetchUserCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  isCleared: boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCleared: false,
      
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          if (existingItem.quantity + item.quantity <= item.stock) {
            set({
              items: currentItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isCleared: false
            });
          }
        } else {
          if (item.quantity <= item.stock) {
            set({ items: [...currentItems, item], isCleared: false });
          }
        }
        get().syncCart();
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
        get().syncCart();
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
        get().syncCart();
      },
      
      clearCart: (sync = true) => {
        set({ items: [], isCleared: true });
        if (sync) {
          get().syncCart();
        }
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      fetchUserCart: async () => {
        if (get().isCleared) return;
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            if (data.items && !get().isCleared) {
              set({ items: data.items });
            }
          }
        } catch (error) {
          console.error("Error fetching cart", error);
        }
      },

      syncCart: async () => {
        try {
          // Si el usuario no está logueado, la API responderá 401 y no pasa nada.
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: get().items })
          });
        } catch (error) {
          console.error("Error syncing cart", error);
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
