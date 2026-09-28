import { useEffect, useRef } from 'react'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

/**
 * Google reCAPTCHA v2 checkbox wrapper.
 * 
 * Usage:
 *   const recaptchaRef = useRef(null)
 *   <Recaptcha ref={recaptchaRef} />
 *   // Later, to get the token:
 *   const token = recaptchaRef.current.getToken()
 *   // To reset:
 *   recaptchaRef.current.reset()
 */
export default function Recaptcha({ ref }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const isConfigured = Boolean(SITE_KEY)

  // Load the reCAPTCHA script once
  useEffect(() => {
    if (!isConfigured) return

    if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget()
      return
    }

    // Add a callback that fires when the script finishes loading
    window.onRecaptchaLoad = () => renderWidget()

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Cleanup only if no other component is using it
      delete window.onRecaptchaLoad
    }
  }, [isConfigured])

  function renderWidget() {
    if (!containerRef.current) return
    if (widgetIdRef.current !== null) return // already rendered

    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: SITE_KEY,
    })

    // Expose methods via the forwarded ref
    if (ref) {
      ref.current = {
        getToken: () =>
          window.grecaptcha ? window.grecaptcha.getResponse(widgetIdRef.current) : '',
        reset: () => {
          if (window.grecaptcha && widgetIdRef.current !== null) {
            window.grecaptcha.reset(widgetIdRef.current)
          }
        },
      }
    }
  }

  if (!isConfigured) {
    return (
      <div style={{
        padding: '12px',
        background: '#fef9e7',
        border: '1px solid #fde68a',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#92400e',
      }}>
        ⚠️ CAPTCHA not configured. Please set <code>VITE_RECAPTCHA_SITE_KEY</code> in your .env file.
      </div>
    )
  }

  return <div ref={containerRef} />
}