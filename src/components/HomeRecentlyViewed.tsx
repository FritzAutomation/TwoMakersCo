"use client";

import RecentlyViewed from "./RecentlyViewed";

export default function HomeRecentlyViewed() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <RecentlyViewed limit={4} title="Continue Browsing" />
    </div>
  );
}
