import { PRICE_MAX, PRICE_MIN, SORT_OPTIONS, type SortValue } from "./constants";
import type { Product } from "./types";

export interface Filters {
  types: string[];
  brands: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  sort: SortValue | null;
}

export const PARAM = {
  types: "loai",
  brands: "thuong-hieu",
  sizes: "size",
  minPrice: "gia-tu",
  maxPrice: "gia-den",
  sort: "sap-xep",
  query: "q",
} as const;

function list(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

function clampPrice(value: string | null, fallback: number) {
  const n = Number(value);
  if (value === null || !Number.isFinite(n)) return fallback;
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, Math.round(n)));
}

export function parseFilters(params: URLSearchParams): Filters {
  const sort = params.get(PARAM.sort);
  return {
    types: list(params, PARAM.types),
    brands: list(params, PARAM.brands),
    sizes: list(params, PARAM.sizes),
    minPrice: clampPrice(params.get(PARAM.minPrice), PRICE_MIN),
    maxPrice: clampPrice(params.get(PARAM.maxPrice), PRICE_MAX),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortValue) : null,
  };
}

export function hasPriceFilter(f: Filters) {
  return f.minPrice > PRICE_MIN || f.maxPrice < PRICE_MAX;
}

export function countActiveFilters(f: Filters) {
  return f.types.length + f.brands.length + f.sizes.length + (hasPriceFilter(f) ? 1 : 0);
}

export function applyFilters(products: Product[], f: Filters) {
  return products.filter((p) => {
    if (f.types.length && (!p.shoeType || !f.types.includes(p.shoeType))) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.sizes.length && !p.sizes.some((s) => s.inStock && f.sizes.includes(s.size))) return false;
    if (p.price < f.minPrice || p.price > f.maxPrice) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortValue) {
  const sorted = [...products];
  switch (sort) {
    case "gia-tang":
      return sorted.sort((a, b) => a.price - b.price);
    case "gia-giam":
      return sorted.sort((a, b) => b.price - a.price);
    case "ban-chay":
      return sorted.sort((a, b) => b.soldCount - a.soldCount);
    case "moi-nhat":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return sorted;
  }
}
