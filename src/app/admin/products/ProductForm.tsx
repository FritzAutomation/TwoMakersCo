"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    details: string | null;
    price: number;
    image_url: string | null;
    images: string[] | null;
    is_featured: boolean;
    stock: number;
    category_id: string | null;
  };
  categories?: Category[];
}

export default function ProductForm({ product, categories = [] }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    details: product?.details || "",
    price: product ? (product.price / 100).toFixed(2) : "",
    image_url: product?.image_url || "",
    images: product?.images || [],
    is_featured: product?.is_featured || false,
    stock: product?.stock?.toString() || "0",
    category_id: product?.category_id || "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data.url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      if (url) {
        setForm((prev) => ({ ...prev, image_url: url }));
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingAdditional(true);
    setError("");

    try {
      const uploadPromises = Array.from(files).map((file) => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter((url): url is string => url !== null);

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...validUrls],
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
    } finally {
      setUploadingAdditional(false);
      if (additionalFileInputRef.current) {
        additionalFileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleReorderImages = (fromIndex: number, toIndex: number) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        details: form.details || null,
        price: Math.round(parseFloat(form.price) * 100),
        image_url: form.image_url || null,
        images: form.images.length > 0 ? form.images : null,
        is_featured: form.is_featured,
        stock: parseInt(form.stock) || 0,
        category_id: form.category_id || null,
      };

      const url = isEdit
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label
          htmlFor="name"
          className="block text-16 font-medium text-brown mb-2"
        >
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleNameChange}
          required
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
          placeholder="e.g., 3D Printed Planter"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-16 font-medium text-brown mb-2"
        >
          URL Slug *
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
          placeholder="e.g., planter-geometric"
        />
        <p className="text-14 text-gray-500 mt-1">
          Used in the URL: /shop/{form.slug || "your-slug"}
        </p>
      </div>

      <div>
        <label
          htmlFor="category_id"
          className="block text-16 font-medium text-brown mb-2"
        >
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
        >
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-16 font-medium text-brown mb-2"
          >
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
            placeholder="25.00"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-16 font-medium text-brown mb-2"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-16 font-medium text-brown mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
          placeholder="A brief description of your product..."
        />
      </div>

      <div>
        <label
          htmlFor="details"
          className="block text-16 font-medium text-brown mb-2"
        >
          Details
        </label>
        <textarea
          id="details"
          name="details"
          value={form.details}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-brown"
          placeholder="Dimensions, materials, care instructions..."
        />
      </div>

      {/* Main Product Image */}
      <div>
        <label className="block text-16 font-medium text-brown mb-2">
          Main Product Image
        </label>

        {form.image_url ? (
          <div className="relative inline-block">
            <Image
              src={form.image_url}
              alt="Product preview"
              width={200}
              height={200}
              className="rounded-lg object-cover border border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`cursor-pointer ${uploading ? "pointer-events-none" : ""}`}
            >
              <div className="text-gray-500">
                {uploading ? (
                  <span className="text-brown">Uploading...</span>
                ) : (
                  <>
                    <p className="text-16 mb-1">Click to upload main image</p>
                    <p className="text-14">JPEG, PNG, WebP, or GIF (max 5MB)</p>
                  </>
                )}
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-16 font-medium text-brown mb-2">
          Additional Images
        </label>
        <p className="text-14 text-gray-500 mb-3">
          Add more photos to show different angles or details
        </p>

        {form.images.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            {form.images.map((url, index) => (
              <div key={index} className="relative group">
                <Image
                  src={url}
                  alt={`Additional image ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full aspect-square rounded-lg object-cover border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-14"
                  title="Remove image"
                >
                  ×
                </button>
                <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReorderImages(index, index - 1)}
                      className="bg-white/90 text-brown rounded px-2 py-0.5 text-12 hover:bg-white"
                    >
                      ←
                    </button>
                  )}
                  {index < form.images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleReorderImages(index, index + 1)}
                      className="bg-white/90 text-brown rounded px-2 py-0.5 text-12 hover:bg-white"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            ref={additionalFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleAdditionalImageUpload}
            className="hidden"
            id="additional-images-upload"
            multiple
          />
          <label
            htmlFor="additional-images-upload"
            className={`cursor-pointer ${uploadingAdditional ? "pointer-events-none" : ""}`}
          >
            <div className="text-gray-500">
              {uploadingAdditional ? (
                <span className="text-brown">Uploading...</span>
              ) : (
                <p className="text-14">Click to add more images</p>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_featured"
          name="is_featured"
          checked={form.is_featured}
          onChange={handleChange}
          className="w-5 h-5 rounded border-gray-300 text-brown focus:ring-brown"
        />
        <label htmlFor="is_featured" className="text-16 text-brown">
          Featured product (show on homepage)
        </label>
      </div>

      {error && <p className="text-14 text-red-600 font-medium">{error}</p>}

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-brown text-cream px-8 py-3 rounded font-semibold hover:bg-brown/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="text-16 text-gray-600 hover:text-brown"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
