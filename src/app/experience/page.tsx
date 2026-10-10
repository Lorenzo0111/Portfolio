import Experience from "@/components/experience";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.experience.title"),
    description: t("meta.experience.desc"),
  };
}

export default function ExperiencePage() {
  return (
    <div>
      <Experience />
    </div>
  );
}
