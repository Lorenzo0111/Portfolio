import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import supabase from "@/lib/supabase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const file = await prisma.driveFile.findUnique({
    where: { id },
  });

  if (
    !file ||
    (file.userId !== session.user.id && session.user.role !== "admin")
  ) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Short-lived link, so downloads keep working with a private bucket
  const { data, error } = await supabase.storage
    .from("drive")
    .createSignedUrl(file.id, 60, { download: file.fileName });

  if (error || !data) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create download link" },
      { status: 500 },
    );
  }

  return NextResponse.redirect(data.signedUrl);
}
