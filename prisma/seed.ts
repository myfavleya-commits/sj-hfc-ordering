import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products, settings } from "../lib/data";
const prisma = new PrismaClient();
async function main() {
  for (const category of categories) await prisma.category.upsert({ where: { slug: category.slug }, update: { name: category.name, description: category.description, isActive: true }, create: { id: category.id, name: category.name, slug: category.slug, description: category.description } });
  for (const product of products) { const category = await prisma.category.findUniqueOrThrow({ where: { id: product.category } }); await prisma.product.upsert({ where: { slug: product.slug }, update: { name: product.name, description: product.description, sku: product.sku, price: product.price, compareAtPrice: product.compareAtPrice, stock: product.stock, isFeatured: Boolean(product.featured), isActive: true, categoryId: category.id }, create: { id: product.id, name: product.name, slug: product.slug, description: product.description, shortDescription: product.description.slice(0, 120), sku: product.sku, price: product.price, compareAtPrice: product.compareAtPrice, stock: product.stock, isFeatured: Boolean(product.featured), categoryId: category.id, images: { create: { url: product.image, alt: product.name } } } }); }
  await prisma.businessSettings.upsert({ where: { id: "default" }, update: { businessName: settings.businessName, whatsappNumber: settings.whatsapp, currency: settings.currency, deliveryFee: settings.deliveryFee }, create: { id: "default", businessName: settings.businessName, whatsappNumber: settings.whatsapp, currency: settings.currency, deliveryFee: settings.deliveryFee, announcement: "Free delivery on orders over Rs. 5,000 · Direct to WhatsApp" } });
  const passwordHash = await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD || "Admin123!", 12); await prisma.user.upsert({ where: { email: "admin@novamart.demo" }, update: { passwordHash, role: "ADMIN" }, create: { name: "NOVA MART Admin", email: "admin@novamart.demo", passwordHash, role: "ADMIN" } });
}
main().finally(() => prisma.$disconnect());
