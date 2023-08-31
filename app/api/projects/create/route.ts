import { auth, clerkClient } from "@clerk/nextjs";
import * as vercelBlob from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const form = await request.formData();
  const files = form.getAll("file") as File[];
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const category = form.get("category") as string;
  const link = form.get("link") as string;

  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user?.publicMetadata.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!files || files.length === 0 || !name || !description || !category) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const newName = name.trim();
  let project = await prisma.project.findFirst({
    where: {
      name: newName,
    },
  });

  if (project) {
    return new Response(JSON.stringify({ error: "Project already exists" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fileUrls = [];
  for (const file of files) {
    const blob = await vercelBlob.put(file.name, file, {
      access: "public",
    });
    fileUrls.push(blob.url);
  }

  project = await prisma.project.create({
    data: {
      name: newName,
      description,
      images: fileUrls,
      category,
      link,
    },
  });

  return NextResponse.json(project);
}
