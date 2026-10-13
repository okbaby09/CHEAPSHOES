"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ALL_BRANDS, ALL_SIZES, BASKETBALL_TYPES, BRANDS_BY_CATEGORY, FOOTBALL_TYPES } from "@/lib/constants";
import { countActiveFilters, type Filters } from "@/lib/filters";
import type { CategoryScope, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FilterGroup } from "./filter-group";
import { PriceFilter } from "./price-filter";

export type ListKey = "types" | "brands" | "sizes";

interface Props {
  scope: CategoryScope;
  filters: Filters;
  products: Product[];
  onToggle: (key: ListKey, value: string) => void;
  onPrice: (min: number, max: number) => void;
  onClear: () => void;
}

function CheckList({
  options,
  selected,
  counts,
  onToggle,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  counts: Map<string, number>;
  onToggle: (value: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {options.map((o) => {
        const count = counts.get(o.value) ?? 0;
        return (
          <li key={o.value}>
            <label className="flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-1 text-sm hover:bg-muted">
              <Checkbox checked={selected.includes(o.value)} onCheckedChange={() => onToggle(o.value)} className="size-5" />
              <span className="flex-1">{o.label}</span>
              <span className="text-xs text-muted-foreground tabular-nums">({count})</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function tally(products: Product[], pick: (p: Product) => string[]) {
  const map = new Map<string, number>();
  for (const p of products) for (const v of pick(p)) map.set(v, (map.get(v) ?? 0) + 1);
  return map;
}

export function FilterSidebar({ scope, filters, products, onToggle, onPrice, onClear }: Props) {
  const isBag = scope === "balo";
  const brands = scope === "all" ? ALL_BRANDS : BRANDS_BY_CATEGORY[scope];
  const typeCounts = tally(products, (p) => (p.shoeType ? [p.shoeType] : []));
  const brandCounts = tally(products, (p) => [p.brand]);
  const sizeCounts = tally(products, (p) => p.sizes.filter((s) => s.inStock).map((s) => s.size));
  const active = countActiveFilters(filters);

  const typeGroups =
    scope === "giay-da-bong"
      ? [{ title: "Loại giày", options: FOOTBALL_TYPES }]
      : scope === "giay-bong-ro"
        ? [{ title: "Loại giày", options: BASKETBALL_TYPES }]
        : scope === "all"
          ? [
              { title: "Loại giày đá bóng", options: FOOTBALL_TYPES },
              { title: "Loại giày bóng rổ", options: BASKETBALL_TYPES },
            ]
          : [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-lg font-extrabold">Bộ lọc</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={active === 0}
          className="h-9 px-2 text-sm font-semibold text-primary disabled:text-muted-foreground"
        >
          Xóa bộ lọc{active > 0 ? ` (${active})` : ""}
        </button>
      </div>

      {typeGroups.map((g) => (
        <FilterGroup key={g.title} title={g.title}>
          <CheckList options={g.options} selected={filters.types} counts={typeCounts} onToggle={(v) => onToggle("types", v)} />
        </FilterGroup>
      ))}

      <FilterGroup title={isBag ? "Thương hiệu" : "Dòng giày / Thương hiệu"}>
        <CheckList
          options={brands.map((b) => ({ value: b, label: b }))}
          selected={filters.brands}
          counts={brandCounts}
          onToggle={(v) => onToggle("brands", v)}
        />
      </FilterGroup>

      {!isBag && (
        <FilterGroup title="Size giày">
          <ul className="grid grid-cols-4 gap-2 lg:grid-cols-4">
            {ALL_SIZES.map((s) => {
              const selected = filters.sizes.includes(s);
              const available = (sizeCounts.get(s) ?? 0) > 0;
              return (
                <li key={s}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onToggle("sizes", s)}
                    className={cn(
                      "h-10 w-full rounded-md border text-sm font-medium tabular-nums transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground",
                      !available && !selected && "text-muted-foreground/60",
                    )}
                  >
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>
        </FilterGroup>
      )}

      <FilterGroup title="Khoảng giá">
        <PriceFilter min={filters.minPrice} max={filters.maxPrice} onApply={onPrice} />
      </FilterGroup>
    </div>
  );
}
