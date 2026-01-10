"use client";

import Image from "next/image";
import { useState } from "react";

// Placeholder product - will be replaced with Supabase data
const product = {
  id: "1",
  name: "Product Name",
  price: 2500,
  slug: "product-1",
  description:
    "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
  details:
    "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
  images: [null, null, null, null], // Placeholder images
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10">
              <div className="h-full w-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                <span className="text-brown/30">Product Image</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-brown hover:bg-brown/10 rounded transition-colors"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="flex gap-2 flex-1 overflow-x-auto">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      selectedImage === index
                        ? "border-brown"
                        : "border-brown/20"
                    }`}
                  >
                    <div className="h-full w-full bg-gradient-to-br from-green-200 to-green-400" />
                  </button>
                ))}
              </div>

              <button
                className="p-2 text-brown hover:bg-brown/10 rounded transition-colors"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-brown">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-brown mt-2">
                {formattedPrice}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-brown mb-2">
                Description
              </h2>
              <p className="text-brown/80">{product.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-brown mb-2">Details</h2>
              <p className="text-brown/80">{product.details}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="text-brown mb-2 block">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors"
                >
                  -
                </button>
                <span className="text-brown font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-brown text-cream font-semibold py-3 rounded hover:bg-brown/90 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
