import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getSettings } from "../../../lib/catalog";
import { prisma } from "../../../lib/prisma";
export async function GET() { const settings = await getSettings(); return NextResponse.json(settings); }
export async function PATCH(request: NextRequest) { const session = await auth(); if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const body = await request.json(); const settings = await prisma.businessSettings.update({ where: { id: "default" }, data: { businessName: body.businessName, whatsappNumber: body.whatsappNumber, currency: body.currency, deliveryFee: Number(body.deliveryFee), minimumOrder: Number(body.minimumOrder || 0), announcement: body.announcement, address: body.address, phone: body.phone, email: body.email } }); return NextResponse.json(settings); }
