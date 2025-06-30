"use client";

import { useEffect, useState } from "react";
import Project from "./project";
import type { Project as ProjectType } from "@prisma/client";
import { useFetcher } from "@/utils/fetcher";
import dynamic from "next/dynamic";
import { usePlausible } from "next-plausible";
import type { EventTypes } from "@/lib/plausible";

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
      <h2 className="text-lg">
        Select a category to view all the projects. Click on a project to get
        images and infos
      </h2>
      {loading && <span className="mt-6 loader"></span>}
      {projects ? (
        <div className="flex flex-col w-full justify-between">
          <ul className="flex mx-auto text-center mb-2 w-fit gap-2 justify-center">
            <li>
              <button
                onClick={(e) => runFilter("*")}
                className={
                  filter === "*"
                    ? "text-primary hover:text-primary"
                    : "hover:text-primary"
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
                        filter === category
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary"
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
