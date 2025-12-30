"use client";

import type { VouchleyResponse } from "@/lib/vouchley";
import { useFetcher } from "@/utils/fetcher";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { ReviewCard, StarRating } from "./review";

export default function Reviews({ embed }: { embed?: boolean }) {
  const { data, error, isLoading } = useFetcher<VouchleyResponse["user"]>(
    "/api/reviews",
    {
      fetcher: (url) =>
        fetch(url, { cache: "force-cache" }).then((res) => res.json()),
    }
  );

  if (isLoading) {
    return (
      <div
        id="reviews"
        className="mx-auto text-center w-[90%] px-8 justify-center"
      >
        <h1 className="font-extrabold mt-4 text-gradient text-3xl">
          Client Reviews
        </h1>
        <span className="mt-6 loader"></span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        id="reviews"
        className="mx-auto text-center w-[90%] px-8 justify-center"
      >
        <h1 className="font-extrabold mt-4 text-gradient text-3xl">
          Client Reviews
        </h1>
        <p className="text-red-400 mt-4">Failed to load reviews</p>
      </div>
    );
  }

  return (
    <div
      id="reviews"
      className={`mx-auto text-center justify-center my-10 ${
        embed ? "w-full" : "w-[90%]"
      }`}
    >
      <h1 className="font-extrabold mt-4 text-gradient text-3xl">
        What they say about me
      </h1>

      {data.average_rating && (
        <div className="flex items-center justify-center gap-2 mt-4 mb-8">
          <StarRating rating={Math.round(parseFloat(data.average_rating))} />
          <Link
            href="https://www.vouchley.com/user/lorenzo0111"
            target="_blank"
            className="text-md italic text-primary hover:text-primary/80 transition-colors underline"
            onClick={() =>
              posthog.capture("vouchley_link_clicked", {
                average_rating: data.average_rating,
              })
            }
          >
            {parseFloat(data.average_rating).toFixed(1)} on Vouchley
          </Link>
        </div>
      )}

      {data.reviews.length > 0 ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8${
            embed ? " grid-rows-1" : ""
          }`}
        >
          {data.reviews
            .sort((a, b) => b.time_sent.localeCompare(a.time_sent))
            .slice(0, embed ? 3 : undefined)
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-8">No reviews available</p>
      )}

      {embed && (
        <Link
          href="/reviews"
          className="text-primary hover:text-primary/80 transition-colors mt-8 flex justify-center items-center gap-2"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
