import { MAX_QUANTITY } from "./constants";
import type { CartItem } from "./types";

const STORAGE_KEY = "shoesport-cart";
const EMPTY: CartItem[] = [];

let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (items !== null) return items;
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    items = Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    items = [];
  }
  return items;
}

function write(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode / quota); keep in-memory state.
  }
  listeners.forEach((l) => l());
}

function clampQty(q: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(q)));
}

export function cartKey(productId: string, size?: string, color?: string) {
  return [productId, size ?? "", color ?? ""].join("|");
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      items = null;
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: read,
  getServerSnapshot: () => EMPTY,
  add(item: Omit<CartItem, "key">) {
    const key = cartKey(item.productId, item.size, item.color);
    const current = read();
    const existing = current.find((i) => i.key === key);
    if (existing) {
      write(current.map((i) => (i.key === key ? { ...i, quantity: clampQty(i.quantity + item.quantity) } : i)));
    } else {
      write([...current, { ...item, key, quantity: clampQty(item.quantity) }]);
    }
  },
  setQuantity(key: string, quantity: number) {
    write(read().map((i) => (i.key === key ? { ...i, quantity: clampQty(quantity) } : i)));
  },
  remove(key: string) {
    write(read().filter((i) => i.key !== key));
  },
  clear() {
    write([]);
  },
};
