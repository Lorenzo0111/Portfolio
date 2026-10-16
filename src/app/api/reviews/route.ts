import { fetchReviews, VouchleyError } from "@/lib/vouchley";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await fetchReviews();

    return NextResponse.json(user, {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: error instanceof VouchleyError ? error.status : 502 },
    );
  }
}
