import { useEffect, useState } from "react";
import Project from "./project";
import type { Project as ProjectType } from "@prisma/client";
import { useFetcher } from "@/utils/fetcher";

export default function Projects() {
  const { data: categories } = useFetcher("/api/categories");
  const { data: projects } = useFetcher("/api/projects?limit=5");
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
    if (category === "*") {
      setFilter("*");
    } else {
      setFilter(category);
    }

    setLoading(true);

    const projects = await fetch(
      "/api/projects?filter=" +
        encodeURIComponent(category) +
        (category === "*" ? "&limit=5" : "")
    ).then((res) => res.json());

    setFiltered(projects);
    setLoading(false);
  }

  return (
    <div
      id="projects"
      className="mx-auto my-20 text-center w-3/4 justify-center"
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
          <div className="flex flex-wrap text-center w-full gap-8 justify-center content-center items-center">
            {filtered &&
              filtered.map((project: ProjectType) => {
                return <Project key={project.id} project={project} />;
              })}
          </div>
        </div>
      ) : (
        <span className="mt-6 loader"></span>
      )}
    </div>
  );
}
