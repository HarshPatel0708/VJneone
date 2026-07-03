import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // Unique combination key (e.g. prodId-color-size or hash for custom sign)
  productId: string; // 'custom' or product.id
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  backboard?: string;
  usage?: string;
  accessories?: string[];
  isCustom?: boolean;
  customText?: string;
  customFont?: string;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discountPercent: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountPercent: 0,

      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex((item) => item.id === newItem.id);

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity || 1;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 } as CartItem],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      applyPromoCode: (code) => {
        const normalizedCode = code.toUpperCase().trim();
        if (normalizedCode === "NEONGOW" || normalizedCode === "VJNEON20") {
          set({ promoCode: normalizedCode, discountPercent: 20 });
          return true;
        }
        if (normalizedCode === "WELCOME10") {
          set({ promoCode: normalizedCode, discountPercent: 10 });
          return true;
        }
        return false;
      },

      removePromoCode: () => {
        set({ promoCode: null, discountPercent: 0 });
      },

      clearCart: () => {
        set({ items: [], promoCode: null, discountPercent: 0 });
      },

      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = subtotal * (get().discountPercent / 100);
        const afterDiscount = subtotal - discount;
        
        // Free shipping over $250, otherwise flat $25
        const shipping = subtotal > 0 && afterDiscount >= 250 ? 0 : subtotal > 0 ? 25 : 0;
        const tax = afterDiscount * 0.08; // 8% sales tax simulation
        const total = afterDiscount + shipping + tax;

        return {
          subtotal,
          discount,
          shipping,
          tax,
          total,
        };
      },
    }),
    {
      name: "vjneon-cart",
    }
  )
);
