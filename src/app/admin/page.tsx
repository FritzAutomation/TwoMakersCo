import Link from "next/link";
import { getAdminStats } from "@/lib/supabase/admin";

export default async function AdminDashboard() {
  const { productCount, orderStats } = await getAdminStats();

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-14 text-gray-500 mb-1">Total Revenue</p>
          <p className="text-27 font-bold text-brown">
            {formatPrice(orderStats.revenue)}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-14 text-gray-500 mb-1">Total Orders</p>
          <p className="text-27 font-bold text-brown">{orderStats.total}</p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-14 text-gray-500 mb-1">Products</p>
          <p className="text-27 font-bold text-brown">{productCount}</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-14 text-gray-500 mb-1">Needs Attention</p>
          <p className="text-27 font-bold text-brown">
            {orderStats.confirmed}
          </p>
          <p className="text-14 text-gray-500">orders to ship</p>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-19 font-semibold text-brown mb-4">Order Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-22 font-bold text-yellow-700">
              {orderStats.pending}
            </p>
            <p className="text-14 text-yellow-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-22 font-bold text-blue-700">
              {orderStats.confirmed}
            </p>
            <p className="text-14 text-blue-600">Confirmed</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-22 font-bold text-purple-700">
              {orderStats.shipped}
            </p>
            <p className="text-14 text-purple-600">Shipped</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-22 font-bold text-green-700">
              {orderStats.delivered}
            </p>
            <p className="text-14 text-green-600">Delivered</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-19 font-semibold text-brown mb-2">
            Manage Products
          </h3>
          <p className="text-16 text-gray-600">
            Add, edit, or remove products from your store
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-19 font-semibold text-brown mb-2">
            Manage Orders
          </h3>
          <p className="text-16 text-gray-600">
            View orders and update their status
          </p>
        </Link>
      </div>
    </div>
  );
}
