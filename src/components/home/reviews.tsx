"use client";

import type { VouchleyResponse, VouchleyReview } from "@/lib/vouchley";
import { useFetcher } from "@/utils/fetcher";
import { ArrowLeft, ArrowRight, Quote, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import reviewsImage from "../../../public/reviews.webp";
import { useTranslation } from "../i18n-provider";
import { Accent } from "./accent";

// How many cards of the deck are visible at once
const DEPTH = 3;
// How far (px) a card must be dragged before it is thrown to the back
const THROW_DISTANCE = 90;

type Leaving = { review: VouchleyReview; dir: 1 | -1; x: number };

export default function Reviews() {
  const { t, locale } = useTranslation();
  const { data } = useFetcher<VouchleyResponse["user"]>("/api/reviews");
  const deckRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<Leaving | null>(null);
  const [entering, setEntering] = useState<string | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  // Pinned reviews lead (in the order the API sends them), then the most recent
  const reviews = useMemo(() => {
    const list = Array.isArray(data?.reviews) ? data.reviews : [];
    return [...list].sort(
      (a, b) =>
        Number(!!b.pinned) - Number(!!a.pinned) ||
        (a.pinned ? 0 : b.time_sent.localeCompare(a.time_sent)),
    );
  }, [data]);

  const count = reviews.length;
  const rating = data?.average_rating ? parseFloat(data.average_rating) : null;

  // Sends the front card to the back of the deck: the deck loops forever
  const throwCard = (dir: 1 | -1, x: number, source: string) => {
    if (count < 2) return;
    setLeaving({ review: reviews[index], dir, x });
    setEntering(null);
    setIndex((i) => (i + 1) % count);
    if (source !== "auto") posthog.capture("home_review_nav", { source });
  };

  const back = () => {
    if (count < 2) return;
    const previous = (index - 1 + count) % count;
    setEntering(reviews[previous].id);
    setIndex(previous);
    posthog.capture("home_review_nav", { source: "back" });
  };

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => setLeaving(null), 700);
    return () => clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (count < 2 || e.button !== 0) return;
    dragStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(0);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    setDrag(e.clientX - dragStart.current);
  };
  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    setDrag(null);
    if (Math.abs(dx) > THROW_DISTANCE) throwCard(dx > 0 ? 1 : -1, dx, "drag");
  };
  const onPointerCancel = () => {
    dragStart.current = null;
    setDrag(null);
  };

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale, {
      month: "short",
      year: "numeric",
    });

  const visible = Array.from(
    { length: Math.min(DEPTH, count) },
    (_, offset) => reviews[(index + offset) % count],
  );

  return (
    <section
      id="reviews"
      data-section="reviews"
      className="relative flex min-h-svh items-center py-24"
    >
      <div className="home-col w-full">
        <Image
          src={reviewsImage}
          alt=""
          quality={90}
          sizes="(max-width: 1023px) 160px, 0px"
          className="mx-auto mb-8 h-56 w-auto lg:hidden"
        />

        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary" />
          {t("home.reviews.label")}
        </div>
        <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          <Accent text={t("home.reviews.title")} />
        </h2>

        {rating !== null && (
          <Link
            href="https://vouchley.com/user/lorenzo0111"
            target="_blank"
            className="group mt-6 inline-flex items-center gap-4"
            onClick={() =>
              posthog.capture("vouchley_link_clicked", {
                average_rating: data?.average_rating,
                source: "home",
              })
            }
          >
            <span className="text-5xl font-black tracking-tighter">
              {rating.toFixed(1)}
            </span>
            <span>
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="h-4 w-4 text-primary"
                    fill={star <= Math.round(rating) ? "currentColor" : "none"}
                  />
                ))}
              </span>
              <span className="mt-1 block text-sm text-white/50 transition-colors group-hover:text-white">
                {t("home.reviews.count", { count })}
              </span>
            </span>
          </Link>
        )}

        <div
          ref={deckRef}
          className={`review-deck mt-10 max-w-2xl ${paused || drag !== null ? "is-paused" : ""} ${drag !== null ? "is-dragging" : ""}`}
          style={
            {
              "--drag-p": drag ? Math.min(Math.abs(drag) / 160, 1) : 0,
            } as CSSProperties
          }
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {count === 0 && <div className="review-card review-skeleton" />}

          {leaving && (
            <ReviewCardView
              key={`leaving-${leaving.review.id}-${index}`}
              review={leaving.review}
              offset="out"
              date={formatDate(leaving.review.time_sent)}
              style={
                {
                  "--from-x": `${leaving.x}px`,
                  "--from-r": `${leaving.x / 18}deg`,
                  "--throw-x": `${leaving.dir * 115}%`,
                  "--throw-r": `${leaving.dir * 14}deg`,
                } as CSSProperties
              }
            />
          )}
          {visible.map((review, offset) => (
            <ReviewCardView
              key={review.id}
              review={review}
              offset={offset}
              entering={offset === 0 && entering === review.id}
              date={formatDate(review.time_sent)}
              style={
                offset === 0 && drag
                  ? {
                      transform: `translateX(${drag}px) rotate(${drag / 18}deg)`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {count > 1 && (
          <div className="mt-10 flex max-w-2xl items-center gap-4">
            <button
              type="button"
              onClick={back}
              aria-label={t("home.reviews.prev")}
              className="review-nav"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => throwCard(-1, 0, "button")}
              aria-label={t("home.reviews.next")}
              className="review-nav"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="review-progress">
              {/* Finishing the fill advances the deck, so pausing it pauses autoplay */}
              <span
                key={index}
                className={inView ? "is-running" : ""}
                onAnimationEnd={() => throwCard(-1, 0, "auto")}
              />
            </div>
            <span className="font-mono text-xs text-white/40">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
          </div>
        )}

        <Link
          href="/reviews"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
        >
          {t("reviews.viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function ReviewCardView({
  review,
  offset,
  date,
  entering,
  style,
}: {
  review: VouchleyReview;
  offset: number | "out";
  date: string;
  entering?: boolean;
  style?: CSSProperties;
}) {
  return (
    <article
      className={`review-card${entering ? " is-entering" : ""}`}
      data-offset={offset}
      aria-hidden={offset !== 0}
      style={style}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className="h-4 w-4 text-primary"
              fill={star <= review.rating ? "currentColor" : "none"}
            />
          ))}
        </span>
        {review.product?.description && (
          <span className="badge truncate">{review.product.description}</span>
        )}
      </div>

      <Quote className="mt-6 h-7 w-7 fill-primary/20 text-primary/60" />
      <h3 className="mt-3 line-clamp-1 pb-0.5 text-xl leading-snug font-bold sm:text-2xl">
        {review.description}
      </h3>
      <p className="mt-3 line-clamp-3 leading-relaxed text-white/65 sm:line-clamp-4">
        {review.message}
      </p>
      <p className="mt-auto pt-4 text-xs uppercase tracking-[0.2em] text-white/35">
        {date}
      </p>
    </article>
  );
}
