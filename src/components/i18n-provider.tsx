"use client";

import { Locale, TranslationKey, getTranslations } from "@/lib/i18n";

import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import React, {
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: TranslationKey,
    variables?: Record<string, string | number>,
  ) => string;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const setLocale = async (newLocale: Locale) => {
    if (newLocale === locale) return;

    await fetch("/api/lang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: newLocale }),
    });

    posthog.capture("language", { newLocale });

    // Update local state
    setLocaleState(newLocale);

    // Refresh the router to update Server Components
    startTransition(() => {
      router.refresh();
    });
  };

  const { t } = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }

  return context;
}
