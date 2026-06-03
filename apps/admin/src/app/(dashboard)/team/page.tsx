'use client';

import { useState, useEffect, useTransition } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { ROLE_LABELS, ROLE_COLORS, type AdminRole } from '@/lib/rbac';
import { inviteTeamMember, listTeamMembers, removeTeamMember, type TeamMember } from '@/actions/team';
import { HiOutlineUserPlus, HiOutlineTrash, HiOutlineEnvelope } from 'react-icons/hi2';
import styles from './team.module.css';

export const metadata = { title: 'Team' };

export default function TeamPage() {
  const { user, canCreateRole, assignableRoles } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Invite form state
  const [showForm, setShowForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('staff');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const data = await listTeamMembers();
    setMembers(data);
    setLoadingMembers(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    startTransition(async () => {
      const result = await inviteTeamMember(inviteEmail, inviteRole, inviteFirstName, inviteLastName);
      if (result.success) {
        setFormSuccess(`Invitation sent to ${inviteEmail}. They will receive a link to set their password.`);
        setInviteEmail('');
        setInviteFirstName('');
        setInviteLastName('');
        setShowForm(false);
        fetchMembers();
      } else {
        setFormError(result.error ?? 'Failed to invite member.');
      }
    });
  };

  const handleRemove = (memberId: string, memberEmail: string) => {
    if (!confirm(`Remove ${memberEmail} from the admin team? They will lose all admin access.`)) return;
    startTransition(async () => {
      const result = await removeTeamMember(memberId);
      if (result.success) {
        fetchMembers();
      } else {
        alert(result.error ?? 'Failed to remove member.');
      }
    });
  };

  const availableRoles = assignableRoles();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Team</h1>
          <p className={styles.subtitle}>Manage your admin panel users and their roles</p>
        </div>
        {availableRoles.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => { setShowForm(!showForm); setFormError(''); setFormSuccess(''); }}
          >
            <HiOutlineUserPlus size={18} />
            Invite Member
          </button>
        )}
      </div>

      {/* Success message */}
      {formSuccess && (
        <div className={styles.successBanner} role="status">
          {formSuccess}
        </div>
      )}

      {/* Invite Form */}
      {showForm && (
        <div className={styles.inviteCard}>
          <h2 className={styles.inviteTitle}>Invite a New Team Member</h2>
          <form onSubmit={handleInvite} className={styles.inviteForm}>
            <div className={styles.inviteRow}>
              <div className="input-group">
                <label className="input-label" htmlFor="invite-first">First Name</label>
                <input
                  id="invite-first"
                  type="text"
                  className="input"
                  placeholder="Jane"
                  value={inviteFirstName}
                  onChange={(e) => setInviteFirstName(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="invite-last">Last Name</label>
                <input
                  id="invite-last"
                  type="text"
                  className="input"
                  placeholder="Doe"
                  value={inviteLastName}
                  onChange={(e) => setInviteLastName(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="invite-email">Email Address</label>
              <input
                id="invite-email"
                type="email"
                className="input"
                placeholder="jane@furlivo.shop"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="invite-role">Role</label>
              <select
                id="invite-role"
                className="input"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                disabled={isPending}
              >
                {availableRoles.map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
            </div>
            {formError && <p className={styles.error} role="alert">{formError}</p>}
            <div className={styles.inviteActions}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={isPending}>
                {isPending ? 'Sending…' : 'Send Invitation'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members Table */}
      <div className={styles.tableCard}>
        {loadingMembers ? (
          <div className={styles.empty}>Loading team members…</div>
        ) : members.length === 0 ? (
          <div className={styles.empty}>No team members yet. Invite someone to get started.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.avatar}>
                      {(member.firstName?.[0] ?? member.email?.[0] ?? '?').toUpperCase()}
                    </div>
                    <span>{member.firstName} {member.lastName}</span>
                  </td>
                  <td>
                    <span className={styles.emailCell}>
                      <HiOutlineEnvelope size={14} />
                      {member.email}
                    </span>
                  </td>
                  <td>
                    <span
                      className={styles.roleBadge}
                      style={{ color: ROLE_COLORS[member.role], background: `${ROLE_COLORS[member.role]}18` }}
                    >
                      {ROLE_LABELS[member.role]}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(member.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                  <td>
                    {/* Only show Remove if caller strictly outranks this member's role and it's not the caller themselves */}
                    {user?.id !== member.authId && canCreateRole(member.role) && (
                      <button
                        className={styles.removeBtn}
                        title="Remove from team"
                        onClick={() => handleRemove(member.id, member.email)}
                        disabled={isPending}
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
