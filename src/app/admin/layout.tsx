import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const adminAccess = await isAdmin();

  if (!adminAccess) {
    redirect("/?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-brown text-cream">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-19 font-bold">
                Admin Dashboard
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/admin/products"
                  className="text-16 hover:opacity-80 transition-opacity"
                >
                  Products
                </Link>
                <Link
                  href="/admin/customers"
                  className="text-16 hover:opacity-80 transition-opacity"
                >
                  Customers
                </Link>
                <Link
                  href="/admin/orders"
                  className="text-16 hover:opacity-80 transition-opacity"
                >
                  Orders
                </Link>
                <Link
                  href="/admin/reviews"
                  className="text-16 hover:opacity-80 transition-opacity"
                >
                  Reviews
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-14 hover:opacity-80 transition-opacity"
              >
                ← Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="md:hidden bg-brown/90 text-cream px-4 py-2 flex gap-4 overflow-x-auto">
        <Link href="/admin/products" className="text-14 hover:opacity-80 whitespace-nowrap">
          Products
        </Link>
        <Link href="/admin/customers" className="text-14 hover:opacity-80 whitespace-nowrap">
          Customers
        </Link>
        <Link href="/admin/orders" className="text-14 hover:opacity-80 whitespace-nowrap">
          Orders
        </Link>
        <Link href="/admin/reviews" className="text-14 hover:opacity-80 whitespace-nowrap">
          Reviews
        </Link>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
