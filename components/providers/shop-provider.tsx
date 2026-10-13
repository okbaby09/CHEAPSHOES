"use client";

import { createContext, use, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore } from "@/lib/cart-store";

interface ShopContextValue {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ cartOpen, setCartOpen, favorites, toggleFavorite }),
    [cartOpen, favorites, toggleFavorite],
  );

  return <ShopContext value={value}>{children}</ShopContext>;
}

export function useShop() {
  const ctx = use(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function useCart() {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { items, count, subtotal };
}

const noopSubscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
