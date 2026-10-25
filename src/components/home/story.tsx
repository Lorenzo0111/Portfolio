"use client";

import { TranslationKey } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n-provider";
import About from "./about";
import CharacterStage from "./character-stage";
import Contact from "./contact";
import Hero from "./hero";
import Reviews from "./reviews";
import Work from "./work";

export type SectionId = "hello" | "about" | "work" | "reviews" | "contact";

const SECTIONS: { id: SectionId; label: TranslationKey }[] = [
  { id: "hello", label: "home.nav.hello" },
  { id: "about", label: "home.nav.about" },
  { id: "work", label: "home.nav.work" },
  { id: "reviews", label: "home.nav.reviews" },
  { id: "contact", label: "home.nav.contact" },
];

export default function HomeStory() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionId | null>("hello");

  // The section crossing the middle of the viewport drives the character and nav
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let current: SectionId | null = null;
      root.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) {
          current = el.dataset.section as SectionId;
        }
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="home-root relative z-10">
      <Hero />
      <About />
      <Work />

      <Reviews />

      <Contact />

      <nav
        aria-label="Sections"
        className={`story-nav${active ? " is-visible" : ""}`}
      >
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "is-active" : ""}
            aria-current={active === id ? "true" : undefined}
          >
            <span className="story-nav-dot" />
            <span className="story-nav-label">{t(label)}</span>
          </a>
        ))}
      </nav>

      <CharacterStage active={active} />
    </div>
  );
}
