import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, whatsapp, message } = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || "true") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER || "";
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `New inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp || "-"}

${message}`
    });
    return new Response(JSON.stringify({ ok: true, id: info.messageId }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Email failed" }), { status: 500 });
  }
}
