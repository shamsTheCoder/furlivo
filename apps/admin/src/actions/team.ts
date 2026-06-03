'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  type AdminRole,
  canCreateRole,
  canRemoveRole,
  isValidAdminRole,
} from '@/lib/rbac';

// ─── Shared Helpers ───────────────────────────────────────────────────────────

/** Service-role client — bypasses RLS, trusted server-only context */
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: { getAll: () => [], setAll: () => {} },
      auth: { persistSession: false },
    }
  );
}

/**
 * Validates the caller's session and returns their verified role.
 * Uses the anon client to validate the JWT, then reads the role from the
 * JWT's `app_role` custom claim (set by our DB hook) — no extra DB call.
 */
async function getCallerIdentity(): Promise<{ userId: string; role: AdminRole } | null> {
  const cookieStore = await cookies();
  const anonClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  // Cryptographically validates the JWT against Supabase servers
  const { data: { user } } = await anonClient.auth.getUser();
  if (!user) return null;

  // Read role from JWT claim (populated by custom_access_token_hook)
  const { data: { session } } = await anonClient.auth.getSession();
  const accessToken = session?.access_token ?? '';

  let role: string | undefined;
  try {
    const payload = JSON.parse(
      Buffer.from(
        accessToken.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/') ?? '',
        'base64'
      ).toString('utf-8')
    );
    role = payload?.app_role as string | undefined;
  } catch {
    role = undefined;
  }

  // Fallback: if JWT claim not yet populated (e.g. hook not yet enabled),
  // read from DB directly via service_role
  if (!isValidAdminRole(role)) {
    const service = createServiceClient();
    const { data: customer } = await service
      .from('customers')
      .select('role')
      .eq('supabase_auth_id', user.id)
      .single();
    role = customer?.role;
  }

  if (!isValidAdminRole(role)) return null;

  return { userId: user.id, role };
}

// ─── Action: Invite Team Member ───────────────────────────────────────────────

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function inviteTeamMember(
  email: string,
  role: AdminRole,
  firstName: string,
  lastName: string
): Promise<ActionResult> {
  // 1. Validate caller
  const caller = await getCallerIdentity();
  if (!caller) return { success: false, error: 'Unauthorized: You must be signed in.' };

  // 2. Enforce creation hierarchy
  if (!canCreateRole(caller.role, role)) {
    return {
      success: false,
      error: `Forbidden: A "${caller.role}" cannot assign the "${role}" role.`,
    };
  }

  const service = createServiceClient();

  // 3. Create auth user (no password — they'll set it via the emailed link)
  const { data: newUser, error: createError } = await service.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { first_name: firstName, last_name: lastName },
  });

  if (createError || !newUser.user) {
    return { success: false, error: createError?.message ?? 'Failed to create user account.' };
  }

  // 4. Insert into customers with the designated admin role
  const { error: insertError } = await service.from('customers').insert({
    supabase_auth_id: newUser.user.id,
    email,
    first_name: firstName,
    last_name: lastName,
    role,
  });

  if (insertError) {
    // Rollback: remove the orphaned auth user
    await service.auth.admin.deleteUser(newUser.user.id);
    return { success: false, error: `Database error: ${insertError.message}` };
  }

  // 5. Audit trail
  await service.from('admin_invites').insert({
    invited_by:   caller.userId,
    invited_email: email,
    role_assigned: role,
  });

  // 6. Send password-set link via email
  await service.auth.admin.generateLink({ type: 'recovery', email });

  return { success: true };
}

// ─── Action: List Team Members ────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  createdAt: string;
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  const caller = await getCallerIdentity();
  if (!caller) return [];

  const service = createServiceClient();
  const { data, error } = await service
    .from('customers')
    .select('id, supabase_auth_id, email, first_name, last_name, role, created_at')
    .in('role', ['super_admin', 'admin', 'staff'])
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((c) => ({
    id:         c.id,
    authId:     c.supabase_auth_id,
    email:      c.email,
    firstName:  c.first_name,
    lastName:   c.last_name,
    role:       c.role as AdminRole,
    createdAt:  c.created_at,
  }));
}

// ─── Action: Remove Team Member ───────────────────────────────────────────────

export async function removeTeamMember(customerId: string): Promise<ActionResult> {
  // 1. Validate caller
  const caller = await getCallerIdentity();
  if (!caller) return { success: false, error: 'Unauthorized.' };

  const service = createServiceClient();

  // 2. Fetch target
  const { data: target } = await service
    .from('customers')
    .select('role, supabase_auth_id')
    .eq('id', customerId)
    .single();

  if (!target) return { success: false, error: 'Team member not found.' };

  const targetRole = target.role as AdminRole;

  // 3. Prevent self-removal
  if (target.supabase_auth_id === caller.userId) {
    return { success: false, error: 'You cannot remove yourself.' };
  }

  // 4. Enforce removal hierarchy using canRemoveRole (strictly outrank target)
  //    This correctly handles: super_admin can remove admin and staff,
  //    admin can remove staff, nobody can remove a peer or superior.
  if (!canRemoveRole(caller.role, targetRole)) {
    return {
      success: false,
      error: `Forbidden: A "${caller.role}" cannot remove a "${targetRole}".`,
    };
  }

  // 5. Downgrade role → 'customer' (revokes all admin access, preserves account)
  const { error: updateError } = await service
    .from('customers')
    .update({ role: 'customer' })
    .eq('id', customerId);

  if (updateError) return { success: false, error: updateError.message };

  // 6. FORCE SESSION REVOCATION — immediately invalidate all active sessions
  //    Without this, the removed user's JWT remains valid until natural expiry.
  const { error: signOutError } = await service.auth.admin.signOut(
    target.supabase_auth_id,
    'global' // revokes all sessions across all devices
  );

  if (signOutError) {
    // Role was already downgraded — log but don't fail the action
    console.error('[removeTeamMember] signOut error:', signOutError.message);
  }

  return { success: true };
}
