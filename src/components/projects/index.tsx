"use client";

import type { Project as ProjectType } from "@/generated/client";
import { parseCategoryCsv } from "@/lib/categories";
import { useFetcher } from "@/utils/fetcher";
import {
  ArrowLeft,
  ArrowRight,
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
import { useEffect, useMemo } from "react";
import { useTranslation } from "../i18n-provider";
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

interface CategoryRowProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  count: number;
  onClick: () => void;
  projectLabel: string;
  projectsLabel: string;
}

function CategoryRow({
  title,
  description,
  icon: IconComponent,
  count,
  onClick,
  projectLabel,
  projectsLabel,
}: CategoryRowProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-white/10 py-6 text-left transition-colors hover:bg-white/3 focus-visible:bg-white/5 focus-visible:outline-none sm:gap-x-8 sm:px-4 md:grid-cols-[auto_14rem_1fr_auto] lg:py-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-colors group-hover:border-primary/50 group-hover:text-primary">
          <IconComponent className="h-5 w-5" />
        </span>
        <span className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-3xl">
            {title}
          </span>
          <span className="text-sm tabular-nums text-white/45">
            {count} {count === 1 ? projectLabel : projectsLabel}
          </span>
        </span>
        <span className="col-start-2 col-end-4 max-w-xl text-sm leading-relaxed text-white/60 md:col-start-3 md:col-end-4 md:row-start-1 md:text-base">
          {description}
        </span>
        <ArrowRight className="col-start-3 row-start-1 h-5 w-5 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-primary md:col-start-4" />
      </button>
    </li>
  );
}

const getCategoryDesign = (categoryName: string, t: any): CategoryDesign => {
  if (categoryName === "Web") {
    return {
      icon: Globe,
      description: t("category.desc.web"),
    };
  }

  if (categoryName === "Mobile") {
    return {
      icon: Smartphone,
      description: t("category.desc.mobile"),
    };
  }

  if (categoryName === "Plugin") {
    return {
      icon: Gamepad2,
      description: t("category.desc.plugin"),
    };
  }

  if (categoryName === "Bot") {
    return {
      icon: Bot,
      description: t("category.desc.bot"),
    };
  }

  if (categoryName === "*") {
    return {
      icon: Sparkles,
      description: t("category.desc.all"),
    };
  }

  return {
    icon: Code,
    description: t("category.desc.fallback", { category: categoryName }),
  };
};

export default function Projects({ embed }: { embed?: boolean }) {
  const { t } = useTranslation();
  const { data: categories } = useFetcher("/api/categories");
  const { data: projects } = useFetcher("/api/projects");
  const [filter, setFilter] = useQueryState("category");
  const filtered: ProjectType[] = useMemo(() => {
    if (!projects) return [];
    if (embed || filter === "*") return projects;
    if (!filter) return [];

    return projects.filter((p: ProjectType) =>
      parseCategoryCsv(p.category ?? "").includes(filter),
    );
  }, [projects, filter, embed]);

  useEffect(() => {
    if (filter) posthog.capture("filter_projects", { category: filter });
  }, [filter]);

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
    if (!projects) return null;
    return (
      <div
        id="projects"
        className="mx-auto w-full md:w-[90%] px-6 md:px-8 pb-10"
      >
        <header className="mx-auto max-w-5xl text-left">
          <h1 className="font-extrabold mt-4 text-gradient text-4xl md:text-5xl">
            {t("nav.projects")}
          </h1>
          <p className="text-base md:text-lg text-white/75 mt-3 max-w-3xl">
            {t("projects.browseAll")}
          </p>
        </header>

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

  const filterButton = (value: string, label: string) => {
    const active = filter === value;
    return (
      <button
        key={value}
        onClick={() => setFilter(value)}
        aria-pressed={active}
        className={`flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
          active
            ? "bg-primary text-black"
            : "text-white/65 hover:bg-white/5 hover:text-white"
        }`}
      >
        {label}
        <span
          className={`tabular-nums text-xs ${active ? "text-black/60" : "text-white/35"}`}
        >
          {getProjectCount(value)}
        </span>
      </button>
    );
  };

  return (
    <div
      id="projects"
      className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 pt-10 lg:pt-16"
    >
      {!projects || !categories ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : !filter ? (
        <div className="pb-8 md:pb-14">
          <header className="mb-10 max-w-3xl lg:mb-14">
            <h1 className="mb-5 text-5xl font-bold tracking-tight text-white lg:text-7xl">
              {t("projects.title")}{" "}
              <span className="text-gradient">
                {t("projects.titleHighlight")}
              </span>
              ?
            </h1>
            <p className="text-lg leading-relaxed text-white/60 lg:text-xl">
              {t("projects.subtitle")}
            </p>
          </header>

          <ul className="border-t border-white/10">
            {(() => {
              const design = getCategoryDesign("*", t);
              return (
                <CategoryRow
                  title={t("projects.allTitle")}
                  description={design.description}
                  icon={design.icon}
                  count={getProjectCount("*")}
                  onClick={() => setFilter("*")}
                  projectLabel={t("projects.projectLabel")}
                  projectsLabel={t("projects.projectsLabel")}
                />
              );
            })()}

            {categories.map((categoryName: string) => {
              const design = getCategoryDesign(categoryName, t);
              return (
                <CategoryRow
                  key={categoryName}
                  title={categoryName}
                  description={design.description}
                  icon={design.icon}
                  count={getProjectCount(categoryName)}
                  onClick={() => setFilter(categoryName)}
                  projectLabel={t("projects.projectLabel")}
                  projectsLabel={t("projects.projectsLabel")}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <header className="mb-10 lg:mb-12">
            <button
              onClick={() => setFilter(null)}
              className="group mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              {t("projects.backToCategories")}
            </button>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("projects.explore")}{" "}
              <span className="text-gradient">
                {filter === "*" ? t("projects.allLabel") : filter}
              </span>{" "}
              {t("projects.projectsSuffix")}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/60 sm:text-lg">
              {filter === "*"
                ? t("projects.browseAll")
                : getCategoryDesign(filter, t).description}
            </p>

            <nav className="-mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/3 p-1">
                {filterButton("*", t("projects.allLabel"))}
                {categories.map((cat: string) => filterButton(cat, cat))}
              </div>
            </nav>
          </header>

          {filtered.length > 0 ? (
            <section className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project: ProjectType) => (
                <Project key={project.id} project={project} />
              ))}
            </section>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-white/20 p-12 text-center text-white/60">
              <p className="mb-4">{t("projects.empty")}</p>
              <button
                onClick={() => setFilter("*")}
                className="cursor-pointer text-sm font-semibold text-primary hover:underline"
              >
                {t("projects.viewAll")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
