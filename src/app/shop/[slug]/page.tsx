import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/supabase/products";
import { getProductReviews, getProductRatingStats } from "@/lib/supabase/reviews";
import ProductDetail from "./ProductDetail";
import ProductReviews from "@/components/ProductReviews";
import RelatedProducts from "@/components/RelatedProducts";
import RecentlyViewed from "@/components/RecentlyViewed";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const price = (product.price / 100).toFixed(2);

  return {
    title: product.name,
    description: product.description || `${product.name} - Handcrafted 3D printed product from Two Makers Co. $${price}`,
    openGraph: {
      title: product.name,
      description: product.description || `${product.name} - $${price}`,
      images: product.image_url ? [{ url: product.image_url, alt: product.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || `${product.name} - $${price}`,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [reviews, ratingStats, relatedProducts] = await Promise.all([
    getProductReviews(product.id),
    getProductRatingStats(product.id),
    getRelatedProducts(product.id, product.category_id),
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image_url,
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Two Makers Co",
      },
    },
    ...(ratingStats.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingStats.average,
        reviewCount: ratingStats.count,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="bg-cream min-h-screen">
        <ProductDetail product={product} />
        <div className="mx-auto max-w-7xl px-4 lg:px-6 pb-12">
          <ProductReviews
            productId={product.id}
            reviews={reviews}
            averageRating={ratingStats.average}
            reviewCount={ratingStats.count}
          />
          <RelatedProducts products={relatedProducts} />
          <RecentlyViewed excludeProductId={product.id} />
        </div>
      </div>
    </>
  );
}
