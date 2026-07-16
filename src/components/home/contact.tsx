"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { useTranslation } from "../i18n-provider";

export default function Contact() {
  const { t } = useTranslation();

  const handleContactClick = () => {
    posthog.capture("contact_clicked", {
      source: "home_cta",
    });
  };

  return (
    <div
      id="contact"
      className="mt-20 p-12 rounded-3xl bg-linear-to-r from-primary/20 to-card/20 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-card/40 backdrop-blur-sm -z-10" />
      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        {t("contactCta.title")}
      </h3>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
        {t("contactCta.description")}
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors"
        onClick={handleContactClick}
      >
        {t("contactCta.button")} <Mail className="w-5 h-5" />
      </Link>
    </div>
  );
}

