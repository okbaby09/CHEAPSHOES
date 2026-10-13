import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { HOTLINE, HOTLINE_TEL } from "@/lib/constants";
import { STORES } from "@/lib/data/stores";

const PAYMENT_METHODS = ["COD", "Chuyển khoản", "Visa", "Mastercard", "MoMo", "ZaloPay", "VNPay"];

export function Footer() {
  return (
    <footer className="mt-16 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <section aria-labelledby="footer-store">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
            SHOE<span className="text-primary">SPORT</span>
          </Link>
          <h2 id="footer-store" className="sr-only">
            Thông tin cửa hàng
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Hệ thống bán lẻ giày đá bóng, giày bóng rổ và balo thể thao chính hãng với {STORES.length} cửa hàng trên toàn quốc.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {STORES.slice(0, 3).map((s) => (
              <li key={s.id} className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{s.address}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-return">
          <h2 id="footer-return" className="text-base font-bold text-white">
            Chính sách đổi trả
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed">
            <li>Đổi size miễn phí trong 7 ngày</li>
            <li>Đổi trả trong 15 ngày nếu lỗi nhà sản xuất</li>
            <li>Sản phẩm còn nguyên tem, hộp, chưa qua sử dụng</li>
            <li>Bảo hành keo, chỉ 6 tháng</li>
          </ul>
        </section>

        <section aria-labelledby="footer-ship">
          <h2 id="footer-ship" className="text-base font-bold text-white">
            Giao hàng & thanh toán
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed">
            <li>Miễn phí giao hàng cho đơn từ 1.000.000₫</li>
            <li>Giao nội thành 1–2 ngày, tỉnh 2–4 ngày</li>
            <li>Kiểm tra hàng trước khi thanh toán (COD)</li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Phương thức thanh toán">
            {PAYMENT_METHODS.map((m) => (
              <li key={m} className="rounded border border-neutral-700 px-2 py-1 text-xs font-medium text-neutral-200">
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="text-base font-bold text-white">
            Liên hệ
          </h2>
          <ul className="mt-3 flex flex-col gap-3 text-sm">
            <li>
              <a href={`tel:${HOTLINE_TEL}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4 text-primary" aria-hidden />
                Hotline: <span className="font-semibold text-white">{HOTLINE}</span> (8:00 – 22:00)
              </a>
            </li>
            <li>
              <a href="mailto:cskh@shoesport.vn" className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-primary" aria-hidden />
                cskh@shoesport.vn
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="border-t border-neutral-800">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-neutral-500">
          © 2026 SHOESPORT. Giày thể thao chính hãng.
        </p>
      </div>
    </footer>
  );
}
