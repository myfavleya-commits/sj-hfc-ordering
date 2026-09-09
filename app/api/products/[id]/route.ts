import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";
async function guard() { const session = await auth(); return session?.user?.role === "ADMIN" || session?.user?.role === "STAFF"; }
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) { if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; const body = await request.json(); const product = await prisma.product.update({ where: { id }, data: { name: body.name, description: body.description, price: Number(body.price), stock: Number(body.stock), isActive: Boolean(body.isActive), isFeatured: Boolean(body.isFeatured), categoryId: body.categoryId } }); return NextResponse.json(product); }
