import nextConnect from "next-connect";
import multer from "multer";
import { uploadFile } from "@/lib/firebase";
import { NextApiResponse } from "next";
import { IncomingMessage } from "http";
import prisma from "@/lib/prismadb";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req: IncomingMessage, res: NextApiResponse) => {
  const { file } = req;
  const { name, description, ownerId } = req.body;

  const { userId } = getAuth(req as any);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user?.publicMetadata.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!file || !name || !description) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (ownerId) {
    try {
      await clerkClient.users.getUser(ownerId);
    } catch (e) {
      return res.status(404).json({ error: "Owner not found" });
    }
  }

  const driveFile = await prisma.driveFile.create({
    data: {
      name,
      fileName: file.originalname,
      mimeType: file.mimetype,
      description,
      userId: ownerId ? ownerId : null,
    },
  });

  await uploadFile(driveFile.id, file);
  return res.status(200).json({ id: driveFile.id });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
