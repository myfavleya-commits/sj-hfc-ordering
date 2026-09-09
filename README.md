# SJ H.F.C WhatsApp Commerce

A full-stack, mobile-first storefront for businesses that take complete orders through WhatsApp. Catalog, settings, users, orders, inventory, and order status are persisted in PostgreSQL through Prisma. Customers keep only temporary cart state in the browser, while checkout is revalidated and committed server-side.

The initial menu structure is based on the SJ H.F.C visiting-card reference: `شوارما` (Shawarma), `برگر` (Burger), `پیزا` (Pizza), `سینڈوچ` (Sandwich), `ملک شیک` (Milkshake), `جوس` (Juice), and `فرائز` (Fries). Urdu labels are preserved in the database alongside English transliterations. The card does not provide a verified digital product/pricing dataset in this repository, so no generic sample item is presented as a real SJ H.F.C menu item; the seeded sample records are inactive and marked as demo-only for admin replacement.

## Features

- Responsive premium storefront, category browsing, search, sorting, product detail pages, and related products.
- Persistent guest cart with server-validated checkout shape and safe WhatsApp URL generation.
- Human-readable order numbers and reusable message generation in `lib/whatsapp/order-message.ts`.
- Auth.js credentials authentication with server-side role checks and protected admin routes.
- Admin order status management, product/category creation, catalog visibility, and business settings.
- Prisma schema and migration for users, categories, products, variants, order snapshots, inventory, and business settings.
- TypeScript strict mode, Vitest utility tests, environment example, and Vercel-compatible Next.js setup.

## Requirements

Node.js 20+, npm, and PostgreSQL for production persistence.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

The application requires PostgreSQL for the storefront and admin data APIs. The guest cart is the only browser-persisted state.

Run `npm run db:seed` to create the development admin at `admin@sjhfc.demo`. It uses `DEMO_ADMIN_PASSWORD`; if omitted it defaults to `Admin123!`. Change it before production and never expose it in a public UI.

## Environment variables

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `AUTH_SECRET`: secret for the production Auth.js/session implementation.
- `NEXT_PUBLIC_APP_URL`: canonical site URL for metadata and deployment.
- `WHATSAPP_BUSINESS_NUMBER`: seed fallback digits-only international business number. Runtime WhatsApp configuration is read from `BusinessSettings`.
- `DEMO_ADMIN_PASSWORD`: optional password used only by the development seed.

## Database setup

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Order creation uses a serializable Prisma transaction. It re-reads active products and variants, validates current stock and prices, calculates totals from database values, creates snapshot order items, and decrements stock. Stock is reserved at order creation and is not restored automatically on cancellation.

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

The guest cart remains in `components/cart-provider.tsx`. `lib/catalog.ts` and the API routes read the PostgreSQL catalog. `lib/order-service.ts` owns server-side validation, transactional pricing, inventory, idempotency, and order snapshots. `lib/whatsapp/order-message.ts` only formats a server-created order. Auth.js credentials are implemented in `auth.ts`, with edge-safe route authorization in `auth.config.ts`. The Prisma model uses product and variant snapshots in order items so historical orders remain correct after catalog edits.
