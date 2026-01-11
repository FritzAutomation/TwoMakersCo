import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/supabase/products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="bg-cream">
      {/* Tagline */}
      <section className="mx-auto max-w-7xl px-6 pt-4 pb-12">
        <p className="text-22 text-brown font-medium text-center">
          We make things. 3D prints and more.
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-31 font-semibold text-brown text-center mb-10">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="text-16 inline-block bg-brown text-cream font-semibold px-8 py-3 rounded hover:bg-brown/90 transition-colors"
          >
            See what we&apos;re making...
          </Link>
        </div>
      </section>
    </div>
  );
}
