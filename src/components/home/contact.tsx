"use client";

import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import contactImage from "../../../public/contact.webp";
import { useTranslation } from "../i18n-provider";
import { Accent } from "./accent";
import { Keycap } from "./keycap";
import { isTypingTarget } from "./use-scroll-progress";

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Lorenzo0111", Icon: SiGithub },
  { name: "Discord", href: "https://discord.gg/HT47UQXBqG", Icon: SiDiscord },
  { name: "X", href: "https://x.com/akaLorenzo0111", Icon: SiX },
];

export default function Contact() {
  const { t } = useTranslation();
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const [pressed, setPressed] = useState(false);
  const go = (source: string) => {
    setPressed(true);
    posthog.capture("contact_clicked", { source });
    // Let the key travel down before navigating
    setTimeout(() => router.push("/contact"), 180);
  };

  const onEnter = useEffectEvent((e: KeyboardEvent) => {
    if (
      e.key !== "Enter" ||
      !inView.current ||
      e.metaKey ||
      e.ctrlKey ||
      isTypingTarget(e.target, true)
    )
      return;
    e.preventDefault();
    go("home_enter_keyboard");
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    window.addEventListener("keydown", onEnter);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onEnter);
    };
  }, []);

  return (
    <section
      id="contact"
      data-section="contact"
      ref={ref}
      className="relative flex min-h-svh items-center py-24"
    >
      <div className="home-col w-full">
        <Image
          src={contactImage}
          alt=""
          quality={90}
          sizes="(max-width: 1023px) 160px, 0px"
          className="mx-auto mb-8 h-56 w-auto lg:hidden"
        />

        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary" />
          {t("home.contact.label")}
        </div>
        <h2 className="max-w-4xl text-[clamp(2.8rem,6.5vw,6.25rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          <Accent text={t("home.contact.title")} />
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/55">
          {t("contactCta.description")}
        </p>

        <div className="mt-12 flex flex-col items-start gap-5">
          <Keycap
            color="yellow"
            sub={t("home.contact.key")}
            pressed={pressed}
            heavy
            className="keycap-enter"
            label={t("contactCta.button")}
            onClick={() => go("home_enter_key")}
          >
            Enter ↵
          </Keycap>
          <p className="text-sm text-white/40">{t("home.contact.press")}</p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <span className="w-full text-sm text-white/50 sm:w-auto">
            {t("home.contact.or")}
          </span>
          {SOCIALS.map(({ name, href, Icon }) => (
            <Keycap
              key={name}
              href={href}
              external
              color="graphite"
              label={name}
              className="keycap-icon"
              onClick={() =>
                posthog.capture("social_link_clicked", {
                  platform: name.toLowerCase(),
                  source: "home_contact",
                })
              }
            >
              <Icon className="h-5 w-5" />
            </Keycap>
          ))}
        </div>
      </div>
    </section>
  );
}
