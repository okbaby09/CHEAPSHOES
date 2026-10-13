export type Category = "giay-da-bong" | "giay-bong-ro" | "balo";
export type CategoryScope = Category | "all";

export type FootballType = "AG" | "FG" | "SG" | "TF" | "IC";
export type BasketballType = "Indoor" | "Outdoor";
export type ShoeType = FootballType | BasketballType;

export type FootShape = "thon" | "be-it" | "be-vua" | "be-nhieu";

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hotline: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  shoeType?: ShoeType;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  footShapes: FootShape[];
  description: string;
  specs: { label: string; value: string }[];
  isNew: boolean;
  isBestSeller: boolean;
  soldCount: number;
  createdAt: string;
  storesBySize: Record<string, string[]>;
  storeIds: string[];
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
}
