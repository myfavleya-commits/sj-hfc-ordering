import { describe, expect, it } from "vitest";
import { checkoutSchema } from "../lib/validation";
import { orderInputSchema } from "../lib/order-service";
import { normalizeProduct } from "../lib/client-catalog";

describe("customer input validation", () => {
  const customer = { customerName: "Ayesha Khan", phone: "03001234567", address: "12 Model Town", city: "Lahore" };

  it("accepts a complete Pakistani delivery form", () => {
    expect(checkoutSchema.safeParse(customer).success).toBe(true);
  });

  it("rejects invalid phone numbers and short addresses", () => {
    expect(checkoutSchema.safeParse({ ...customer, phone: "123" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...customer, address: "x" }).success).toBe(false);
  });

  it("rejects an order without products", () => {
    expect(orderInputSchema.safeParse({ ...customer, items: [] }).success).toBe(false);
  });

  it("normalizes a database product using its first image", () => {
    const product = normalizeProduct({
      id: "p1", slug: "classic", name: "Classic Burger", category: { name: "Burger", slug: "burger" },
      description: "A fresh burger", price: 450, stock: 5, sku: "BURG-1", images: [{ url: "/burger.jpg", alt: "Burger" }], variants: [],
    } as never);
    expect(product.category).toBe("burger");
    expect(product.image).toBe("/burger.jpg");
    expect(product.rating).toBe(5);
  });
});
