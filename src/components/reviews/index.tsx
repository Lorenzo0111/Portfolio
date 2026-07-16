"use client";

import type { VouchleyResponse } from "@/lib/vouchley";
import { useFetcher } from "@/utils/fetcher";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { useMemo } from "react";
import { useTranslation } from "../i18n-provider";
import { ReviewCard, StarRating } from "./review";

export default function Reviews({ embed }: { embed?: boolean }) {
  const { t } = useTranslation();
  const { data, error, isLoading } = useFetcher<VouchleyResponse["user"]>(
    "/api/reviews",
    {
      fetcher: (url) =>
        fetch(url, { cache: "force-cache" }).then((res) => res.json()),
    },
  );

  const shownReviews = useMemo(() => {
    if (embed) {
      const pinned = data?.reviews.filter((review) => review.pinned) ?? [];
      if (pinned.length >= 3) return pinned;

      const sorted =
        data?.reviews
          .filter((review) => !review.pinned)
          .sort((a, b) => b.time_sent.localeCompare(a.time_sent))
          .slice(0, 3 - pinned.length) ?? [];

      return [...pinned, ...sorted];
    }

    return (
      data?.reviews.sort((a, b) => b.time_sent.localeCompare(a.time_sent)) ?? []
    );
  }, [embed, data]);

  if (isLoading) {
    return (
      <div
        id="reviews"
        className={`mx-auto text-center justify-center my-10 ${
          embed ? "w-full" : "w-[90%]"
        }`}
      >
        <h1 className="font-extrabold mt-4 text-gradient text-3xl">
          {t("reviews.fallbackTitle")}
        </h1>
        <span className="mt-6 loader"></span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        id="reviews"
        className={`mx-auto text-center justify-center my-10 ${
          embed ? "w-full" : "w-[90%]"
        }`}
      >
        <h1 className="font-extrabold mt-4 text-gradient text-3xl">
          {t("reviews.fallbackTitle")}
        </h1>
        <p className="text-red-400 mt-4">{t("reviews.failed")}</p>
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
      <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
        {t("reviews.title")}{" "}
        <span className="text-gradient font-black">
          {t("reviews.titleHighlight")}
        </span>
      </h1>

      {data.average_rating && (
        <div className="flex items-center justify-center gap-2 mt-4 mb-8">
          <StarRating rating={Math.round(parseFloat(data.average_rating))} />
          <Link
            href="https://vouchley.com/user/lorenzo0111"
            target="_blank"
            className="text-md italic text-primary hover:text-primary/80 transition-colors underline"
            onClick={() =>
              posthog.capture("vouchley_link_clicked", {
                average_rating: data.average_rating,
              })
            }
          >
            {parseFloat(data.average_rating).toFixed(1)}{" "}
            {t("reviews.onVouchley")}
          </Link>
        </div>
      )}

      {shownReviews.length > 0 ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8${
            embed ? " grid-rows-1" : ""
          }`}
        >
          {shownReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-8">{t("reviews.empty")}</p>
      )}

      {embed && (
        <Link
          href="/reviews"
          className="text-primary hover:text-primary/80 transition-colors mt-8 flex justify-center items-center gap-2"
        >
          {t("reviews.viewAll")}
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
