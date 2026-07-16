"use client";

import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { ChevronDown, Mail } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "./i18n-provider";
import { Locale } from "@/lib/i18n";

const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
] as const;

export default function Navbar() {
  const { t, locale, setLocale } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSocialClick = (platform: string) => {
    posthog.capture("social_link_clicked", {
      platform: platform,
      source: "navbar",
    });
  };

  const selectLanguage = (code: Locale) => {
    posthog.capture("language_switched", {
      from: locale,
      to: code,
    });
    setLocale(code);
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
              aria-expanded={dropdownOpen}
              aria-label="Select language"
            >
              <span>{currentLang.flag} {currentLang.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 flex flex-col gap-1 z-50 shadow-2xl animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      locale === lang.code
                        ? "bg-primary/10 text-primary"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {locale === lang.code && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
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


