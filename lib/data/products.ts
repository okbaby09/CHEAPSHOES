import { ALL_SIZES, CATEGORY_LABELS, SHOE_TYPE_LONG } from "../constants";
import { slugify } from "../format";
import type { Category, FootShape, Product, ProductColor, ShoeType } from "../types";
import { STORES } from "./stores";

const COLORS = {
  "fb-red": { name: "Đỏ / Đen", hex: "#dc2626", image: "/products/fb-red.png" },
  "fb-white-gold": { name: "Trắng / Vàng", hex: "#f5f0e1", image: "/products/fb-white-gold.png" },
  "fb-blue": { name: "Xanh dương", hex: "#1d4ed8", image: "/products/fb-blue.png" },
  "fb-volt": { name: "Vàng neon", hex: "#d9f99d", image: "/products/fb-volt.png" },
  "fb-turf": { name: "Đen / Trắng", hex: "#111111", image: "/products/fb-turf.png" },
  "fb-futsal": { name: "Cam / Navy", hex: "#f97316", image: "/products/fb-futsal.png" },
  "bb-red": { name: "Đỏ / Đen", hex: "#b91c1c", image: "/products/bb-red.png" },
  "bb-white-blue": { name: "Trắng / Xanh", hex: "#2563eb", image: "/products/bb-white-blue.png" },
  "bb-black-gold": { name: "Đen / Vàng", hex: "#1c1917", image: "/products/bb-black-gold.png" },
  "bb-purple": { name: "Tím / Vàng", hex: "#7e22ce", image: "/products/bb-purple.png" },
  "bb-grey": { name: "Xám / Cam", hex: "#9ca3af", image: "/products/bb-grey.png" },
  "bp-black": { name: "Đen", hex: "#111111", image: "/products/bp-black.png" },
  "bp-navy": { name: "Xanh navy", hex: "#1e3a8a", image: "/products/bp-navy.png" },
  "bp-red": { name: "Đỏ", hex: "#dc2626", image: "/products/bp-red.png" },
  "bp-grey": { name: "Xám", hex: "#a3a3a3", image: "/products/bp-grey.png" },
} satisfies Record<string, ProductColor>;

type ColorKey = keyof typeof COLORS;

interface Seed {
  name: string;
  brand: string;
  category: Category;
  type?: ShoeType;
  price: number;
  oldPrice?: number;
  colors: ColorKey[];
  shapes?: FootShape[];
  isNew?: boolean;
  best?: boolean;
  material: string;
  highlight: string;
  sizeRange?: [string, string];
}

const SEEDS: Seed[] = [
  // Giày đá bóng (18)
  { name: "Adidas Predator Elite FG", brand: "Adidas", category: "giay-da-bong", type: "FG", price: 3_300_000, oldPrice: 4_109_000, colors: ["fb-red", "fb-turf"], shapes: ["be-it", "be-vua"], isNew: true, best: true, material: "Da tổng hợp Hybridtouch 2.0, vân Strikeskin", highlight: "kiểm soát bóng và sút xoáy vượt trội" },
  { name: "Adidas Predator League TF", brand: "Adidas", category: "giay-da-bong", type: "TF", price: 1_890_000, oldPrice: 2_300_000, colors: ["fb-turf", "fb-red"], shapes: ["be-it", "be-vua"], material: "Da tổng hợp phủ vân cao su", highlight: "bám sân cỏ nhân tạo ổn định" },
  { name: "Adidas F50 Elite FG", brand: "Adidas", category: "giay-da-bong", type: "FG", price: 3_900_000, colors: ["fb-blue", "fb-volt"], shapes: ["thon", "be-it"], isNew: true, material: "Fiberskin siêu mỏng, đế Sprintframe 360", highlight: "tốc độ bứt phá tối đa" },
  { name: "Adidas F50 League IC", brand: "Adidas", category: "giay-da-bong", type: "IC", price: 1_650_000, oldPrice: 2_000_000, colors: ["fb-futsal"], shapes: ["thon", "be-it"], material: "Vải dệt tổng hợp, đế cao su non", highlight: "linh hoạt trên sân futsal" },
  { name: "Adidas Copa Pure 2 Elite SG", brand: "Adidas", category: "giay-da-bong", type: "SG", price: 3_500_000, colors: ["fb-white-gold"], shapes: ["be-vua", "be-nhieu"], material: "Da bò Fusionskin mềm mại", highlight: "cảm giác bóng chân thật" },
  { name: "Nike Mercurial Superfly 10 Elite FG", brand: "Nike", category: "giay-da-bong", type: "FG", price: 5_990_000, oldPrice: 6_890_000, colors: ["fb-volt", "fb-blue"], shapes: ["thon"], best: true, material: "Vaporposite+, cổ thun Flyknit", highlight: "tốc độ và cảm giác ôm chân" },
  { name: "Nike Mercurial Vapor 16 Academy TF", brand: "Nike", category: "giay-da-bong", type: "TF", price: 2_190_000, colors: ["fb-turf", "fb-red"], shapes: ["thon", "be-it"], isNew: true, material: "Da tổng hợp mềm, đệm Zoom Air", highlight: "bứt tốc trên sân 5–7 người" },
  { name: "Nike Phantom GX 2 Elite AG", brand: "Nike", category: "giay-da-bong", type: "AG", price: 5_490_000, colors: ["fb-red"], shapes: ["be-it", "be-vua"], material: "Gripknit bám bóng, đinh AG-Pro", highlight: "chính xác trong từng đường chuyền" },
  { name: "Nike Phantom Luna 2 Academy IC", brand: "Nike", category: "giay-da-bong", type: "IC", price: 1_990_000, oldPrice: 2_390_000, colors: ["fb-futsal", "fb-turf"], shapes: ["be-it"], material: "Da tổng hợp Gripknit, đế cao su", highlight: "đổi hướng nhanh trên sân trong nhà" },
  { name: "Nike Tiempo Legend 10 Elite SG", brand: "Nike", category: "giay-da-bong", type: "SG", price: 4_990_000, colors: ["fb-white-gold"], shapes: ["be-vua", "be-nhieu"], material: "Da FlyTouch Plus siêu mềm", highlight: "êm ái, bền bỉ cho sân cỏ mềm" },
  { name: "Puma Future 8 Ultimate FG", brand: "Puma", category: "giay-da-bong", type: "FG", price: 4_290_000, oldPrice: 5_290_000, colors: ["fb-blue"], shapes: ["be-it", "be-vua"], isNew: true, material: "FUZIONFIT360 co giãn đa chiều", highlight: "sáng tạo và tự do di chuyển" },
  { name: "Puma Ultra 5 Match TF", brand: "Puma", category: "giay-da-bong", type: "TF", price: 1_590_000, colors: ["fb-volt", "fb-turf"], shapes: ["thon"], material: "ULTRAWEAVE nhẹ, đế cao su TF", highlight: "siêu nhẹ cho cầu thủ tốc độ" },
  { name: "Mizuno Morelia Neo IV Beta Japan FG", brand: "Mizuno", category: "giay-da-bong", type: "FG", price: 6_990_000, colors: ["fb-white-gold"], shapes: ["be-vua", "be-nhieu"], best: true, material: "Da Kangaroo cao cấp, sản xuất tại Nhật", highlight: "cảm giác bóng đỉnh cao, form rộng" },
  { name: "Mizuno Monarcida Neo III Select AG", brand: "Mizuno", category: "giay-da-bong", type: "AG", price: 1_890_000, oldPrice: 2_190_000, colors: ["fb-blue", "fb-white-gold"], shapes: ["be-nhieu"], material: "Da tổng hợp mềm, form Wide", highlight: "thoải mái cho bàn chân bè" },
  { name: "Asics DS Light X-Fly Pro 2 AG", brand: "Asics", category: "giay-da-bong", type: "AG", price: 4_590_000, colors: ["fb-white-gold", "fb-red"], shapes: ["be-vua", "be-nhieu"], isNew: true, material: "Da Kangaroo, đệm FlyteFoam", highlight: "nhẹ, êm và bền" },
  { name: "Kamito TA11 TF", brand: "Kamito", category: "giay-da-bong", type: "TF", price: 690_000, oldPrice: 850_000, colors: ["fb-red", "fb-turf", "fb-blue"], shapes: ["be-vua", "be-nhieu"], best: true, material: "Da PU cao cấp, đế cao su khâu", highlight: "giá tốt, bền bỉ cho sân phủi" },
  { name: "Zocker Inspire Pro TF", brand: "Zocker", category: "giay-da-bong", type: "TF", price: 590_000, colors: ["fb-turf", "fb-volt"], shapes: ["be-it", "be-vua", "be-nhieu"], material: "Da microfiber, đế cao su chống trơn", highlight: "lựa chọn kinh tế cho sân phủi" },
  { name: "Joma Top Flex IC", brand: "Joma", category: "giay-da-bong", type: "IC", price: 1_290_000, colors: ["fb-futsal"], shapes: ["be-vua", "be-nhieu"], material: "Da thật mềm, đế cao su non", highlight: "huyền thoại sân futsal" },

  // Giày bóng rổ (14)
  { name: "Nike LeBron 22", brand: "Nike", category: "giay-bong-ro", type: "Indoor", price: 5_290_000, colors: ["bb-purple", "bb-black-gold"], shapes: ["be-vua", "be-nhieu"], isNew: true, material: "Lưới kỹ thuật, đệm Zoom Air full-length", highlight: "sức mạnh và độ êm tối đa", sizeRange: ["39", "47"] },
  { name: "Nike Giannis Freak 6", brand: "Nike", category: "giay-bong-ro", type: "Outdoor", price: 2_790_000, oldPrice: 3_290_000, colors: ["bb-grey"], shapes: ["be-vua", "be-nhieu"], material: "Vải dệt bền, đế cao su XDR", highlight: "bền bỉ trên sân xi măng", sizeRange: ["39", "47"] },
  { name: "Nike Sabrina 2", brand: "Nike", category: "giay-bong-ro", type: "Indoor", price: 3_290_000, colors: ["bb-white-blue"], shapes: ["thon", "be-it"], material: "Lưới nhẹ, đệm Cushlon 3.0", highlight: "nhẹ và nhạy cho hậu vệ", sizeRange: ["36", "45"] },
  { name: "Jordan Air Jordan 39", brand: "Jordan", category: "giay-bong-ro", type: "Indoor", price: 5_590_000, colors: ["bb-red", "bb-black-gold"], shapes: ["be-it", "be-vua"], isNew: true, best: true, material: "Jumpweave, đệm ZoomX", highlight: "bật nhảy bùng nổ", sizeRange: ["39", "47"] },
  { name: "Jordan Luka 3", brand: "Jordan", category: "giay-bong-ro", type: "Outdoor", price: 3_590_000, oldPrice: 3_990_000, colors: ["bb-black-gold", "bb-grey"], shapes: ["be-vua", "be-nhieu"], material: "Lưới tổng hợp, đệm Formula 23", highlight: "ổn định khi đổi hướng", sizeRange: ["39", "47"] },
  { name: "Jordan Tatum 3", brand: "Jordan", category: "giay-bong-ro", type: "Indoor", price: 3_390_000, colors: ["bb-white-blue"], shapes: ["be-it"], material: "Upper siêu nhẹ, đệm Zoom Air", highlight: "nhẹ nhất dòng Jordan", sizeRange: ["38", "46"] },
  { name: "Anta KAI 1", brand: "Anta", category: "giay-bong-ro", type: "Indoor", price: 3_190_000, colors: ["bb-purple", "bb-black-gold"], shapes: ["be-vua"], isNew: true, material: "Lưới dệt, đệm Nitroedge", highlight: "phản hồi nhanh cho cầu thủ sáng tạo", sizeRange: ["39", "46"] },
  { name: "Anta KT10", brand: "Anta", category: "giay-bong-ro", type: "Outdoor", price: 3_890_000, oldPrice: 4_290_000, colors: ["bb-grey"], shapes: ["be-it", "be-vua"], material: "Upper tổng hợp, đế cao su chịu mài mòn", highlight: "bám sân outdoor tuyệt vời", sizeRange: ["39", "47"] },
  { name: "Li-Ning Way of Wade 11", brand: "Li-Ning", category: "giay-bong-ro", type: "Indoor", price: 4_990_000, colors: ["bb-black-gold", "bb-red"], shapes: ["be-vua", "be-nhieu"], best: true, material: "Upper dệt, đệm Boom + tấm carbon", highlight: "đệm êm nảy hàng đầu", sizeRange: ["39", "47"] },
  { name: "Li-Ning Yushuai 18", brand: "Li-Ning", category: "giay-bong-ro", type: "Outdoor", price: 2_390_000, colors: ["bb-red"], shapes: ["be-vua", "be-nhieu"], material: "Lưới tổng hợp, đế cao su dày", highlight: "bền và giá hợp lý", sizeRange: ["39", "46"] },
  { name: "Adidas Harden Vol. 9", brand: "Adidas", category: "giay-bong-ro", type: "Indoor", price: 3_990_000, oldPrice: 4_500_000, colors: ["bb-white-blue", "bb-grey"], shapes: ["be-vua"], material: "Upper dệt, đệm Lightstrike + Boost", highlight: "kiểm soát nhịp step-back", sizeRange: ["39", "47"] },
  { name: "Adidas Dame 9", brand: "Adidas", category: "giay-bong-ro", type: "Outdoor", price: 2_590_000, colors: ["bb-red"], shapes: ["be-it", "be-vua"], material: "Upper tổng hợp, đệm Bounce Pro", highlight: "êm ái cho mọi mặt sân", sizeRange: ["39", "46"] },
  { name: "Under Armour Curry 12", brand: "Under Armour", category: "giay-bong-ro", type: "Indoor", price: 4_490_000, colors: ["bb-white-blue", "bb-purple"], shapes: ["thon", "be-it"], material: "Warp upper, đệm UA Flow", highlight: "bám sân không cần đế cao su", sizeRange: ["38", "46"] },
  { name: "Peak Taichi Flash 3", brand: "Peak", category: "giay-bong-ro", type: "Outdoor", price: 1_790_000, oldPrice: 2_190_000, colors: ["bb-grey", "bb-black-gold"], shapes: ["be-vua", "be-nhieu"], material: "Lưới tổng hợp, đệm Taichi thông minh", highlight: "đệm tự thích ứng lực", sizeRange: ["39", "46"] },

  // Balo (8)
  { name: "Balo Nike Brasilia 9.5", brand: "Nike", category: "balo", price: 890_000, colors: ["bp-black", "bp-navy"], material: "Polyester 600D chống nước", highlight: "ngăn đựng giày riêng biệt" },
  { name: "Balo Nike Academy Team", brand: "Nike", category: "balo", price: 1_090_000, oldPrice: 1_290_000, colors: ["bp-red", "bp-black"], best: true, material: "Polyester bền, đáy chống thấm", highlight: "túi lưới đựng bóng tiện lợi" },
  { name: "Balo Nike Elite Pro Basketball", brand: "Nike", category: "balo", price: 1_990_000, colors: ["bp-black", "bp-grey"], isNew: true, material: "Vải phủ TPU chống nước", highlight: "ngăn laptop và ngăn giày thoáng khí" },
  { name: "Balo Adidas Classic Badge of Sport", brand: "Adidas", category: "balo", price: 790_000, colors: ["bp-navy", "bp-grey"], material: "Polyester tái chế", highlight: "gọn nhẹ cho đi học, đi tập" },
  { name: "Balo Adidas Tiro League", brand: "Adidas", category: "balo", price: 1_190_000, oldPrice: 1_450_000, colors: ["bp-black", "bp-red"], material: "Polyester tái chế 100%", highlight: "ngăn đáy đựng giày bóng đá" },
  { name: "Balo Puma Phase", brand: "Puma", category: "balo", price: 650_000, colors: ["bp-grey", "bp-navy"], material: "Polyester nhẹ", highlight: "thiết kế tối giản, giá tốt" },
  { name: "Balo Puma teamGOAL Premium", brand: "Puma", category: "balo", price: 1_390_000, colors: ["bp-red", "bp-black"], isNew: true, material: "Polyester cao cấp, quai đeo đệm mút", highlight: "rộng rãi cho cả đội" },
  { name: "Balo Jordan Jumpman Collector", brand: "Jordan", category: "balo", price: 1_590_000, colors: ["bp-black", "bp-red"], best: true, material: "Vải dù cao cấp", highlight: "phong cách đường phố đậm chất Jordan" },
];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const BASE_DATE = Date.UTC(2026, 9, 10);

function buildProduct(seed: Seed, index: number): Product {
  const id = `sp${String(index + 1).padStart(3, "0")}`;
  const isShoe = seed.category !== "balo";
  const [from, to] = seed.sizeRange ?? ["35", "46"];
  const sizeList = isShoe ? ALL_SIZES.slice(ALL_SIZES.indexOf(from), ALL_SIZES.indexOf(to) + 1) : [];

  const sizes = sizeList.map((size) => ({ size, inStock: hash(id + size) % 4 !== 0 }));

  const storesBySize: Record<string, string[]> = {};
  for (const { size, inStock } of sizes) {
    if (!inStock) continue;
    const stores = STORES.filter((s) => hash(id + size + s.id) % 3 !== 0).map((s) => s.id);
    storesBySize[size] = stores.length ? stores : [STORES[hash(id + size) % STORES.length].id];
  }

  const colors = seed.colors.map((key) => COLORS[key]);
  const daysAgo = seed.isNew ? (hash(id) % 14) + 1 : 20 + (hash(id) % 300);
  const typeLong = seed.type ? SHOE_TYPE_LONG[seed.type] : CATEGORY_LABELS.balo;

  const specs = [
    { label: "Thương hiệu", value: seed.brand },
    { label: "Danh mục", value: CATEGORY_LABELS[seed.category] },
    ...(seed.type ? [{ label: "Loại giày", value: typeLong }] : []),
    { label: "Chất liệu", value: seed.material },
    { label: "Màu sắc", value: colors.map((c) => c.name).join(", ") },
    ...(isShoe ? [{ label: "Size", value: `${sizeList[0]} – ${sizeList[sizeList.length - 1]} (size Việt Nam)` }] : [{ label: "Dung tích", value: `${20 + (hash(id) % 15)} lít` }]),
    { label: "Bảo hành", value: "6 tháng (keo, chỉ)" },
    { label: "Tình trạng", value: "Hàng chính hãng 100%, mới nguyên hộp" },
  ];

  const description = isShoe
    ? `${seed.name} là mẫu ${typeLong.toLowerCase()} chính hãng của ${seed.brand}, nổi bật với khả năng ${seed.highlight}. Phần upper làm từ ${seed.material.toLowerCase()} mang lại cảm giác ôm chân, thoáng khí và bền bỉ qua nhiều trận đấu. Đế giày được thiết kế tối ưu cho mặt sân tương ứng, giúp bạn tự tin bứt tốc, đổi hướng và giữ thăng bằng. SHOESPORT cam kết hàng chính hãng 100%, bảo hành keo chỉ 6 tháng và hỗ trợ đổi size trong 7 ngày.`
    : `${seed.name} là mẫu balo thể thao chính hãng của ${seed.brand} với điểm nhấn ${seed.highlight}. Chất liệu ${seed.material.toLowerCase()} giúp bảo vệ đồ dùng khỏi mưa nắng, quai đeo có đệm êm vai, phù hợp cho cả đi học, đi làm và ra sân tập luyện. SHOESPORT cam kết hàng chính hãng 100% và hỗ trợ đổi trả trong 15 ngày.`;

  return {
    id,
    sku: `SS-${seed.brand.slice(0, 3).toUpperCase()}-${String(hash(id) % 100000).padStart(5, "0")}`,
    slug: slugify(seed.name),
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    shoeType: seed.type,
    price: seed.price,
    oldPrice: seed.oldPrice,
    images: colors.map((c) => c.image),
    colors,
    sizes,
    footShapes: seed.shapes ?? [],
    description,
    specs,
    isNew: Boolean(seed.isNew),
    isBestSeller: Boolean(seed.best),
    soldCount: (seed.best ? 800 : 40) + (hash(id + "sold") % 600),
    createdAt: new Date(BASE_DATE - daysAgo * 86_400_000).toISOString(),
    storesBySize,
    storeIds: isShoe ? [] : STORES.filter((s) => hash(id + s.id) % 3 !== 0).map((s) => s.id),
  };
}

export const PRODUCTS: Product[] = SEEDS.map(buildProduct);

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string) {
  return BY_SLUG.get(slug);
}

export function getProductById(id: string) {
  return BY_ID.get(id);
}

export function getBestSellers(limit = 4) {
  return [...PRODUCTS].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
    .map((p) => ({
      p,
      score: (p.brand === product.brand ? 2 : 0) + (p.shoeType === product.shoeType ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.p.soldCount - a.p.soldCount)
    .slice(0, limit)
    .map(({ p }) => p);
}
