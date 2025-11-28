import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { id } = params;

    const file = await prisma.driveFile.findUnique({
      where: {
        id: id as string,
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
        tags: ["drive_files"],
      },
    });

    if (!file) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json(file);
  } catch (error) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
