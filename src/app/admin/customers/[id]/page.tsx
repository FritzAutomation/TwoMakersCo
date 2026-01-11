import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdmin, getCustomerById, getCustomerOrders } from "@/lib/supabase/admin";

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const adminAccess = await isAdmin();
  if (!adminAccess) {
    redirect("/login?error=unauthorized");
  }

  const { id } = await params;
  const [customer, orders] = await Promise.all([
    getCustomerById(id),
    getCustomerOrders(id),
  ]);

  if (!customer) {
    notFound();
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

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

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <Link
        href="/admin/customers"
        className="text-14 text-brown/70 hover:text-brown mb-4 inline-block"
      >
        ← Back to Customers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-brown/10 p-6">
            <h1 className="text-22 font-bold text-brown mb-4">
              {customer.full_name || "Customer"}
            </h1>

            <div className="space-y-3">
              <div>
                <p className="text-12 text-brown/50 uppercase tracking-wide">Email</p>
                <p className="text-16 text-brown">{customer.email}</p>
              </div>

              {customer.is_admin && (
                <div>
                  <span className="text-12 bg-brown text-cream px-2 py-1 rounded">
                    Admin User
                  </span>
                </div>
              )}

              <div>
                <p className="text-12 text-brown/50 uppercase tracking-wide">Member Since</p>
                <p className="text-16 text-brown">
                  {customer.created_at
                    ? new Date(customer.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Unknown"}
                </p>
              </div>

              <div className="pt-4 border-t border-brown/10">
                <p className="text-12 text-brown/50 uppercase tracking-wide">Total Orders</p>
                <p className="text-22 font-bold text-brown">{orders.length}</p>
              </div>

              <div>
                <p className="text-12 text-brown/50 uppercase tracking-wide">Total Spent</p>
                <p className="text-22 font-bold text-brown">{formatPrice(totalSpent)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2">
          <h2 className="text-19 font-semibold text-brown mb-4">
            Order History ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg border border-brown/10 p-8 text-center">
              <p className="text-brown/70">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-brown/10 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-14 text-brown/50">
                        {formatDate(order.created_at)}
                      </p>
                      <p className="text-12 text-brown/40 font-mono">
                        {order.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-12 px-2 py-1 rounded capitalize ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                      <p className="text-16 font-semibold text-brown">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-brown/10 pt-3">
                    <p className="text-14 text-brown/70 mb-2">
                      {order.order_items?.length || 0} item(s)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.order_items?.slice(0, 3).map((item: { id: string; product_name: string; quantity: number }) => (
                        <span
                          key={item.id}
                          className="text-12 bg-cream px-2 py-1 rounded text-brown"
                        >
                          {item.product_name} × {item.quantity}
                        </span>
                      ))}
                      {order.order_items && order.order_items.length > 3 && (
                        <span className="text-12 text-brown/50">
                          +{order.order_items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-14 text-brown hover:underline"
                    >
                      View Order Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
