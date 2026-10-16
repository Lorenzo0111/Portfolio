import {
  getChatQuota,
  isRateLimitConfigured,
  USER_DAILY_LIMIT,
} from "@/lib/chat/ratelimit";
import { isTurnstileConfigured } from "@/lib/chat/turnstile";
import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const headers = { "Cache-Control": "private, no-store" };

  if (
    !process.env.OPENROUTER_API_KEY ||
    !isRateLimitConfigured() ||
    !isTurnstileConfigured()
  )
    return NextResponse.json({ available: false }, { headers });

  try {
    const quota = await getChatQuota(ipAddress(req) ?? "unknown");

    return NextResponse.json(
      {
        available: quota.globalRemaining > 0,
        remaining: quota.remaining,
        limit: USER_DAILY_LIMIT,
        reset: quota.reset,
      },
      { headers },
    );
  } catch (error) {
    console.error("Failed to load chat status", error);
    return NextResponse.json({ available: false }, { headers });
  }
}
