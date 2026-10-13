import type { CartItem } from "./types";

export interface PlacedOrder {
  code: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    ward: string;
    district: string;
    province: string;
    note?: string;
  };
  paymentMethod: string;
  items: CartItem[];
  couponCode?: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const KEY = "shoesport-last-order";

export function saveOrder(order: PlacedOrder) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    // ignore storage failures
  }
}

let cachedRaw: string | null | undefined;
let cachedOrder: PlacedOrder | null = null;

export function readOrder(): PlacedOrder | null {
  const raw = window.sessionStorage.getItem(KEY);
  if (raw === cachedRaw) return cachedOrder;
  cachedRaw = raw;
  try {
    cachedOrder = raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    cachedOrder = null;
  }
  return cachedOrder;
}

export function generateOrderCode() {
  const rand = Math.floor(Math.random() * 900 + 100);
  return `SS${Date.now().toString().slice(-7)}${rand}`;
}
