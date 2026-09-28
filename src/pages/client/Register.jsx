import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import PublicLayout from '../../components/PublicLayout'
import Recaptcha from '../../components/Recaptcha'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// Try to guess the user's country from the browser locale.
// Fallback to NG (Nigeria).
function getDefaultCountry() {
  if (typeof navigator === 'undefined') return 'NG'
  const locale = navigator.language || 'en-NG'
  const region = locale.split('-')[1]
  return region ? region.toUpperCase() : 'NG'
}

export default function Register() {
  const navigate = useNavigate()
  const recaptchaRef = useRef(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [defaultCountry, setDefaultCountry] = useState('NG')

  useEffect(() => {
    setDefaultCountry(getDefaultCountry())
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    // --- 1. Validate phone number ---
    const parsedPhone = parsePhoneNumberFromString(phone, defaultCountry)
    if (!parsedPhone || !parsedPhone.isValid()) {
      setError('Please enter a valid mobile number (including your country code if outside Nigeria).')
      return
    }
    const formattedPhone = parsedPhone.format('E.164')

    // --- 2. Verify CAPTCHA ---
    const recaptchaToken = recaptchaRef.current?.getToken() || ''
    if (!recaptchaToken) {
      setError('Please complete the "I\'m not a robot" check.')
      return
    }

    setLoading(true)

    try {
      // --- 3. Sign up the user ---
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: formattedPhone,
          },
        },
      })

      if (signUpError) {
        setLoading(false)
        const msg = (signUpError.message || '').toLowerCase()

        if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('user already')) {
          setError('An account with this email already exists. Try logging in instead.')
        } else if (msg.includes('password')) {
          setError("Your password doesn't meet our requirements. Use at least 6 characters.")
        } else if (msg.includes('invalid email')) {
          setError('Please enter a valid email address.')
        } else if (msg.includes('rate limit') || msg.includes('too many')) {
          setError('Too many attempts. Please wait a few minutes and try again.')
        } else {
          setError("We couldn't create your account right now. Please try again.")
        }

        recaptchaRef.current?.reset()
        return
      }

      // --- 4. Save phone to profile (works when email confirmation is OFF) ---
      if (data.session && data.user) {
        await supabase
          .from('profiles')
          .update({ phone: formattedPhone })
          .eq('id', data.user.id)
      }

      setLoading(false)

      // --- 5. If email confirmation is ON, show message ---
      if (!data.session) {
        setMessage('Account created! Check your email to confirm before logging in.')
        recaptchaRef.current?.reset()
        return
      }

      navigate('/dashboard')
    } catch (err) {
      setLoading(false)
      console.error('Register error:', err)

      const errMsg = (err && err.message ? err.message : '').toLowerCase()
      if (
        errMsg.includes('failed to fetch') ||
        errMsg.includes('networkerror') ||
        (err && err.name === 'TypeError')
      ) {
        setError("We're unable to connect right now. Please check your internet connection and try again.")
      } else {
        setError('Something went wrong on our end. Please try again in a moment.')
      }

      recaptchaRef.current?.reset()
    }
  }

  return (
    <PublicLayout>
      <section className="auth-page">
        <div className="auth-card auth-card-wide">
          <header className="auth-header">
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">
              A few details and you're in. We'll be in touch within one business day.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="auth-label" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                className="auth-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
                placeholder="e.g. Alwell Okafor"
              />
            </div>

            <div>
              <label className="auth-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="auth-label" htmlFor="phone">Mobile number</label>
              <input
                id="phone"
                type="tel"
                className="auth-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={defaultCountry === 'NG' ? '0803 123 4567' : '+1 555 123 4567'}
                required
                autoComplete="tel"
              />
              <p className="auth-hint">
                We'll use this to contact you about your case. Standard SMS rates may apply.
              </p>
            </div>

            <div>
              <label className="auth-label" htmlFor="password">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="auth-recaptcha">
              <Recaptcha ref={recaptchaRef} />
            </div>

            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success-msg">{message}</div>}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating your account…' : 'Create account'}
            </button>

            <p className="auth-footer-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </PublicLayout>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}