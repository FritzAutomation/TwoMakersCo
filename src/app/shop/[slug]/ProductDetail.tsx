"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import WishlistButton from "@/components/WishlistButton";
import ImageGallery from "@/components/ImageGallery";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { Product } from "@/lib/supabase/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Track this product as recently viewed
  useEffect(() => {
    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
    });
  }, [product.id, product.name, product.slug, product.price, product.image_url, addToRecentlyViewed]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        slug: product.slug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inStock = product.stock > 0;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
        <Link
          href="/shop"
          className="text-16 text-brown/70 hover:text-brown transition-colors inline-flex items-center gap-2 mb-6"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ImageGallery
            mainImage={product.image_url}
            images={product.images}
            productName={product.name}
          />

          <div className="flex flex-col">
            <h1 className="text-27 lg:text-35 font-extrabold text-brown mb-2">
              {product.name}
            </h1>

            <p className="text-22 lg:text-27 font-semibold text-brown mb-6">
              {formattedPrice}
            </p>

            {product.description && (
              <p className="text-16 lg:text-19 text-brown/80 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {product.details && (
              <div className="mb-6">
                <h2 className="text-16 font-semibold text-brown mb-2">Details</h2>
                <p className="text-14 lg:text-16 text-brown/70 leading-relaxed whitespace-pre-line">
                  {product.details}
                </p>
              </div>
            )}

            <div className="mb-6">
              {inStock ? (
                <span className="text-14 text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-14 text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {inStock && (
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-16 text-brown font-medium">Qty:</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-brown/30 rounded-l text-brown hover:bg-brown/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center border-t border-b border-brown/30 text-brown font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center border border-brown/30 rounded-r text-brown hover:bg-brown/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded font-semibold transition-colors ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-brown text-cream hover:bg-brown/90"
                  }`}
                >
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>

                <WishlistButton productId={product.id} variant="button" />
              </div>
            )}

            {!inStock && (
              <div className="mb-6">
                <WishlistButton productId={product.id} variant="button" />
              </div>
            )}

            <Link
              href="/cart"
              className="text-16 text-brown hover:underline inline-flex items-center gap-2"
            >
              View Cart →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
