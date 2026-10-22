"use client";

import type { Project as ProjectType } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { nameAsId } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useTranslation } from "../i18n-provider";
import { Card } from "../ui/card";

export default function Project({
  project,
  embed,
}: {
  project: ProjectType;
  embed?: boolean;
}) {
  const { locale, t } = useTranslation();

  const handleProjectClick = () => {
    posthog.capture("project_viewed", {
      project_id: project.id,
      project_name: project.name,
      category: project.category,
    });
  };

  const isFeatured = project.top;

  if (embed) {
    return (
      <Card
        variant="glass"
        href={"/projects/" + nameAsId(project.name)}
        className={
          "relative p-0 rounded-2xl flex flex-col h-60 w-full md:w-100 md:min-w-100 mr-8 " +
          (isFeatured
            ? " border-primary/85 shadow-[0_0_15px_rgba(252,186,3,0.15)]"
            : "")
        }
        onClick={handleProjectClick}
      >
        {!project.thumbnail && (
          <div className="h-full w-full bg-white/5 flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
        {project.thumbnail && (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              sizes="(max-width: 1023px) 100vw, 360px"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="relative flex flex-col justify-between p-4 w-full bg-black/75 min-h-24">
          <div>
            <h2 className="font-bold text-lg text-white line-clamp-1">
              {project.name}
            </h2>
            <p className="text-white/60 mt-1 text-xs">
              {parseCategoryCsv(project.category).join(" · ")}
            </p>
          </div>
          <p className="text-primary mt-3 text-xs font-semibold flex items-center gap-1">
            {t("projects.viewDetailsCompact")} &rarr;
          </p>
        </div>
      </Card>
    );
  }

  const description = (
    project.translations?.[locale] ?? project.description
  )?.replaceAll("\\n", " ");

  return (
    <Link
      href={"/projects/" + nameAsId(project.name)}
      onClick={handleProjectClick}
      className="group flex flex-col rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-2xl border bg-white/3 transition-colors duration-300 ${
          isFeatured
            ? "border-primary/50 group-hover:border-primary"
            : "border-white/10 group-hover:border-white/30"
        }`}
      >
        {!project.thumbnail ? (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-white/5 to-white/10">
            <span className="loader scale-75"></span>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}

        {isFeatured && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-black shadow-lg shadow-black/40">
            <Star className="h-3 w-3 fill-black" />
            {t("projects.featured")}
          </div>
        )}
      </div>

      <div className="flex grow flex-col px-1 pt-5">
        <p className="mb-1.5 text-sm text-white/45">
          {parseCategoryCsv(project.category).join(", ")}
        </p>
        <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-primary lg:text-2xl">
          {project.name}
        </h2>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
