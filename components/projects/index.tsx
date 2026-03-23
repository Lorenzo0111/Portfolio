"use client";

import type { Project as ProjectType } from "@/generated/client";
import { useFetcher } from "@/utils/fetcher";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import Project from "./project";

const Marquee = dynamic(() => import("react-fast-marquee"), {
  loading: () => <span className="mt-6 loader"></span>,
});

export default function Projects({ embed }: { embed?: boolean }) {
  const { data: categories } = useFetcher("/api/categories");
  const { data: projects } = useFetcher("/api/projects");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string>("*");
  const [filtered, setFiltered] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!projects) return;

    const categoryParam = searchParams.get("category") || "*";

    setFilter(categoryParam);
    setFiltered(projects);
    runFilter(categoryParam, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  function syncFilterParams(category: string) {
    if (embed) return;
    const params = new URLSearchParams(searchParams.toString());
    if (category === "*") params.delete("category");
    else params.set("category", category);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  async function runFilter(category: string, persist = true) {
    posthog.capture("filter_projects", {
      category,
    });

    setFilter(category);
    if (persist) syncFilterParams(category);
    setLoading(true);

    const fetchedProjects = await fetch(
      "/api/projects?filter=" + encodeURIComponent(category),
    ).then((res) => res.json());

    setFiltered(fetchedProjects);
    setLoading(false);
  }

  if (embed && (!projects || loading)) return null;

  return (
    <div id="projects" className="mx-auto w-full md:w-[90%] px-6 md:px-8 pb-10">
      <header className="mx-auto max-w-5xl text-left">
        <h1 className="font-extrabold mt-4 text-gradient text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="text-base md:text-lg text-white/75 mt-3 max-w-3xl">
          Explore some of my best projects. Select one to view more details.
        </p>
      </header>

      {loading && <span className="mt-6 loader"></span>}

      {projects ? (
        <div className="flex flex-col gap-6 mt-8">
          <section className="mx-auto max-w-5xl w-full rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-4 md:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => runFilter("*")}
                  className={
                    "rounded-lg px-4 md:px-5 text-sm md:text-base text-white border border-white/10 hover:border-primary transition-all duration-200 h-10 " +
                    (filter === "*"
                      ? "bg-primary text-black border-primary"
                      : "bg-white/5")
                  }
                >
                  All categories
                </button>
                {categories &&
                  categories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => runFilter(category)}
                      className={
                        "rounded-lg px-4 md:px-5 text-sm md:text-base text-white border border-white/10 hover:border-primary transition-all duration-200 h-10 " +
                        (filter === category
                          ? "bg-primary text-black border-primary"
                          : "bg-white/5")
                      }
                    >
                      {category}
                    </button>
                  ))}
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-white/60">
                  {filtered.length} project{filtered.length === 1 ? "" : "s"}{" "}
                  shown
                </p>
              </div>
            </div>
          </section>

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
              <section className="mx-auto max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((project: ProjectType) => (
                  <Project key={project.id} project={project} />
                ))}
                {!loading && filtered.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/20 p-8 text-center text-white/70">
                    No projects match these filters. Try another category.
                  </div>
                )}
              </section>
            )
          ) : null}
        </div>
      ) : (
        <span className="mt-6 loader"></span>
      )}
    </div>
  );
}
