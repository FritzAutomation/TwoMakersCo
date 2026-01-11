"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function WishlistIcon() {
  const { wishlistIds } = useWishlist();
  const { user } = useAuth();
  const count = wishlistIds.length;

  // Only show if user is logged in
  if (!user) return null;

  return (
    <Link
      href="/wishlist"
      className="relative text-brown hover:opacity-80 transition-opacity"
      aria-label="Wishlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brown text-cream text-12 font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
