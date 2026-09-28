import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SiteLogo from './SiteLogo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/scam-alerts', label: 'Scam Alerts' },
  { to: '/faq', label: 'FAQ' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        {/* Hamburger — only visible on smaller screens via CSS below */}
        <button
          className="hamburger-btn"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          style={styles.hamburgerBtn}
        >
          <HamburgerIcon />
        </button>

        <SiteLogo variant="light" />

        {/* Desktop inline links — hidden on smaller screens via CSS below */}
        <nav className="desktop-nav" style={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.link,
                opacity: location.pathname === link.to ? 1 : 0.72,
                borderBottom:
                  location.pathname === link.to
                    ? '2px solid var(--gold)'
                    : '2px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={styles.actions}>
          <Link to="/login" style={{ ...styles.link, opacity: 0.85 }}>
            Log in
          </Link>
          <Link to="/start-a-case" className="btn btn-gold">
            Start a case
          </Link>
        </div>
      </div>

      {/* OFF-CANVAS SLIDE-OUT MENU */}
      {menuOpen && (
        <div style={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <SiteLogo variant="light" />
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 8px' }}>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    ...styles.drawerLink,
                    background: location.pathname === link.to ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setMenuOpen(false)} style={styles.drawerLink}>
                Log in
              </Link>
              <Link
                to="/start-a-case"
                onClick={() => setMenuOpen(false)}
                className="btn btn-gold"
                style={{ margin: '12px 12px 0', textAlign: 'center', border: 'none' }}
              >
                Start a case
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Responsive rule: hamburger only shows, and desktop links only
          hide, below 860px wide. Above that, behaves exactly as before. */}
      <style>{`
        .hamburger-btn { display: none; }
        @media (max-width: 860px) {
          .hamburger-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

const styles = {
  header: {
    background: 'var(--ink)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    gap: 24,
  },
  hamburgerBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: 6,
    marginRight: -6,
  },
  nav: {
    display: 'flex',
    gap: 22,
    flexWrap: 'wrap',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 15,
    paddingBottom: 4,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    flexShrink: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  },
  drawer: {
    width: 280,
    maxWidth: '82vw',
    height: '100%',
    background: 'var(--ink-soft)',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: 26,
    lineHeight: 1,
    cursor: 'pointer',
  },
  drawerLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 15,
    padding: '12px 14px',
    borderRadius: 4,
  },
}
