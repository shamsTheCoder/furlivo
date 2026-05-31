import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import styles from './account.module.css';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'My Account' };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

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
          <div className={styles.header}>
            <div className={styles.avatar}>
              {customer?.first_name?.[0] ?? user.email?.[0] ?? '🐾'}
            </div>
            <div>
              <h1 className={styles.name}>
                {customer ? `${customer.first_name} ${customer.last_name}` : 'My Account'}
              </h1>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>

          <div className={styles.grid}>
            {[
              { icon: '📦', label: 'My Orders', desc: 'Track and manage your orders', href: '/account/orders' },
              { icon: '❤️', label: 'Wishlist', desc: 'Products you have saved', href: '/account/wishlist' },
              { icon: '⚙️', label: 'Settings', desc: 'Manage your account details', href: '/account/settings' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className={styles.card}>
                <span className={styles.cardIcon}>{item.icon}</span>
                <div>
                  <div className={styles.cardLabel}>{item.label}</div>
                  <div className={styles.cardDesc}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          <SignOutButton />
        </div>
      </main>
      <Footer />
    </>
  );
}
