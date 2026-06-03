import type { Metadata } from 'next';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

export const metadata: Metadata = { title: 'Products' };

export default function ProductsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#f0ebe3', fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Products</h1>
      <p style={{ color: '#6a6a7a', marginBottom: '2rem' }}>Manage your product catalog</p>

      <div style={{
        background: '#13141f',
        border: '1px solid #1e1f2e',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        color: '#4a4a5a',
      }}>
        <div style={{ marginBottom: '1rem' }}><HiOutlineShoppingBag size={48} /></div>
        <p style={{ fontSize: '1rem', fontWeight: 500, color: '#6a6a7a', marginBottom: '1.5rem' }}>
          Connect your Supabase database to manage products
        </p>
        <button style={{
          padding: '0.625rem 1.5rem',
          background: 'rgba(232,147,90,0.15)',
          border: '1px solid rgba(232,147,90,0.3)',
          borderRadius: '999px',
          color: '#E8935A',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
        }}>
          + Add First Product
        </button>
      </div>
    </div>
  );
}
