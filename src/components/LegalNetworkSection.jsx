// Placeholder attorney network — generic names only, on purpose.
// Swap each entry with real, firm-approved bio text and photos once
// your client sends the confirmed details for each attorney.
const cryptoFraudAttorneys = [
  { name: 'Max Dilendorf', firm: 'Dilendorf Law Firm', location: 'New York City, NY', specialties: ['Crypto & Digital-asset Recovery', 'Cyber crime Arbitration/Litigation'], photo: '/images/max-dilendorf.jpg' }, 
  { name: 'Liam Murphy', firm: 'Murphy Law', location: 'New York City, NY', specialties: ['Crypto Currency Fraud Recovery & Litigation]', 'Blockchain/Digital-asset Disputes & Regulatory Matters'], photo: '/images/liam-murphy.jpg' },
  { name: 'Joshua Ruthizer', firm: 'Wolf Popper', location: 'New York City, NY', specialties: ['Crypto Currency Fraud Litigation', 'NFT & Digital-assets Litigation'], photo: '/images/joshua-ruthizer.jpg' },
  { name: 'Elliot Siebers', firm: 'Carlton Fields', location: 'Los Angeles, CA', specialties: ['Privacy & Cyberseurity;Data/Digital-asset investigation & Litigation', 'Privacy & Cybersecurity;Data/Digital-asset investigation & Litigation'], photo: '/images/elliot-siebers.jpg' },
]

const cybercrimeAttorneys = [
  { name: 'Kent Sinclair', firm: 'Sinclair Law,MA', location: 'Beverly, MA', specialties: ['Cybersecurity,Privacy & Data Protection', 'Commercial Litigation & Arbitration'], photo: '/images/kent-sinclair.jpg' },
  { name: 'Edward McAndrew]', firm: 'BakerHostetler', location: 'Philadelphia, PA', specialties: ['Cybersecurity,Privacy & Digital Risk', 'White-collar/Government Investigations & Litigation'], photo: '/images/edward-mcandrew.jpg' },
  { name: 'Vinoo Varghese]', firm: 'Varghese & Associates', location: 'New York City, NY', specialties: ['Federal Criminal Defense', 'White-collar Crime/Complex Trial Litigation'], photo: '/images/vinoo-varghese.jpg' },
  { name: 'Richard Kaplan]', firm: 'Kaplan Law', location: 'Los Angeles, CA', specialties: ['White-collar Criminal Defense', 'Fraud/Financial & Criminal Defense'], photo: '/images/richard-kaplan.jpg' },
]

export default function LegalNetworkSection() {
  return (
    <div>
      <div style={disclaimerStyle}>
        <p style={{ fontSize: 13, color: '#7a5a1e', margin: 0 }}>
          Our platform is not a law firm and does not provide legal advice. The
          attorneys listed below are independent practitioners in our network. Past
          results do not guarantee a similar outcome in your specific case.
        </p>
      </div>

      <h3 style={groupTitleStyle}>Crypto & digital asset fraud recovery</h3>
      <div className="legal-network-grid" style={{ marginBottom: 40 }}>
        {cryptoFraudAttorneys.map((a, i) => <AttorneyCard key={i} attorney={a} />)}
      </div>

      <h3 style={groupTitleStyle}>Cybercrime defense & white-collar litigation</h3>
      <div className="legal-network-grid">
        {cybercrimeAttorneys.map((a, i) => <AttorneyCard key={i} attorney={a} />)}
      </div>

      <style>{`
        .legal-network-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .legal-network-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .legal-network-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

function AttorneyCard({ attorney }) {
  return (
    <div style={cardStyle}>
      {attorney.photo ? (
        <img 
          src={attorney.photo} 
          alt={attorney.name} 
          // Increased size from 100 to 160 here
          style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px' }} 
        />
      ) : (
        <div style={{ ...photoPlaceholder, width: 160, height: 160 }} aria-hidden="true">
          <PersonIcon />
        </div>
      )}
      
      {/* Only Name is displayed here */}
      <h4 style={{ fontSize: 18, margin: '0 0 12px' }}>{attorney.name}</h4>
      
      {/* Specialties list */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {attorney.specialties.map((s, i) => (
          <li key={i} style={{ marginBottom: 6, fontSize: '14px', color: 'var(--text-muted)' }}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PersonIcon() {
  return (
    // Increased width and height from 32 to 64
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  )
}

const cardStyle = {
  background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6,
  padding: '20px 16px', textAlign: 'center',
}
const photoPlaceholder = {
  width: 160, 
  height: 160, 
  borderRadius: '50%', 
  background: 'var(--paper)', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  margin: '0 auto 20px'
}
const disclaimerStyle = {
  background: '#fbf3e3', border: '1px solid #ecd8a8', borderRadius: 6, padding: 16, marginBottom: 32,
}
const groupTitleStyle = { fontSize: 17, marginBottom: 16 }
