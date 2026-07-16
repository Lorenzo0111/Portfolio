import Register from "@/components/auth/register";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("nav.projects") === "Progetti" ? "Registrati" : "Register",
    description:
      t("nav.projects") === "Progetti"
        ? "Crea il tuo account"
        : "Create your account",
  };
}

export default function Page() {
  return (
    <main className="mx-auto min-h-[70vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-yellow-100/40 via-transparent to-transparent">
      <Suspense>
        <Register />
      </Suspense>
    </main>
  );
}
