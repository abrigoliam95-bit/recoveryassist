import { useState, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import Recaptcha from './Recaptcha'

const MAX_FILE_MB = 5

export default function TestimonialForm() {
  const recaptchaRef = useRef(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [companyRole, setCompanyRole] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Honeypot check (bots fill this, humans don't)
    if (honeypot) {
      setSuccess(true)
      return
    }

    if (!consent) {
      setError('Please confirm you agree to have your testimonial published.')
      return
    }

    // --- CAPTCHA verification ---
    const recaptchaToken = recaptchaRef.current?.getToken() || ''
    if (!recaptchaToken) {
      setError('Please complete the "I\'m not a robot" check.')
      return
    }

    if (photo && photo.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Photo must be under ${MAX_FILE_MB}MB.`)
      return
    }

    setSubmitting(true)

    // --- Upload photo (if any) ---
    let photoUrl = null
    if (photo) {
      const fileName = `${Date.now()}-${photo.name}`
      const { error: uploadError } = await supabase.storage
        .from('testimonial-uploads')
        .upload(fileName, photo)

      if (uploadError) {
        setSubmitting(false)
        setError(uploadError.message)
        recaptchaRef.current?.reset()
        return
      }

      const { data: urlData } = supabase.storage
        .from('testimonial-uploads')
        .getPublicUrl(fileName)
      photoUrl = urlData.publicUrl
    }

    // --- Submit testimonial ---
    const { error: insertError } = await supabase.from('testimonials').insert({
      full_name: fullName,
      email,
      company_role: companyRole,
      rating,
      testimonial_text: text,
      photo_url: photoUrl,
      consent,
      status: 'pending', // (change to 'approved' if your workflow doesn't use review)
    })

    setSubmitting(false)
    recaptchaRef.current?.reset()

    if (insertError) {
      setError(insertError.message)
      return
    }

    setSuccess(true)
    setFullName('')
    setEmail('')
    setCompanyRole('')
    setRating(5)
    setText('')
    setPhoto(null)
    setConsent(false)
  }

  if (success) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>Thank you!</h3>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Your testimonial has been submitted for review. It will appear on the site once approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      {/* Honeypot */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
      />

      <div className="form-row">
        <div>
          <label className="form-label">Full name *</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Email address *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label className="form-label">Company / role (optional)</label>
          <input
            value={companyRole}
            onChange={(e) => setCompanyRole(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Rating *</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="form-input"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Your testimonial *</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-input"
          style={{ minHeight: 120, resize: 'vertical' }}
        />
      </div>

      <div>
        <label className="form-label">Photo (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0] || null)}
          className="form-input form-input-file"
        />
        <p className="form-hint">Max {MAX_FILE_MB}MB. JPG or PNG.</p>
      </div>

      <label className="form-checkbox-label">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="form-checkbox"
        />
        <span>I agree that my testimonial may be published on the website.</span>
      </label>

      {/* CAPTCHA */}
      <div style={{ marginTop: 4 }}>
        <Recaptcha ref={recaptchaRef} />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" disabled={submitting} className="form-submit-btn">
        {submitting ? 'Submitting...' : 'Submit testimonial'}
      </button>
    </form>
  )
}