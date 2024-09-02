import prisma from "@/lib/prismadb";
import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const limit = searchParams.get("limit");

  let limitNum = -1;
  if (limit && !isNaN(Number(limit))) limitNum = Number(limit);

  let filterObject: Prisma.ProjectWhereInput = {};
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
    take: limitNum > -1 ? limitNum : undefined,
    cacheStrategy: {
      ttl: 60 * 60,
      swr: 60 * 30,
    },
  });

  return NextResponse.json(projects, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
