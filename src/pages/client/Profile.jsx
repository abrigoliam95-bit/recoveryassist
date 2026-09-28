import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PortalLayout from '../../components/portal/PortalLayout'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function Profile() {
  const { user, fullName: initialName } = useAuth()
  const [tab, setTab] = useState('details')

  // --- Personal details tab ---
  const [fullName, setFullName] = useState(initialName || '')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [username, setUsername] = useState('')
  const [savingDetails, setSavingDetails] = useState(false)
  const [detailsMessage, setDetailsMessage] = useState('')

  // --- Password tab ---
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    setFullName(initialName || '')
  }, [initialName])

  async function handleSaveDetails(e) {
    e.preventDefault()
    setSavingDetails(true)
    setDetailsMessage('')

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id)

    setSavingDetails(false)
    setDetailsMessage(error ? error.message : 'Saved.')
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()
    setPasswordError('')
    setPasswordMessage('')

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.')
      return
    }

    setSavingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSavingPassword(false)

    if (error) {
      setPasswordError(error.message)
      return
    }
    setPasswordMessage('Password updated.')
    setNewPassword('')
    setConfirmPassword('')
  }

  const initial = (fullName || user?.email || '?').charAt(0).toUpperCase()

  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>My profile</h1>

        {/* PROFILE CARD */}
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <div style={avatarStyle}>{initial}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: 18, margin: 0 }}>{fullName || '[Client Name]'}</h3>
                <Badge color="var(--teal)" bg="#e6f0ee">Verified client</Badge>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '2px 0 0' }}>{user?.email}</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Client since [Month Year] · [Country]
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <MetaItem label="Status" value={<span><Dot /> Active</span>} />
            <MetaItem label="Account type" value="Recovery Client" />
            <MetaItem label="Phone" value={phone || '[Phone Number]'} />
            <MetaItem label="Country" value={country || '[Country]'} />
          </div>
        </div>

        {/* CONFIDENTIALITY NOTICE */}
        <div style={{ ...cardStyle, background: '#f4f6f5', display: 'flex', gap: 12, marginBottom: 20 }}>
          <LockIcon />
          <p style={{ fontSize: 13, margin: 0 }}>
            Your personal information is protected under applicable data protection regulations
            and is never shared outside your matter without your consent.
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          <TabButton active={tab === 'details'} onClick={() => setTab('details')}>Personal details</TabButton>
          <TabButton active={tab === 'password'} onClick={() => setTab('password')}>Password</TabButton>
        </div>

        {tab === 'details' && (
          <div style={cardStyle}>
            <form onSubmit={handleSaveDetails} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Full name">
                <input style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </Field>
              <Field label="Phone">
                <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="[Phone Number]" />
              </Field>
              <Field label="Email address">
                <input style={inputStyle} value={user?.email || ''} disabled />
              </Field>
              <Field label="Country">
                <input style={inputStyle} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="[Country]" />
              </Field>
              <Field label="Username">
                <input style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Optional" />
              </Field>

              {detailsMessage && <p style={{ fontSize: 14, color: 'var(--teal)' }}>{detailsMessage}</p>}

              <div>
                <button type="submit" disabled={savingDetails} className="btn btn-gold" style={{ border: 'none' }}>
                  {savingDetails ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'password' && (
          <div style={cardStyle}>
            <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Old password">
                <input type="password" style={inputStyle} placeholder="••••••••" disabled />
              </Field>
              <Field label="New password">
                <input
                  type="password"
                  style={inputStyle}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Field>
              <Field label="Confirm new password">
                <input
                  type="password"
                  style={inputStyle}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>

              <div style={{ background: 'var(--paper)', borderRadius: 4, padding: '10px 14px', fontSize: 13 }}>
                Password requirements: minimum 8 characters, at least 1 lowercase letter, 1 uppercase
                letter, and 1 number or symbol.
              </div>

              {passwordError && <p style={{ color: '#b23b3b', fontSize: 14 }}>{passwordError}</p>}
              {passwordMessage && <p style={{ color: 'var(--teal)', fontSize: 14 }}>{passwordMessage}</p>}

              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button type="submit" disabled={savingPassword} className="btn btn-gold" style={{ border: 'none' }}>
                  {savingPassword ? 'Updating...' : 'Update password'}
                </button>
                <Link to="#" style={{ fontSize: 14 }}>Advanced account settings →</Link>
              </div>
            </form>
          </div>
        )}

        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 24, textAlign: 'center' }}>
          Need help with your account? <Link to="/contact">Contact our support team →</Link>
        </p>
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

function MetaItem({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontSize: 14, margin: 0 }}>{value}</p>
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 18px',
        fontSize: 14,
        border: 'none',
        borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
        background: 'transparent',
        color: active ? 'var(--ink)' : 'var(--text-muted)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function Badge({ children, color, bg }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 500, padding: '2px 9px', borderRadius: 12, color, background: bg }}>
      {children}
    </span>
  )
}

function Dot() {
  return (
    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#1f6e4f', marginRight: 6 }} />
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const cardStyle = {
  background: 'var(--paper-raised)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: 24,
}

const avatarStyle = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: 'var(--ink)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 22,
  fontFamily: 'var(--serif)',
  flexShrink: 0,
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 4,
  fontSize: 15,
  fontFamily: 'var(--sans)',
}
