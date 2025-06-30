import type { VouchleyResponse } from "@/lib/vouchley";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.VOUCHLEY_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key not found" });

  const response = await fetch(
    "https://www.vouchley.com/api/v1/user?id=a84c1044-0371-4999-92db-3770429dc6ea",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();

    console.error("Failed to fetch reviews", error);
    return NextResponse.json({ error: "Failed to fetch reviews" });
  }

  const data: VouchleyResponse = await response.json();
  if (data.error) {
    console.error("Failed to fetch reviews", data.error);
    return NextResponse.json({ error: "Failed to fetch reviews" });
  }

  return NextResponse.json(data.user, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=3600",
    },
  });
}
