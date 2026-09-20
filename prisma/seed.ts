import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products, settings } from "../lib/data";

const prisma = new PrismaClient();
const iceCreamToppings = ["Sprinkles", "Chocolate Syrup", "Chopped Nuts", "Wafer/Pipe"];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, nameUrdu: category.nameUrdu, nameEnglish: category.nameEnglish, description: category.description, isActive: true },
      create: { id: category.id, name: category.name, nameUrdu: category.nameUrdu, nameEnglish: category.nameEnglish, slug: category.slug, description: category.description, isActive: true },
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: product.category } });
    const variants = product.category === "ice-cream"
      ? iceCreamToppings.map((name, index) => ({ name, sku: `${product.sku}-T${index + 1}`, price: 50, stock: 20, attributes: { type: "topping" } }))
      : [];
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name, description: product.description, shortDescription: product.description.slice(0, 120), sku: product.sku,
        price: product.price, stock: product.stock, isFeatured: Boolean(product.featured), isActive: true, isDemo: false, categoryId: category.id,
        images: { deleteMany: {}, create: { url: product.image, alt: product.name, sortOrder: 0 } },
        variants: { deleteMany: {}, create: variants },
      },
      create: {
        id: product.id, name: product.name, slug: product.slug, description: product.description, shortDescription: product.description.slice(0, 120),
        sku: product.sku, price: product.price, stock: product.stock, isFeatured: Boolean(product.featured), isActive: true, isDemo: false, categoryId: category.id,
        images: { create: { url: product.image, alt: product.name, sortOrder: 0 } },
        variants: { create: variants },
      },
    });
  }

  await prisma.businessSettings.upsert({
    where: { id: "default" },
    update: { businessName: settings.businessName, whatsappNumber: settings.whatsapp, contactNumbers: settings.contactNumbers, description: "Fresh local burgers, shawarma, pizza and treats.", currency: settings.currency, deliveryFee: settings.deliveryFee },
    create: { id: "default", businessName: settings.businessName, whatsappNumber: settings.whatsapp, contactNumbers: settings.contactNumbers, description: "Fresh local burgers, shawarma, pizza and treats.", currency: settings.currency, deliveryFee: settings.deliveryFee, announcement: "Assalam-o-Alaikum SJ H.F.C 👋" },
  });

  const password = process.env.DEMO_ADMIN_PASSWORD;
  if (!password || password === "Admin123!") throw new Error("Set a strong DEMO_ADMIN_PASSWORD before production seeding.");
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({ where: { email: "admin@sjhfc.demo" }, update: { passwordHash, role: "ADMIN" }, create: { name: "SJ H.F.C Admin", email: "admin@sjhfc.demo", passwordHash, role: "ADMIN" } });
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
