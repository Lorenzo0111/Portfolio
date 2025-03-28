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
  const youtube = form.get("youtube") as string;

  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const clerk = await clerkClient();
  const user = userId ? await clerk.users.getUser(userId) : null;
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
      youtube,
    },
  });

  const fileUrls = [];
  let thumbnail;
  for (const file of files) {
    const { error, data } = await supabase.storage
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

    const url = supabase.storage.from("projects").getPublicUrl(data.path)
      .data.publicUrl;

    if (file.name === "thumbnail.png") thumbnail = url;
    else fileUrls.push(url);
  }

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      images: fileUrls,
      thumbnail,
    },
  });

  return NextResponse.json(project);
}
