import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
      cacheStrategy: {
        ttl: 60 * 60,
        swr: 60 * 30,
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json(project, {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
