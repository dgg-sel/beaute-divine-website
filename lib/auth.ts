import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { consume, getClientIpFromHeaders } from "@/lib/rate-limit";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales inválidas");
        }

        // Rate-limit anti fuerza bruta. Dos cubetas: por IP (frena el spray a
        // muchas cuentas) y por email (frena el ataque dirigido a una cuenta).
        // Se evalúan ambas. Falla cerrado (ver lib/rate-limit.ts).
        const ip = getClientIpFromHeaders(
          req?.headers as Record<string, string | undefined> | undefined
        );
        const emailKey = credentials.email.toLowerCase().trim();
        const [ipCheck, emailCheck] = await Promise.all([
          consume({ key: `login:ip:${ip}`, limit: 30, windowSec: 600 }),
          consume({ key: `login:email:${emailKey}`, limit: 8, windowSec: 900 }),
        ]);
        if (!ipCheck.allowed || !emailCheck.allowed) {
          throw new Error("Demasiados intentos. Esperá unos minutos e intentá de nuevo.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado o contraseña incorrecta");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
};
