import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/components/listing/product-listing";

export default function HomePage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing scope="all" title="Tất cả sản phẩm" />
    </Suspense>
  );
}
