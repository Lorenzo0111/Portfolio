import prisma from "@/lib/prismadb";
import { normalizeName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const { id } = params;
  const normalizedId = normalizeName(id);

  try {
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id: normalizedId },
          { name: { equals: normalizedId, mode: "insensitive" } },
          { name: { equals: id, mode: "insensitive" } },
        ],
      },
      cacheStrategy: {
        ttl: 60 * 60 * 24,
        tags: ["projects"],
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
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
