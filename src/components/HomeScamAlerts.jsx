import { Link } from 'react-router-dom'

// Show the 3 most recent cases on the home page
const FEATURED_CASES = [
  {
    id: 1,
    image: '/images/cases/case-crypto.jpg',
    category: 'Crypto Fraud',
    headline: 'Crypto Ponzi Scheme Dismantled — $4.2M Recovered',
    summary: 'A coordinated international operation led to three arrests in Lagos.',
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    image: '/images/cases/case-romance.jpg',
    category: 'Romance Scam',
    headline: 'International Romance Fraud Ring Busted — $1.8M Recovered',
    summary: 'Five suspects arrested for targeting widows across three continents.',
    timeAgo: '5 hours ago',
  },
  {
    id: 3,
    image: '/images/cases/case-wire.jpg',
    category: 'Wire Fraud',
    headline: 'Business Email Network Shut Down — $7.5M Recovered',
    summary: 'Six individuals arrested for hijacking business emails to redirect wires.',
    timeAgo: '1 day ago',
  },
]

export default function HomeScamAlerts() {
  return (
    <section className="home-alerts-section">
      <div className="container">

        {/* Header */}
        <div className="home-alerts-header">
          <div>
            <p className="home-alerts-eyebrow">Scam Alerts</p>
            <h2 className="home-alerts-title">Latest fraud cases we've helped bring to justice</h2>
            <p className="home-alerts-subtitle">
              Real consequences for fraudsters. Read the cases and learn how to protect yourself.
            </p>
          </div>
          <Link to="/scam-alerts" className="home-alerts-viewall">
            View all alerts →
          </Link>
        </div>

        {/* Featured Cases */}
        <div className="home-alerts-grid">
          {FEATURED_CASES.map((c) => (
            <Link
              key={c.id}
              to="/scam-alerts"
              className="home-alert-card"
            >
              <div className="home-alert-image">
                <img src={c.image} alt={c.headline} loading="lazy" />
                <span className="home-alert-badge">
                  <span className="home-alert-dot"></span>
                  Breaking
                </span>
              </div>
              <div className="home-alert-body">
                <p className="home-alert-meta">
                  {c.category} · {c.timeAgo}
                </p>
                <h3 className="home-alert-headline">{c.headline}</h3>
                <p className="home-alert-summary">{c.summary}</p>
                <span className="home-alert-cta">Read Full Case →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        .home-alerts-section {
          padding: 72px 0;
          background: var(--paper);
          border-top: 1px solid var(--border);
        }

        .home-alerts-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .home-alerts-eyebrow {
          color: var(--gold);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 8px 0;
        }
        .home-alerts-title {
          font-family: var(--serif);
          font-size: 28px;
          color: var(--ink);
          margin: 0 0 8px 0;
          max-width: 560px;
          line-height: 1.2;
        }
        .home-alerts-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          margin: 0;
          max-width: 520px;
        }
        .home-alerts-viewall {
          font-size: 14px;
          font-weight: 600;
          color: var(--gold);
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s ease;
        }
        .home-alerts-viewall:hover {
          transform: translateX(4px);
        }

        .home-alerts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .home-alert-card {
          background: var(--paper-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: var(--shadow-sm);
        }
        .home-alert-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: var(--gold);
        }

        .home-alert-image {
          position: relative;
          height: 160px;
          overflow: hidden;
        }
        .home-alert-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .home-alert-card:hover .home-alert-image img {
          transform: scale(1.05);
        }

        .home-alert-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #dc2626;
          color: #fff;
          padding: 4px 10px 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
        }

        .home-alert-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          position: relative;
          animation: alertPulse 1.4s ease-in-out infinite;
        }
        .home-alert-dot::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          animation: alertRipple 1.4s ease-out infinite;
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes alertRipple {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .home-alert-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .home-alert-meta {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 8px 0;
          font-weight: 600;
        }
        .home-alert-headline {
          font-family: var(--serif);
          font-size: 16px;
          line-height: 1.3;
          color: var(--ink);
          margin: 0 0 8px 0;
        }
        .home-alert-summary {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0 0 14px 0;
          flex: 1;
        }
        .home-alert-cta {
          font-size: 13px;
          font-weight: 600;
          color: var(--gold);
          display: inline-block;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .home-alerts-grid {
            grid-template-columns: 1fr;
          }
          .home-alerts-title {
            font-size: 22px;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .home-alerts-section { padding: 48px 0; }
          .home-alerts-header { margin-bottom: 28px; }
          .home-alerts-title { font-size: 20px; }
          .home-alert-headline { font-size: 15px; }
        }
      `}</style>
    </section>
  )
}