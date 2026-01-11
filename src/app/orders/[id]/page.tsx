"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  product?: {
    slug: string;
    image_url: string | null;
  };
}

interface Order {
  id: string;
  status: string;
  email: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetchOrder();
    }
  }, [user, authLoading, router, id]);

  const fetchOrder = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          quantity,
          price,
          product:products (slug, image_url)
        )
      `)
      .eq("id", id)
      .eq("user_id", user!.id)
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusSteps = () => {
    const steps = ["pending", "confirmed", "shipped", "delivered"];
    const currentIndex = steps.indexOf(order?.status || "");
    return steps.map((step, index) => ({
      name: step,
      completed: index <= currentIndex,
      current: step === order?.status,
    }));
  };

  if (authLoading || loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-brown/10 rounded w-32 mb-8"></div>
            <div className="h-10 bg-brown/10 rounded w-64 mb-8"></div>
            <div className="h-64 bg-brown/10 rounded mb-6"></div>
            <div className="h-48 bg-brown/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 py-12 text-center">
          <h1 className="text-27 font-bold text-brown mb-4">Order Not Found</h1>
          <p className="text-16 text-brown/70 mb-6">
            This order doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link
            href="/orders"
            className="inline-block bg-brown text-cream px-6 py-3 rounded font-semibold hover:bg-brown/90 transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-4 lg:px-6 py-12">
        <Link
          href="/orders"
          className="text-16 text-brown/70 hover:text-brown transition-colors inline-flex items-center gap-2 mb-6"
        >
          ← Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-27 lg:text-35 font-extrabold text-brown">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-16 text-brown/60">{formatDate(order.created_at)}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-16 font-medium capitalize ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        {/* Order Progress */}
        {order.status !== "cancelled" && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-19 font-semibold text-brown mb-6">Order Progress</h2>
            <div className="flex items-center justify-between">
              {getStatusSteps().map((step, index) => (
                <div key={step.name} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-brown text-cream"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.completed ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className="text-14 font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-14 mt-2 capitalize ${
                        step.current ? "font-semibold text-brown" : "text-brown/60"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        step.completed && index < getStatusSteps().findIndex(s => s.current)
                          ? "bg-brown"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-19 font-semibold text-brown mb-4">Items</h2>
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b last:border-0"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.product?.image_url ? (
                      <Image
                        src={item.product.image_url}
                        alt={item.product_name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    {item.product?.slug ? (
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-16 font-medium text-brown hover:underline"
                      >
                        {item.product_name}
                      </Link>
                    ) : (
                      <p className="text-16 font-medium text-brown">
                        {item.product_name}
                      </p>
                    )}
                    <p className="text-14 text-brown/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-16 font-medium text-brown">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-16 text-brown/70">Subtotal</span>
                <span className="text-16 text-brown">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-16 text-brown/70">Shipping</span>
                <span className="text-16 text-brown">
                  {order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-16 text-brown/70">Tax</span>
                <span className="text-16 text-brown">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-19 font-semibold text-brown">Total</span>
                <span className="text-19 font-semibold text-brown">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-19 font-semibold text-brown mb-4">Shipping Address</h2>
            <address className="text-16 text-brown/80 not-italic">
              {order.shipping_name}
              <br />
              {order.shipping_address}
              <br />
              {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
              <br />
              {order.shipping_country}
            </address>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="text-16 text-brown hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}
