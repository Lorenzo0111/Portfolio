import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { getFile } from "@/lib/firebase";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req as any);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  const file = await prisma.driveFile.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  if (file.userId !== userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const arrayBuffer = await getFile(file.id);
    const buffer = Buffer.from(arrayBuffer);
    
    res
    .setHeader("Content-Type", file.mimeType)
    .setHeader("Content-Disposition", `attachment; filename=${file.fileName}`)
    .send(buffer);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Can't file the file inside the drive storage" });
  }
}
