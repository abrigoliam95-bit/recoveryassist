import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/PublicLayout'
import { supabase } from '../../lib/supabaseClient'
import Recaptcha from '../../components/Recaptcha'

export default function Login() {
  const navigate = useNavigate()
  const recaptchaRef = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // 1. Verify CAPTCHA
    const recaptchaToken = recaptchaRef.current?.getToken() || ''
    if (!recaptchaToken) {
      setError('Please complete the "I\'m not a robot" check.')
      return
    }

    setLoading(true)

    try {
      // 2. Attempt sign-in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setLoading(false)

      if (signInError) {
        const msg = (signInError.message || '').toLowerCase()

        if (msg.includes('invalid login')) {
          setError('The email or password you entered is incorrect. Please try again.')
        } else if (msg.includes('email not confirmed')) {
          setError('Please confirm your email address before logging in. Check your inbox for the link we sent.')
        } else if (msg.includes('too many requests') || msg.includes('rate limit')) {
          setError('Too many attempts. Please wait a few minutes and try again.')
        } else if (msg.includes('user not found')) {
          setError("We couldn't find an account with that email. Please check your details or register a new account.")
        } else if (msg.includes('invalid email')) {
          setError('Please enter a valid email address.')
        } else {
          setError('We were unable to sign you in right now. Please check your details and try again.')
        }

        recaptchaRef.current?.reset()
        return
      }

      // 3. Success
      navigate('/dashboard')
    } catch (err) {
      setLoading(false)
      console.error('Login error:', err)

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
        <div className="auth-card">
          <h1 className="auth-title">Log in</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* EMAIL */}
            <div>
              <label className="auth-label" htmlFor="email">Email</label>
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

            {/* PASSWORD WITH SHOW/HIDE TOGGLE */}
            <div>
              <label className="auth-label" htmlFor="password">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Your password"
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

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
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