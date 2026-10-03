import { getCachedProject } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageClient from "./page.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const project = await getCachedProject(id);
  if (!project) return notFound();

  const images = project.images.filter((image) => image.endsWith(".png"));

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      images: images.length > 0 ? images : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const project = await getCachedProject(id);
  if (!project) return notFound();

  return <ProjectPageClient project={project} />;
}
