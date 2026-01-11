"use client";

import Link from "next/link";
import Image from "next/image";
import { useRecentlyViewed, type RecentlyViewedItem } from "@/hooks/useRecentlyViewed";

interface RecentlyViewedProps {
  excludeProductId?: string;
  limit?: number;
  title?: string;
}

export default function RecentlyViewed({
  excludeProductId,
  limit = 4,
  title = "Recently Viewed",
}: RecentlyViewedProps) {
  const { items, isLoaded } = useRecentlyViewed();

  // Filter out current product and limit
  const displayItems = items
    .filter((item) => item.id !== excludeProductId)
    .slice(0, limit);

  if (!isLoaded || displayItems.length === 0) {
    return null;
  }

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <section className="mt-12 pt-12 border-t border-brown/10">
      <h2 className="text-22 lg:text-27 font-bold text-brown mb-6">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {displayItems.map((item: RecentlyViewedItem) => (
          <Link key={item.id} href={`/shop/${item.slug}`} className="group">
            <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10 mb-3">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-14">No Image</span>
                </div>
              )}
            </div>
            <h3 className="text-16 font-medium text-brown group-hover:opacity-80 transition-opacity line-clamp-1">
              {item.name}
            </h3>
            <p className="text-16 font-semibold text-brown mt-1">
              {formatPrice(item.price)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
