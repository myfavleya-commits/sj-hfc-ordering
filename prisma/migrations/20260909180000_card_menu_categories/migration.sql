ALTER TABLE "Category" ADD COLUMN "nameUrdu" TEXT;
ALTER TABLE "Category" ADD COLUMN "nameEnglish" TEXT;
ALTER TABLE "Product" ADD COLUMN "isDemo" BOOLEAN NOT NULL DEFAULT false;
UPDATE "Product" SET "isActive" = false, "isFeatured" = false, "isDemo" = true, "stock" = 0 WHERE "sku" LIKE 'SJF-DEMO%' OR "sku" LIKE 'NM-%';
