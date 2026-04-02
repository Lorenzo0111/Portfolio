"use client";

import type { Project } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { nameAsId } from "@/lib/utils";
import Image from "next/image";
import posthog from "posthog-js";
import { Card } from "../ui/card";

export default function Project({
  project,
  embed,
}: {
  project: Project;
  embed?: boolean;
}) {
  const handleProjectClick = () => {
    posthog.capture("project_viewed", {
      project_id: project.id,
      project_name: project.name,
      category: project.category,
    });
  };

  return (
    <Card
      variant="glass"
      href={"/projects/" + nameAsId(project.name)}
      className={
        "relative p-0 rounded-2xl " +
        (embed
          ? "flex flex-col h-60 w-full md:w-[400px] md:min-w-[400px] mr-8"
          : "flex flex-col md:flex-row h-auto w-full") +
        (project.top ? " border-primary/80!" : "") +
        " "
      }
      onClick={handleProjectClick}
    >
      {!project.thumbnail && <span className="mt-6 loader"></span>}
      {project.thumbnail && (
        <div
          className={
            "relative " +
            (embed
              ? "h-full w-full"
              : "h-52 md:h-auto md:w-[200px] md:min-w-[200px]")
          }
        >
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            sizes="(max-width: 1023px) 100vw, 360px"
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
          />
        </div>
      )}
      <div
        className={
          "relative flex flex-col justify-between p-5 md:p-6 w-full bg-black/55 " +
          (embed ? "min-h-24" : "min-h-44")
        }
      >
        <div>
          <h2 className="font-bold text-xl lg:text-2xl">{project.name}</h2>
          <p className="text-white/65 mt-2 text-sm md:text-base">
            {parseCategoryCsv(project.category).join(" · ")}
          </p>
        </div>
        <p className="text-primary mt-6 text-sm font-medium">
          View more &rarr;
        </p>
      </div>
    </Card>
  );
}
