"use client";

import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTranslation } from "./i18n-provider";
import { Button } from "./ui/button";

export default function ConsentBanner() {
  const { t } = useTranslation();
  // On the server there is no consent state, render nothing until hydrated
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    () => "granted" as const,
  );

  if (consent !== "pending") return null;

  return (
    <div
      role="region"
      aria-label={t("consent.learnMore")}
      className="fixed z-60 left-4 right-4 bottom-24 sm:right-auto sm:left-5 sm:bottom-5 sm:max-w-sm rounded-2xl border border-white/10 bg-[#1c1c1c]/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/50"
    >
      <div className="flex gap-3">
        <Cookie className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-gray-300">
          {t("consent.text")}{" "}
          <Link
            href="/privacy"
            className="text-primary underline underline-offset-2"
          >
            {t("consent.learnMore")}
          </Link>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="rounded-xl"
          onClick={() => setConsent(false)}
        >
          {t("consent.decline")}
        </Button>
        <Button className="rounded-xl" onClick={() => setConsent(true)}>
          {t("consent.accept")}
        </Button>
      </div>
    </div>
  );
}
