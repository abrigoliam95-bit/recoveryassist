import { useEffect, useState } from 'react'
import AdminLayout from '../../components/portal/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function AdminMessages() {
  const { user } = useAuth()
  const [cases, setCases] = useState([])
  const [selectedCaseId, setSelectedCaseId] = useState(null)
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchCases()
  }, [])

  useEffect(() => {
    if (selectedCaseId) fetchMessages(selectedCaseId)
  }, [selectedCaseId])

  async function fetchCases() {
    setLoading(true)
    const { data } = await supabase
      .from('cases')
      .select('id, case_number, title, profiles!cases_client_id_fkey(full_name, email)')
      .order('created_at', { ascending: false })
    setCases(data || [])
    if (data && data.length > 0) setSelectedCaseId(data[0].id)
    setLoading(false)
  }

  async function fetchMessages(caseId) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true })
    setMessages(data || [])
  }

  async function handleSend(e) {
    e.preventDefault()
    if (!body.trim()) return
    setSending(true)
    await supabase.from('messages').insert({
      case_id: selectedCaseId,
      sender_id: user.id,
      body: body.trim(),
    })
    setBody('')
    setSending(false)
    fetchMessages(selectedCaseId)
  }

  const selectedCase = cases.find((c) => c.id === selectedCaseId)

  return (
    <AdminLayout>
      <div style={{ padding: '48px 32px', maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>Messages</h1>

        {loading && <p>Loading...</p>}
        {!loading && cases.length === 0 && (
          <div style={cardStyle}><p style={{ margin: 0 }}>No cases yet.</p></div>
        )}

        {!loading && cases.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }} className="admin-messages-layout">
            {/* CASE LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  style={{
                    textAlign: 'left', padding: '10px 12px', borderRadius: 4, fontSize: 13, cursor: 'pointer',
                    border: '1px solid var(--border)',
                    background: selectedCaseId === c.id ? 'var(--ink)' : 'var(--paper-raised)',
                    color: selectedCaseId === c.id ? '#fff' : 'var(--text)',
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{c.case_number || 'Pending'}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{c.profiles?.full_name || 'Unknown client'}</div>
                </button>
              ))}
            </div>

            {/* THREAD */}
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: 500 }}>
              {selectedCase && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {selectedCase.profiles?.full_name} · {selectedCase.profiles?.email}
                </p>
              )}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                {messages.length === 0 && (
                  <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>No messages yet on this case.</p>
                )}
                {messages.map((m) => {
                  const isMe = m.sender_id === user.id
                  return (
                    <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                      <div style={{
                        background: isMe ? 'var(--ink)' : 'var(--paper)',
                        color: isMe ? '#fff' : 'var(--text)',
                        borderRadius: 8, padding: '8px 12px', fontSize: 14,
                      }}>
                        {m.body}
                      </div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 4px 0', textAlign: isMe ? 'right' : 'left' }}>
                        {isMe ? 'You' : 'Client'} · {new Date(m.created_at).toLocaleString()}
                      </p>
                    </div>
                  )
                })}
              </div>

              <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
                <input
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Reply to client..."
                  style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 14 }}
                />
                <button type="submit" disabled={sending} className="btn btn-gold" style={{ border: 'none' }}>
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .admin-messages-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  )
}

const cardStyle = { background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }
