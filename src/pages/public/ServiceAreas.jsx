import PublicLayout from '../../components/PublicLayout';

const specialties = [
  { img: '/images/trading.jpg', title: 'Trading Scams', desc: 'Expert recovery services for victims of trading scams and fraudulent brokers.' },
  { img: '/images/crypto.jpg', title: 'Cryptocurrency & Bitcoin Trading Scams', desc: 'Recovery services for victims of cryptocurrency and bitcoin fraud.' },
  { img: '/images/forex.jpg', title: 'Forex Trading Scams', desc: 'Expert recovery services for forex trading fraud and unregulated brokers.' },
  { img: '/images/investment.jpg', title: 'Investment Scams', desc: 'Recovery services for victims of fraudulent investment schemes.' },
  { img: '/images/pension.jpg', title: 'Pension Scams', desc: 'Recovery for pension liberation fraud, SIPP mis-selling, and rogue transfers.' },
  { img: '/images/binary.jpg', title: 'Binary Option Scams', desc: 'Recovery for binary-options trading fraud banned in the UK but still operating.' },
  { img: '/images/boiler-room.jpg', title: 'Boiler Room Fraud', desc: 'Recovery from high-pressure cold-call investment scams selling worthless shares.' },
  { img: '/images/pump-dump.jpg', title: 'Pump and Dump Scams', desc: 'Recovery from coordinated stock and crypto market manipulation schemes.' },
  { img: '/images/land-banking.jpg', title: 'Land Banking Fraud', desc: 'Recovery from land-banking investment fraud and small plots sold with false promises.' },
  { img: '/images/phishing.jpg', title: 'Phishing Scams', desc: 'Recovery for victims of phishing attacks, credential theft, and fake banking emails.' },
  { img: '/images/romance.jpg', title: 'Romance Fraud & Scams', desc: 'Confidential, sensitive recovery for victims of online romance and dating fraud.' },
  { img: '/images/impersonation.jpg', title: 'Impersonation Scams', desc: 'Recovery from safe account, HMRC, police, and bank impersonation fraud.' },
  { img: '/images/ai-scams.jpg', title: 'AI Scams', desc: 'Recovery from AI-powered fraud, deepfake scams, and voice-cloning attacks.' },
  { img: '/images/ponzi.jpg', title: 'Ponzi Fraud', desc: 'Recovery for Ponzi and pyramid scheme fraud victims.' },
  { img: '/images/purchase.jpg', title: 'Purchase Scams', desc: 'Recovery for fake products, online marketplace fraud, and undelivered goods.' },
  { img: '/images/spoofing.jpg', title: 'Spoofing Scams & Fraud', desc: 'Recovery from caller-ID, SMS, and email spoofing fraud.' },
  { img: '/images/advance-fee.jpg', title: 'Advanced Fee Fraud', desc: 'Recovery from advance-fee fraud, fake loans, prizes, inheritances, and more.' },
  { img: '/images/affinity.jpg', title: 'Affinity Fraud', desc: 'Recovery from fraud targeting religious, ethnic, professional, or community groups.' },
  { img: '/images/internet.jpg', title: 'Internet & Online Scams', desc: 'Comprehensive recovery for fake websites, social-media fraud, and other online scams.' },
  { img: '/images/hyperverse.jpg', title: 'HyperVerse Scam', desc: 'Specialist recovery for HyperVerse, HyperFund, and HyperNation crypto-MLM victims.' },
  { img: '/images/bank-fraud.jpg', title: 'Bank Fraud', desc: 'Expert recovery for bank fraud and authorised push payment scams.' },
  { img: '/images/revolut.jpg', title: 'Revolut Scam Refunds', desc: 'Specialist recovery for scams involving Revolut accounts.' },
  { img: '/images/monzo.jpg', title: 'Monzo Fraud', desc: 'Recovery for fraud involving Monzo accounts, PSR reimbursement and FOS escalation.' },
  { img: '/images/chase.jpg', title: 'Chase Bank Scams', desc: 'Recovery for scams involving Chase UK accounts, a frequent destination for fraudsters.' },
  { img: '/images/regulated-broker.jpg', title: 'Regulated Broker Recovery', desc: 'Recovering losses from regulated brokerage disputes and mis-selling.' },
  { img: '/images/tracing.jpg', title: 'Tracing Services', desc: 'Professional asset tracing across banks, blockchains, and corporate structures.' }
];

export default function ServiceAreas() {
  return (
    <PublicLayout>
      <section className="container" style={{ padding: '64px 0' }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Service areas</p>
        <h1 style={{ fontSize: 32, marginBottom: 36, maxWidth: 700 }}>Specialties & practice areas</h1>
                <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/verified.jpg" 
            alt="Verified Service" 
            style={{ 
              height: '80px', // Increased to 80px so it's a nice prominent badge
              width: 'auto',
              borderRadius: '8px' // Slightly rounder corners for a badge look
            }} 
          />
        </div>

        <div className="specialty-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {specialties.map((item) => (
            <div key={item.title} style={cardStyle}>
              
              {/* IMAGE SECTION - Clean, no icon below it now */}
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '160px', 
                  objectFit: 'cover', 
                  borderRadius: '6px',
                  marginBottom: '16px' 
                }} 
              />

              <h3 style={{ fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, marginBottom: 14, flexGrow: 1 }}>{item.desc}</p>
              <a href="/start-a-case" style={{ fontSize: 13, color: 'var(--gold)', textDecoration: 'none' }}>Learn more &rarr;</a>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 36 }}>
          All cases are subject to independent review. Past results do not guarantee a similar
          outcome. Our platform connects clients with independent legal and financial
          professionals.
        </p>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .specialty-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .specialty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PublicLayout>
  );
}

const cardStyle = {
  background: 'var(--paper-raised)', 
  border: '1px solid var(--border)', 
  borderRadius: 6, 
  padding: 20,
  display: 'flex',
  flexDirection: 'column'
};