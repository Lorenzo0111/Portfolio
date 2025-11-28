"use client";

import type { Project as ProjectType } from "@/generated/client";
import type { EventTypes } from "@/lib/plausible";
import { useFetcher } from "@/utils/fetcher";
import { usePlausible } from "next-plausible";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Project from "./project";

const Marquee = dynamic(() => import("react-fast-marquee"), {
  loading: () => <span className="mt-6 loader"></span>,
});

export default function Projects({ embed }: { embed?: boolean }) {
  const plausible = usePlausible<EventTypes>();
  const { data: categories } = useFetcher("/api/categories");
  const { data: projects } = useFetcher("/api/projects");
  const [filter, setFilter] = useState<string>("*");
  const [filtered, setFiltered] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projects) {
      setFiltered(projects);
      runFilter(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  async function runFilter(category: string) {
    plausible("filter-projects", {
      props: {
        filter: category,
      },
    });

    if (category === "*") {
      setFilter("*");
    } else {
      setFilter(category);
    }

    setLoading(true);

    const projects = await fetch(
      "/api/projects?filter=" + encodeURIComponent(category)
    ).then((res) => res.json());

    setFiltered(projects);
    setLoading(false);
  }

  if (embed && (!projects || loading)) return null;

  return (
    <div
      id="projects"
      className="mx-auto text-center w-[90%] px-8 justify-center"
    >
      <h1 className="font-extrabold mt-4 text-gradient text-3xl">
        My projects
      </h1>
      <p className="text-lg">
        Select a category to view all the projects. Click on a project to get
        images and infos
      </p>
      {loading && <span className="mt-6 loader"></span>}
      {projects ? (
        <div className="flex flex-col w-full justify-between">
          <ul className="flex mx-auto text-center mt-2 mb-4 w-fit gap-2 justify-center">
            <li>
              <button
                onClick={(e) => runFilter("*")}
                className={
                  "rounded-lg bg-white/5 px-6 text-white backdrop-blur-sm border border-white/10 hover:border-primary transition-all duration-200 flex h-10 w-full items-center justify-center " +
                  (filter === "*" ? "bg-primary!" : "")
                }
              >
                All
              </button>
            </li>
            {categories &&
              categories.map((category: string) => {
                return (
                  <li key={category}>
                    <button
                      onClick={(e) => runFilter(category)}
                      className={
                        "rounded-lg bg-white/5 px-6 text-white backdrop-blur-sm border border-white/10 hover:border-primary transition-all duration-200 flex h-10 w-full items-center justify-center " +
                        (filter === category ? "bg-primary!" : "")
                      }
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
          </ul>
          {filtered ? (
            embed ? (
              <Marquee
                className="flex flex-row text-center gap-8 w-full justify-center content-center items-center"
                pauseOnHover
                speed={100}
                loop={0}
              >
                {filtered.map((project: ProjectType) => (
                  <Project key={project.id} project={project} embed />
                ))}
              </Marquee>
            ) : (
              <div className="flex text-center gap-8 w-full justify-center content-center items-center flex-wrap">
                {filtered.map((project: ProjectType) => (
                  <Project key={project.id} project={project} />
                ))}
              </div>
            )
          ) : null}
        </div>
      ) : (
        <span className="mt-6 loader"></span>
      )}
    </div>
  );
}
