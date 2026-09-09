ALTER TABLE "BusinessSettings" ADD COLUMN "contactNumbers" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "BusinessSettings" ADD COLUMN "description" TEXT;
ALTER TABLE "BusinessSettings" ADD COLUMN "socialLinks" JSONB;
ALTER TABLE "BusinessSettings" ALTER COLUMN "businessName" SET DEFAULT 'SJ H.F.C';
