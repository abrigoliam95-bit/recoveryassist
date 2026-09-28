import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PortalLayout from '../../components/portal/PortalLayout'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

const FRAUD_TYPES = [
  'Investment / trading scam',
  'Romance scam',
  'Wire transfer / bank fraud',
  'Cryptocurrency scam',
  'Online marketplace scam',
  'Impersonation scam',
  'Other',
]

const TIMEFRAMES = [
  'Within the last week',
  'Within the last month',
  '1–3 months ago',
  '3–12 months ago',
  'More than a year ago',
]

export default function FileClaim() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [fraudType, setFraudType] = useState('')
  const [amount, setAmount] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    // Documents themselves aren't uploaded to storage yet — that's a
    // later step — but we record the claim itself now.
    const { error: insertError } = await supabase.from('cases').insert({
      client_id: user.id,
      title: fraudType || 'New recovery claim',
      description: `Amount lost: $${amount || '0.00'}\nWhen: ${timeframe}\n\n${description}`,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    navigate('/matters')
  }

  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 720, margin: '0 auto' }}>

        {/* BREADCRUMBS */}
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
          <Link to="/matters" style={{ color: 'var(--text-muted)' }}>Matters</Link> &gt; File a new claim
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>
            Confidential intake
          </p>
          <Badge color="#1f6e4f" bg="#e5f2eb">Encrypted submission</Badge>
        </div>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>File a new recovery claim</h1>

        <div style={cardStyle}>
          <p style={{ fontSize: 14, marginBottom: 24 }}>
            Complete every required field. Counsel will be in touch within 24 hours of submission.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field label="Type of fraud *">
              <select
                required
                value={fraudType}
                onChange={(e) => setFraudType(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select fraud type</option>
                {FRAUD_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>

            <Field label="Amount lost ($) *">
              <input
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="When did this happen? *">
              <select
                required
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select timeframe</option>
                {TIMEFRAMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>

            <Field label="Describe what happened *">
              <textarea
                required
                placeholder="Include how you were contacted, what was promised, how you sent funds, and any names or platforms involved."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }}
              />
            </Field>

            <Field label="Supporting documents (optional)">
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                style={{ fontSize: 14 }}
              />
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, marginBottom: 0 }}>
                Upload screenshots, bank statements, emails, or anything else relevant. Max 10MB per file.
              </p>
              {files.length > 0 && (
                <p style={{ fontSize: 12, marginTop: 6, marginBottom: 0 }}>
                  {files.length} file{files.length > 1 ? 's' : ''} selected (uploading comes in a later step)
                </p>
              )}
            </Field>

            {error && <p style={{ color: '#b23b3b', fontSize: 14 }}>{error}</p>}

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--ink)',
                  color: '#fff',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: 4,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                <SendIcon /> {submitting ? 'Submitting...' : 'Submit for review'}
              </button>
              <Link to="/matters" style={{ fontSize: 14, color: 'var(--text-muted)' }}>Cancel</Link>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              No upfront fees are required to file a claim. All fee structures are disclosed
              in your retainer agreement.
            </p>
          </form>
        </div>
      </div>
    </PortalLayout>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

function Badge({ children, color, bg }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 12, color, background: bg }}>
      {children}
    </span>
  )
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

const cardStyle = {
  background: 'var(--paper-raised)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: 26,
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 4,
  fontSize: 15,
  fontFamily: 'var(--sans)',
}
