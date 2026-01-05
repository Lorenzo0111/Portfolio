import { resend } from "@/lib/resend";
import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

function sanitizeString(input: string, maxLength: number = 1000): string {
  return input.trim().substring(0, maxLength).replace(/[<>]/g, "");
}

export async function POST(req: Request) {
  try {
    const verification = await checkBotId();

    if (verification.isBot)
      return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const body = formData.get("body") as string;

    if (!name || !email || !body)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = sanitizeString(email, 254);
    const sanitizedBody = sanitizeString(body, 5000);

    if (!sanitizedName || !sanitizedEmail || !sanitizedBody)
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );

    const { error } = await resend.emails.send({
      to: [process.env.SUPPORT_EMAIL!],
      replyTo: sanitizedEmail,
      template: {
        id: "contact-form",
        variables: {
          TARGET_NAME: sanitizedName,
          TARGET_EMAIL: sanitizedEmail,
          TARGET_BODY: sanitizedBody,
        },
      },
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
