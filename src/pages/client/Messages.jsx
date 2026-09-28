import { useEffect, useState } from 'react'
import PortalLayout from '../../components/portal/PortalLayout'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function Messages() {
  const { user } = useAuth()
  const [cases, setCases] = useState([])
  const [selectedCaseId, setSelectedCaseId] = useState(null)
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (user) fetchCases()
  }, [user])

  useEffect(() => {
    if (selectedCaseId) fetchMessages(selectedCaseId)
  }, [selectedCaseId])

  async function fetchCases() {
    setLoading(true)
    const { data } = await supabase
      .from('cases')
      .select('id, case_number, title')
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

  if (loading) {
    return (
      <PortalLayout>
        <div style={{ padding: 40 }}>Loading...</div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>Messages</h1>

        {cases.length === 0 && (
          <div style={cardStyle}>
            <p style={{ margin: 0 }}>You don't have any matters yet, so there's nothing to message about.</p>
          </div>
        )}

        {cases.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }} className="messages-layout">
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
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{c.title}</div>
                </button>
              ))}
            </div>

            {/* THREAD */}
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: 480 }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                {messages.length === 0 && (
                  <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>No messages yet — say hello to your case handler.</p>
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
                        {isMe ? 'You' : 'Staff'} · {new Date(m.created_at).toLocaleString()}
                      </p>
                    </div>
                  )
                })}
              </div>

              <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
                <input
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type a message..."
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
          .messages-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PortalLayout>
  )
}

const cardStyle = { background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }
