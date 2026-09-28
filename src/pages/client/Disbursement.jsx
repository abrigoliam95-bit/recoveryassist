import PortalLayout from '../../components/portal/PortalLayout'
import HorizontalStepper from '../../components/portal/HorizontalStepper'

const STEPS = ['Choose channel', 'Verify details', 'Compliance review', 'Funds released']

export default function Disbursement() {
  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 4px' }}>
              Disbursement console
            </p>
            <h1 style={{ fontSize: 24, margin: 0 }}>Client trust disbursement</h1>
            <p style={{ fontSize: 14, margin: '6px 0 0' }}>Authorise disbursement of recovered funds</p>
          </div>
          <button style={ledgerButtonStyle}>
            <ClockIcon /> Disbursement ledger
          </button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
          Client reference: #[Ref Number]
        </p>

        {/* HIGHLIGHT CARD */}
        <div style={{ ...cardStyle, background: 'var(--ink)', color: '#fff', marginBottom: 28 }}>
          <p style={{ fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 10px' }}>
            Funds cleared for disbursement
          </p>
          <p style={{ fontSize: 34, fontFamily: 'var(--serif)', margin: '0 0 4px' }}>$0.00</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 18 }}>
            Net of agreed legal fees and operational costs already deducted per your agreement.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 18 }}>
            Recovered funds are held in a segregated client trust account (IOLTA) and released
            directly to the verified client of record via traditional banking channels.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TrustBullet text="Held in segregated client trust account" />
            <TrustBullet text="AML / CFT screened on every release" />
            <TrustBullet text="Released only to the verified client of record" />
          </div>
        </div>

        {/* STEPPER */}
        <div style={{ ...cardStyle, marginBottom: 28 }}>
          <HorizontalStepper steps={STEPS} activeStep={0} />
        </div>

        {/* PRIMARY DISBURSEMENT CHANNEL */}
        <p style={sectionLabelStyle}>Primary disbursement channel</p>
        <div style={{ ...cardStyle, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h3 style={{ fontSize: 17, margin: 0 }}>Bank transfer</h3>
                <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 12, background: '#e6f0ee', color: 'var(--teal)' }}>
                  Recommended
                </span>
              </div>
              <p style={{ fontSize: 14, margin: 0 }}>ACH or domestic wire transfer · Verified channel</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            <MiniStat label="Minimum disbursement" value="$0.00" />
            <MiniStat label="Maximum per instruction" value="$0.00" />
            <MiniStat label="Operational fee" value="0%" />
            <MiniStat label="Settlement window" value="3–5 business days" />
          </div>

          <button className="btn btn-gold" style={{ border: 'none' }}>
            Authorise via this channel →
          </button>
        </div>

        {/* TRUST PANEL */}
        <div style={{ background: '#f4f1e9', borderRadius: 6, padding: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <TrustPanelItem text="Trust-account reconciled" />
            <TrustPanelItem text="Case-officer oversight" />
            <TrustPanelItem text="AML / CFT screened in line with client-money handling standards" />
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}

function TrustBullet({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <CheckIcon />
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{text}</span>
    </div>
  )
}

function TrustPanelItem({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <CheckIcon color="#7a5a1e" />
      <span style={{ fontSize: 13, color: '#5a4a2e' }}>{text}</span>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontSize: 15, margin: 0, fontWeight: 500 }}>{value}</p>
    </div>
  )
}

function CheckIcon({ color = 'var(--gold)' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

const cardStyle = {
  background: 'var(--paper-raised)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: 24,
}

const sectionLabelStyle = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.4,
  textTransform: 'uppercase',
  color: 'var(--gold)',
  margin: '0 0 12px',
}

const ledgerButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '8px 14px',
  borderRadius: 4,
  fontSize: 13,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}
