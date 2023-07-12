import prisma from "@/lib/prismadb";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req as any);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const file = await prisma.driveFile.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    await prisma.driveFile.update({
      where: {
        id: file.id,
      },
      data: {
        userId: userId,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json({ error: "File not found" });
  }
}
