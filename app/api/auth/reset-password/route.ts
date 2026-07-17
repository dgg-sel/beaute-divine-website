import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getClientIp, guard } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token y contraseña son requeridos" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const limited = await guard([
      { key: `reset:ip:${ip}`, limit: 10, windowSec: 3600 },
    ]);
    if (limited) return limited;

    // El token viaja crudo en el link; en la DB está el hash. Hasheamos el
    // entrante para buscarlo (mismo SHA-256 que en forgot-password).
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find token in DB
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
    });

    if (!resetToken) {
      return NextResponse.json({ message: "Token inválido" }, { status: 400 });
    }

    // Check expiration
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return NextResponse.json({ message: "El enlace ha expirado. Por favor solicita uno nuevo." }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Delete used token
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return NextResponse.json({ message: "Contraseña actualizada exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
