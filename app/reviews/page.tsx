import Reviews from "@/components/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Browse all reviews left by my clients",
};

export default function ReviewsPage() {
  return (
    <div>
      <Reviews />
    </div>
  );
}
