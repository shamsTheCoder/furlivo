# 🐾 Furlivo — Premium Pet Grooming Store

A full-stack dropshipping storefront + admin panel for the **Furlivo** brand, built with a modern NX monorepo.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Storefront | Next.js 15 (App Router, ISR) |
| Admin Panel | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Serverless | Supabase Edge Functions (Deno) |
| Payments | Stripe |
| Email | Resend |
| State | Zustand |
| Validation | Zod |
| Monorepo | NX + npm workspaces |

## Project Structure

```
furlivo/
├── apps/
│   ├── storefront/          # furlivo.shop (port 3000)
│   └── admin/               # admin.furlivo.shop (port 3001)
├── packages/
│   ├── types/               # Shared TypeScript types
│   ├── schemas/             # Shared Zod schemas
│   ├── database/            # DB utilities
│   ├── ui/                  # Shared UI components
│   └── config/              # Shared config
├── supabase/
│   ├── migrations/          # SQL migrations (run in order)
│   └── functions/           # Edge Functions
│       ├── order-fulfillment/
│       ├── abandoned-cart/
│       └── supplier-sync/
└── package.json             # Root workspace config
```

## Getting Started

### 1. Clone & Install
```bash
git clone <repo>
cd furlivo
npm install
```

### 2. Environment Variables
```bash
cp .env.example apps/storefront/.env.local
cp .env.example apps/admin/.env.local
# Fill in your Supabase, Stripe, and Resend credentials
```

### 3. Database Setup
```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Start local Supabase
npm run supabase:start

# Apply migrations
npm run supabase:reset
```

### 4. Run Dev Servers
```bash
# Storefront only (localhost:3000)
npm run dev:storefront

# Admin only (localhost:3001)
npm run dev:admin

# Both simultaneously
npm run dev
```

## Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Copy URL + anon key + service role key to `.env.local`
3. Run migrations from `supabase/migrations/` in order
4. Deploy Edge Functions:
   ```bash
   supabase functions deploy order-fulfillment
   supabase functions deploy abandoned-cart
   supabase functions deploy supplier-sync
   ```

## Stripe Webhooks

Point your Stripe webhook to: `https://furlivo.shop/api/webhooks/stripe`

Required events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## Deployment

Both apps deploy to **Vercel**:
```bash
vercel --cwd apps/storefront
vercel --cwd apps/admin
```

## Domain Setup

| App | Domain |
|-----|--------|
| Storefront | furlivo.shop |
| Admin | admin.furlivo.shop |

---

Built with ❤️ for Furlivo — spa-quality grooming for the pet you love.
# furlivo
