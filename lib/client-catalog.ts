import { Product } from "./types";
import { products as fallbackProducts } from "./data";
type DatabaseProduct = Product & { category: { name: string; slug: string }; images: { url: string; alt: string | null }[] };
export function normalizeProduct(product: DatabaseProduct): Product { return { ...product, category: product.category.slug, image: product.images?.[0]?.url || "", rating: product.rating || 5, reviews: product.reviews || 0, variants: product.variants || [] }; }
export async function fetchProducts(query = "") {
  try {
    const response = await fetch(`/api/products${query ? `?${query}` : ""}`);
    if (!response.ok) throw new Error("Catalog unavailable");
    const databaseProducts = (await response.json() as DatabaseProduct[]).map(normalizeProduct);
    if (databaseProducts.length) return databaseProducts;
  } catch { /* The starter catalog keeps the storefront usable before seeding. */ }
  const params = new URLSearchParams(query);
  return fallbackProducts.filter((product) => (!params.get("category") || product.category === params.get("category")) && (!params.get("featured") || product.featured));
}
