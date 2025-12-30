"use client";

import type { Project } from "@/generated/client";
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
      href={"/projects/" + project.id}
      className={
        "flex flex-col h-60 w-full md:w-[400px] md:min-w-[400px] relative p-0 " +
        (embed ? " mr-8" : "")
      }
      onClick={handleProjectClick}
    >
      {!project.thumbnail && <span className="mt-6 loader"></span>}
      {project.thumbnail && (
        <>
          <Image
            src={project.thumbnail}
            alt={project.name}
            width={400}
            height={240}
            className="rounded-xl h-full w-full"
            placeholder="blur"
            blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
          />
        </>
      )}
      <div className="rounded-b-xl flex flex-col bg-black/70 w-full max-h-24 p-4 bottom-0 absolute justify-center items-center">
        <h1 className="font-extrabold text-ellipsis w-full text-2xl overflow-hidden whitespace-nowrap">
          {project.name}
        </h1>
        <p className="text-ellipsis w-full text-gray-400 overflow-hidden whitespace-nowrap">
          {project.category}
        </p>
      </div>
    </Card>
  );
}
