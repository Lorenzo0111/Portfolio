import Projects from "@/components/projects";
import { getTranslationsServer } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslationsServer();
  return {
    title: t("meta.projects.title"),
    description: t("meta.projects.desc"),
  };
}

export default function ProjectsPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Projects />
      </Suspense>
    </div>
  );
}
