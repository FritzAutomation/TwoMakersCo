import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// Placeholder products - will be replaced with Supabase data
const featuredProducts = [
  { id: "1", name: "Product Name", price: 2500, slug: "product-1" },
  { id: "2", name: "Product Name", price: 3000, slug: "product-2" },
  { id: "3", name: "Product Name", price: 1500, slug: "product-3" },
];

export default function Home() {
  return (
    <div className="bg-cream">
      {/* Tagline */}
      <section className="mx-auto max-w-7xl px-6 pt-4">
        <p className="text-brown font-medium">
          We make things. 3D prints and more.
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-brown text-center mb-10">
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
            className="inline-block bg-brown text-cream font-semibold px-8 py-3 rounded hover:bg-brown/90 transition-colors"
          >
            See what we&apos;re making...
          </Link>
        </div>
      </section>
    </div>
  );
}
