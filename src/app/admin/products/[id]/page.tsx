import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/supabase/products";
import ProductForm from "../ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const [{ data: product, error }, categories] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    getCategories(),
  ]);

  if (error || !product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-8">Edit Product</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
