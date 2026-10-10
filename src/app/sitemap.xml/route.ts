import prisma from "@/lib/prismadb";
import { nameAsId } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://lorenzo0111.me";
  const buildTimestamp = await fetch(`${baseUrl}/api/build-info`)
    .then((res) => res.json())
    .then((buildInfo) => new Date(buildInfo.buildTimestamp))
    .then((date) => (isNaN(date.getTime()) ? new Date() : date))
    .catch(() => new Date());

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: buildTimestamp,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildTimestamp,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: buildTimestamp,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: buildTimestamp,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: buildTimestamp,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: buildTimestamp,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: buildTimestamp,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projects = await prisma.project.findMany({
    where: {
      hidden: false,
    },
    select: {
      name: true,
      updatedAt: true,
    },
  });

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${nameAsId(project.name)}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
