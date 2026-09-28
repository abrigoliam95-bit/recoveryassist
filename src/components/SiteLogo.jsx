import { Link } from 'react-router-dom'

// A reusable logo: a shield mark (security/trust) + wordmark.
// variant="light" = for dark backgrounds (header/footer, white text)
// variant="dark"  = for light backgrounds (white pages, navy text)
export default function SiteLogo({ variant = 'light', size = 26, linkToHome = true, showWordmark = true }) {
  const textColor = variant === 'light' ? '#ffffff' : 'var(--ink)'
  const shieldColor = 'var(--gold)'

  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M16 2 L28 7 V15 C28 23 22.5 28.5 16 30 C9.5 28.5 4 23 4 15 V7 Z"
          fill="none"
          stroke={shieldColor}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 16 L14.5 20 L21.5 12"
          fill="none"
          stroke={shieldColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span style={{ fontFamily: 'var(--serif)', fontSize: size * 0.85, color: textColor, whiteSpace: 'nowrap' }}>
          Recovery<span style={{ color: 'var(--gold)' }}>Assist</span>
        </span>
      )}
    </span>
  )

  if (!linkToHome) return content

  return (
    <Link to="/" aria-label="RecoveryAssist logo, go to homepage" style={{ textDecoration: 'none', display: 'inline-flex' }}>
      {content}
    </Link>
  )
}
