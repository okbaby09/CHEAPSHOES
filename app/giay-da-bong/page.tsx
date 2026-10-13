import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/components/listing/product-listing";

export const metadata: Metadata = {
  title: "Giày đá bóng chính hãng",
  description: "Giày đá bóng Adidas, Nike, Puma, Mizuno, Kamito... đủ loại đinh AG, FG, SG, TF và giày futsal IC.",
};

export default function FootballPage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing scope="giay-da-bong" title="Giày đá bóng" />
    </Suspense>
  );
}
