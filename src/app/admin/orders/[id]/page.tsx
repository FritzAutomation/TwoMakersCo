import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/supabase/admin";
import OrderStatusUpdate from "./OrderStatusUpdate";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

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
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="text-gray-500 hover:text-brown transition-colors"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-27 font-bold text-brown">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-16 text-gray-600">{formatDate(order.created_at)}</p>
        </div>
        <OrderStatusUpdate orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-19 font-semibold text-brown mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.order_items?.map((item: { id: string; product_name: string; quantity: number; price: number }) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="text-16 font-medium text-brown">
                    {item.product_name}
                  </p>
                  <p className="text-14 text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-16 text-brown">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-16 text-gray-600">Subtotal</span>
              <span className="text-16 text-brown">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-16 text-gray-600">Shipping</span>
              <span className="text-16 text-brown">
                {order.shipping_cost === 0
                  ? "Free"
                  : formatPrice(order.shipping_cost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-16 text-gray-600">Tax</span>
              <span className="text-16 text-brown">
                {formatPrice(order.tax)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-19 font-semibold text-brown">Total</span>
              <span className="text-19 font-semibold text-brown">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-19 font-semibold text-brown mb-4">Customer</h2>
            <p className="text-16 text-brown">{order.shipping_name}</p>
            <a
              href={`mailto:${order.email}`}
              className="text-16 text-blue-600 hover:underline"
            >
              {order.email}
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-19 font-semibold text-brown mb-4">
              Shipping Address
            </h2>
            <address className="text-16 text-brown not-italic">
              {order.shipping_name}
              <br />
              {order.shipping_address}
              <br />
              {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
              <br />
              {order.shipping_country}
            </address>
          </div>

          {order.square_payment_id && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-19 font-semibold text-brown mb-4">Payment</h2>
              <p className="text-14 text-gray-600">Square Payment ID:</p>
              <p className="text-14 font-mono text-brown">
                {order.square_payment_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
