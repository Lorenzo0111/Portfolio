import { ManageConsentButton } from "@/components/manage-consent-button";
import { Card } from "@/components/ui/card";
import type { TranslationKey } from "@/lib/i18n";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";
import Link from "next/link";

const LAST_UPDATED = new Date("2026-10-16");

const sections = [
  "assistant",
  "analytics",
  "contact",
  "cookies",
  "providers",
  "rights",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.privacy.title"),
    description: t("meta.privacy.desc"),
  };
}

export default async function PrivacyPage() {
  const { t, locale } = await getTranslationsServer();

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 lg:py-20">
      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {t("privacy.title")}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {t("privacy.updated", {
          date: LAST_UPDATED.toLocaleDateString(locale, { dateStyle: "long" }),
        })}
      </p>
      <p className="text-lg text-gray-300 leading-relaxed mb-12">
        {t("privacy.intro")}
      </p>

      <div className="space-y-6">
        {sections.map((id) => (
          <Card key={id}>
            <h2 className="text-xl font-bold mb-3">
              {t(`privacy.${id}.title` as TranslationKey)}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {t(`privacy.${id}.body` as TranslationKey)}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-10">
        <Link
          href="/contact"
          className="rounded-md bg-primary text-black font-medium py-2 px-4 hover:brightness-110 transition-colors"
        >
          {t("privacy.contactMe")}
        </Link>
        <ManageConsentButton label={t("privacy.manageConsent")} />
      </div>
    </div>
  );
}
