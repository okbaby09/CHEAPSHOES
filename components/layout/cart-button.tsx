"use client";

import { ShoppingBag } from "lucide-react";
import { useCart, useShop } from "@/components/providers/shop-provider";

export function CartButton() {
  const { count } = useCart();
  const { setCartOpen } = useShop();

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="relative flex size-11 items-center justify-center rounded-full transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      aria-label={`Giỏ hàng, ${count} sản phẩm`}
    >
      <ShoppingBag className="size-6" aria-hidden />
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] leading-5 font-bold text-primary-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
