"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Placeholder cart items - will be replaced with state management
const initialCartItems = [
  { id: "1", name: "Product Name", price: 3000, quantity: 1 },
  { id: "2", name: "Product Name", price: 500, quantity: 7 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal / 100);

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-4xl font-extrabold text-brown mb-8">
            Shopping Cart
          </h1>
          <p className="text-brown/80 mb-8">Your cart is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-brown text-cream font-semibold px-8 py-3 rounded hover:bg-brown/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-extrabold text-brown mb-8">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => {
            const itemTotal = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format((item.price * item.quantity) / 100);

            return (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-4 rounded-lg border border-brown/10"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-green-200 to-green-400" />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-brown">{item.name}</h3>
                  <p className="text-brown/60 text-sm">Quantity:</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="text-brown font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center border border-brown/30 rounded text-brown hover:bg-brown/10 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[80px]">
                  <p className="font-semibold text-brown">{itemTotal}</p>
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
            );
          })}
        </div>

        {/* Subtotal and Checkout */}
        <div className="mt-8 flex flex-col items-end gap-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-brown">Subtotal</span>
            <span className="text-2xl font-bold text-brown">
              {formattedSubtotal}
            </span>
          </div>
          <button className="bg-brown text-cream font-semibold px-12 py-3 rounded hover:bg-brown/90 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
