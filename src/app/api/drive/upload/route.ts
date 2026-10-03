import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import supabase from "@/lib/supabase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const name = form?.get("name");
  const description = form?.get("description");
  const ownerId = form?.get("ownerId");

  if (
    !(file instanceof File) ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    !name.trim() ||
    !description.trim()
  ) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  if (ownerId) {
    const owner =
      typeof ownerId === "string"
        ? await prisma.user.findUnique({
            where: { id: ownerId },
            select: { id: true },
          })
        : null;

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }
  }

  const driveFile = await prisma.driveFile.create({
    data: {
      name: name.trim(),
      fileName: file.name,
      mimeType: file.type,
      description: description.trim(),
      userId: typeof ownerId === "string" && ownerId ? ownerId : null,
    },
  });

  const { error } = await supabase.storage
    .from("drive")
    .upload(driveFile.id, file, {
      contentType: file.type,
    });

  if (error) {
    // Don't leave a record pointing at a file that was never stored
    await prisma.driveFile
      .delete({ where: { id: driveFile.id } })
      .catch(console.error);

    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      },
    );
  }

  const url = supabase.storage.from("drive").getPublicUrl(driveFile.id)
    .data.publicUrl;

  await prisma.driveFile.update({
    where: {
      id: driveFile.id,
    },
    data: {
      fileUrl: url,
    },
  });

  return NextResponse.json({
    id: driveFile.id,
  });
}
