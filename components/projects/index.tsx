"use client";

import type { Project as ProjectType } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { useFetcher } from "@/utils/fetcher";
import {
  ArrowLeft,
  Bot,
  Code,
  Gamepad2,
  Globe,
  Smartphone,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useQueryState } from "nuqs";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import Project from "./project";

const Marquee = dynamic(() => import("react-fast-marquee"), {
  loading: () => (
    <div className="flex w-full items-center justify-center py-6">
      <span className="loader"></span>
    </div>
  ),
});

interface CategoryDesign {
  icon: React.ComponentType<any>;
  description: string;
}

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  count: number;
  actionLabel: string;
  onClick: () => void;
}

function CategoryCard({
  title,
  description,
  icon: IconComponent,
  count,
  actionLabel,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex min-h-55 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left transition-colors duration-200 hover:border-primary"
    >
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-white">
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-white/15 bg-white/3 px-3.5 py-1 text-xs font-semibold tracking-wider text-white/50">
            {count} project{count === 1 ? "" : "s"}
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1 text-xs font-bold text-primary">
        {actionLabel}
      </div>
    </button>
  );
}

const getCategoryDesign = (categoryName: string): CategoryDesign => {
  if (categoryName === "Web") {
    return {
      icon: Globe,
      description:
        "Modern, responsive websites built to deliver clean design, smooth navigation, and practical functionality.",
    };
  }

  if (categoryName === "Mobile") {
    return {
      icon: Smartphone,
      description:
        "Mobile applications designed to provide useful features, intuitive interfaces, and smooth user experiences.",
    };
  }

  if (categoryName === "Plugin") {
    return {
      icon: Gamepad2,
      description:
        "Custom Minecraft plugins that add new gameplay features, server tools, and personalized player experiences.",
    };
  }

  if (categoryName === "Bot") {
    return {
      icon: Bot,
      description:
        "Custom bots that automate tasks, enhance communities, and add interactive features to Discord servers.",
    };
  }

  if (categoryName === "*") {
    return {
      icon: Sparkles,
      description:
        "Examine everything! Browse my entire catalog of projects and creations without filters.",
    };
  }

  return {
    icon: Code,
    description: `Specialized projects and dynamic solutions developed under the ${categoryName} category.`,
  };
};

export default function Projects({ embed }: { embed?: boolean }) {
  const { data: categories } = useFetcher("/api/categories");
  const { data: projects } = useFetcher("/api/projects");
  const [filter, setFilter] = useQueryState("category");
  const [filtered, setFiltered] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function runFilter(category: string) {
    posthog.capture("filter_projects", { category });

    setLoading(true);

    const fetchedProjects = await fetch(
      "/api/projects?filter=" + encodeURIComponent(category),
    ).then((res) => res.json());

    setFiltered(fetchedProjects);
    setLoading(false);
  }

  useEffect(() => {
    if (!projects) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(filter ? projects : []);
    if (filter) runFilter(filter);
  }, [projects, filter]);

  const getProjectCount = (catName: string) => {
    if (!projects) return 0;
    if (catName === "*") return projects.length;

    return projects.filter((p: ProjectType) => {
      if (!p.category) return false;
      const parsed = parseCategoryCsv(p.category);
      return parsed.includes(catName);
    }).length;
  };

  if (embed) {
    if (!projects || loading) return null;
    return (
      <div
        id="projects"
        className="mx-auto w-full md:w-[90%] px-6 md:px-8 pb-10"
      >
        <header className="mx-auto max-w-5xl text-left">
          <h1 className="font-extrabold mt-4 text-gradient text-4xl md:text-5xl">
            Projects
          </h1>
          <p className="text-base md:text-lg text-white/75 mt-3 max-w-3xl">
            Explore some of my best projects. Select one to view more details.
          </p>
        </header>

        {loading && (
          <div className="flex w-full items-center justify-center py-6">
            <span className="loader"></span>
          </div>
        )}

        {filtered && (
          <div className="flex flex-col gap-6 mt-8">
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
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      id="projects"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-10"
    >
      {!projects || !categories ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full">
          {!filter ? (
            <div className="animate-fade-in pb-8 md:pb-14">
              <header className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
                  What are you{" "}
                  <span className="text-gradient font-black">looking for</span>?
                </h1>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                  Choose a category below to explore my projects, open-source
                  work, and custom creations.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {(() => {
                  const design = getCategoryDesign("*");

                  return (
                    <CategoryCard
                      title="All Projects"
                      description={design.description}
                      icon={design.icon}
                      count={getProjectCount("*")}
                      actionLabel="View All"
                      onClick={() => setFilter("*")}
                    />
                  );
                })()}

                {categories.map((categoryName: string) => {
                  const design = getCategoryDesign(categoryName);
                  const projectCount = getProjectCount(categoryName);

                  return (
                    <CategoryCard
                      key={categoryName}
                      title={categoryName}
                      description={design.description}
                      icon={design.icon}
                      count={projectCount}
                      actionLabel="Explore Category"
                      onClick={() => setFilter(categoryName)}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in py-6">
              <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-10">
                <div className="max-w-xl">
                  <button
                    onClick={() => setFilter(null)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors group mb-3 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to categories
                  </button>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Explore{" "}
                    <span className="text-gradient">
                      {filter === "*" ? "All" : filter}
                    </span>{" "}
                    Projects
                  </h1>
                  <p className="text-white/60 text-sm sm:text-base mt-2">
                    Browse through my collection of{" "}
                    {filter === "*"
                      ? "projects across all categories"
                      : `projects in the ${filter} category`}
                  </p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 w-full lg:w-auto max-w-full">
                  <button
                    onClick={() => setFilter("*")}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-250 border ${
                      filter === "*"
                        ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 cursor-pointer"
                    }`}
                  >
                    All ({getProjectCount("*")})
                  </button>
                  {categories.map((cat: string) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-250 border ${
                        filter === cat
                          ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 cursor-pointer"
                      }`}
                    >
                      {cat} ({getProjectCount(cat)})
                    </button>
                  ))}
                </div>
              </header>

              {loading ? (
                <div className="flex w-full items-center justify-center py-20">
                  <span className="loader"></span>
                </div>
              ) : (
                <div className="w-full">
                  {filtered && filtered.length > 0 ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {filtered.map((project: ProjectType) => (
                        <Project key={project.id} project={project} />
                      ))}
                    </section>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/20 p-12 text-center text-white/60 max-w-2xl mx-auto">
                      No projects found matching the selected category.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
