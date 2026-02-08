"use client";

import type { Project } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import dynamic from "next/dynamic";
import Link from "next/link";

const Carousel = dynamic(() => import("@/components/carousel"), {
  loading: () => (
    <div className="flex flex-row w-full gap-4 animate-pulse">
      <div className="h-full w-1/4 max-h-[400px] flex flex-col gap-4">
        <div className="w-full h-[100px] bg-gray-800 rounded-xl" />
        <div className="w-full h-[100px] bg-gray-800 rounded-xl" />
      </div>
      <div className="h-full w-3/4 max-h-[400px] bg-gray-800 rounded-xl" />
    </div>
  ),
  ssr: false,
});

function BasePage({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex flex-col m-auto min-h-[500px] p-4 md:p-0 md:mt-20 text-left gap-4 md:w-3/4 xl:w-1/2">
        {children}
      </div>
    </main>
  );
}

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <BasePage>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col flex-wrap gap-3">
          {parseCategoryCsv(project.category).map((category) => (
            <span
              key={category}
              className="px-3 py-1 w-fit text-xs font-medium uppercase tracking-wider text-primary border border-primary/20 bg-primary/10 rounded-full"
            >
              {category}
            </span>
          ))}
          <h1 className="font-bold text-4xl">{project.name}</h1>
        </div>
        <p className="text-gray-400">{project.description}</p>
      </div>
      {project.link && (
        <div className="flex w-full gap-4">
          <Link
            href={project.link}
            className="bg-primary rounded-xl flex h-10 text-black w-full items-center justify-center"
          >
            Visit Page
          </Link>
        </div>
      )}
      {(project.images.length > 0 || project.youtube !== null) && (
        <h1 className="font-bold text-2xl">Images</h1>
      )}
      <Carousel project={project} />
    </BasePage>
  );
}
