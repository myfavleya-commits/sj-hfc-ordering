import type { NextAuthConfig } from "next-auth";
export default { providers: [], pages: { signIn: "/admin/login" }, callbacks: { authorized({ auth, request }) { if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) return Boolean(auth?.user); return true; } } } satisfies NextAuthConfig;
