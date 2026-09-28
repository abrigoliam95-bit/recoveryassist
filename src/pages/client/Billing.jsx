import { useEffect, useState } from 'react'
import PortalLayout from '../../components/portal/PortalLayout'
import PaymentGatewayModal from '../../components/portal/PaymentGatewayModal'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

const STATUS_LABELS = {
  invoiced: 'Invoiced',
  pending_approval: 'Pending Payment',
  paid: 'Paid',
}

const STATUS_STYLES = {
  paid: { bg: '#e6f0ee', color: 'var(--teal)' },
  invoiced: { bg: '#f2e9d8', color: 'var(--gold)' },
  pending_approval: { bg: 'var(--paper)', color: 'var(--text-muted)' },
}

export default function Billing() {
  const { user } = useAuth()
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [payingFee, setPayingFee] = useState(null)

  useEffect(() => {
    if (user) fetchFees()
  }, [user])

  async function fetchFees() {
    setLoading(true)
    const { data, error } = await supabase
      .from('fees')
      .select('*, cases(case_number, title)')
      .order('created_at', { ascending: false })

    if (!error) setFees(data || [])
    setLoading(false)
  }

  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>Billing & invoices</h1>
        <p style={{ fontSize: 15, maxWidth: '62ch', marginBottom: 28 }}>
          Manage your professional service invoices and retainers. All fees are agreed upon
          prior to engagement.
        </p>

        {loading && <p>Loading...</p>}

        {!loading && fees.length === 0 && (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '40px 24px' }}>
            <p style={{ marginBottom: 0 }}>No invoices have been raised on your matters yet.</p>
          </div>
        )}

        {!loading && fees.length > 0 && (
          <div className="billing-table-wrap" style={cardStyle}>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Matter #</th>
                  <th>Fee type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => {
                  const style = STATUS_STYLES[fee.status]
                  return (
                    <tr key={fee.id}>
                      <td data-label="Matter #">{fee.cases?.case_number || '—'}</td>
                      <td data-label="Fee type">{fee.fee_type}</td>
                      <td data-label="Amount">${Number(fee.amount).toFixed(2)}</td>
                      <td data-label="Status">
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: style.bg, color: style.color }}>
                          {STATUS_LABELS[fee.status]}
                        </span>
                      </td>
                      <td data-label="">
                        {fee.status !== 'paid' && (
                          <button
                            onClick={() => setPayingFee(fee)}
                            className="btn btn-gold"
                            style={{ border: 'none', fontSize: 13, padding: '6px 14px' }}
                          >
                            Settle invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {payingFee && (
        <PaymentGatewayModal invoice={payingFee} onClose={() => setPayingFee(null)} />
      )}

      <style>{`
        .billing-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .billing-table thead th {
          text-align: left; font-size: 12px; text-transform: uppercase;
          color: var(--text-muted); padding: 8px 10px; border-bottom: 1px solid var(--border);
        }
        .billing-table tbody td { padding: 14px 10px; border-bottom: 1px solid var(--border); }
        .billing-table tbody tr:last-child td { border-bottom: none; }

        @media (max-width: 640px) {
          .billing-table thead { display: none; }
          .billing-table, .billing-table tbody, .billing-table tr, .billing-table td { display: block; width: 100%; }
          .billing-table tr {
            border: 1px solid var(--border); border-radius: 6px; margin-bottom: 12px;
            padding: 12px 14px; background: var(--paper-raised);
          }
          .billing-table td { border-bottom: none; padding: 6px 0; display: flex; justify-content: space-between; align-items: center; }
          .billing-table td::before { content: attr(data-label); font-size: 12px; text-transform: uppercase; color: var(--text-muted); }
        }
      `}</style>
    </PortalLayout>
  )
}

const cardStyle = {
  background: 'var(--paper-raised)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: 22,
}
