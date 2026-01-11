"use client";

interface ReviewStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function ReviewStars({
  rating,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
}: ReviewStarsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        const filled = index < Math.floor(rating);
        const partial = index === Math.floor(rating) && rating % 1 > 0;
        const fillPercentage = partial ? (rating % 1) * 100 : 0;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={`relative ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
          >
            {/* Empty star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`${sizeClasses[size]} text-brown/30`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {/* Filled star overlay */}
            {(filled || partial) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`${sizeClasses[size]} text-yellow-500 absolute inset-0`}
                style={partial ? { clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` } : undefined}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-16 text-brown font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
