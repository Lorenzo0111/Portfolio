import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Reviews from "@/components/reviews";
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
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <Hero />
      <About />

      <div className="border-t border-white/10 pt-20">
        <Reviews embed />
      </div>

      <Contact />
    </div>
  );
}
