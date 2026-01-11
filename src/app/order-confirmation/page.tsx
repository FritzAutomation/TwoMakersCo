import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface OrderConfirmationProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationProps) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();

  // Fetch order details
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  // Fetch order items
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-35 font-extrabold text-brown mb-2">
            Order Confirmed!
          </h1>
          <p className="text-16 text-brown/70">
            Thank you for your order. We&apos;ll send a confirmation to{" "}
            <span className="font-medium">{order.email}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg border border-brown/10 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-19 font-semibold text-brown">Order Details</h2>
            <span className="text-14 text-brown/60">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-6">
            {items?.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-16 text-brown">
                  {item.product_name} × {item.quantity}
                </span>
                <span className="text-16 text-brown">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-brown/10 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-16 text-brown">Subtotal</span>
              <span className="text-16 text-brown">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-16 text-brown">Shipping</span>
              <span className="text-16 text-brown">
                {order.shipping_cost === 0
                  ? "Free"
                  : formatPrice(order.shipping_cost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-16 text-brown">Tax</span>
              <span className="text-16 text-brown">
                {formatPrice(order.tax)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-brown/10">
              <span className="text-19 font-semibold text-brown">Total</span>
              <span className="text-19 font-semibold text-brown">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg border border-brown/10 p-6 mb-8">
          <h2 className="text-19 font-semibold text-brown mb-4">
            Shipping Address
          </h2>
          <address className="text-16 text-brown not-italic">
            {order.shipping_name}
            <br />
            {order.shipping_address}
            <br />
            {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
          </address>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Link
            href="/shop"
            className="text-16 inline-block bg-brown text-cream font-semibold px-8 py-3 rounded hover:bg-brown/90 transition-colors"
          >
            Continue Shopping
          </Link>
          <p className="text-14 text-brown/60">
            Questions? Contact us at{" "}
            <a
              href="mailto:twomakerscompany@gmail.com"
              className="text-brown hover:underline"
            >
              twomakerscompany@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
