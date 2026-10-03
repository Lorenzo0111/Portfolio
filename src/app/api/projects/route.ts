import type { Prisma } from "@/generated/client";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const limit = Number(searchParams.get("limit"));

  const take =
    Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : undefined;

  let filterObject: Prisma.ProjectWhereInput = {
    hidden: false,
  };
  if (filter && filter !== "*") {
    filterObject.OR = [
      { category: filter },
      { category: { contains: filter } },
    ];
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ top: "desc" }, { order: "desc" }],
    where: filterObject,
    take,
  });

  return NextResponse.json(projects, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
