import { auth, clerkClient } from "@clerk/nextjs/server";
import * as vercelBlob from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const ownerId = form.get("ownerId") as string;

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

  if (!file || !name || !description) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (ownerId) {
    try {
      await clerkClient.users.getUser(ownerId);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Owner not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  const driveFile = await prisma.driveFile.create({
    data: {
      name,
      fileName: file.name,
      mimeType: file.type,
      description,
      userId: ownerId ? ownerId : null,
    },
  });

  const blob = await vercelBlob.put(file.name, file, {
    access: "public",
  });

  await prisma.driveFile.update({
    where: {
      id: driveFile.id,
    },
    data: {
      fileUrl: blob.url,
    },
  });

  return NextResponse.json({
    id: driveFile.id,
  });
}
