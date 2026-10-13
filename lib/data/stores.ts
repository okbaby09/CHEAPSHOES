import type { Store } from "../types";

export const STORES: Store[] = [
  { id: "hn-cg", name: "SHOESPORT Cầu Giấy", address: "123 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội", hotline: "0901 234 561" },
  { id: "hn-dd", name: "SHOESPORT Đống Đa", address: "45 Tây Sơn, Quang Trung, Đống Đa, Hà Nội", hotline: "0901 234 562" },
  { id: "hcm-q10", name: "SHOESPORT Quận 10", address: "286 Ba Tháng Hai, Phường 12, Quận 10, TP. Hồ Chí Minh", hotline: "0901 234 563" },
  { id: "hcm-td", name: "SHOESPORT Thủ Đức", address: "12 Võ Văn Ngân, Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh", hotline: "0901 234 564" },
  { id: "dn-hc", name: "SHOESPORT Đà Nẵng", address: "88 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng", hotline: "0901 234 565" },
];

export const STORE_MAP = Object.fromEntries(STORES.map((s) => [s.id, s]));

export function storeMapUrl(store: Store) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
}

export function storeTel(store: Store) {
  return `tel:${store.hotline.replace(/\s/g, "")}`;
}
