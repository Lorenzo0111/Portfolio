import { parseCategoryCsv } from "@/lib/categories";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const projects = await prisma.project.findMany({
    select: {
      category: true,
    },
  });

  const categorySet = new Set<string>();
  for (const project of projects) {
    for (const token of parseCategoryCsv(project.category)) {
      categorySet.add(token);
    }
  }
  const categories = Array.from(categorySet).sort();

  return NextResponse.json(categories, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
