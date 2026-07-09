import nodemailer from "nodemailer";
import { env } from "@/lib/env";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: parseInt(env.smtpPort),
    secure: env.smtpPort === "465",
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"Beauté Divine Espace" <${env.smtpFrom}>`,
    to,
    subject,
    html,
  });
}
