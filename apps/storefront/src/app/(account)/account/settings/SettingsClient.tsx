'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/shared/Spinner';
import styles from './settings.module.css';

interface Customer {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface Props {
  user: User;
  customer: Customer | null;
}

export default function SettingsClient({ user, customer }: Props) {
  const [firstName, setFirstName] = useState(customer?.first_name ?? '');
  const [lastName, setLastName] = useState(customer?.last_name ?? '');
  const [phone, setPhone] = useState(customer?.phone ?? '');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileLoading) return; // prevent double-submission
    setProfileLoading(true);
    setProfileMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('customers')
        .upsert({
          supabase_auth_id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          phone,
        }, { onConflict: 'supabase_auth_id' });

      if (error) throw error;
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);

    if (newPw !== confirmPw) {
      setPwMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ type: 'error', text: 'Password must be at least 8 characters.' });
      return;
    }

    setPwLoading(true);
    if (pwLoading) return; // prevent double-submission
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;
      setPwMsg({ type: 'success', text: 'Password updated successfully.' });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className={styles.sections}>
      {/* Profile */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>
        <form onSubmit={handleProfileSave} className={styles.form}>
          <div className={styles.formRow}>
            <div className="field">
              <label className="label" htmlFor="settings-firstname">First Name</label>
              <input
                id="settings-firstname"
                type="text"
                className="input"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Arjun"
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="settings-lastname">Last Name</label>
              <input
                id="settings-lastname"
                type="text"
                className="input"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Mehta"
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="settings-email">Email Address</label>
            <input
              id="settings-email"
              type="email"
              className="input"
              value={user.email ?? ''}
              disabled
              title="Email cannot be changed here"
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="settings-phone">Phone Number</label>
            <input
              id="settings-phone"
              type="tel"
              className="input"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          {profileMsg && (
            <p className={`${styles.message} ${styles[`message-${profileMsg.type}`]}`} role="alert">
              {profileMsg.text}
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-lg" disabled={profileLoading}>
            {profileLoading ? <><Spinner size="sm" color="white" /> Saving…</> : 'Save Changes'}
          </button>
        </form>
      </section>

      {/* Password */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Change Password</h2>
        <form onSubmit={handlePasswordChange} className={styles.form}>
          <div className="field">
            <label className="label" htmlFor="settings-current-pw">Current Password</label>
            <input
              id="settings-current-pw"
              type="password"
              className="input"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="settings-new-pw">New Password</label>
            <input
              id="settings-new-pw"
              type="password"
              className="input"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="Min 8 characters"
              required
              autoComplete="new-password"
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="settings-confirm-pw">Confirm New Password</label>
            <input
              id="settings-confirm-pw"
              type="password"
              className="input"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              placeholder="Repeat new password"
              required
              autoComplete="new-password"
            />
          </div>
          {pwMsg && (
            <p className={`${styles.message} ${styles[`message-${pwMsg.type}`]}`} role="alert">
              {pwMsg.text}
            </p>
          )}
          <button type="submit" className="btn btn-dark btn-lg" disabled={pwLoading}>
            {pwLoading ? <><Spinner size="sm" color="white" /> Updating…</> : 'Update Password'}
          </button>
        </form>
      </section>

      {/* Preferences */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Email Preferences</h2>
        <div className={styles.preferenceList}>
          {[
            { id: 'pref-order', label: 'Order updates & shipping notifications', defaultChecked: true },
            { id: 'pref-promo', label: 'Promotions and special offers', defaultChecked: true },
            { id: 'pref-newsletter', label: 'Pet care tips & Furlivo Journal', defaultChecked: false },
          ].map(({ id, label, defaultChecked }) => (
            <label key={id} className={styles.preferenceRow} htmlFor={id}>
              <div className={styles.preferenceLabel}>{label}</div>
              <div className={styles.toggle}>
                <input type="checkbox" id={id} defaultChecked={defaultChecked} className={styles.toggleInput} />
                <div className={styles.toggleSlider} />
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
