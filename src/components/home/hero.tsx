"use client";

import { ArrowDown, Keyboard, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  CSSProperties,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import bodyImage from "../../../public/body.webp";
import { useTranslation } from "../i18n-provider";
import { Accent } from "./accent";
import { Keycap, KeyColor } from "./keycap";
import { isTypingTarget, useScrollProgress } from "./use-scroll-progress";

type Key = { key: string; sub: string; color: KeyColor; wide?: boolean };

const ROWS: Key[][] = [
  [
    { key: "L", sub: "esc", color: "yellow" },
    { key: "O", sub: "tab", color: "cream" },
    { key: "R", sub: "shift", color: "graphite" },
    { key: "E", sub: "fn", color: "blue" },
    { key: "N", sub: "alt", color: "cream" },
    { key: "Z", sub: "ctrl", color: "yellow" },
    { key: "O", sub: "cmd", color: "graphite" },
  ],
  [
    { key: "D", sub: "opt", color: "graphite" },
    { key: "E", sub: "home", color: "cream" },
    { key: "V", sub: "end", color: "yellow" },
    { key: "Enter", sub: "return", color: "blue", wide: true },
  ],
];

const KEYS = ROWS.flat();

// Where each key drifts to (x, y, rotation) as the hero scrolls away
const SCATTER = [
  [-70, -50, -18],
  [-25, -80, 10],
  [20, -60, -8],
  [60, -40, 16],
  [-40, 50, 12],
  [30, 70, -14],
  [90, 30, 20],
  [-80, 30, -10],
  [-15, 90, 8],
  [45, 80, -16],
  [100, 60, 12],
];

const SECRET_WORDS = ["LORENZO", "DEV"];

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const visible = useRef(true);
  const typed = useRef("");
  const [pressed, setPressed] = useState<Set<string>>(() => new Set());
  const [wave, setWave] = useState(false);

  useScrollProgress(ref, "exit", (p) => {
    visible.current = p < 0.7;
  });

  const setKey = (key: string, down: boolean) =>
    setPressed((prev) => {
      if (prev.has(key) === down) return prev;
      const next = new Set(prev);
      if (down) next.add(key);
      else next.delete(key);
      return next;
    });

  const tap = (key: string) => {
    setKey(key, true);
    setTimeout(() => setKey(key, false), 140);
  };

  const goToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!visible.current || e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Enter") {
      if (isTypingTarget(e.target, true)) return;
      e.preventDefault();
      tap("Enter");
      goToAbout();
      return;
    }

    if (isTypingTarget(e.target)) return;
    const letter = e.key.toUpperCase();
    if (!KEYS.some((k) => k.key === letter)) return;

    setKey(letter, true);
    typed.current = (typed.current + letter).slice(-10);
    if (SECRET_WORDS.some((word) => typed.current.endsWith(word))) {
      typed.current = "";
      setWave(true);
      setTimeout(() => setWave(false), 1400);
    }
  });

  const onKeyUp = useEffectEvent((e: KeyboardEvent) =>
    setKey(e.key.toUpperCase(), false),
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  let index = 0;

  return (
    <section
      id="hello"
      data-section="hello"
      ref={ref}
      className="hero relative flex min-h-[calc(100svh-6rem)] items-center pb-16"
    >
      <div className="hero-grid" aria-hidden />

      <div className="home-col w-full">
        <div className="hero-copy">
          <Image
            src={bodyImage}
            alt=""
            priority
            quality={90}
            sizes="(max-width: 1023px) 160px, 0px"
            className="mx-auto mb-6 h-48 w-auto lg:hidden"
          />

          <p className="text-lg font-medium text-white/60 sm:text-xl">
            {t("home.hero.hi")}
          </p>
          <h1 className="mt-3 text-[clamp(2.8rem,6vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            <Accent text={t("home.hero.title")} />
          </h1>
        </div>

        <div
          className={`hero-keyboard mt-8 flex flex-col gap-[clamp(6px,0.9vw,12px)] ${wave ? "is-waving" : ""}`}
          aria-label="LORENZO DEV"
        >
          {ROWS.map((row, r) => (
            <div
              key={r}
              className="flex gap-[clamp(6px,0.9vw,12px)]"
              style={{ marginLeft: r ? "calc(var(--key) * 0.45)" : 0 }}
            >
              {row.map((k) => {
                const i = index++;
                const [dx, dy, dr] = SCATTER[i];
                return (
                  <span
                    key={i}
                    className="hero-key"
                    style={
                      {
                        "--d": i,
                        "--dx": dx,
                        "--dy": dy,
                        "--dr": dr,
                      } as CSSProperties
                    }
                  >
                    <Keycap
                      sub={k.sub}
                      color={k.color}
                      pressed={pressed.has(k.key)}
                      heavy={k.wide}
                      label={k.key === "Enter" ? t("home.nav.about") : k.key}
                      className={
                        "key-drop " +
                        (k.wide ? "keycap-letter-wide" : "keycap-letter")
                      }
                      onClick={() => {
                        tap(k.key);
                        if (k.key === "Enter") goToAbout();
                      }}
                    >
                      {k.key === "Enter" ? "↵" : k.key}
                    </Keycap>
                  </span>
                );
              })}
            </div>
          ))}
          <p className="mt-3 hidden items-center gap-2 text-xs text-white/40 md:flex">
            <Keyboard className="h-3.5 w-3.5" />
            {t("home.hero.keysHint")}
          </p>
        </div>

        <div className="hero-copy mt-6">
          <p className="max-w-md text-lg leading-relaxed text-white/60">
            {t("home.hero.desc")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-primary"
            >
              {t("hero.contact")} <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="#work"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-medium backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {t("hero.viewWork")}
            </Link>

            <a
              href="#about"
              className="scroll-stamp ml-auto hidden lg:block"
              aria-label={t("home.nav.about")}
            >
              <svg viewBox="0 0 120 120" className="stamp-ring" aria-hidden>
                <defs>
                  <path
                    id="stamp-circle"
                    d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                  />
                </defs>
                <text className="fill-white/55 text-[9px] font-semibold uppercase">
                  <textPath
                    href="#stamp-circle"
                    textLength={287}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {t("home.hero.scroll")}
                  </textPath>
                </text>
              </svg>
              <ArrowDown className="absolute inset-0 m-auto h-5 w-5 animate-bounce text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
