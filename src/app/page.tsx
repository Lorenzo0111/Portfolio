import HomeStory from "@/components/home/story";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.home.title"),
    description: t("meta.home.desc"),
  };
}

export default function Home() {
  return <HomeStory />;
}
