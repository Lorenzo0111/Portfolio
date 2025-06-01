import { Project } from "@prisma/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageClient from "./page.client";

export const revalidate = 3600;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const project: Project | null = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    }/api/projects/${id}`
  ).then((res) => res.json());

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

  const project: Project | null = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    }/api/projects/${id}`,
    {
      next: {
        revalidate: 3600,
        tags: [`project-${id}`],
      },
    }
  )
    .then(async (res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);

  if (!project) return notFound();

  return <ProjectPageClient project={project} />;
}
