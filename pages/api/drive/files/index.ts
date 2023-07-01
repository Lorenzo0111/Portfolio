import type { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { DriveFile } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req as any);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let files: DriveFile[] = [];

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user?.publicMetadata.role !== "admin") {
    files = await prisma.driveFile.findMany({});
  } else {
    files = await prisma.driveFile.findMany({
      where: {
        userId: userId,
      },
    });
  }

  return res.status(200).json({ files });
}
