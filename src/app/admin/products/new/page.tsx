import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-27 font-bold text-brown mb-8">Add New Product</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <ProductForm />
      </div>
    </div>
  );
}
