import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';
import styles from './settings.module.css';

export const metadata: Metadata = { title: 'Account Settings — Furlivo', robots: { index: false, follow: false } };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirectTo=/account/settings');

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('supabase_auth_id', user.id)
    .single();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.backRow}>
            <Link href="/account" className={styles.backLink}>
              <HiArrowLeft size={16} /> Back to Account
            </Link>
          </div>
          <h1 className={styles.title}>Account Settings</h1>
          <SettingsClient user={user} customer={customer} />
        </div>
      </main>
      <Footer />
    </>
  );
}
