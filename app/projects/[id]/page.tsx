"use client";

import type { Project } from "@prisma/client";
import WrappedCarousel from "@/components/carousel";
import { useFetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useParams } from "next/navigation";

function BasePage({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex flex-col m-auto h-[500px] mt-20 text-left gap-4 md:w-3/4 xl:w-1/2">
        {children}
      </div>
    </main>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading } = useFetcher<
    | Project
    | {
        error: string;
      }
  >(id ? `/api/projects/${id}` : null, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  if (isLoading) {
    return (
      <BasePage>
        <span className="mx-auto mt-6 loader"></span>
      </BasePage>
    );
  }

  if (project && "error" in project) {
    return (
      <BasePage>
        <p>{project.error}</p>
      </BasePage>
    );
  }

  if (!project) {
    return (
      <BasePage>
        <p>Project not found</p>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <h1 className="font-bold text-4xl">{project.name}</h1>
      <p className="text-gray-400">{project.description}</p>
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
      {project.images.length > 0 && (
        <h1 className="font-bold text-2xl">Images</h1>
      )}
      <WrappedCarousel project={project} />
    </BasePage>
  );
}
