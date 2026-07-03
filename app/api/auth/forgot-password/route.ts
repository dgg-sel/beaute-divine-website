import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Correo electrónico requerido" }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return NextResponse.json({ message: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña." }, { status: 200 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to DB
    await prisma.passwordResetToken.create({
      data: {
        email: emailLower,
        token,
        expires,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    try {
      const { sendEmail } = await import("@/lib/email");
      await sendEmail({
        to: emailLower,
        subject: "Restablece tu contraseña - Beauté Divine Espace",
        html: `
          <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #6C543A; text-transform: uppercase; letter-spacing: 2px;">Restablecer Contraseña</h2>
            <p>Hola${user.name ? ` ${user.name}` : ""},</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Beauté Divine Espace.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña. Este enlace es válido por 1 hora:</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #6C543A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">
                Restablecer mi contraseña
              </a>
            </div>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <p style="margin-top: 40px; font-size: 12px; color: #999;">
              Saludos,<br>
              El equipo de Beauté Divine Espace
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error enviando correo:", emailError);
      return NextResponse.json({ message: "Error al enviar el correo de recuperación. Por favor, asegúrate de que el servicio de correo esté configurado." }, { status: 500 });
    }

    return NextResponse.json({ message: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
