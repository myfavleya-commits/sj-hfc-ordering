import { NextRequest, NextResponse } from "next/server";
import { listCategories } from "../../../lib/catalog";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
export async function GET(request: NextRequest) { try { const includeInactive = request.nextUrl.searchParams.get("includeInactive") === "true"; if (includeInactive) { const session = await auth(); if (!session?.user || !["ADMIN", "STAFF"].includes(session.user.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); } return NextResponse.json(await listCategories(includeInactive)); } catch { return NextResponse.json({ error: "Categories unavailable" }, { status: 503 }); } }
export async function POST(request: Request) { const session = await auth(); if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const body = await request.json(); return NextResponse.json(await prisma.category.create({ data: { name: body.nameUrdu || body.name, nameUrdu: body.nameUrdu, nameEnglish: body.nameEnglish, slug: body.slug, description: body.description } }), { status: 201 }); }
