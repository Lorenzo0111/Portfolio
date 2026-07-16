import Login from "@/components/auth/login";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.login.title"),
    description: t("meta.login.desc"),
  };
}

export default function Page() {
  return (
    <main className="mx-auto min-h-[70vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-yellow-100/40 via-transparent to-transparent">
      <Suspense>
        <Login />
      </Suspense>
    </main>
  );
}
