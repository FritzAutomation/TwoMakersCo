import Link from "next/link";
import { getAllProducts } from "@/lib/supabase/products";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-27 font-bold text-brown">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-brown text-cream px-6 py-2 rounded font-semibold hover:bg-brown/90 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-16 text-gray-600 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-brown hover:underline"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-16 font-medium text-brown">{product.name}</p>
                    <p className="text-14 text-gray-500">{product.slug}</p>
                  </div>
                  {product.is_featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-12 font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-16 font-semibold text-brown">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className={`text-14 font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-14 text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Stock
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Featured
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-16 font-medium text-brown">
                          {product.name}
                        </p>
                        <p className="text-14 text-gray-500">{product.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-16 text-brown">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-14 font-medium ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.is_featured ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-12 font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      ) : (
                        <span className="text-14 text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-14 text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
