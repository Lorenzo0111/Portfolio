import { useEffect, useState } from "react";
import useSWR from "swr";
import Project, { ProjectType } from "./project";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Projects() {
  const { data: categories } = useSWR("/api/categories", fetcher);
  const { data: projects } = useSWR("/api/projects", fetcher);
  const [filter, setFilter] = useState<string>("*");
  const [filtered, setFiltered] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (projects) {
      setFiltered(projects);
      runFilter(filter);
    }
  }, [projects]);

  function runFilter(category: string) {
    if (category === "*") {
      setFiltered(projects);
      setFilter("*");
    } else {
      setFiltered(
        projects.filter((project: ProjectType) => project.category === category)
      );
      setFilter(category);
    }
  }

  return (
    <div
      id="projects"
      className="my-20 w-3/4 mx-auto justify-center text-center"
    >
      <h1 className="text-3xl font-extrabold my-4 text-gradient">
        My projects
      </h1>
      {projects ? (
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
          <ul className="w-fit mt-2 flex gap-2 text-center mx-auto justify-center">
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
          <div className="w-full flex gap-8 flex-wrap justify-center content-center md:content-end md:justify-end items-center text-center">
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
