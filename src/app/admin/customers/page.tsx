import Link from "next/link";
import { isAdmin, getAllCustomers, getGuestCustomers } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const adminAccess = await isAdmin();
  if (!adminAccess) {
    redirect("/login?error=unauthorized");
  }

  const [customers, guests] = await Promise.all([
    getAllCustomers(),
    getGuestCustomers(),
  ]);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-6">Customers</h1>

      {/* Registered Customers */}
      <div className="mb-10">
        <h2 className="text-22 font-semibold text-brown mb-4">
          Registered Customers ({customers.length})
        </h2>

        {customers.length === 0 ? (
          <div className="bg-white rounded-lg border border-brown/10 p-8 text-center">
            <p className="text-brown/70">No registered customers yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-brown/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-cream border-b border-brown/10">
                <tr>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Email
                  </th>
                  <th className="text-center px-6 py-3 text-14 font-semibold text-brown">
                    Orders
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-brown">
                    Total Spent
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Last Order
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-brown">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown/10">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-cream/50">
                    <td className="px-6 py-4 text-16 text-brown">
                      {customer.full_name || "—"}
                      {customer.is_admin && (
                        <span className="ml-2 text-12 bg-brown text-cream px-2 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown/70">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown text-center">
                      {customer.order_count}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown text-right">
                      {formatPrice(customer.total_spent)}
                    </td>
                    <td className="px-6 py-4 text-14 text-brown/70">
                      {formatDate(customer.last_order_date)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="text-14 text-brown hover:underline"
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

      {/* Guest Customers */}
      <div>
        <h2 className="text-22 font-semibold text-brown mb-4">
          Guest Checkouts ({guests.length})
        </h2>

        {guests.length === 0 ? (
          <div className="bg-white rounded-lg border border-brown/10 p-8 text-center">
            <p className="text-brown/70">No guest checkouts yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-brown/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-cream border-b border-brown/10">
                <tr>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Email
                  </th>
                  <th className="text-center px-6 py-3 text-14 font-semibold text-brown">
                    Orders
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-brown">
                    Total Spent
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-brown">
                    Last Order
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-brown">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown/10">
                {guests.map((guest) => (
                  <tr key={guest.email} className="hover:bg-cream/50">
                    <td className="px-6 py-4 text-16 text-brown">
                      {guest.name}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown/70">
                      {guest.email}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown text-center">
                      {guest.order_count}
                    </td>
                    <td className="px-6 py-4 text-16 text-brown text-right">
                      {formatPrice(guest.total_spent)}
                    </td>
                    <td className="px-6 py-4 text-14 text-brown/70">
                      {formatDate(guest.last_order_date)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/customers/guest/${encodeURIComponent(guest.email)}`}
                        className="text-14 text-brown hover:underline"
                      >
                        View Orders
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
