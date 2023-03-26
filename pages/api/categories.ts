import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await prisma.project.findMany({
    orderBy: {
      category: "asc",
    },
  });

  const categories: string[] = [];

  for (const project of projects) {
    if (!categories.includes(project.category)) {
      categories.push(project.category);
    }
  }

  res.status(200).json(categories);
}
