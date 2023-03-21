import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Project } from "@prisma/client";
import { getImageUrl } from "@/lib/firebase";

type ProjectCard = {
  cover?: string;
} & Project;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects: ProjectCard[] = await prisma.project.findMany({
    orderBy: {
      category: "asc"
    }
  });

  for (const project of projects) {
    if (project.images.length > 0) {
      project.cover = await getImageUrl(project.name, project.images[0]);
    }
  }

  res.status(200).json(projects);
}
