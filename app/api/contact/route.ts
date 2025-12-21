import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, botId } = body;

    // Check for Vercel bot protection
    if (botId !== process.env.VERCEL_BOT_ID) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 403 }
      );
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get environment variables
    const supportEmail = process.env.SUPPORT_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!supportEmail || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration in environment variables");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const port = parseInt(smtpPort);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    const escapeHtml = (unsafe: string) =>
      unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    await transporter.sendMail({
      from: smtpUser,
      to: supportEmail,
      replyTo: email,
      subject: `Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
