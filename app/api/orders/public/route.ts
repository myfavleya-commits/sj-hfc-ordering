import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
export async function GET(request: NextRequest) { const orderNumber = request.nextUrl.searchParams.get("orderNumber"); if (!orderNumber) return NextResponse.json({ error: "Missing order number" }, { status: 400 }); const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true } }); if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 }); return NextResponse.json(order); }
