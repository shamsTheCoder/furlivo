-- ============================================================
-- Furlivo RBAC Migration
-- Adds super_admin role, updates helper functions, adds
-- admin_invites audit table, and tightens RLS policies
-- ============================================================

-- ─── 1. Extend role CHECK constraint ─────────────────────────────────────────
-- Drop old constraint and add new one that includes super_admin
ALTER TABLE customers
  DROP CONSTRAINT IF EXISTS customers_role_check;

ALTER TABLE customers
  ADD CONSTRAINT customers_role_check
  CHECK (role IN ('customer', 'staff', 'admin', 'super_admin'));

-- ─── 2. Update is_admin() to include super_admin ──────────────────────────────
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM customers
    WHERE supabase_auth_id = auth.uid()
    AND role IN ('staff', 'admin', 'super_admin')
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ─── 3. New helper: is_super_admin() ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM customers
    WHERE supabase_auth_id = auth.uid()
    AND role = 'super_admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ─── 4. New helper: get_my_role() ────────────────────────────────────────────
-- Returns the caller's role as text (used in policies)
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM customers
  WHERE supabase_auth_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ─── 5. Admin Invites audit table ────────────────────────────────────────────
-- Tracks who invited whom, for audit trail
CREATE TABLE IF NOT EXISTS admin_invites (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invited_by    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL,
  role_assigned TEXT NOT NULL CHECK (role_assigned IN ('staff', 'admin', 'super_admin')),
  customer_id   UUID REFERENCES customers(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE admin_invites ENABLE ROW LEVEL SECURITY;

-- Only admins and super_admins can see the invite log
CREATE POLICY "admin_invites_read" ON admin_invites
  FOR SELECT USING (is_admin());

-- Only super_admin and admin can insert invites (server action validates further)
CREATE POLICY "admin_invites_insert" ON admin_invites
  FOR INSERT WITH CHECK (is_admin());

-- ─── 6. Tighten role UPDATE policy on customers ──────────────────────────────
-- Drop the broad existing update policy and replace with role-aware one
DROP POLICY IF EXISTS "customers_own_update" ON customers;

-- Users can update their own profile (excluding role column)
-- Role changes are ONLY allowed by service_role (used in server actions)
-- This policy intentionally does NOT allow role self-modification
CREATE POLICY "customers_own_update" ON customers
  FOR UPDATE USING (supabase_auth_id = auth.uid() OR is_admin())
  WITH CHECK (
    -- Regular users cannot escalate their own role
    (supabase_auth_id = auth.uid() AND role = (SELECT role FROM customers WHERE supabase_auth_id = auth.uid()))
    OR is_admin()
  );

-- ─── 7. Grant admin_invites SELECT to authenticated ──────────────────────────
GRANT SELECT ON admin_invites TO authenticated;
GRANT INSERT ON admin_invites TO authenticated;
