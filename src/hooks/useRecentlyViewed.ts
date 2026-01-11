"use client";

import { useState, useEffect, useCallback } from "react";

export interface RecentlyViewedItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  viewedAt: number;
}

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedItem[];
        // Filter out items older than 30 days
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const filtered = parsed.filter((item) => item.viewedAt > thirtyDaysAgo);
        setItems(filtered);
      }
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }
    }
  }, [items, isLoaded]);

  const addItem = useCallback(
    (item: Omit<RecentlyViewedItem, "viewedAt">) => {
      setItems((prev) => {
        // Remove if already exists
        const filtered = prev.filter((i) => i.id !== item.id);
        // Add to front with current timestamp
        const newItems = [
          { ...item, viewedAt: Date.now() },
          ...filtered,
        ].slice(0, MAX_ITEMS);
        return newItems;
      });
    },
    []
  );

  const clearItems = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing recently viewed:", error);
    }
  }, []);

  return {
    items,
    addItem,
    clearItems,
    isLoaded,
  };
}
