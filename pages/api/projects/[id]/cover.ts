import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Project } from "@prisma/client";
import { getImageUrl } from "@/lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.images.length > 0) {
      const url = await getImageUrl(project.name, project.images[0]);
      return res.status(200).json(url);
    }

    return res.status(404).json({
      error: "No cover image found",
    });
  } catch {
    return res.status(404).json({ error: "Project not found" });
  }
}
