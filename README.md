# NOVA MART WhatsApp Commerce

A production-minded, mobile-first storefront for businesses that take complete orders through WhatsApp. Customers browse a real catalog, persist a cart, validate delivery details, create an order, and open an official `wa.me` click-to-chat URL. The project includes a Prisma/PostgreSQL schema for moving persistence from the demo browser layer to a production repository.

## Features

- Responsive premium storefront, category browsing, search, sorting, product detail pages, and related products.
- Persistent guest cart with server-validated checkout shape and safe WhatsApp URL generation.
- Human-readable order numbers and reusable message generation in `lib/whatsapp/order-message.ts`.
- Protected demo admin area for overview, order operations, catalog visibility, and business settings.
- Prisma schema for users, categories, products, variants, order snapshots, and business settings.
- TypeScript strict mode, Vitest utility tests, environment example, and Vercel-compatible Next.js setup.

## Requirements

Node.js 20+, npm, and PostgreSQL for production persistence.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

The storefront runs immediately with the included demo catalog. The current demo checkout persists orders in the browser so the experience can be evaluated without a database. The Prisma schema is ready for connecting API/server actions to PostgreSQL.

Demo admin login: `admin@novamart.demo` / `Admin123!`. This is for development only and must be replaced with hashed-password authentication before production.

## Environment variables

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `AUTH_SECRET`: secret for the production Auth.js/session implementation.
- `NEXT_PUBLIC_APP_URL`: canonical site URL for metadata and deployment.
- `WHATSAPP_BUSINESS_NUMBER`: digits-only international business number, for example `923001234567`.

## Database and production hardening

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
```

Before production, replace the demo browser order adapter with Prisma transactions that re-read product price/stock on the server, create `OrderItem` snapshots, enforce idempotency, and decrement stock atomically. Add Auth.js or an equivalent secure session provider for the `/admin` boundary and store only password hashes. These boundaries are intentionally isolated so the demo can run without credentials while the database contract is already defined.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Vercel deployment

1. Push this repository to GitHub, for example `whatsapp-ordering-store`.
2. Import the repository into Vercel using the Next.js preset.
3. Add `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, and `WHATSAPP_BUSINESS_NUMBER` to Production environment variables.
4. Run `npx prisma migrate deploy` against the production PostgreSQL database, then deploy.
5. Verify product pages, cart, checkout validation, WhatsApp URL, and admin protection on the production domain.

GitHub commands:

```bash
git init
```

No real credentials, database URLs, or secrets belong in this repository. Use `.env.example` as the deployment checklist.

## Architecture

The single-store demo centralizes settings in `lib/data.ts`, keeps cart state in `components/cart-provider.tsx`, and isolates WhatsApp formatting in `lib/whatsapp/order-message.ts`. The Prisma model uses product and variant snapshots in order items so historical orders remain correct after catalog edits. This gives a clean path to multi-tenant expansion by adding `storeId` to business-owned models and scoping repositories by tenant.
