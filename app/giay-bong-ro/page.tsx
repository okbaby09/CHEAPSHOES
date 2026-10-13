import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/components/listing/product-listing";

export const metadata: Metadata = {
  title: "Giày bóng rổ chính hãng",
  description: "Giày bóng rổ Nike, Jordan, Anta, Li-Ning, Adidas, Under Armour, Peak cho sân trong nhà và ngoài trời.",
};

export default function BasketballPage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing scope="giay-bong-ro" title="Giày bóng rổ" />
    </Suspense>
  );
}
