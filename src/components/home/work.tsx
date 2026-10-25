"use client";

import type { Project } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { nameAsId } from "@/lib/utils";
import { useFetcher } from "@/utils/fetcher";
import { ArrowRight, ArrowUpRight, Shuffle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import {
  CSSProperties,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "../i18n-provider";
import { Accent } from "./accent";

// Each reel stops a little after the previous one, like a real machine
const DURATIONS = [1.6, 2.1, 2.6];
const FILLER = [16, 22, 28];

type Reel = { strip: Project[]; index: number; animate: boolean; blur: boolean };
type Status = "idle" | "spinning" | "landed";

function pick<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Work() {
  const { t } = useTranslation();
  const { data } = useFetcher<Project[]>("/api/projects");
  const machineRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasSpun = useRef(false);
  const [reels, setReels] = useState<Reel[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [inView, setInView] = useState(false);

  // The API returns featured projects first, so the head of the pool is the "rigged" result
  const pool = useMemo(
    () =>
      Array.isArray(data) ? data.filter((p) => p.thumbnail).slice(0, 30) : [],
    [data],
  );

  const shown: Reel[] = reels.length
    ? reels
    : pool.length
      ? [0, 1, 2].map((i) => ({
          strip: [pool[(i * 5 + 3) % pool.length]],
          index: 0,
          animate: false,
          blur: false,
        }))
      : [];

  const results = reels.map((reel) => reel.strip[reel.index]);
  const spinning = status === "spinning";

  const spin = (targets: Project[]) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setStatus("spinning");
    setReels((prev) => {
      const base = prev.length ? prev : shown;
      return targets.map((target, r) => {
        const current = base[r]?.strip[base[r].index] ?? pick(pool);
        const filler = reduced
          ? []
          : Array.from({ length: FILLER[r] }, () => pick(pool));
        return {
          strip: [current, ...filler, target],
          index: 0,
          animate: false,
          blur: !reduced,
        };
      });
    });

    // Two frames so the reset position paints before the transition starts
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setReels((prev) =>
          prev.map((reel) => ({
            ...reel,
            index: reel.strip.length - 1,
            animate: !reduced,
          })),
        ),
      ),
    );

    DURATIONS.forEach((duration, r) => {
      timers.current.push(
        setTimeout(
          () =>
            setReels((prev) =>
              prev.map((reel, i) => (i === r ? { ...reel, blur: false } : reel)),
            ),
          reduced ? 0 : (duration - 0.55) * 1000,
        ),
      );
    });
    timers.current.push(
      setTimeout(
        () => setStatus("landed"),
        reduced ? 0 : DURATIONS[DURATIONS.length - 1] * 1000 + 100,
      ),
    );
  };

  const spinFeatured = useEffectEvent(() =>
    spin([0, 1, 2].map((i) => pool[i % pool.length])),
  );

  const shuffleProjects = () => {
    if (spinning || !pool.length) return;
    posthog.capture("home_projects_shuffle");

    const current = new Set(results.map((p) => p.id));
    const fresh = pool.filter((p) => !current.has(p.id));
    const picks = shuffle(fresh.length >= 3 ? fresh : pool);
    spin([0, 1, 2].map((i) => picks[i % picks.length]));
  };

  useEffect(() => {
    const el = machineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !pool.length || hasSpun.current) return;
    hasSpun.current = true;
    spinFeatured();
  }, [inView, pool.length]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="work"
      data-section="work"
      className="relative flex min-h-svh items-center py-24"
    >
      <div className="home-col w-full">
        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary" />
          {t("home.work.label")}
        </div>
        <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          <Accent text={t("home.work.title")} />
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/55">
          {t("home.work.desc")}
        </p>

        <div ref={machineRef} className="mt-10 max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {shown.length
              ? shown.map((reel, r) => (
                  <ReelView
                    key={r}
                    reel={reel}
                    duration={DURATIONS[r]}
                    landed={status === "landed"}
                    index={r}
                  />
                ))
              : [0, 1, 2].map((r) => (
                  <div key={r} className="reel reel-skeleton" />
                ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={shuffleProjects}
              disabled={spinning || !pool.length}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:border-primary/60 hover:bg-white/10 disabled:cursor-default disabled:opacity-50"
            >
              <Shuffle className="h-4 w-4 text-primary transition-transform group-hover:rotate-180" />
              {t("home.work.spin")}
            </button>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
            >
              {t("home.work.all")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReelView({
  reel,
  duration,
  landed,
  index,
}: {
  reel: Reel;
  duration: number;
  landed: boolean;
  index: number;
}) {
  const { t } = useTranslation();
  const count = reel.strip.length;
  const project = reel.strip[reel.index];
  const showInfo = landed && !!project;

  const content = (
    <div
      className={`reel${reel.blur ? " is-blurring" : ""}${showInfo ? " is-landed" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      <div
        className="reel-strip"
        style={{
          height: `${count * 100}%`,
          transform: `translateY(-${(reel.index * 100) / count}%)`,
          transition: reel.animate
            ? `transform ${duration}s cubic-bezier(0.16, 0.8, 0.24, 1)`
            : "none",
        }}
      >
        {reel.strip.map((p, i) => (
          <div key={i} className="relative" style={{ height: `${100 / count}%` }}>
            <Image
              src={p.thumbnail!}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {project && (
        <div className="reel-info">
          {project.top && (
            <span className="mb-auto flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-black">
              <Star className="h-2.5 w-2.5 fill-black" />
              {t("projects.featured")}
            </span>
          )}
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-base font-bold sm:text-sm lg:text-base">
                {project.name}
              </div>
              <div className="truncate text-xs text-white/60">
                {parseCategoryCsv(project.category).join(" · ")}
              </div>
            </div>
            <ArrowUpRight className="reel-arrow hidden h-5 w-5 shrink-0 sm:block" />
          </div>
        </div>
      )}
    </div>
  );

  if (!showInfo) return content;

  return (
    <Link
      href={"/projects/" + nameAsId(project.name)}
      aria-label={project.name}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      onClick={() =>
        posthog.capture("project_viewed", {
          project_id: project.id,
          project_name: project.name,
          category: project.category,
          source: "home_reel",
        })
      }
    >
      {content}
    </Link>
  );
}
