import ProductForm from "../ProductForm";
import { getCategories } from "@/lib/supabase/products";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-8">Add New Product</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
