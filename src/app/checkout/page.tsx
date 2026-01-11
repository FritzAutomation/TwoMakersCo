"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface ShippingForm {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [shipping, setShipping] = useState<ShippingForm>({
    email: user?.email || "",
    name: user?.user_metadata?.name || "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const shippingCost = subtotal >= 5000 ? 0 : 500; // Free shipping over $50
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shippingCost + tax;

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping,
          subtotal,
          shippingCost,
          tax,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();
      router.push(`/order-confirmation?id=${data.orderId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-35 font-extrabold text-brown mb-8">Checkout</h1>
          <p className="text-16 text-brown font-normal mb-8">
            Your cart is empty. Add some items before checking out.
          </p>
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
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-35 font-extrabold text-brown mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Form */}
          <div>
            <h2 className="text-22 font-semibold text-brown mb-6">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-16 font-medium text-brown block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shipping.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="text-16 font-medium text-brown block mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shipping.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="text-16 font-medium text-brown block mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shipping.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="text-16 font-medium text-brown block mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shipping.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                    placeholder="New York"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="text-16 font-medium text-brown block mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shipping.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                    placeholder="NY"
                    required
                    maxLength={2}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zip"
                  className="text-16 font-medium text-brown block mb-2"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={shipping.zip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                  placeholder="10001"
                  required
                  pattern="[0-9]{5}"
                />
              </div>

              {error && (
                <p className="text-14 text-red-600 font-medium">{error}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-16 w-full bg-brown text-cream font-semibold py-4 rounded hover:bg-brown/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
                </button>
              </div>

              <p className="text-14 text-brown/60 text-center">
                Demo mode - no real charges will be made
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-22 font-semibold text-brown mb-6">
              Order Summary
            </h2>

            <div className="bg-white rounded-lg border border-brown/10 p-6">
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded object-cover"
                      />
                    ) : (
                      <div className="w-15 h-15 rounded bg-gradient-to-br from-green-200 to-green-400" />
                    )}
                    <div className="flex-1">
                      <p className="text-16 font-medium text-brown">
                        {item.name}
                      </p>
                      <p className="text-14 text-brown/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-16 font-medium text-brown">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brown/10 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-16 text-brown">Subtotal</span>
                  <span className="text-16 text-brown">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-16 text-brown">Shipping</span>
                  <span className="text-16 text-brown">
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-16 text-brown">Tax</span>
                  <span className="text-16 text-brown">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-brown/10">
                  <span className="text-19 font-semibold text-brown">Total</span>
                  <span className="text-19 font-semibold text-brown">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {subtotal < 5000 && (
                <p className="text-14 text-brown/60 mt-4 text-center">
                  Add {formatPrice(5000 - subtotal)} more for free shipping!
                </p>
              )}
            </div>

            <Link
              href="/cart"
              className="text-16 text-brown hover:underline block mt-4 text-center"
            >
              ← Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
