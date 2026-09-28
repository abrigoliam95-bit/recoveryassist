const steps = [
  ['1', 'Free consultation', 'A confidential, no-obligation review of your case by a fraud specialist.'],
  ['2', 'Investigation', 'Forensic tracing of funds, broker history and regulatory standing.'],
  ['3', 'Strategy & filing', 'We build the legal case and file the claim with the right authorities.'],
  ['4', 'Negotiation', 'Direct negotiation with banks, exchanges and regulators on your behalf.'],
  ['5', 'Funds returned', 'Recovered amounts are transferred securely back to your account.'],
]

export default function JourneySteps() {
  return (
    <div>
      <h2 style={{ fontSize: 26, marginBottom: 8 }}>From first call to funds returned</h2>
      <p style={{ fontSize: 15, marginBottom: 32 }}>
        A clear five-step process that keeps you informed at every stage.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {steps.map(([n, title, desc]) => (
          <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 18 }}>
            <div style={badgeStyle}>{n}</div>
            <div>
              <h3 style={{ fontSize: 16, margin: '0 0 4px' }}>{title}</h3>
              <p style={{ fontSize: 14, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const badgeStyle = {
  width: 32, height: 32, borderRadius: '50%', background: 'var(--gold)', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, flexShrink: 0,
}
