import { type Locale, locales } from "@/lib/i18n";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = body?.lang;

  if (typeof lang !== "string" || !locales.includes(lang as Locale)) {
    return NextResponse.json(
      { error: "Missing or invalid 'lang' field" },
      {
        status: 400,
      },
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("lang", lang, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ message: "Language set successfully" });
}
