import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({ ...authConfig, session: { strategy: "jwt" }, providers: [Credentials({ credentials: { email: {}, password: {} }, async authorize(credentials) { const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(credentials); if (!parsed.success) return null; const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } }); if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null; return { id: user.id, name: user.name, email: user.email, role: user.role }; } })], callbacks: { ...authConfig.callbacks, async jwt({ token, user }) { if (user) token.role = user.role; return token; }, async session({ session, token }) { if (session.user) { session.user.id = token.sub || ""; session.user.role = token.role as "ADMIN" | "STAFF"; } return session; } } });
