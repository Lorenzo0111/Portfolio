import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
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

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const file = await prisma.driveFile.findUnique({
      where: {
        id: id as string,
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

    await prisma.driveFile.update({
      where: {
        id: file.id,
      },
      data: {
        userId: userId,
      },
    });

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
