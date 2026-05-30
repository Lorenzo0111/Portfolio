import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import z from "zod";

const bodySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .transform((str) => str.replace(/<[^>]*>?/gm, "").trim()),
  email: z.email(),
  body: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body = bodySchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      body: formData.get("body"),
    });

    if (!body.success)
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );

    const { error } = await resend.emails.send({
      to: [process.env.SUPPORT_EMAIL!],
      replyTo: body.data.email,
      template: {
        id: "contact-form",
        variables: {
          TARGET_NAME: body.data.name,
          TARGET_EMAIL: body.data.email,
          TARGET_BODY: body.data.body,
        },
      },
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
