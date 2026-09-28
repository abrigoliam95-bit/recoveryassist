import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const navLinks = [
  { to: '/admin', label: 'Cases' },
  { to: '/admin/clients', label: 'Clients' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/messages', label: 'Messages' },
]

const layoutStyles = `
  .admin-sidebar {
    width: 220px;
    background: var(--ink-soft);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 14px;
    flex-shrink: 0;
  }

  .admin-nav-link {
    padding: 10px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    display: block;
  }

  .admin-content {
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  /* --- MOBILE --- */
  @media (max-width: 768px) {
    /* Force the outer flex wrapper to stack so the sidebar isn't constrained */
    .admin-body {
      flex-direction: column !important;
    }

    .admin-sidebar {
      position: fixed !important;
      top: 64px !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: calc(100vh - 64px) !important;
      z-index: 100 !important;
      overflow-y: auto !important;
      padding: 20px 14px !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }

    .admin-content {
      width: 100vw !important;
    }

    .admin-sidebar-hidden {
      display: none !important;
    }
  }
`;

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 768 : true
  )
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }, [location.pathname])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
      <style>{layoutStyles}</style>

      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button aria-label="Toggle menu" onClick={() => setSidebarOpen((v) => !v)} style={styles.iconButton}>
            <HamburgerIcon />
          </button>
          <span style={styles.title}>Admin Portal</span>
        </div>
        <button aria-label="Notifications" style={styles.iconButton}>
          <BellIcon />
        </button>
      </header>

      {/* ADDED className="admin-body" — this is the missing piece */}
      <div className="admin-body" style={{ display: 'flex', flex: 1 }}>
        <aside className={`admin-sidebar ${!sidebarOpen ? 'admin-sidebar-hidden' : ''}`}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="admin-nav-link"
                style={{
                  background: location.pathname === link.to ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.7)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button onClick={handleLogout} style={styles.logoutLink}>Log out</button>
        </aside>

        <main className="admin-content">{children}</main>
      </div>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} RecoveryAssist. All rights reserved.
      </footer>
    </div>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

const styles = {
  header: {
    height: 64, background: 'var(--ink)', color: '#fff', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', padding: '0 20px',
    position: 'sticky', top: 0, zIndex: 10,
  },
  title: { fontFamily: 'var(--serif)', fontSize: 18 },
  iconButton: { background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 6, display: 'flex' },
  logoutLink: {
    background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
    padding: '9px 12px', borderRadius: 4, fontSize: 14, cursor: 'pointer',
  },
  footer: {
    textAlign: 'center', fontSize: 13, color: 'var(--text-muted)',
    padding: '18px 0', borderTop: '1px solid var(--border)',
  },
}