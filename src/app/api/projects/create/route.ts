import { translateDescription } from "@/lib/ai";
import { indexKnowledge } from "@/lib/chat/vector";
import { auth } from "@/lib/auth";
import { normalizeCategoryCsv, parseCategoryCsv } from "@/lib/categories";
import { defaultLocale, locales } from "@/lib/i18n";
import prisma from "@/lib/prismadb";
import supabase from "@/lib/supabase";
import { headers } from "next/headers";
import { after, NextResponse } from "next/server";

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function sanitizeFileName(name: string) {
  return (
    name
      .trim()
      .replaceAll(" ", "-")
      .replace(/[^\w.-]/g, "")
      .replace(/\.{2,}/g, ".") || "file"
  );
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const files = (form?.getAll("file") ?? []).filter(
    (file): file is File => file instanceof File,
  );
  const name = form?.get("name");
  const description = form?.get("description");
  const category = form?.get("category");
  const link = form?.get("link") || null;
  const youtube = form?.get("youtube") || null;

  if (
    files.length === 0 ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string" ||
    !name.trim() ||
    !description
  ) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  if (link !== null && (typeof link !== "string" || !isHttpUrl(link))) {
    return NextResponse.json(
      { error: "Website must be a valid http(s) URL" },
      { status: 400 },
    );
  }

  if (
    youtube !== null &&
    (typeof youtube !== "string" || !/^[\w-]{11}$/.test(youtube))
  ) {
    return NextResponse.json(
      { error: "YouTube must be a video ID, not a full URL" },
      { status: 400 },
    );
  }

  if (parseCategoryCsv(category).length === 0) {
    return NextResponse.json(
      { error: "At least one category is required" },
      { status: 400 },
    );
  }

  const normalizedCategory = normalizeCategoryCsv(category);
  const newName = name.trim();
  const existing = await prisma.project.findFirst({
    where: {
      name: newName,
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Project already exists" },
      { status: 400 },
    );
  }

  const translations = await Promise.all(
    locales
      .filter((l) => l !== defaultLocale)
      .map(async (locale) => {
        try {
          return [
            locale,
            await translateDescription(description, locale),
          ] as const;
        } catch (error) {
          console.error(`Failed to translate description to ${locale}`, error);
          return null;
        }
      }),
  );

  const project = await prisma.project.create({
    data: {
      name: newName,
      description,
      category: normalizedCategory,
      link,
      youtube,
      translations: Object.fromEntries(translations.filter((t) => t !== null)),
    },
  });

  const fileUrls = [];
  const uploadedPaths = [];
  let thumbnail;
  for (const file of files) {
    const { error, data } = await supabase.storage
      .from("projects")
      .upload(`${project.id}/${sanitizeFileName(file.name)}`, file, {
        contentType: file.type,
      });

    if (error) {
      if (uploadedPaths.length > 0)
        await supabase.storage.from("projects").remove(uploadedPaths);
      await prisma.project
        .delete({ where: { id: project.id } })
        .catch(console.error);

      return NextResponse.json(
        { error: error.message },
        {
          status: 500,
        },
      );
    }

    uploadedPaths.push(data.path);

    const url = supabase.storage.from("projects").getPublicUrl(data.path)
      .data.publicUrl;

    if (file.name === "thumbnail.png") thumbnail = url;
    else fileUrls.push(url);
  }

  const updated = await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      images: fileUrls,
      thumbnail,
    },
  });

  // Keep the chatbot knowledge in sync with the new project
  after(() =>
    indexKnowledge().catch((error) =>
      console.error("Failed to index knowledge", error),
    ),
  );

  return NextResponse.json(updated);
}
