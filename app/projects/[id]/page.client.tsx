"use client";

import type { Project } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import dynamic from "next/dynamic";
import Image from "next/image";
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

function getHeroSrc(project: Project) {
  if (project.thumbnail) return project.thumbnail;
  const firstImage = project.images.find((img) => img && img.trim().length > 0);
  return firstImage ?? null;
}

export default function ProjectPage({ project }: { project: Project }) {
  const heroSrc = getHeroSrc(project);

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-0 md:mt-10 pb-16 pt-6">
        <Link
          href="/projects"
          className="text-primary/90 text-sm font-medium pb-4 block"
        >
          &larr; Back to projects
        </Link>

        <section
          className={
            "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 " +
            (project.top ? "border-primary/50" : "")
          }
        >
          {heroSrc ? (
            <>
              <div className="absolute inset-0">
                <Image
                  src={heroSrc}
                  alt={project.name}
                  fill
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-primary/10" />
          )}

          <div className="relative p-5 md:p-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {parseCategoryCsv(project.category).map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 w-fit text-xs font-medium uppercase tracking-wider text-primary border border-primary/20 bg-primary/10 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="font-extrabold text-2xl lg:text-4xl mt-4 leading-tight">
                {project.name}
              </h1>

              <p className="text-white/70 mt-3 text-base md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="w-full md:w-[320px]">
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm text-white/60">
                    <div className="font-semibold text-white/85">
                      Project details
                    </div>

                    <div className="mt-1">
                      {project.images.length} attachment
                      {project.images.length === 1 ? "" : "s"}
                      {project.youtube ? " and a video" : ""}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {project.link ? (
                    <Link
                      href={project.link}
                      className="rounded-xl bg-primary text-black hover:bg-primary/90 transition-all duration-200 h-10 flex items-center justify-center text-sm font-semibold"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit{" "}
                      {project.link.startsWith("https://github.com")
                        ? "GitHub"
                        : "Website"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-6">
          <section className="w-full">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary/90 font-semibold">
                  Gallery
                </div>
                <h2 className="font-extrabold text-2xl md:text-3xl mt-2">
                  Screens & highlights
                </h2>
              </div>

              <div className="text-sm text-white/60">
                Click a thumbnail to preview, then expand.
              </div>
            </div>

            <div className="mt-5">
              <Carousel project={project} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
