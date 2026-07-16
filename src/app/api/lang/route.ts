import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!("lang" in body) || !body.lang || typeof body.lang !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'lang' field" },
      {
        status: 400,
      },
    );
  }

  const lang = body.lang;

  const cookieStore = await cookies();

  cookieStore.set("lang", lang, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  return NextResponse.json({ message: "Language set successfully" });
}
