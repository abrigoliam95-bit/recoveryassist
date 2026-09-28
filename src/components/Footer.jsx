import { Link } from 'react-router-dom'
import SiteLogo from './SiteLogo'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div>
          <div style={{ marginBottom: 10 }}>
            <SiteLogo variant="light" />
          </div>
          <p style={styles.tagline}>
            Case management and cybersecurity guidance for people rebuilding
            after a scam.
          </p>
        </div>

        <div style={styles.col}>
          <span style={styles.colTitle}>Company</span>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/services" style={styles.link}>Services</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>

        <div style={styles.col}>
          <span style={styles.colTitle}>Resources</span>
          <Link to="/scam-alerts" style={styles.link}>Scam Alerts</Link>
          <Link to="/tech-tips" style={styles.link}>Tech Tips</Link>
          <Link to="/faq" style={styles.link}>FAQ</Link>
        </div>

        <div style={styles.col}>
          <span style={styles.colTitle}>Get help</span>
          <Link to="/start-a-case" style={styles.link}>Start a case</Link>
          <Link to="/login" style={styles.link}>Client login</Link>
        </div>
      </div>

      <div className="container">
        <p style={styles.bottom}>
          © {new Date().getFullYear()} RecoveryAssist. Support is available
          around the clock. · <Link to="/terms" style={{ color: 'inherit' }}>Terms</Link> · <Link to="/privacy" style={{ color: 'inherit' }}>Privacy</Link>
        </p>
                  {/* New Footer Logo */}
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Powered by:</span>
            <img 
              src="/images/partner.jpg" 
              alt="Partner Logo" 
              style={{ height: '50px', width: 'auto', opacity: 0.9 }} 
            />
          </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--ink)',
    marginTop: 'auto',
    paddingTop: 56,
    paddingBottom: 24,
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
    gap: 32,
    paddingBottom: 40,
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  },
  brand: {
    fontFamily: 'var(--serif)',
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '32ch',
    fontSize: 14,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  colTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    marginBottom: 4,
  },
  link: {
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: 14,
  },
  bottom: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    marginTop: 24,
    marginBottom: 0,
  },
}
