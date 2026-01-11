import ProductCardWithWishlist from "@/components/ProductCardWithWishlist";
import ShopFilters from "@/components/ShopFilters";
import { getFilteredProducts, getCategories, type ProductFilters } from "@/lib/supabase/products";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const filters: ProductFilters = {
    category: params.category,
    search: params.search,
    sortBy: (params.sort as ProductFilters["sortBy"]) || "newest",
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
  };

  const [products, categories] = await Promise.all([
    getFilteredProducts(filters),
    getCategories(),
  ]);

  const hasActiveFilters = params.category || params.search || params.minPrice || params.maxPrice;

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-35 font-extrabold text-brown mb-2">Shop</h1>
          <p className="text-19 text-brown/70">
            Discover our handcrafted 3D printed products
          </p>
        </div>

        {/* Filters */}
        <ShopFilters
          categories={categories}
          currentCategory={params.category}
          currentSearch={params.search}
          currentSort={params.sort || "newest"}
        />

        {/* Results info */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center gap-2 text-16 text-brown/70">
            <span>
              {products.length} {products.length === 1 ? "product" : "products"} found
            </span>
            {params.search && (
              <span>for &quot;{params.search}&quot;</span>
            )}
            {params.category && (
              <span>
                in {categories.find(c => c.slug === params.category)?.name}
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-22 text-brown/70 mb-4">No products found</p>
            <p className="text-16 text-brown/50">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCardWithWishlist
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                slug={product.slug}
                imageUrl={product.image_url}
                category={product.category?.name}
                variant="shop"
              />
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="mt-12 text-center">
          <p className="text-brown/60 text-sm">
            Showing {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}
