"use client";

import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  productId: string;
  variant?: "icon" | "button";
  className?: string;
}

export default function WishlistButton({
  productId,
  variant = "icon",
  className = "",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist, loading } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(productId);
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          inWishlist
            ? "border-red-500 text-red-500 bg-red-50"
            : "border-brown/30 text-brown hover:border-brown"
        } disabled:opacity-50 ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={inWishlist ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        inWishlist
          ? "text-red-500 hover:bg-red-50"
          : "text-brown/50 hover:text-brown hover:bg-brown/5"
      } disabled:opacity-50 ${className}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
