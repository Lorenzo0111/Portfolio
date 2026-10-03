import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
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

  try {
    // Only pending invites are visible, and never the file URL itself
    const file = await prisma.driveFile.findFirst({
      where: {
        id,
        userId: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!file) {
      return NextResponse.json(
        { error: "Invite not found or already claimed" },
        { status: 404 },
      );
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }
}
