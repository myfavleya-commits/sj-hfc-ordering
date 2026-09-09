import { Prisma, PrismaClient } from "@prisma/client";
import { randomInt } from "node:crypto";
import { z } from "zod";
import { prisma } from "./prisma";

export const orderInputSchema = z.object({ customerName: z.string().trim().min(2).max(100), phone: z.string().trim().regex(/^(\+?92|0)3\d{9}$/), address: z.string().trim().min(5).max(300), city: z.string().trim().min(2).max(80), landmark: z.string().trim().max(120).optional(), notes: z.string().trim().max(500).optional(), items: z.array(z.object({ productId: z.string().min(1), variantId: z.string().min(1).optional(), quantity: z.number().int().min(1).max(99) })).min(1).max(50), idempotencyKey: z.string().min(16).max(100).optional() });
export type OrderInput = z.infer<typeof orderInputSchema>;
export function makeOrderNumber() { const date = new Date().toISOString().slice(0, 10).replaceAll("-", ""); return `SJ-${date}-${randomInt(1000, 10000)}`; }

export async function createOrder(input: OrderInput, client: PrismaClient = prisma) {
  const parsed = orderInputSchema.parse(input);
  if (parsed.idempotencyKey) { const existing = await client.order.findUnique({ where: { idempotencyKey: parsed.idempotencyKey }, include: { items: true } }); if (existing) return existing; }
  return client.$transaction(async (tx) => {
    const settings = await tx.businessSettings.findUnique({ where: { id: "default" } });
    if (!settings) throw new Error("STORE_SETTINGS_MISSING");
    const grouped = new Map<string, number>();
    for (const item of parsed.items) { const key = `${item.productId}:${item.variantId || ""}`; grouped.set(key, (grouped.get(key) || 0) + item.quantity); }
    const verified = [];
    for (const [key, quantity] of grouped) {
      const [productId, variantId] = key.split(":");
      const product = await tx.product.findUnique({ where: { id: productId }, include: { variants: true } });
      if (!product || !product.isActive) throw new Error("PRODUCT_UNAVAILABLE");
      const variant = variantId ? product.variants.find((v) => v.id === variantId) : undefined;
      if (variantId && !variant) throw new Error("VARIANT_UNAVAILABLE");
      const stock = variant ? variant.stock : product.stock;
      if (stock < quantity) throw new Error("INSUFFICIENT_STOCK");
      verified.push({ product, variant, quantity });
    }
    const subtotal = verified.reduce((sum, item) => sum + (item.variant?.price ?? item.product.price) * item.quantity, 0);
    if (subtotal < settings.minimumOrder) throw new Error("MINIMUM_ORDER_NOT_MET");
    const order = await tx.order.create({ data: { orderNumber: makeOrderNumber(), idempotencyKey: parsed.idempotencyKey, customerName: parsed.customerName, customerPhone: parsed.phone, address: parsed.address, city: parsed.city, landmark: parsed.landmark, notes: parsed.notes, subtotal, deliveryFee: settings.deliveryFee, total: subtotal + settings.deliveryFee, items: { create: verified.map(({ product, variant, quantity }) => ({ productId: product.id, variantId: variant?.id, productNameSnapshot: product.name, skuSnapshot: variant?.sku ?? product.sku, price: variant?.price ?? product.price, quantity, subtotal: (variant?.price ?? product.price) * quantity, variantSnapshot: variant?.attributes ?? Prisma.JsonNull })) } }, include: { items: true } });
    for (const { product, variant, quantity } of verified) { if (variant) await tx.productVariant.update({ where: { id: variant.id }, data: { stock: { decrement: quantity } } }); else await tx.product.update({ where: { id: product.id }, data: { stock: { decrement: quantity } } }); }
    return order;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
