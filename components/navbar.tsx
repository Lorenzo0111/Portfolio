"use client";

import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { useI18n } from "@/lib/i18n";
import { Mail } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const handleSocialClick = (platform: string) => {
    posthog.capture("social_link_clicked", {
      platform: platform,
      source: "navbar",
    });
  };

  return (
    <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center flex md:w-full">
      <div className="flex flex-col space-x-4 md:flex-row items-center justify-center md:justify-start content-center w-full relative">
        <div className="w-full flex justify-between md:justify-start gap-4">
          <Link className="hover:text-primary" href="/">
            {t("nav.home")}
          </Link>
          <Link className="hover:text-primary" href="/#about">
            {t("nav.about")}
          </Link>
          <Link className="hover:text-primary" href="/projects">
            {t("nav.projects")}
          </Link>
          <Link className="hover:text-primary" href="/reviews">
            {t("nav.reviews")}
          </Link>
        </div>

        <div className="flex items-center md:absolute right-0 gap-4">
          <button
            type="button"
            className="rounded-full border border-white/10 px-3 py-1 text-sm uppercase hover:border-primary hover:text-primary"
            aria-label={t("nav.language")}
            onClick={() => setLocale(locale === "en" ? "it" : "en")}
          >
            {locale}
          </button>
          <Link
            className="hover:text-primary"
            href="/contact"
            aria-label="Email"
            onClick={() => handleSocialClick("email")}
          >
            <Mail width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://discord.gg/HT47UQXBqG"
            aria-label="Discord"
            onClick={() => handleSocialClick("discord")}
          >
            <SiDiscord width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://github.com/Lorenzo0111"
            aria-label="GitHub"
            onClick={() => handleSocialClick("github")}
          >
            <SiGithub width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://x.com/akaLorenzo0111"
            aria-label="X (Twitter)"
            onClick={() => handleSocialClick("x")}
          >
            <SiX width={48} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
