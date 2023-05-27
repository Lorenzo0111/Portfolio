import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filter, limit } = req.query;

  let limitNum = -1;
  if (limit && !isNaN(Number(limit))) limitNum = Number(limit);

  let filterObject = {};
  if (filter && filter !== "*") {
    filterObject = {
      category: {
        contains: filter as string | undefined,
      },
    };
  }

  const projects = await prisma.project.findMany({
    orderBy: {
      category: "asc",
    },
    where: filterObject,
  });

  res
    .status(200)
    .json(projects.slice(0, limitNum === -1 ? projects.length : limitNum));
}
