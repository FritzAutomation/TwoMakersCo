"use client";

import { useState } from "react";
import ReviewStars from "./ReviewStars";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import type { Review } from "@/lib/supabase/reviews";

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export default function ProductReviews({
  productId,
  reviews,
  averageRating,
  reviewCount,
}: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false);

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <div className="mt-12 border-t border-brown/10 pt-12">
      <h2 className="text-27 font-bold text-brown mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="text-48 font-bold text-brown mb-1">
            {averageRating > 0 ? averageRating.toFixed(1) : "—"}
          </div>
          <ReviewStars rating={averageRating} size="md" />
          <p className="text-16 text-brown/60 mt-2">
            Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>

        {reviewCount > 0 && (
          <div className="flex-1 max-w-md">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars - 1];
              const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-2 mb-1">
                  <span className="text-14 text-brown/70 w-12">{stars} star</span>
                  <div className="flex-1 h-2 bg-brown/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-14 text-brown/60 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Write Review Button / Form */}
      <div className="mb-8">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-brown text-cream px-6 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors"
          >
            Write a Review
          </button>
        ) : (
          <div className="bg-cream/50 rounded-lg p-6 max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-22 font-semibold text-brown">Write Your Review</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-brown/60 hover:text-brown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <ReviewForm
              productId={productId}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        )}
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-cream/50 rounded-lg">
          <p className="text-18 text-brown/70 mb-2">No reviews yet</p>
          <p className="text-16 text-brown/50">
            Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  );
}
