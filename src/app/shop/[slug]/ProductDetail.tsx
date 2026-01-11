"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/supabase/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
        <Link
          href="/shop"
          className="text-16 text-brown/70 hover:text-brown transition-colors inline-flex items-center gap-2 mb-6"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={600}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-transparent" />
                <div className="absolute top-8 left-16 w-32 h-12 bg-white/80 rounded-full blur-sm" />
                <div className="absolute bottom-0 left-0 right-0 h-3/4">
                  <div className="absolute bottom-0 left-[-20%] w-[70%] h-full bg-green-400 rounded-t-full" />
                  <div className="absolute bottom-0 right-[-10%] w-[60%] h-[90%] bg-green-500 rounded-t-full" />
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-white/50 text-lg font-medium">
                  Product Image
                </span>
              </div>
            )}
          </div>

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
