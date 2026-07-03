import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[]; // List of product IDs
  toggleItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      hasItem: (productId) => {
        return get().items.includes(productId);
      },
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "vjneon-wishlist",
    }
  )
);
