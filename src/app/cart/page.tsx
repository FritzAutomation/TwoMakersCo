"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal / 100);

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
          <h1 className="text-27 lg:text-35 font-extrabold text-brown mb-8">
            Shopping Cart
          </h1>
          <p className="text-16 text-brown font-normal mb-8">Your cart is empty.</p>
          <Link
            href="/shop"
            className="text-16 inline-block bg-brown text-cream font-semibold px-8 py-3 rounded hover:bg-brown/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 lg:py-12">
        <h1 className="text-27 lg:text-35 font-extrabold text-brown mb-6 lg:mb-8">
          Shopping Cart
        </h1>

        <div className="space-y-4 lg:space-y-6">
          {items.map((item) => {
            const itemTotal = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format((item.price * item.quantity) / 100);

            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-brown/10"
              >
                {/* Mobile Layout */}
                <div className="flex gap-4 lg:hidden">
                  {/* Product Image */}
                  <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded overflow-hidden bg-gradient-to-br from-green-200 to-green-400" />
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    {/* Name and Remove */}
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/shop/${item.slug}`}>
                        <h3 className="text-16 font-semibold text-brown hover:underline line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brown/60 hover:text-brown transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                        >
                          -
                        </button>
                        <span className="text-brown font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-16 font-semibold text-brown">{itemTotal}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-center gap-6">
                  {/* Product Image */}
                  <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded overflow-hidden bg-gradient-to-br from-green-200 to-green-400" />
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/shop/${item.slug}`}>
                      <h3 className="text-19 font-semibold text-brown hover:underline">{item.name}</h3>
                    </Link>
                    <p className="text-16 text-brown/70 font-normal">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price / 100)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="text-brown font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[80px]">
                    <p className="text-17 font-normal text-brown">{itemTotal}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-brown/60 hover:text-brown transition-colors"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtotal and Checkout */}
        <div className="mt-6 lg:mt-8 flex flex-col items-center lg:items-end gap-4">
          <div className="flex items-center gap-4">
            <span className="text-14 font-semibold text-brown">Subtotal</span>
            <span className="text-22 lg:text-27 font-bold text-brown">
              {formattedSubtotal}
            </span>
          </div>
          <Link
            href="/checkout"
            className="text-16 bg-brown text-cream font-semibold px-12 py-3 rounded hover:bg-brown/90 transition-colors inline-block w-full lg:w-auto text-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
