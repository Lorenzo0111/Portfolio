import Reviews from "@/components/reviews";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.reviews.title"),
    description: t("meta.reviews.desc"),
  };
}

export default function ReviewsPage() {
  return (
    <div>
      <Reviews />
    </div>
  );
}
