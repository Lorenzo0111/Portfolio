"use client";

import { TranslationKey } from "@/lib/i18n";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import aboutImage from "../../../public/about.webp";
import bodyImage from "../../../public/body.webp";
import contactImage from "../../../public/contact.webp";
import projectsImage from "../../../public/projects.webp";
import reviewsImage from "../../../public/reviews.webp";
import { useTranslation } from "../i18n-provider";
import type { SectionId } from "./story";

const POSES: Record<
  SectionId,
  {
    src: StaticImageData;
    label: TranslationKey;
    quote: TranslationKey;
    accent: string;
  }
> = {
  hello: {
    src: bodyImage,
    label: "home.nav.hello",
    quote: "home.bubble.hello",
    accent: "#fcba03",
  },
  about: {
    src: aboutImage,
    label: "home.nav.about",
    quote: "home.bubble.about",
    accent: "#ff7a59",
  },
  work: {
    src: projectsImage,
    label: "home.nav.work",
    quote: "home.bubble.work",
    accent: "#5fc4f6",
  },
  reviews: {
    src: reviewsImage,
    label: "home.nav.reviews",
    quote: "home.bubble.reviews",
    accent: "#c084fc",
  },
  contact: {
    src: contactImage,
    label: "home.nav.contact",
    quote: "home.bubble.contact",
    accent: "#34d399",
  },
};

const ORDER = Object.keys(POSES) as SectionId[];

/**
 * The framed character card pinned to the right on desktop. Each section
 * swaps in a new pose with a scan-line reveal and its own accent colour.
 */
export default function CharacterStage({
  active,
}: {
  active: SectionId | null;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  // Keep the last pose while the card slides out between sections
  const [pose, setPose] = useState<SectionId>("hello");
  const [leaving, setLeaving] = useState<SectionId | null>(null);
  if (active && active !== pose) {
    setLeaving(pose);
    setPose(active);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const number = String(ORDER.indexOf(pose) + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      aria-hidden
      className={`character-stage${active ? " is-visible" : ""}`}
      style={{ "--stage-accent": POSES[pose].accent } as CSSProperties}
    >
      <div className="stage-card">
        <div className="stage-bg" />
        <div key={`n-${pose}`} className="stage-number">
          {number}
        </div>

        <div className="stage-header">
          <span key={`l-${pose}`} className="stage-label">
            <span className="stage-dot" />
            {t(POSES[pose].label)}
          </span>
          <span className="font-mono text-white/35">
            {number} / {String(ORDER.length).padStart(2, "0")}
          </span>
        </div>
        <p key={`q-${pose}`} className="stage-quote">
          {t(POSES[pose].quote)}
        </p>

        <div className="stage-figure">
          <div className="stage-shadow" />
          {ORDER.map((key) => (
            <Image
              key={key}
              src={POSES[key].src}
              alt=""
              fill
              quality={90}
              priority={key === "hello"}
              sizes="(max-width: 1023px) 0px, 360px"
              className={`stage-pose${
                pose === key ? " is-active" : leaving === key ? " is-leaving" : ""
              }`}
            />
          ))}
        </div>

        <div key={`w-${pose}`} className="stage-scan" />
      </div>
    </div>
  );
}
