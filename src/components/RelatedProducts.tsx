import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/supabase/products";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <section className="mt-12 pt-12 border-t border-brown/10">
      <h2 className="text-22 lg:text-27 font-bold text-brown mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10 mb-3">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
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
              {product.name}
            </h3>
            <p className="text-16 font-semibold text-brown mt-1">
              {formatPrice(product.price)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
