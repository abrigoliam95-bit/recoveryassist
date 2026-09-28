import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SiteLogo from './SiteLogo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/scam-alerts', label: 'Scam Alerts' },
  { to: '/faq', label: 'FAQ' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

const navStyles = `
  /* --- HAMBURGER BUTTON --- */
  .hamburger-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin-left: 15px; 
  }
  .hamburger-btn span {
    display: block;
    width: 26px;
    height: 2px;
    background: #ffffff;
    transition: 0.3s;
  }

  /* --- OFF-CANVAS MENU STYLES --- */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }
  .menu-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .off-canvas-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: var(--ink);
    color: #fff;
    z-index: 999;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    box-shadow: -2px 0 10px rgba(0,0,0,0.3);
  }
  .off-canvas-menu.open {
    transform: translateX(0);
  }
  
  .off-canvas-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    line-height: 1;
    transition: all 0.2s ease;
  }
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .off-canvas-links {
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .off-canvas-links .nav-item {
    display: block;
    font-size: 16px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: #fff;
    text-decoration: none;
  }
  .off-canvas-links .nav-item:hover {
    color: var(--gold) !important;
  }
  .off-canvas-links .nav-item.active {
    color: var(--gold) !important;
    font-weight: 600;
  }

  /* --- RESPONSIVE: HIDE START A CASE BUTTON AND TRUSTPILOT ON MOBILE --- */
  @media (max-width: 768px) {
    .start-case-desktop-btn {
      display: none !important;
    }
    .trustpilot-logo {
      display: none !important;
    }
  }
`;

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header style={styles.header}>
      <style>{navStyles}</style>

      <div className="container" style={styles.inner}>
        {/* Left Side: Logo and Trustpilot logo grouped together */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <SiteLogo variant="light" />
          <img 
            src="/images/trustpilot.jpg" 
            alt="Trustpilot" 
            className="trustpilot-logo"
            style={{ height: '38px', width: 'auto' }} 
          />
        </div>

        {/* Right Side: Start a case Button + Hamburger */}
        <div style={styles.rightSection}>
          <Link to="/start-a-case" className="btn btn-gold start-case-desktop-btn">
            Start a case
          </Link>
          
          <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* --- OFF-CANVAS MENU --- */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu} 
      />
      
      <div className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
        
        <div className="off-canvas-header">
          <SiteLogo variant="light" />
          <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu">
            &times;
          </button>
        </div>
        
        <div className="off-canvas-links">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/login" className="nav-item" style={{ opacity: 0.85 }} onClick={toggleMenu}>
              Log in
            </Link>
            {/* Start a case button inside mobile menu */}
            <Link to="/start-a-case" className="btn btn-gold" style={{ textAlign: 'center' }} onClick={toggleMenu}>
              Start a case
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
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
    padding: '0 20px',
    width: '100%',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    flexShrink: 0,
  },
};