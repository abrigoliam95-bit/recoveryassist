import { useState } from 'react'

const items = [
  ['01', 'Investigation', 'We review your evidence and trace where funds went, across banks, brokers, and blockchains where relevant.'],
  ['02', 'Build a case', 'Our team assembles the legal and factual case, identifying the strongest path to recovery.'],
  ['03', 'Recovery', 'We pursue recovery through negotiation, regulatory channels, or legal action as the case requires.'],
]

export default function RecoveryAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 26, marginBottom: 8 }}>Steps to recover your money</h2>
      <p style={{ fontSize: 15, maxWidth: '68ch', marginBottom: 28 }}>
        If you have lost money trading, our forward thinking & innovative team of investment
        fraud lawyers & legal experts can deliver results in 3 simple steps.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {items.map(([n, title, body], i) => {
          const isOpen = openIndex === i
          return (
            <div key={n} style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={accordionHeaderStyle}
                aria-expanded={isOpen}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: 15 }}>{n}</span>
                  <span style={{ fontWeight: 500 }}>{title}</span>
                </span>
                <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 20px 18px 50px' }}>
                  <p style={{ fontSize: 14, margin: 0 }}>{body}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* HIGHLIGHT CARD */}
      <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '36px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <ShieldIcon />
        </div>
        <p style={{ fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 8px' }}>
          Total recovered
        </p>
        <p style={{ fontSize: 34, fontFamily: 'var(--serif)', margin: '0 0 10px' }}>$5,000,000,000+</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 auto', maxWidth: '40ch' }}>
          Successfully recovered for victims of investment & trading fraud worldwide.
        </p>
      </div>
    </div>
  )
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
      <path d="M12 2 L21 6 V11 C21 17 17 21 12 22 C7 21 3 17 3 11 V6 Z" />
    </svg>
  )
}

const accordionHeaderStyle = {
  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '16px 20px', background: 'var(--paper-raised)', border: 'none', cursor: 'pointer',
  fontSize: 15, fontFamily: 'var(--sans)', textAlign: 'left',
}
