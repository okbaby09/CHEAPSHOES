import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "./constants";

export type Coupon =
  | { code: string; kind: "percent"; value: number; description: string; expiresAt: string }
  | { code: string; kind: "fixed"; value: number; description: string; expiresAt: string }
  | { code: string; kind: "freeship"; description: string; expiresAt: string };

const COUPONS: Coupon[] = [
  { code: "GIAM10", kind: "percent", value: 10, description: "Giảm 10% giá trị đơn hàng", expiresAt: "2027-12-31" },
  { code: "GIAM200K", kind: "fixed", value: 200_000, description: "Giảm 200.000₫", expiresAt: "2027-12-31" },
  { code: "FREESHIP", kind: "freeship", description: "Miễn phí vận chuyển", expiresAt: "2027-12-31" },
  { code: "TET2025", kind: "percent", value: 20, description: "Giảm 20% dịp Tết 2025", expiresAt: "2025-02-15" },
];

export type CouponResult = { ok: true; coupon: Coupon } | { ok: false; error: string };

export function validateCoupon(rawCode: string): CouponResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, error: "Vui lòng nhập mã giảm giá" };
  const coupon = COUPONS.find((c) => c.code === code);
  if (!coupon) return { ok: false, error: "Mã giảm giá không hợp lệ" };
  if (new Date(coupon.expiresAt).getTime() < Date.now()) {
    return { ok: false, error: "Mã giảm giá đã hết hạn" };
  }
  return { ok: true, coupon };
}

export function calculateTotals(subtotal: number, coupon: Coupon | null) {
  let discount = 0;
  if (coupon?.kind === "percent") discount = Math.round((subtotal * coupon.value) / 100);
  if (coupon?.kind === "fixed") discount = Math.min(coupon.value, subtotal);

  const qualifiesFree = subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.kind === "freeship";
  const shipping = subtotal === 0 || qualifiesFree ? 0 : SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, total };
}
