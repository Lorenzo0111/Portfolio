"use client";

import type { VouchleyReview } from "@/lib/vouchley";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className="w-4 h-4 text-primary"
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: VouchleyReview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 150;
  const shouldTruncate = review.message.length > characterLimit;

  const formattedDate = new Date(review.time_sent).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayMessage =
    isExpanded || !shouldTruncate
      ? review.message
      : review.message.slice(0, characterLimit) + "...";

  return (
    <div
      className={`bg-white/5 text-left backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col ${
        shouldTruncate ? "cursor-pointer" : ""
      }`}
      onClick={() => shouldTruncate && setIsExpanded(!isExpanded)}
    >
      <div className="mb-4 flex-1">
        <div className="flex justify-between items-center gap-2 mb-2">
          <StarRating rating={review.rating} />
          {review.product?.description && (
            <span className="badge">{review.product.description}</span>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-2 text-white">
          {review.description}
        </h3>
      </div>
      <div className="flex flex-col h-full mt-auto">
        <p className="text-gray-300 leading-relaxed">{displayMessage}</p>
        {shouldTruncate && (
          <div className="flex items-center mt-2">
            <span className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              {isExpanded ? "Show less" : "Read more"}
            </span>
            <svg
              className={`w-3 h-3 ml-1 text-blue-400 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}

        <span className="text-xs text-gray-500 mt-auto ml-auto">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
