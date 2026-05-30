import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Customers' };

const mockCustomers = [
  { name: 'Sarah Mitchell', email: 'sarah@example.com', orders: 3, spent: 8397, joined: '2026-03-12', pets: '🐕 Golden' },
  { name: 'James Torres', email: 'james@example.com', orders: 1, spent: 2799, joined: '2026-04-20', pets: '🐈 Maine Coon' },
  { name: 'Lisa Kim', email: 'lisa@example.com', orders: 5, spent: 14995, joined: '2026-02-08', pets: '🐕 Husky' },
  { name: 'Marco Rossi', email: 'marco@example.com', orders: 2, spent: 6998, joined: '2026-05-01', pets: '🐕🐈 Multi' },
];

export default function CustomersPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#f0ebe3', fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.25rem' }}>Customers</h1>
      <p style={{ color: '#6a6a7a', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{mockCustomers.length} registered customers</p>

      <div style={{ background: '#13141f', border: '1px solid #1e1f2e', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1f2e', background: '#0f1117' }}>
              {['Customer', 'Pets', 'Orders', 'Total Spent', 'Joined', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#4a4a5a' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((c) => (
              <tr key={c.email} style={{ borderBottom: '1px solid #1a1b2e' }}>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ fontWeight: 500, color: '#f0ebe3', fontSize: '0.875rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6a6a7a', marginTop: 2 }}>{c.email}</div>
                </td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#8a8a9a' }}>{c.pets}</td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#c8c0b4', textAlign: 'center' }}>{c.orders}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#4CAF82', fontSize: '0.875rem' }}>${(c.spent / 100).toFixed(2)}</td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', color: '#6a6a7a' }}>{c.joined}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <button style={{ padding: '0.3rem 0.875rem', background: '#1e1f2e', border: '1px solid #2a2a3e', borderRadius: '8px', color: '#c8c0b4', fontSize: '0.8rem', cursor: 'pointer' }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
