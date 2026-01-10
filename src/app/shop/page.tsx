import ProductCard from "@/components/ProductCard";

// Placeholder products - will be replaced with Supabase data
const products = [
  { id: "1", name: "Product Name", price: 2500, slug: "product-1" },
  { id: "2", name: "Product Name", price: 3000, slug: "product-2" },
  { id: "3", name: "Product Name", price: 1500, slug: "product-3" },
  { id: "4", name: "Product Name", price: 2000, slug: "product-4" },
  { id: "5", name: "Product Name", price: 3500, slug: "product-5" },
  { id: "6", name: "Product Name", price: 1800, slug: "product-6" },
];

export default function ShopPage() {
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
