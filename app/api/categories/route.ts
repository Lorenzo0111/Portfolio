import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

  return NextResponse.json(categories);
}
