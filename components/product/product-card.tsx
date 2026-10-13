"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useShop } from "@/components/providers/shop-provider";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { favorites, toggleFavorite } = useShop();
  const [activeImage, setActiveImage] = useState(0);
  const isFavorite = favorites.has(product.id);
  const discount = discountPercent(product.price, product.oldPrice);
  const href = `/san-pham/${product.slug}`;
  const hasAlternates = product.colors.length > 1;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
      onMouseLeave={() => setActiveImage(0)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link href={href} aria-label={product.name} tabIndex={-1}>
          <Image
            src={product.images[activeImage] ?? product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 48vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        </Link>

        <div className="pointer-events-none absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">-{discount}%</span>
          )}
          {product.isNew && (
            <span className="rounded-md bg-foreground px-2 py-0.5 text-xs font-bold text-background">Mới</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Bỏ yêu thích ${product.name}` : `Yêu thích ${product.name}`}
          className="absolute top-2 right-2 flex size-10 items-center justify-center rounded-full bg-background/90 shadow-sm transition-colors hover:bg-background"
        >
          <Heart className={cn("size-5", isFavorite ? "fill-primary text-primary" : "text-foreground")} aria-hidden />
        </button>

        {hasAlternates && (
          <ul
            className="absolute inset-x-2 bottom-2 hidden gap-1.5 rounded-lg bg-background/90 p-1.5 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 focus-within:opacity-100 md:flex"
            aria-label="Các màu khác"
          >
            {product.colors.map((c, i) => (
              <li key={c.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveImage(i)}
                  onFocus={() => setActiveImage(i)}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Xem màu ${c.name}`}
                  className={cn(
                    "relative block size-10 overflow-hidden rounded-md border-2 bg-muted",
                    activeImage === i ? "border-primary" : "border-transparent",
                  )}
                >
                  <Image src={c.image} alt="" fill sizes="40px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold tracking-wide text-muted-foreground uppercase">{product.brand}</span>
          {product.shoeType && (
            <span className="rounded border border-border px-1.5 py-0.5 font-semibold text-foreground">{product.shoeType}</span>
          )}
        </div>
        <h3 className="line-clamp-2 min-h-10 text-sm leading-5 font-semibold">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {hasAlternates && (
          <ul className="flex gap-1 md:hidden" aria-label={`${product.colors.length} màu`}>
            {product.colors.map((c) => (
              <li key={c.name} className="size-3 rounded-full border border-border" style={{ backgroundColor: c.hex }}>
                <span className="sr-only">{c.name}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className="text-base font-extrabold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
