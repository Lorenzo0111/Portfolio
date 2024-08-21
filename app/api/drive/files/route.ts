import { auth, clerkClient } from "@clerk/nextjs/server";
import type { DriveFile } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let files: DriveFile[] = [];

  const user = userId ? await clerkClient().users.getUser(userId) : null;
  if (user?.publicMetadata.role !== "admin") {
    files = await prisma.driveFile.findMany({
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });
  } else {
    files = await prisma.driveFile.findMany({
      where: {
        userId: userId,
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });
  }

  return NextResponse.json({ files });
}
