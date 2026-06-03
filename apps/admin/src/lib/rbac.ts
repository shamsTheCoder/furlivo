/**
 * Furlivo Admin — Industry-Standard RBAC
 *
 * Single source of truth for roles, permissions, and hierarchy.
 * All security enforcement happens server-side (middleware + server actions).
 * This file is used for both server and client permission checks.
 */

// ─── Role Definitions ─────────────────────────────────────────────────────────

export const ROLES = ['super_admin', 'admin', 'staff'] as const;
export type AdminRole = (typeof ROLES)[number];

/** Numeric weight — higher = more privileged */
export const ROLE_HIERARCHY: Record<AdminRole, number> = {
  super_admin: 100,
  admin: 50,
  staff: 10,
};

/** Human-readable display labels */
export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  staff: 'Staff',
};

/** Badge color per role */
export const ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: '#7C3AED', // purple
  admin: '#2563EB',       // blue
  staff: '#059669',       // green
};

// ─── Permissions ──────────────────────────────────────────────────────────────

export type Permission =
  | 'view:dashboard'
  | 'view:orders'
  | 'view:products'
  | 'view:customers'
  | 'view:analytics'
  | 'view:marketing'
  | 'view:blog'
  | 'view:settings'
  | 'view:team'
  | 'edit:orders'
  | 'edit:products'
  | 'edit:customers'
  | 'edit:blog'
  | 'edit:settings'
  | 'manage:team'       // invite or remove staff
  | 'manage:admins'     // invite or remove admins (super_admin only)
  | 'manage:roles';     // change anyone's role (super_admin only)

const STAFF_PERMISSIONS: Permission[] = [
  'view:dashboard',
  'view:orders',
  'view:products',
  'view:customers',
  'view:blog',
  'edit:orders',
  'edit:products',
  'edit:blog',
];

const ADMIN_PERMISSIONS: Permission[] = [
  ...STAFF_PERMISSIONS,
  'view:analytics',
  'view:marketing',
  'view:settings',
  'view:team',
  'edit:customers',
  'edit:settings',
  'manage:team',
];

const SUPER_ADMIN_PERMISSIONS: Permission[] = [
  ...ADMIN_PERMISSIONS,
  'manage:admins',
  'manage:roles',
];

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  staff: STAFF_PERMISSIONS,
  admin: ADMIN_PERMISSIONS,
  super_admin: SUPER_ADMIN_PERMISSIONS,
};

// ─── Utility Functions ────────────────────────────────────────────────────────

/** Returns true if the given role is a valid admin role */
export function isValidAdminRole(role: string | null | undefined): role is AdminRole {
  return ROLES.includes(role as AdminRole);
}

/** Returns true if actorRole has the given permission */
export function hasPermission(actorRole: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[actorRole].includes(permission);
}

/** Returns true if actorRole can create/assign targetRole */
export function canCreateRole(actorRole: AdminRole, targetRole: AdminRole): boolean {
  if (actorRole === 'super_admin') {
    // super_admin can create admin and staff (but not another super_admin)
    return targetRole === 'admin' || targetRole === 'staff';
  }
  if (actorRole === 'admin') {
    // admin can only create staff
    return targetRole === 'staff';
  }
  return false;
}

/** Returns roles that actorRole is allowed to assign */
export function assignableRoles(actorRole: AdminRole): AdminRole[] {
  return ROLES.filter((r) => canCreateRole(actorRole, r));
}

/** Returns true if actorRole outranks targetRole */
export function outranks(actorRole: AdminRole, targetRole: AdminRole): boolean {
  return ROLE_HIERARCHY[actorRole] > ROLE_HIERARCHY[targetRole];
}

/**
 * Returns true if actorRole can remove/demote a member with targetRole.
 * Removal requires STRICTLY outranking the target.
 * (Different from create: you cannot remove a peer, only someone below you)
 */
export function canRemoveRole(actorRole: AdminRole, targetRole: AdminRole): boolean {
  return outranks(actorRole, targetRole);
}
