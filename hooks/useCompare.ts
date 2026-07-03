import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  items: string[]; // List of product IDs
  addItem: (productId: string) => boolean; // returns false if full (max 3)
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearCompare: () => void;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        const items = get().items;
        if (items.includes(productId)) return true;
        if (items.length >= 3) return false;
        set({ items: [...items, productId] });
        return true;
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      hasItem: (productId) => {
        return get().items.includes(productId);
      },
      clearCompare: () => {
        set({ items: [] });
      },
    }),
    {
      name: "vjneon-compare",
    }
  )
);
