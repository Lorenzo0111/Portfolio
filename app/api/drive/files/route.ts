import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import type { DriveFile } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
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

  let files: DriveFile[] = [];

  if (session.user.role !== "admin") {
    files = await prisma.driveFile.findMany({
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });
  } else {
    files = await prisma.driveFile.findMany({
      where: {
        userId: session.user.id,
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });
  }

  return NextResponse.json({ files });
}
