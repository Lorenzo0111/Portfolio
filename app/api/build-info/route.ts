import { NextResponse } from "next/server";

export const dynamic = "force-static";

const BUILD_TIMESTAMP = new Date().getTime();

export async function GET() {
  const buildInfo = {
    buildTimestamp: BUILD_TIMESTAMP,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
  };

  return NextResponse.json(buildInfo, {
    headers: {
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
