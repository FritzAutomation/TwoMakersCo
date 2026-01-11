import { ProductGridSkeleton } from "@/components/Skeleton";

export default function ShopLoading() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
        <div className="h-10 w-32 bg-brown/10 rounded animate-pulse mb-8" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
