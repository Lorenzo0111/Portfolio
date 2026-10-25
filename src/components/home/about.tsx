"use client";

import { TranslationKey } from "@/lib/i18n";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  ArrowRight,
  LucideIcon,
  PanelsTopLeft,
  Server,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { CSSProperties, useRef, useState } from "react";
import { useTranslation } from "../i18n-provider";
import { Accent } from "./accent";
import { Keycap, KeyColor } from "./keycap";
import { useScrollProgress } from "./use-scroll-progress";

const CHAPTERS: TranslationKey[] = [
  "home.about.ch1",
  "home.about.ch2",
  "home.about.ch3",
];

// Scroll progress (0..1 through the pinned section) where each chapter begins
const CHAPTER_STARTS = [0, 0.4, 0.72];

const STATS: [TranslationKey, TranslationKey][] = [
  ["about.experienceValue", "about.experienceTitle"],
  ["exp.stat.downloads.value", "exp.stat.downloads.label"],
  ["exp.stat.projects.value", "exp.stat.projects.label"],
  ["exp.stat.rating.value", "exp.stat.rating.label"],
];

const DISCIPLINES: {
  label: TranslationKey;
  Icon: LucideIcon;
  items: string[];
}[] = [
  { label: "exp.skill.backend", Icon: Server, items: ["Java", "Kotlin", "PHP"] },
  {
    label: "exp.skill.frontend",
    Icon: PanelsTopLeft,
    items: ["React", "Next.js", "Tailwind"],
  },
  {
    label: "exp.skill.mobile",
    Icon: Smartphone,
    items: ["Flutter", "React Native"],
  },
];

const STACK: { name: string; color: KeyColor }[] = [
  { name: "Java", color: "yellow" },
  { name: "TypeScript", color: "blue" },
  { name: "React", color: "cream" },
  { name: "Next.js", color: "graphite" },
  { name: "PHP", color: "cream" },
  { name: "Flutter", color: "blue" },
];

export default function About() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);

  useScrollProgress(ref, "pin", (p) =>
    setChapter(p < CHAPTER_STARTS[1] ? 0 : p < CHAPTER_STARTS[2] ? 1 : 2),
  );

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    // Land a little past the boundary so the chapter is fully in
    const target = i ? CHAPTER_STARTS[i] + 0.05 : 0;
    window.scrollTo({ top: top + distance * target, behavior: "smooth" });
  };

  const state = (i: number) =>
    chapter === i ? "active" : chapter > i ? "past" : "future";

  return (
    <section
      id="about"
      data-section="about"
      ref={ref}
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="home-col w-full">
          <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {t("home.about.label")}
          </div>

          <div className="flex gap-2 sm:gap-6">
            {CHAPTERS.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => goTo(i)}
                className={`flex cursor-pointer items-baseline gap-2 text-left text-sm transition-colors ${
                  chapter === i
                    ? "text-white"
                    : "text-white/35 hover:text-white/70"
                }`}
              >
                <span className="font-mono text-xs text-primary">
                  0{i + 1}
                </span>
                <span
                  className={chapter === i ? "inline" : "hidden sm:inline"}
                >
                  {t(key)}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 h-px w-full max-w-2xl bg-white/10">
            <div className="about-progress h-full origin-left bg-primary" />
          </div>

          <div className="relative mt-10 h-[min(62svh,560px)]">
            <div
              className="about-panel"
              data-state={state(0)}
              inert={chapter !== 0}
            >
              <div className="stagger max-w-3xl">
                <h3
                  className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.04em]"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <Accent text={t("home.about.since")} />
                </h3>
                <p
                  className="mt-4 text-lg text-white/55"
                  style={{ "--i": 1 } as CSSProperties}
                >
                  {t("home.about.sinceDesc")}
                </p>
                <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                  {DISCIPLINES.map(({ label, Icon, items }, i) => (
                    <div
                      key={label}
                      className="discipline"
                      style={{ "--i": i + 2 } as CSSProperties}
                    >
                      <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                      <div className="mt-6 text-base font-bold sm:text-xl">
                        {t(label)}
                      </div>
                      <div className="mt-1 hidden text-sm text-white/45 sm:block">
                        {items.join(" · ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="about-panel"
              data-state={state(1)}
              inert={chapter !== 1}
            >
              <div className="stagger grid max-w-3xl grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-14">
                {STATS.map(([value, label], i) => (
                  <div key={value} style={{ "--i": i } as CSSProperties}>
                    <div
                      className={`text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-none tracking-tighter ${
                        i % 3 === 0 ? "text-gradient" : "text-white"
                      }`}
                    >
                      {t(value)}
                    </div>
                    <div className="mt-3 max-w-[16rem] text-sm text-white/50 sm:text-base">
                      {t(label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="about-panel"
              data-state={state(2)}
              inert={chapter !== 2}
            >
              <div className="stagger max-w-3xl">
                <h3
                  className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <Accent text={t("home.about.stackTitle")} />
                </h3>
                <p
                  className="mt-4 max-w-xl text-lg text-white/55"
                  style={{ "--i": 1 } as CSSProperties}
                >
                  {t("home.about.stackDesc")}
                </p>
                <div
                  className="mt-8 flex flex-wrap gap-3 sm:gap-4"
                  style={{ "--i": 2 } as CSSProperties}
                >
                  <span className="sr-only">
                    {STACK.map((tech) => tech.name).join(", ")}
                  </span>
                  {STACK.map((tech) => (
                    <Keycap
                      key={tech.name}
                      color={tech.color}
                      className="keycap-word"
                      decorative
                    >
                      {tech.name}
                    </Keycap>
                  ))}
                </div>
                <div
                  className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold"
                  style={{ "--i": 3 } as CSSProperties}
                >
                  <Link
                    href="/experience"
                    className="group flex items-center gap-2 text-primary"
                  >
                    {t("about.experienceLink")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="https://github.com/Lorenzo0111"
                    target="_blank"
                    className="group flex items-center gap-2 text-white/70 hover:text-white"
                  >
                    <SiGithub className="h-4 w-4" />
                    {t("home.about.githubLink")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
