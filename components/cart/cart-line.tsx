"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { cartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/types";
import { QuantityStepper } from "@/components/shared/quantity-stepper";

export function CartLine({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  return (
    <li className="flex gap-3 py-4">
      <Link
        href={`/san-pham/${item.slug}`}
        onClick={onNavigate}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24"
      >
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/san-pham/${item.slug}`} onClick={onNavigate} className="line-clamp-2 text-sm font-semibold hover:text-primary">
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => cartStore.remove(item.key)}
            className="-mt-1 -mr-1 flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-primary"
            aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {[item.size && `Size ${item.size}`, item.color].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <QuantityStepper value={item.quantity} onChange={(q) => cartStore.setQuantity(item.key, q)} />
          <div className="text-right">
            <p className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
            {item.quantity > 1 && <p className="text-xs text-muted-foreground">{formatPrice(item.price)} / đôi</p>}
          </div>
        </div>
      </div>
    </li>
  );
}
