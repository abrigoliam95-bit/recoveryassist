import { useState, useEffect, useRef } from 'react'

const LANGUAGES = [
  { code: 'en',    name: 'English',            flag: '🇬🇧' },
  { code: 'fr',    name: 'Français',           flag: '🇫🇷' },
  { code: 'es',    name: 'Español',            flag: '🇪🇸' },
  { code: 'pt',    name: 'Português',          flag: '🇵🇹' },
  { code: 'ar',    name: 'العربية',             flag: '🇸🇦' },
  { code: 'zh-CN', name: '中文 (简体)',         flag: '🇨🇳' },
  { code: 'hi',    name: 'हिन्दी',              flag: '🇮🇳' },
  { code: 'ru',    name: 'Русский',            flag: '🇷🇺' },
  { code: 'de',    name: 'Deutsch',            flag: '🇩🇪' },
  { code: 'ja',    name: '日本語',              flag: '🇯🇵' },
  { code: 'ko',    name: '한국어',              flag: '🇰🇷' },
  { code: 'tr',    name: 'Türkçe',             flag: '🇹🇷' },
  { code: 'id',    name: 'Bahasa Indonesia',   flag: '🇮🇩' },
  { code: 'yo',    name: 'Yorùbá',             flag: '🇳🇬' },
  { code: 'ha',    name: 'Hausa',              flag: '🇳🇬' },
  { code: 'ig',    name: 'Igbo',               flag: '🇳🇬' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/)
    setCurrentLang(match ? match[1] : 'en')
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectLanguage(code) {
    const cookieValue = code === 'en' ? '' : `/en/${code}`
    const host = window.location.hostname

    // Clear old cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host}`

    if (code !== 'en') {
      document.cookie = `googtrans=${cookieValue}; path=/`
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${host}`
    }

    setCurrentLang(code)
    setIsOpen(false)
    window.location.reload()
  }

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0]

  return (
    <div className="lang-switcher" ref={dropdownRef}>
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Change language"
      >
        <GlobeIcon />
        <span className="lang-current">{activeLang.flag} {activeLang.code === 'en' ? 'EN' : activeLang.code.slice(0, 2).toUpperCase()}</span>
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          <div className="lang-dropdown-header">
            <GlobeIcon />
            <span>Choose your language</span>
          </div>
          <div className="lang-list">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
                onClick={() => selectLanguage(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-name">{lang.name}</span>
                {lang.code === currentLang && <CheckIcon />}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .lang-switcher { position: relative; }
        .lang-switcher-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          font-family: var(--sans);
        }
        .lang-switcher-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.35);
        }
        .lang-current {
          display: inline-block;
          min-width: 38px;
          text-align: left;
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 260px;
          max-height: 420px;
          background: var(--paper-raised, #fff);
          border: 1px solid var(--border, #e0e0e0);
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.18);
          overflow: hidden;
          z-index: 9999;
          animation: langFadeIn 0.2s ease;
        }
        @keyframes langFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lang-dropdown-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: var(--paper, #f6f6f6);
          border-bottom: 1px solid var(--border, #e0e0e0);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted, #666);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .lang-list {
          max-height: 340px;
          overflow-y: auto;
          padding: 6px;
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: var(--ink, #16232e);
          font-family: var(--sans);
          text-align: left;
          transition: background 0.15s ease;
        }
        .lang-option:hover { background: var(--paper, #f2f2f2); }
        .lang-option.active {
          background: rgba(184, 134, 58, 0.12);
          color: var(--gold, #b8863a);
          font-weight: 600;
        }
        .lang-flag { font-size: 18px; line-height: 1; }
        .lang-name { flex: 1; }

        @media (max-width: 768px) {
          .lang-switcher-btn .lang-current { display: none; }
          .lang-dropdown {
            width: 240px;
            right: -50px;
          }
        }
      `}</style>
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}