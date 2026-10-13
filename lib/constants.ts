import type { BasketballType, Category, CategoryScope, FootShape, FootballType, ShoeType } from "./types";

export const CATEGORY_LABELS: Record<Category, string> = {
  "giay-da-bong": "Giày đá bóng",
  "giay-bong-ro": "Giày bóng rổ",
  balo: "Balo",
};

export const NAV_ITEMS: { label: string; href: string; scope: CategoryScope }[] = [
  { label: "Tất cả sản phẩm", href: "/", scope: "all" },
  { label: "Giày đá bóng", href: "/giay-da-bong", scope: "giay-da-bong" },
  { label: "Giày bóng rổ", href: "/giay-bong-ro", scope: "giay-bong-ro" },
  { label: "Balo", href: "/balo", scope: "balo" },
];

export const FOOTBALL_TYPES: { value: FootballType; label: string }[] = [
  { value: "AG", label: "Đinh AG" },
  { value: "FG", label: "Đinh FG" },
  { value: "SG", label: "Đinh SG" },
  { value: "TF", label: "Đinh TF (cỏ nhân tạo)" },
  { value: "IC", label: "IC (futsal / sân trong nhà)" },
];

export const BASKETBALL_TYPES: { value: BasketballType; label: string }[] = [
  { value: "Indoor", label: "Indoor (trong nhà)" },
  { value: "Outdoor", label: "Outdoor (ngoài trời)" },
];

export const SHOE_TYPE_LONG: Record<ShoeType, string> = {
  AG: "Giày cỏ nhân tạo cứng – AG",
  FG: "Giày cỏ tự nhiên – FG",
  SG: "Giày cỏ tự nhiên mềm – SG",
  TF: "Giày cỏ nhân tạo – TF",
  IC: "Giày futsal – IC",
  Indoor: "Giày bóng rổ trong nhà – Indoor",
  Outdoor: "Giày bóng rổ ngoài trời – Outdoor",
};

export const BRANDS_BY_CATEGORY: Record<Category, string[]> = {
  "giay-da-bong": ["Adidas", "Nike", "Puma", "Mizuno", "Asics", "Kamito", "Zocker", "Joma"],
  "giay-bong-ro": ["Nike", "Jordan", "Anta", "Li-Ning", "Adidas", "Under Armour", "Peak"],
  balo: ["Nike", "Adidas", "Puma", "Jordan"],
};

export const ALL_BRANDS = Array.from(new Set(Object.values(BRANDS_BY_CATEGORY).flat()));

export const ALL_SIZES = [
  "35", "35.5", "36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5",
  "41", "42", "42.5", "43", "44", "44.5", "45", "45.5", "46", "47",
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 10_000_000;
export const PRICE_STEP = 100_000;

export const PRICE_PRESETS = [
  { label: "Dưới 1 triệu", min: 0, max: 1_000_000 },
  { label: "1–2 triệu", min: 1_000_000, max: 2_000_000 },
  { label: "2–3 triệu", min: 2_000_000, max: 3_000_000 },
  { label: "3–5 triệu", min: 3_000_000, max: 5_000_000 },
  { label: "Trên 5 triệu", min: 5_000_000, max: PRICE_MAX },
];

export type SortValue = "moi-nhat" | "gia-tang" | "gia-giam" | "ban-chay" | "lien-quan";

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "moi-nhat", label: "Mới nhất" },
  { value: "gia-tang", label: "Giá tăng dần" },
  { value: "gia-giam", label: "Giá giảm dần" },
  { value: "ban-chay", label: "Bán chạy" },
];

export const FOOT_SHAPES: { value: FootShape; label: string; description: string }[] = [
  { value: "thon", label: "Thon", description: "Bàn chân hẹp, ngón chân thon dài, mu bàn chân thấp." },
  { value: "be-it", label: "Bè ít", description: "Bàn chân hơi rộng ở vùng ngón, phù hợp phần lớn form giày tiêu chuẩn." },
  { value: "be-vua", label: "Bè vừa", description: "Bàn chân rộng vừa phải, mu chân cao trung bình — phổ biến với người Việt." },
  { value: "be-nhieu", label: "Bè nhiều", description: "Bàn chân rất rộng, mu cao. Nên chọn giày form rộng hoặc tăng 0.5 size." },
];

export const SHIPPING_FEE = 30_000;
export const FREE_SHIPPING_THRESHOLD = 1_000_000;
export const MAX_QUANTITY = 10;

export const HOTLINE = "1900 6868";
export const HOTLINE_TEL = "19006868";
