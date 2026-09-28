import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/PublicLayout'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function StartCase() {
  const { user, role, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    // client_id is set to the logged-in user automatically —
    // never trust a hidden form field for this, always use the
    // real logged-in session so nobody can open a case as someone else
    const { error: insertError } = await supabase.from('cases').insert({
      client_id: user.id,
      title,
      description,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <PublicLayout>
      <img
        src="/images/start-case-form.jpg"
        alt="Filling out a case intake form"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />

      <section className="container" style={{ padding: '56px 0', maxWidth: 560 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Start a case</p>
        <h1 style={{ fontSize: 34, marginBottom: 20 }}>Tell us what happened</h1>

        {/* Still checking whether someone's logged in — avoid flashing
            the wrong message for a split second */}
        {authLoading && <p>Loading...</p>}

        {/* Not logged in — a case must belong to an account, so we ask
            them to create one first, keeping their reason for being here */}
        {!authLoading && !user && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 24 }}>
            <p style={{ fontSize: 16 }}>
              To open a case, you'll need an account first — this is what lets you
              track your case and message your case handler afterward.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
              <Link to="/register" className="btn btn-gold">Create an account</Link>
              <Link to="/login" className="btn btn-outline-dark">I already have one</Link>
            </div>
          </div>
        )}

        {/* Logged in as staff/admin — this form is for clients only.
            Staff already have a way to log cases from the Admin Dashboard. */}
        {!authLoading && user && role !== 'client' && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 24 }}>
            <p style={{ fontSize: 16, marginBottom: 0 }}>
              This form is for clients opening a new case. You're signed in as staff/admin —
              head to the Admin Dashboard to view or manage existing cases.
            </p>
          </div>
        )}

        {/* Logged in as a client — show the real case intake form */}
        {!authLoading && user && role === 'client' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={styles.label}>Give your case a short title</label>
              <input
                style={styles.input}
                placeholder="e.g. Wire transfer scam - August 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={styles.label}>What happened?</label>
              <textarea
                style={{ ...styles.input, minHeight: 160, resize: 'vertical' }}
                placeholder="Include dates, amounts, platforms used, and anything else that might help."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: '#b23b3b', fontSize: 14 }}>{error}</p>}

            <button type="submit" className="btn btn-gold" disabled={submitting} style={{ border: 'none' }}>
              {submitting ? 'Submitting...' : 'Submit case'}
            </button>
          </form>
        )}
      </section>
    </PublicLayout>
  )
}

const styles = {
  label: { display: 'block', fontSize: 14, marginBottom: 6, color: 'var(--text)' },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: 4,
    fontSize: 15,
    fontFamily: 'var(--sans)',
  },
}
