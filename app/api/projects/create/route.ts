import prisma from "@/lib/prismadb";
import supabase from "@/lib/supabase";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

  const user = userId ? await clerkClient().users.getUser(userId) : null;
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

  project = await prisma.project.create({
    data: {
      name: newName,
      description,
      category,
      link,
    },
  });

  const fileUrls = [];
  for (const file of files) {
    const { error } = await supabase.storage
      .from("projects")
      .upload(`${project.id}/${file.name.trim().replaceAll(" ", "-")}`, file, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 500,
        }
      );
    }

    const url = supabase.storage.from("projects").getPublicUrl(file.name);
    fileUrls.push(url.data.publicUrl);
  }

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      images: fileUrls.filter((url) => !url.endsWith("thumbnail.png")),
      thumbnail: fileUrls.find((url) => url.endsWith("thumbnail.png")),
    },
  });

  return NextResponse.json(project);
}
