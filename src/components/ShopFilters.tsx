"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { Category } from "@/lib/supabase/products";

interface ShopFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSearch?: string;
  currentSort: string;
}

export default function ShopFilters({
  categories,
  currentCategory,
  currentSearch,
  currentSort,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchValue || undefined });
  };

  const clearFilters = () => {
    setSearchValue("");
    startTransition(() => {
      router.push("/shop");
    });
  };

  const hasFilters = currentCategory || currentSearch || searchParams.get("minPrice") || searchParams.get("maxPrice");

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-brown/20 bg-white focus:outline-none focus:border-brown text-brown placeholder:text-brown/50"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/50"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-brown text-cream rounded-lg font-medium hover:bg-brown/90 transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="text-16 text-brown font-medium">
            Category:
          </label>
          <select
            id="category"
            value={currentCategory || ""}
            onChange={(e) => updateFilters({ category: e.target.value || undefined })}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-brown/20 bg-white text-brown focus:outline-none focus:border-brown"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-16 text-brown font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-brown/20 bg-white text-brown focus:outline-none focus:border-brown"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            disabled={isPending}
            className="text-16 text-brown/70 hover:text-brown underline transition-colors"
          >
            Clear all filters
          </button>
        )}

        {/* Loading indicator */}
        {isPending && (
          <div className="text-14 text-brown/50">Loading...</div>
        )}
      </div>

      {/* Active Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              updateFilters({
                category: currentCategory === category.slug ? undefined : category.slug,
              })
            }
            disabled={isPending}
            className={`px-4 py-2 rounded-full text-14 font-medium transition-colors ${
              currentCategory === category.slug
                ? "bg-brown text-cream"
                : "bg-white text-brown border border-brown/20 hover:border-brown"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
