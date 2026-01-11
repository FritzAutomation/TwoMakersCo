"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  isInWishlist: () => false,
  toggleWishlist: async () => {},
  loading: false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistIds([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const data = await response.json();
        setWishlistIds(data.productIds || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!user) {
        // Redirect to login or show message
        window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
        return;
      }

      setLoading(true);
      const isCurrentlyInWishlist = wishlistIds.includes(productId);

      try {
        const response = await fetch("/api/wishlist", {
          method: isCurrentlyInWishlist ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });

        if (response.ok) {
          if (isCurrentlyInWishlist) {
            setWishlistIds((prev) => prev.filter((id) => id !== productId));
          } else {
            setWishlistIds((prev) => [...prev, productId]);
          }
        }
      } catch (error) {
        console.error("Error toggling wishlist:", error);
      } finally {
        setLoading(false);
      }
    },
    [user, wishlistIds]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, isInWishlist, toggleWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
