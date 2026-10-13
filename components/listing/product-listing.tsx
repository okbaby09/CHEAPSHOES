"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/product-grid";
import { PRODUCTS, getBestSellers } from "@/lib/data/products";
import { PRICE_MAX, PRICE_MIN, SORT_OPTIONS, type SortValue } from "@/lib/constants";
import { PARAM, applyFilters, countActiveFilters, parseFilters, sortProducts } from "@/lib/filters";
import { searchProducts } from "@/lib/search";
import type { CategoryScope } from "@/lib/types";
import { useState } from "react";
import { FilterSidebar, type ListKey } from "./filter-sidebar";
import { ActiveFilterChips } from "./active-filter-chips";

interface Props {
  scope: CategoryScope;
  title: string;
  isSearch?: boolean;
}

export function ProductListing({ scope, title, isSearch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const query = isSearch ? (searchParams.get(PARAM.query) ?? "").trim() : "";
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));

  const base = isSearch ? searchProducts(query) : scope === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === scope);
  const defaultSort: SortValue = isSearch ? "lien-quan" : "moi-nhat";
  const sort = filters.sort ?? defaultSort;
  const results = sortProducts(applyFilters(base, filters), sort);
  const activeCount = countActiveFilters(filters);

  function update(mutate: (p: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const qs = params.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  function toggle(key: ListKey, value: string) {
    update((p) => {
      const current = filters[key];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length) p.set(PARAM[key], next.join(","));
      else p.delete(PARAM[key]);
    });
  }

  function setPrice(min: number, max: number) {
    update((p) => {
      if (min > PRICE_MIN) p.set(PARAM.minPrice, String(min));
      else p.delete(PARAM.minPrice);
      if (max < PRICE_MAX) p.set(PARAM.maxPrice, String(max));
      else p.delete(PARAM.maxPrice);
    });
  }

  function clearAll() {
    update((p) => {
      for (const key of [PARAM.types, PARAM.brands, PARAM.sizes, PARAM.minPrice, PARAM.maxPrice]) p.delete(key);
    });
  }

  const sortOptions = isSearch ? [{ value: "lien-quan", label: "Liên quan nhất" }, ...SORT_OPTIONS] : SORT_OPTIONS;

  const sidebar = (
    <FilterSidebar
      scope={scope}
      filters={filters}
      products={base}
      onToggle={toggle}
      onPrice={setPrice}
      onClear={clearAll}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
          {isSearch ? (
            <>
              Kết quả tìm kiếm cho <span className="text-primary">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            title
          )}
        </h1>
      </header>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Bộ lọc sản phẩm">
          <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">{sidebar}</div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <span className="font-bold text-foreground">{results.length}</span> sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-10 gap-2 px-3 text-sm font-semibold lg:hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <SlidersHorizontal className="size-4" aria-hidden />
                Bộ lọc{activeCount > 0 ? ` (${activeCount})` : ""}
              </Button>
              <Select
                items={sortOptions}
                value={sort}
                onValueChange={(v) =>
                  update((p) => {
                    if (!v || v === defaultSort) p.delete(PARAM.sort);
                    else p.set(PARAM.sort, String(v));
                  })
                }
              >
                <SelectTrigger className="h-10 min-w-40 text-sm" aria-label="Sắp xếp">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ActiveFilterChips
            filters={filters}
            onRemove={toggle}
            onClearPrice={() => setPrice(PRICE_MIN, PRICE_MAX)}
            onClearAll={clearAll}
          />

          {isPending ? (
            <ProductGridSkeleton />
          ) : results.length ? (
            <ProductGrid products={results} />
          ) : (
            <EmptyResults hasFilters={activeCount > 0} onClear={clearAll} />
          )}
        </div>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-[88%] gap-0 p-0 sm:max-w-sm">
          <SheetTitle className="sr-only">Bộ lọc sản phẩm</SheetTitle>
          <SheetDescription className="sr-only">Lọc theo loại giày, thương hiệu, size và giá</SheetDescription>
          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4">{sidebar}</div>
          <div className="border-t border-border p-4">
            <Button className="h-12 w-full text-base font-semibold" onClick={() => setDrawerOpen(false)}>
              Xem {results.length} sản phẩm
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function EmptyResults({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  const best = getBestSellers(4);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center">
        <p className="text-lg font-bold">Không tìm thấy sản phẩm phù hợp</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Hãy thử từ khóa khác, kiểm tra chính tả hoặc bỏ bớt một vài bộ lọc.
        </p>
        {hasFilters && (
          <Button variant="outline" className="mt-2 h-11 px-6" onClick={onClear}>
            Xóa bộ lọc
          </Button>
        )}
      </div>
      <section aria-labelledby="best-sellers">
        <h2 id="best-sellers" className="mb-4 text-xl font-extrabold">
          Sản phẩm bán chạy
        </h2>
        <ProductGrid products={best} />
      </section>
    </div>
  );
}

export function ProductListingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="mb-5 h-8 w-64 animate-pulse rounded bg-muted" />
      <div className="flex gap-8">
        <div className="hidden w-64 shrink-0 flex-col gap-4 lg:flex">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
        <div className="flex-1">
          <div className="mb-4 h-10 animate-pulse rounded bg-muted" />
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
