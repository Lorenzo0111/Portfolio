import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
    const body = await request.json();
    const { id } = body;

    if (!id || typeof id !== "string") {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const file = await prisma.driveFile.findUnique({
      where: {
        id,
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

    const result = await prisma.driveFile.updateMany({
      where: {
        id: file.id,
        userId: null,
      },
      data: {
        userId: session.user.id,
      },
    });

    if (result.count !== 1) {
      return new Response(JSON.stringify({ error: "Invite already claimed" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
