"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, useShop } from "@/components/providers/shop-provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { CartLine } from "./cart-line";
import { EmptyCart } from "./empty-cart";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useShop();
  const { items, count, subtotal } = useCart();
  const close = () => setCartOpen(false);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-lg font-bold">Giỏ hàng ({count})</SheetTitle>
          <SheetDescription className="sr-only">Danh sách sản phẩm trong giỏ hàng</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center">
            <EmptyCart onContinue={close} />
          </div>
        ) : (
          <>
            <div className="border-b border-border bg-muted/50 px-5 py-3 text-sm">
              {remaining > 0 ? (
                <p>
                  Mua thêm <span className="font-bold text-primary">{formatPrice(remaining)}</span> để được miễn phí giao hàng
                </p>
              ) : (
                <p className="font-semibold text-success">Đơn hàng của bạn được miễn phí giao hàng</p>
              )}
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <CartLine key={item.key} item={item} onNavigate={close} />
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tạm tính</span>
                <span className="text-xl font-extrabold text-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="h-12 text-base" render={<Link href="/gio-hang" onClick={close} />} nativeButton={false}>
                  Xem giỏ hàng
                </Button>
                <Button size="lg" className="h-12 text-base" render={<Link href="/thanh-toan" onClick={close} />} nativeButton={false}>
                  Thanh toán
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
