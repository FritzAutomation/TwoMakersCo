import Link from "next/link";
import { getAllOrders } from "@/lib/supabase/admin";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
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

  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-16 text-gray-600">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-14 font-semibold text-gray-600">
                  Total
                </th>
                <th className="text-right px-6 py-3 text-14 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-14 font-mono text-brown">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-14 text-gray-500">
                      {order.order_items?.length || 0} items
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-16 text-brown">{order.shipping_name}</p>
                    <p className="text-14 text-gray-500">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-14 text-gray-600">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-12 font-medium capitalize ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-16 font-medium text-brown">
                      {formatPrice(order.total)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-14 text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
