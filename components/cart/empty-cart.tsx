import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart({ onContinue }: { onContinue?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="relative flex size-28 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-12 text-muted-foreground" aria-hidden strokeWidth={1.5} />
        <span className="absolute top-6 right-6 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          0
        </span>
      </div>
      <div>
        <p className="text-lg font-bold">Giỏ hàng của bạn đang trống</p>
        <p className="mt-1 text-sm text-muted-foreground">Hãy chọn cho mình đôi giày ưng ý nhé!</p>
      </div>
      <Button size="lg" className="h-12 px-8 text-base" render={<Link href="/" onClick={onContinue} />} nativeButton={false}>
        Tiếp tục mua sắm
      </Button>
    </div>
  );
}
