import ReviewStars from "./ReviewStars";
import type { Review } from "@/lib/supabase/reviews";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border-b border-brown/10 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ReviewStars rating={review.rating} size="sm" />
            {review.is_verified_purchase && (
              <span className="text-12 bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                Verified Purchase
              </span>
            )}
          </div>
          {review.title && (
            <h4 className="text-18 font-semibold text-brown">{review.title}</h4>
          )}
        </div>
      </div>

      {review.content && (
        <p className="text-16 text-brown/80 mb-3 leading-relaxed">{review.content}</p>
      )}

      <div className="flex items-center gap-2 text-14 text-brown/60">
        <span className="font-medium">{review.author_name}</span>
        <span>•</span>
        <span>{formatDate(review.created_at)}</span>
      </div>
    </div>
  );
}
