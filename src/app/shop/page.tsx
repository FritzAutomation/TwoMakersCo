import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/supabase/products";

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              slug={product.slug}
              variant="shop"
            />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-12 text-center">
          <p className="text-brown/60 text-sm">
            Showing {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}
