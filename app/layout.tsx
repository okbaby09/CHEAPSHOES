import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ShopProvider } from "@/components/providers/shop-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SHOESPORT – Giày đá bóng, giày bóng rổ & balo chính hãng",
    template: "%s | SHOESPORT",
  },
  description:
    "SHOESPORT chuyên giày đá bóng, giày bóng rổ và balo thể thao chính hãng. Bảo hành 6 tháng, freeship đơn từ 1 triệu, đổi trả 15 ngày.",
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ShopProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <CartDrawer />
          <Toaster position="top-center" richColors />
        </ShopProvider>
      </body>
    </html>
  );
}
