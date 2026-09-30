import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const BREAKING_CASES = [
  {
    image: '/images/cases/case-crypto.jpg',
    category: 'Breaking',
    headline: 'Crypto Ponzi Scheme Dismantled — $4.2M Recovered',
    summary: 'Three arrests in Lagos. Read the full case.',
    timeAgo: '2 hours ago',
  },
  {
    image: '/images/cases/case-romance.jpg',
    category: 'Breaking',
    headline: 'Romance Fraud Ring Busted — $1.8M Recovered',
    summary: 'Five suspects arrested across three continents.',
    timeAgo: '5 hours ago',
  },
  {
    image: '/images/cases/case-wire.jpg',
    category: 'Breaking',
    headline: 'Business Email Network Shut Down — $7.5M Recovered',
    summary: 'Six individuals arrested for wire transfer hijacking.',
    timeAgo: '1 day ago',
  },
  {
    image: '/images/cases/case-identity.jpg',
    category: 'Breaking',
    headline: 'Identity Theft Operation Uncovered — $2.3M Recovered',
    summary: 'Data of 50,000 individuals stolen and sold.',
    timeAgo: '1 day ago',
  },
  {
    image: '/images/cases/case-investment.jpg',
    category: 'Breaking',
    headline: 'Fake Forex Platform Busted — $5.1M Recovered',
    summary: 'Two suspects arrested for a fake trading scheme.',
    timeAgo: '2 days ago',
  },
  {
    image: '/images/cases/case-phishing.jpg',
    category: 'Breaking',
    headline: 'Phishing Network Dismantled — $3.7M Recovered',
    summary: 'Seven arrested for mimicking major banks.',
    timeAgo: '3 days ago',
  },
  {
    image: '/images/cases/case-ponzi.jpg',
    category: 'Breaking',
    headline: 'Real Estate Ponzi Collapses — $12M Recovered',
    summary: 'Businessman arrested for defrauding 300 investors.',
    timeAgo: '4 days ago',
  },
  {
    image: '/images/cases/case-ransomware.jpg',
    category: 'Breaking',
    headline: 'Ransomware Gang Arrested — $6.8M Recovered',
    summary: 'Four suspects arrested for hospital attacks.',
    timeAgo: '5 days ago',
  },
  {
    image: '/images/cases/case-money-laundering.jpg',
    category: 'Breaking',
    headline: 'Crypto Money Laundering Busted — $23M Recovered',
    summary: 'Five suspects arrested for laundering scam proceeds.',
    timeAgo: '1 week ago',
  },
  {
    image: '/images/cases/case-business-email.jpg',
    category: 'Breaking',
    headline: 'CEO Fraud Syndicate Taken Down — $4.9M Recovered',
    summary: 'Three suspects arrested for impersonating CEOs.',
    timeAgo: '1 week ago',
  },
]

export default function BreakingNewsPopup() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const breakingCase = useMemo(
    () => BREAKING_CASES[Math.floor(Math.random() * BREAKING_CASES.length)],
    []
  )

  useEffect(() => {
    const seen = sessionStorage.getItem('breakingNewsDismissed')
    if (seen) return
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  function handleClose(e) {
    e.stopPropagation()
    setVisible(false)
    sessionStorage.setItem('breakingNewsDismissed', 'true')
    setTimeout(() => setDismissed(true), 400)
  }

  function handleClick() {
    sessionStorage.setItem('breakingNewsDismissed', 'true')
    navigate('/scam-alerts')
  }

  if (dismissed) return null

  return (
    <>
      <div
        className={`breaking-news ${visible ? 'breaking-news-visible' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="breaking-news-image">
          <img src={breakingCase.image} alt={breakingCase.headline} />
          <span className="breaking-news-badge">
            <span className="live-dot"></span>
            {breakingCase.category}
          </span>
        </div>

        <div className="breaking-news-body">
          <p className="breaking-news-time">{breakingCase.timeAgo}</p>
          <h4 className="breaking-news-headline">{breakingCase.headline}</h4>
          <p className="breaking-news-summary">{breakingCase.summary}</p>
          <span className="breaking-news-cta">Read More →</span>
        </div>

        <button
          className="breaking-news-close"
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          &times;
        </button>
      </div>

      <style>{`
        .breaking-news {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 300px; /* Reduced from 360px */
          max-width: calc(100vw - 32px);
          background: var(--paper-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(22, 35, 46, 0.15);
          overflow: hidden;
          cursor: pointer;
          z-index: 9998;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .breaking-news-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .breaking-news:hover {
          box-shadow: 0 15px 35px rgba(22, 35, 46, 0.2);
          transform: translateY(-3px) scale(1.01);
        }

        .breaking-news-image {
          position: relative;
          height: 100px; /* Reduced from 140px */
          overflow: hidden;
        }
        .breaking-news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .breaking-news:hover .breaking-news-image img {
          transform: scale(1.06);
        }

        .breaking-news-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #dc2626;
          color: #fff;
          padding: 3px 8px 3px 6px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
        }

        .live-dot {
          width: 5px;
          height: 5px;
          background: #fff;
          border-radius: 50%;
          position: relative;
          animation: livePulse 1.4s ease-in-out infinite;
        }
        .live-dot::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          animation: liveRipple 1.4s ease-out infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes liveRipple {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .breaking-news-body {
          padding: 12px 14px 14px; /* Tightened up */
        }
        .breaking-news-time {
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
          font-weight: 600;
        }
        .breaking-news-headline {
          font-family: var(--serif);
          font-size: 13px; /* Reduced from 16px */
          line-height: 1.3;
          color: var(--ink);
          margin: 0 0 4px 0;
        }
        .breaking-news-summary {
          font-size: 11px; /* Reduced from 13px */
          line-height: 1.4;
          color: var(--text-muted);
          margin: 0 0 8px 0;
        }
        .breaking-news-cta {
          font-size: 11px;
          font-weight: 600;
          color: var(--gold);
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .breaking-news:hover .breaking-news-cta {
          transform: translateX(3px);
        }

        .breaking-news-close {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          border: none;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          z-index: 2;
        }
        .breaking-news-close:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .breaking-news {
            left: 12px;
            right: 12px;
            bottom: 85px; /* Positioned just above the live chat */
            width: auto;
          }
          .breaking-news-image { height: 80px; }
          .breaking-news-headline { font-size: 12px; }
          .breaking-news-summary { font-size: 10px; }
        }
      `}</style>
    </>
  )
}