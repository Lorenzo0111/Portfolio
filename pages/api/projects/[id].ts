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

    const promises = project.images.map(async (image) => {
      return await getImageUrl(project.name, image);
    });

    const images = await Promise.all(promises);

    return res.status(200).json({
      ...project,
      images,
    });
  } catch {
    return res.status(404).json({ error: "Project not found" });
  }
}
