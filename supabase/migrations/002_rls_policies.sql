-- ============================================================
-- Furlivo Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ─── Helper: is_admin() ──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM customers
    WHERE supabase_auth_id = auth.uid()
    AND role IN ('admin', 'staff')
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ─── Products (public read, admin write) ─────────────────────────────────────
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (is_active = true OR is_admin());

CREATE POLICY "products_admin_all" ON products
  FOR ALL USING (is_admin());

-- ─── Product Variants (public read) ──────────────────────────────────────────
CREATE POLICY "variants_public_read" ON product_variants
  FOR SELECT USING (true);

CREATE POLICY "variants_admin_all" ON product_variants
  FOR ALL USING (is_admin());

-- ─── Customers (own data only, admins see all) ────────────────────────────────
CREATE POLICY "customers_own_read" ON customers
  FOR SELECT USING (supabase_auth_id = auth.uid() OR is_admin());

CREATE POLICY "customers_own_update" ON customers
  FOR UPDATE USING (supabase_auth_id = auth.uid() OR is_admin());

CREATE POLICY "customers_insert" ON customers
  FOR INSERT WITH CHECK (supabase_auth_id = auth.uid());

CREATE POLICY "customers_admin_delete" ON customers
  FOR DELETE USING (is_admin());

-- ─── Addresses ────────────────────────────────────────────────────────────────
CREATE POLICY "addresses_own" ON addresses
  FOR ALL USING (
    customer_id IN (
      SELECT id FROM customers WHERE supabase_auth_id = auth.uid()
    ) OR is_admin()
  );

-- ─── Orders ──────────────────────────────────────────────────────────────────
CREATE POLICY "orders_own_read" ON orders
  FOR SELECT USING (
    customer_id IN (
      SELECT id FROM customers WHERE supabase_auth_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "orders_insert_anon" ON orders
  FOR INSERT WITH CHECK (true); -- guests can create orders

CREATE POLICY "orders_admin_update" ON orders
  FOR UPDATE USING (is_admin());

-- ─── Order Items ──────────────────────────────────────────────────────────────
CREATE POLICY "order_items_own" ON order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (
        SELECT id FROM customers WHERE supabase_auth_id = auth.uid()
      )
    ) OR is_admin()
  );

CREATE POLICY "order_items_insert" ON order_items
  FOR INSERT WITH CHECK (true);

-- ─── Reviews (approved ones are public) ──────────────────────────────────────
CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (is_approved = true OR is_admin());

CREATE POLICY "reviews_insert" ON reviews
  FOR INSERT WITH CHECK (true); -- anyone can submit a review

CREATE POLICY "reviews_own_update" ON reviews
  FOR UPDATE USING (
    customer_id IN (
      SELECT id FROM customers WHERE supabase_auth_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "reviews_admin_delete" ON reviews
  FOR DELETE USING (is_admin());

-- ─── Blog Posts ───────────────────────────────────────────────────────────────
CREATE POLICY "blog_public_read" ON blog_posts
  FOR SELECT USING (is_published = true OR is_admin());

CREATE POLICY "blog_admin_all" ON blog_posts
  FOR ALL USING (is_admin());

-- ─── Discounts (admins only except validation) ────────────────────────────────
CREATE POLICY "discounts_admin_all" ON discounts
  FOR ALL USING (is_admin());

CREATE POLICY "discounts_public_read_active" ON discounts
  FOR SELECT USING (is_active = true);

-- ─── Newsletter (insert only, admin reads) ────────────────────────────────────
CREATE POLICY "newsletter_insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "newsletter_admin_read" ON newsletter_subscribers
  FOR SELECT USING (is_admin());
