import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/components/listing/product-listing";

export const metadata: Metadata = {
  title: "Tìm kiếm sản phẩm",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing scope="all" title="Tìm kiếm" isSearch />
    </Suspense>
  );
}
