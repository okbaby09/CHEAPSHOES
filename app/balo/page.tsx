import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/components/listing/product-listing";

export const metadata: Metadata = {
  title: "Balo thể thao chính hãng",
  description: "Balo thể thao Nike, Adidas, Puma, Jordan có ngăn đựng giày riêng, chống nước.",
};

export default function BackpackPage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing scope="balo" title="Balo" />
    </Suspense>
  );
}
