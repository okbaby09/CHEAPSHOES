import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export const GRID_CLASS = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4";

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <ul className={cn(GRID_CLASS, className)}>
      {products.map((p, i) => (
        <li key={p.id} className="relative flex">
          <div className="w-full">
            <ProductCard product={p} priority={i < 4} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <ul className={cn(GRID_CLASS, className)} aria-busy="true" aria-label="Đang tải sản phẩm">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="overflow-hidden rounded-xl border border-border">
          <div className="aspect-square animate-pulse bg-muted" />
          <div className="flex flex-col gap-2 p-3">
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  );
}
