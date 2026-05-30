"use client";

import type { Project as ProjectType } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { nameAsId } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { Card } from "../ui/card";

export default function Project({
  project,
  embed,
}: {
  project: ProjectType;
  embed?: boolean;
}) {
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
              placeholder="blur"
              blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
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
            View details &rarr;
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="glass"
      href={"/projects/" + nameAsId(project.name)}
      className={
        "group relative p-0 rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-300 border bg-white/2 " +
        (isFeatured
          ? "border-primary/60 shadow-[0_0_20px_rgba(252,186,3,0.15)] hover:border-primary"
          : "border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(252,186,3,0.08)]")
      }
      onClick={handleProjectClick}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-white/3 flex items-center justify-center">
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-primary rounded-full shadow-lg shadow-black/35">
            <Sparkles className="w-3 h-3 fill-black animate-pulse" />
            Featured
          </div>
        )}

        {!project.thumbnail ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 w-full h-full bg-linear-to-br from-white/5 to-white/10">
            <span className="loader scale-75"></span>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="relative flex flex-col justify-between p-6 grow bg-black/15">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {parseCategoryCsv(project.category).map((category) => (
              <span
                key={category}
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          <h2 className="font-extrabold text-xl lg:text-2xl text-white group-hover:text-primary transition-colors duration-200 line-clamp-1 leading-snug">
            {project.name}
          </h2>

          {project.description && (
            <p className="text-white/60 mt-3 text-sm line-clamp-2 leading-relaxed">
              {project.description.replaceAll("\\n", " ")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <span className="text-primary text-sm font-bold flex items-center gap-1 transition-all duration-200 group-hover:gap-2">
            View Details
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}
