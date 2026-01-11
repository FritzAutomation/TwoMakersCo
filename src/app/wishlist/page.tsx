import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "My Wishlist",
  description: "View your saved products",
};

export default async function WishlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/wishlist");
  }

  const { data: wishlistItems } = await supabase
    .from("wishlist")
    .select("*, product:products(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const products = wishlistItems?.map((item) => item.product).filter(Boolean) || [];

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-35 font-extrabold text-brown mb-2">My Wishlist</h1>
        <p className="text-19 text-brown/70 mb-8">
          {products.length} {products.length === 1 ? "item" : "items"} saved
        </p>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto text-brown/30 mb-4"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h2 className="text-22 font-semibold text-brown mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-16 text-brown/70 mb-6">
              Save items you love by clicking the heart icon
            </p>
            <Link
              href="/shop"
              className="inline-block bg-brown text-cream px-8 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  imageUrl={product.image_url}
                  variant="shop"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
