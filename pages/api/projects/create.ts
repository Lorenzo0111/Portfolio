import nextConnect from "next-connect";
import multer from "multer";
import { uploadImage } from "@/lib/firebase";
import { NextApiResponse } from "next";
import { IncomingMessage } from "http";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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

apiRoute.use(upload.array("file"));

apiRoute.post(async (req: IncomingMessage, res: NextApiResponse) => {
  const { files } = req;
  const { name, description, category, link } = req.body;

  const session = await getServerSession(req as any, res, authOptions);
  if (session?.user?.id !== process.env.NEXT_PUBLIC_ADMIN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!files || files.length === 0 || !name || !description || !category) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const newName = name.trim();

  let project = await prisma.project.findFirst({
    where: {
      name: newName,
    },
  });

  if (project) {
    return res.status(400).json({ error: "Project already exists" });
  }

  const fileIds = [];
  for (const file of files) {
    const snapshot = await uploadImage(newName, file);
    fileIds.push(snapshot.metadata.name);
  }

  project = await prisma.project.create({
    data: {
      name: newName,
      description,
      images: fileIds,
      category,
      link,
    },
  });

  return res.status(200).json(project);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
