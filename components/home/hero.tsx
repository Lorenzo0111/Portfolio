"use client";

import { useI18n } from "@/lib/i18n";
import iconImage from "@/public/icon.webp";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col-reverse md:flex-row gap-12 items-center mb-24">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-6">
          {t("hero.greeting")} <br />
          <span className="text-gradient">{t("hero.name")}</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          {t("hero.description")}
        </p>

        <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
          <Link
            href="#contact"
            className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            {t("hero.contact")} <Mail className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-sm font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            {t("hero.work")}
          </Link>
        </div>
      </div>

      <div className="relative w-64 h-64 lg:w-96 lg:h-96 shrink-0">
        <Image
          src={iconImage}
          alt="Lorenzo"
          fill
          priority
          draggable={false}
          sizes="(max-width: 1023px) 256px, 384px"
          className="object-cover rounded-full border-4 border-white/5 shadow-2xl"
        />
      </div>
    </div>
  );
}
