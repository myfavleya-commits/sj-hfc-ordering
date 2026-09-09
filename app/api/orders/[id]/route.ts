import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) { const session = await auth(); if (!session?.user || !["ADMIN", "STAFF"].includes(session.user.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await context.params; const body = await request.json(); const order = await prisma.order.update({ where: { id }, data: { status: body.status, notes: body.notes } }); return NextResponse.json(order); }
