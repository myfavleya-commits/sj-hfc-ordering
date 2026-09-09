import { Product } from "./types";
type DatabaseProduct = Product & { category: { name: string; slug: string }; images: { url: string; alt: string | null }[] };
export function normalizeProduct(product: DatabaseProduct): Product { return { ...product, category: product.category.slug, image: product.images[0]?.url || "", rating: 5, reviews: 0, variants: product.variants }; }
export async function fetchProducts(query = "") { const response = await fetch(`/api/products${query ? `?${query}` : ""}`); if (!response.ok) throw new Error("Catalog unavailable"); return (await response.json() as DatabaseProduct[]).map(normalizeProduct); }
