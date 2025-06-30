import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://lorenzo0111.me";
  const buildInfo = await fetch(`${baseUrl}/api/build-info`).then((res) =>
    res.json()
  );
  const buildTimestamp = new Date(buildInfo.buildTimestamp);

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
      url: `${baseUrl}/reviews`,
      lastModified: buildTimestamp,
      changeFrequency: "weekly",
      priority: 0.9,
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
    {
      url: `${baseUrl}/account`,
      lastModified: buildTimestamp,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    cacheStrategy: {
      ttl: 60 * 60,
      swr: 60 * 30,
    },
  });

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
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
  </url>`
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
