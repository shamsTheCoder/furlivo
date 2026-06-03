'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  type AdminRole,
  type Permission,
  hasPermission as checkPermission,
  canCreateRole as checkCanCreateRole,
  assignableRoles as getAssignableRoles,
  isValidAdminRole,
  ROLE_LABELS,
  ROLE_COLORS,
} from '@/lib/rbac';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  roleLabel: string;
  roleColor: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  /** Check if the current user has a specific permission */
  hasPermission: (permission: Permission) => boolean;
  /** Check if current user can create/assign a target role */
  canCreateRole: (targetRole: AdminRole) => boolean;
  /** Roles the current user is allowed to assign */
  assignableRoles: () => AdminRole[];
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: customer } = await supabase
        .from('customers')
        .select('role, first_name, last_name')
        .eq('supabase_auth_id', authUser.id)
        .single();

      const role = customer?.role;
      if (!isValidAdminRole(role)) {
        // Middleware should have blocked this, but defend in depth
        setUser(null);
        setLoading(false);
        return;
      }

      setUser({
        id: authUser.id,
        email: authUser.email ?? '',
        firstName: customer?.first_name ?? '',
        lastName: customer?.last_name ?? '',
        role,
        roleLabel: ROLE_LABELS[role],
        roleColor: ROLE_COLORS[role],
      });
      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes (sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const hasPermission = useCallback(
    (permission: Permission) => {
      if (!user) return false;
      return checkPermission(user.role, permission);
    },
    [user]
  );

  const canCreateRole = useCallback(
    (targetRole: AdminRole) => {
      if (!user) return false;
      return checkCanCreateRole(user.role, targetRole);
    },
    [user]
  );

  const assignableRoles = useCallback(
    () => {
      if (!user) return [];
      return getAssignableRoles(user.role);
    },
    [user]
  );

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, loading, hasPermission, canCreateRole, assignableRoles, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
