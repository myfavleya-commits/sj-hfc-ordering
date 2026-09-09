import { prisma } from "./prisma";

export const productInclude = { category: true, images: { orderBy: { sortOrder: "asc" as const } }, variants: true };
export async function listProducts(options: { category?: string; query?: string; featured?: boolean; includeInactive?: boolean } = {}) {
  return prisma.product.findMany({ where: { ...(options.includeInactive ? {} : { isActive: true }), ...(options.featured ? { isFeatured: true } : {}), ...(options.category && options.category !== "all" ? { category: { slug: options.category } } : {}), ...(options.query ? { OR: [{ name: { contains: options.query, mode: "insensitive" } }, { description: { contains: options.query, mode: "insensitive" } }] } : {}) }, include: productInclude, orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] });
}
export async function getProductBySlug(slug: string) { return prisma.product.findUnique({ where: { slug }, include: productInclude }); }
export async function listCategories(includeInactive = false) { return prisma.category.findMany({ where: includeInactive ? undefined : { isActive: true }, orderBy: { name: "asc" } }); }
export async function getSettings() { return prisma.businessSettings.findUnique({ where: { id: "default" } }); }
