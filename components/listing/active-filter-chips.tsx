"use client";

import { X } from "lucide-react";
import { BASKETBALL_TYPES, FOOTBALL_TYPES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { hasPriceFilter, type Filters } from "@/lib/filters";
import type { ListKey } from "./filter-sidebar";

const TYPE_LABELS = new Map<string, string>([...FOOTBALL_TYPES, ...BASKETBALL_TYPES].map((t) => [t.value, t.label]));

interface Props {
  filters: Filters;
  onRemove: (key: ListKey, value: string) => void;
  onClearPrice: () => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({ filters, onRemove, onClearPrice, onClearAll }: Props) {
  const chips: { id: string; label: string; onClick: () => void }[] = [
    ...filters.types.map((v) => ({ id: `t-${v}`, label: TYPE_LABELS.get(v) ?? v, onClick: () => onRemove("types", v) })),
    ...filters.brands.map((v) => ({ id: `b-${v}`, label: v, onClick: () => onRemove("brands", v) })),
    ...filters.sizes.map((v) => ({ id: `s-${v}`, label: `Size ${v}`, onClick: () => onRemove("sizes", v) })),
    ...(hasPriceFilter(filters)
      ? [{ id: "price", label: `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`, onClick: onClearPrice }]
      : []),
  ];

  if (!chips.length) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Bộ lọc đang áp dụng">
      {chips.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={c.onClick}
            className="flex h-9 items-center gap-1.5 rounded-full bg-foreground pr-2.5 pl-3 text-xs font-medium text-background transition-opacity hover:opacity-85"
            aria-label={`Bỏ lọc ${c.label}`}
          >
            {c.label}
            <X className="size-3.5" aria-hidden />
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={onClearAll} className="h-9 px-2 text-xs font-semibold text-primary underline-offset-2 hover:underline">
          Xóa tất cả
        </button>
      </li>
    </ul>
  );
}
