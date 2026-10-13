import Fuse from "fuse.js";
import { CATEGORY_LABELS, SHOE_TYPE_LONG } from "./constants";
import { PRODUCTS } from "./data/products";
import { normalizeText } from "./format";
import type { Product } from "./types";

interface SearchRecord {
  id: string;
  name: string;
  brand: string;
  type: string;
  category: string;
}

const records: SearchRecord[] = PRODUCTS.map((p) => ({
  id: p.id,
  name: normalizeText(p.name),
  brand: normalizeText(p.brand),
  type: p.shoeType ? normalizeText(`${p.shoeType} ${SHOE_TYPE_LONG[p.shoeType]}`) : "",
  category: normalizeText(CATEGORY_LABELS[p.category]),
}));

const fuse = new Fuse(records, {
  keys: [
    { name: "name", weight: 3 },
    { name: "brand", weight: 2 },
    { name: "category", weight: 1.5 },
    { name: "type", weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
});

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

/** Keeps only results close to the best match so loosely related items don't flood the list. */
const RELATIVE_SCORE_WINDOW = 0.15;

export function searchProducts(query: string): Product[] {
  const normalized = normalizeText(query);
  if (normalized.length < 2) return [];
  const results = fuse.search(normalized);
  if (!results.length) return [];
  const best = results[0].score ?? 0;
  return results
    .filter((r) => (r.score ?? 0) <= best + RELATIVE_SCORE_WINDOW)
    .map((r) => byId.get(r.item.id))
    .filter((p): p is Product => Boolean(p));
}
