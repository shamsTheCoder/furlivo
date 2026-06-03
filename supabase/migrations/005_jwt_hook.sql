-- ============================================================
-- Furlivo Migration 005: JWT Custom Claims Hook
--
-- Embeds the user's role into every Supabase JWT at sign-in
-- time. Middleware can then read the role directly from the
-- validated JWT instead of making an extra database query on
-- every request.
--
-- IMPORTANT — after running this migration you MUST register
-- the hook in the Supabase Dashboard:
--   Authentication → Hooks → Custom Access Token Hook
--   → Select function: public.custom_access_token_hook
-- ============================================================

-- ─── 1. Create the hook function ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims    jsonb;
  user_role text;
BEGIN
  -- Look up this user's role. Falls back to 'customer' if not found.
  SELECT role
  INTO   user_role
  FROM   public.customers
  WHERE  supabase_auth_id = (event ->> 'user_id')::uuid;

  -- Attach the role as app_role inside the JWT claims
  claims := event -> 'claims';
  claims := jsonb_set(
    claims,
    '{app_role}',
    to_jsonb(COALESCE(user_role, 'customer'))
  );

  RETURN jsonb_set(event, '{claims}', claims);
END;
$$;

-- ─── 2. Grant supabase_auth_admin permission to call the hook ─────────────────
-- The auth system runs as supabase_auth_admin — it must be able to read
-- the customers table to fetch the role.
GRANT USAGE  ON SCHEMA public               TO supabase_auth_admin;
GRANT SELECT ON public.customers            TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) TO supabase_auth_admin;

-- ─── 3. Revoke execute from public (least-privilege) ─────────────────────────
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) FROM PUBLIC;
