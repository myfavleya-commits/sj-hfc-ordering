import { NextResponse } from "next/server";
import { getProductBySlug } from "../../../../lib/catalog";
export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) { const product = await getProductBySlug((await context.params).slug); return product ? NextResponse.json(product) : NextResponse.json({ error: "Product not found" }, { status: 404 }); }
