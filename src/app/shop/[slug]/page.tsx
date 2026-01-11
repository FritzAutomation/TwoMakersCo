import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug } from "@/lib/supabase/products";
import ProductDetail from "./ProductDetail";

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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
