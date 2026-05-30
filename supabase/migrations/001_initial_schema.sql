-- ============================================================
-- Furlivo Database Schema
-- Run via: supabase db reset (applies all migrations in order)
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for full-text search

-- ─── Customers ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  phone         TEXT,
  role          TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_auth_id ON customers(supabase_auth_id);

-- ─── Products ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL DEFAULT '',
  short_description TEXT,
  price             INTEGER NOT NULL CHECK (price >= 0), -- stored in cents
  compare_price     INTEGER CHECK (compare_price >= 0),
  images            JSONB NOT NULL DEFAULT '[]',
  tags              TEXT[] NOT NULL DEFAULT '{}',
  supplier_sku      TEXT,
  supplier_cost     INTEGER,
  inventory         INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  meta_title        TEXT,
  meta_description  TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_name_trgm ON products USING gin(name gin_trgm_ops);

-- ─── Product Variants ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sku         TEXT NOT NULL UNIQUE,
  price       INTEGER NOT NULL CHECK (price >= 0),
  stock       INTEGER NOT NULL DEFAULT 0,
  attributes  JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ─── Addresses ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS addresses (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id  UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type         TEXT NOT NULL DEFAULT 'shipping' CHECK (type IN ('shipping', 'billing')),
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  company      TEXT,
  line1        TEXT NOT NULL,
  line2        TEXT,
  city         TEXT NOT NULL,
  state        TEXT NOT NULL,
  country      TEXT NOT NULL DEFAULT 'US',
  zip          TEXT NOT NULL,
  phone        TEXT,
  is_default   BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_addresses_customer ON addresses(customer_id);

-- ─── Discounts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discounts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code        TEXT NOT NULL UNIQUE,
  type        TEXT NOT NULL CHECK (type IN ('percent', 'fixed')),
  value       INTEGER NOT NULL, -- percent: 0-100, fixed: cents
  min_order   INTEGER,
  max_uses    INTEGER,
  uses_count  INTEGER NOT NULL DEFAULT 0,
  expires_at  TIMESTAMPTZ,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_discounts_code ON discounts(code);

-- ─── Orders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number              TEXT NOT NULL UNIQUE,
  customer_id               UUID REFERENCES customers(id) ON DELETE SET NULL,
  guest_email               TEXT,
  status                    TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  shipping_address          JSONB NOT NULL,
  billing_address           JSONB,
  subtotal                  INTEGER NOT NULL DEFAULT 0,
  shipping_amount           INTEGER NOT NULL DEFAULT 0,
  tax_amount                INTEGER NOT NULL DEFAULT 0,
  discount_amount           INTEGER NOT NULL DEFAULT 0,
  total                     INTEGER NOT NULL DEFAULT 0,
  stripe_payment_intent_id  TEXT,
  supplier_order_id         TEXT,
  tracking_number           TEXT,
  carrier                   TEXT,
  discount_id               UUID REFERENCES discounts(id),
  notes                     TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ─── Order Items ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id    UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  variant_name  TEXT,
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  unit_price    INTEGER NOT NULL,
  total_price   INTEGER NOT NULL,
  image_url     TEXT
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ─── Reviews ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id     UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name   TEXT NOT NULL,
  rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title           TEXT,
  body            TEXT NOT NULL,
  images          TEXT[] DEFAULT '{}',
  is_verified     BOOLEAN NOT NULL DEFAULT false,
  is_approved     BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);

-- ─── Blog Posts ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  body            TEXT NOT NULL DEFAULT '',
  excerpt         TEXT,
  cover_image     TEXT,
  author          TEXT NOT NULL DEFAULT 'Furlivo Team',
  tags            TEXT[] NOT NULL DEFAULT '{}',
  is_published    BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMPTZ,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at DESC);

-- ─── Newsletter Subscribers ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL UNIQUE,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Updated_at Trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_blog_updated_at
  BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Order Number Generator ───────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'FRL-' || LPAD(nextval('order_number_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_number
  BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION generate_order_number();
