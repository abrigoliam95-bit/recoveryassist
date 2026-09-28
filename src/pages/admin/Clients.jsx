import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import AdminLayout from '../../components/portal/AdminLayout'

const STATUS_STYLES = {
  active: { background: '#e6f0ee', color: 'var(--teal)' },
  suspended: { background: '#f7ecd9', color: 'var(--gold)' },
  removed: { background: '#f5e3e3', color: '#b23b3b' },
}

export default function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false })

    if (!error) setClients(data || [])
    setLoading(false)
  }

  async function updateStatus(clientId, newStatus) {
    setSavingId(clientId)
    await supabase.from('profiles').update({ status: newStatus }).eq('id', clientId)
    await fetchClients()
    setSavingId(null)
  }

  return (
    <AdminLayout>
      <div className="dashboard-page">
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Clients</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Manage client account access.
          </p>
        </div>

        {loading && <p>Loading clients...</p>}

        {!loading && clients.length === 0 && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 24 }}>
            <p style={{ marginBottom: 0 }}>No clients have registered yet.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clients.map((c) => (
            <div key={c.id} className="client-row">
              {/* Client info */}
              <div className="client-row-info">
                <p style={{ margin: '0 0 2px', fontWeight: 500 }}>
                  {c.full_name || 'Unnamed client'}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
                  {c.email}
                </p>
              </div>

              {/* Actions */}
              <div className="client-row-actions">
                <span
                  style={{
                    fontSize: 12,
                    padding: '3px 10px',
                    borderRadius: 12,
                    textTransform: 'capitalize',
                    ...(STATUS_STYLES[c.status] || {}),
                  }}
                >
                  {c.status}
                </span>

                {c.status !== 'suspended' && (
                  <button
                    onClick={() => updateStatus(c.id, 'suspended')}
                    disabled={savingId === c.id}
                    className="btn btn-outline-dark"
                    style={{ padding: '6px 12px', fontSize: 13 }}
                  >
                    Suspend
                  </button>
                )}

                {c.status !== 'active' && (
                  <button
                    onClick={() => updateStatus(c.id, 'active')}
                    disabled={savingId === c.id}
                    className="btn btn-gold"
                    style={{ padding: '6px 12px', fontSize: 13 }}
                  >
                    Activate
                  </button>
                )}

                {c.status !== 'removed' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove ${c.full_name || c.email}? This blocks their access — it does not erase their case history.`)) {
                        updateStatus(c.id, 'removed')
                      }
                    }}
                    disabled={savingId === c.id}
                    style={{
                      padding: '6px 12px',
                      fontSize: 13,
                      background: 'transparent',
                      border: '1px solid #b23b3b',
                      color: '#b23b3b',
                      borderRadius: 3,
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
          Suspending or removing a client blocks them from logging into the app immediately.
          It does not delete their case history, and it doesn't delete their login credentials
          from Supabase — for a full account deletion, remove them from Supabase's Authentication
          panel directly.
        </p>
      </div>
    </AdminLayout>
  )
}