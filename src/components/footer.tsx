import { getTranslationsServer } from "@/lib/i18n-server";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  const { t } = await getTranslationsServer();

  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center justify-center text-center flex flex-col gap-1 mt-auto">
      <p className="flex items-center gap-1">
        {t("footer.madeWith")}{" "}
        <HeartIcon fill="currentColor" className="text-primary mx-1" />
        {t("footer.by")} <span className="text-primary">Lorenzo0111</span>
      </p>
      <Link
        href="/privacy"
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        {t("footer.privacy")}
      </Link>
    </footer>
  );
}
