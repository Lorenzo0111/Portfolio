"use client";

import { useI18n } from "@/lib/i18n";
import { HeartIcon } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center justify-center text-center flex mt-auto">
      <p className="flex items-center gap-1">
        {t("footer.madeWith")}{" "}
        <HeartIcon fill="currentColor" className="text-primary mx-1" />
        {t("footer.by")} <span className="text-primary">Lorenzo0111</span>
      </p>
    </footer>
  );
}
