interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-brown/10 rounded ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-square w-full rounded-lg mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
        <Skeleton className="h-4 w-24 mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton className="aspect-square w-full rounded-lg" />

          <div className="flex flex-col">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/4 mb-6" />
            <Skeleton className="h-20 w-full mb-6" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-5 w-32 mb-6" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-5 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function DashboardSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-40 rounded-lg" />
    </div>
  );
}
