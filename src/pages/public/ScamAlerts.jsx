import PublicLayout from '../../components/PublicLayout'
import ScamCaseCard from '../../components/ScamCaseCard'

// ⚠️ IMPORTANT: These cases are FICTIONALIZED COMPOSITES based on real trends.
// Names, exact locations, and identities have been changed to protect privacy
// and comply with defamation and right-of-publicity laws.

const scamCases = [
  {
    id: 1,
    category: 'Crypto Fraud',
    title: 'Crypto Ponzi Scheme Dismantled',
    location: 'Lagos, Nigeria',
    recovered: '$4.2 Million',
    image: '/images/cases/case-crypto.jpg',
    summary: 'A coordinated international operation led to the arrest of three individuals running a fake crypto investment platform that promised 40% monthly returns.',
    details: 'The syndicate used social media influencers to promote a fake trading platform. Over 1,200 victims invested funds expecting unrealistic returns. Through blockchain forensics and coordination with international partners, investigators traced and froze the funds across multiple wallets.',
    tip: 'If an investment promises guaranteed high returns (10%+ monthly), it is almost certainly a scam. Legitimate investments never guarantee profits.'
  },
  {
    id: 2,
    category: 'Romance Scam',
    title: 'International Romance Fraud Ring Busted',
    location: 'Accra, Ghana',
    recovered: '$1.8 Million',
    image: '/images/cases/case-romance.jpg',
    summary: 'Five suspects arrested for running a romance scam operation that targeted widows and divorcees across three continents.',
    details: 'The group created fake profiles on dating sites, built emotional relationships over months, then convinced victims to send money for "emergencies" or "investment opportunities." Funds were laundered through cryptocurrency and shell companies.',
    tip: 'Never send money to someone you have only met online, no matter how strong the emotional connection feels. Video calls can be faked too.'
  },
  {
    id: 3,
    category: 'Wire Transfer Fraud',
    title: 'Business Email Compromise Network Shut Down',
    location: 'Houston, USA',
    recovered: '$7.5 Million',
    image: '/images/cases/case-wire.jpg',
    summary: 'Six individuals arrested for hijacking business email accounts to redirect wire transfers to their own accounts.',
    details: 'The gang used sophisticated phishing techniques to access the email accounts of CFOs and finance managers. They then sent convincing instructions to banks and vendors to redirect payments. The operation targeted over 40 companies.',
    tip: 'Always verify wire transfer requests by calling the requester directly using a known phone number — never rely on email alone.'
  },
  {
    id: 4,
    category: 'Identity Theft',
    title: 'Massive Identity Theft Operation Uncovered',
    location: 'Mumbai, India',
    recovered: '$2.3 Million',
    image: '/images/cases/case-identity.jpg',
    summary: 'Four suspects arrested for stealing and selling personal data of over 50,000 individuals on the dark web.',
    details: 'The group purchased leaked databases and used them to open fraudulent bank accounts and credit lines. Victims only discovered the fraud when they were contacted by debt collectors or noticed strange activity on their credit reports.',
    tip: 'Check your bank statements weekly and freeze your credit if you suspect your identity has been stolen.'
  },
  {
    id: 5,
    category: 'Investment Fraud',
    title: 'Fake Forex Trading Platform Busted',
    location: 'Dubai, UAE',
    recovered: '$5.1 Million',
    image: '/images/cases/case-investment.jpg',
    summary: 'Two suspects arrested for operating an unlicensed forex trading platform that showed fake profits to encourage larger deposits.',
    details: 'The platform allowed initial small withdrawals to build trust, then blocked all withdrawals once victims deposited significant amounts. The operators used fake trading dashboards and fabricated profit reports.',
    tip: 'Always verify a broker is licensed with a recognized financial regulator (SEC, FCA, ASIC) before investing a single dollar.'
  },
  {
    id: 6,
    category: 'Phishing',
    title: 'Phishing Network Targeting Bank Customers Dismantled',
    location: 'Kyiv, Ukraine',
    recovered: '$3.7 Million',
    image: '/images/cases/case-phishing.jpg',
    summary: 'Seven suspects arrested for running phishing campaigns that mimicked major banks to steal login credentials.',
    details: 'The group sent millions of fake emails and SMS messages directing users to fake bank websites. Once credentials were entered, the criminals drained accounts within minutes. They used VPNs and crypto to hide their tracks.',
    tip: 'Never click links in emails or SMS from your bank. Always type your bank\'s official website directly into your browser.'
  },
  {
    id: 7,
    category: 'Ponzi Scheme',
    title: 'Real Estate Ponzi Scheme Collapses',
    location: 'Toronto, Canada',
    recovered: '$12 Million',
    image: '/images/cases/case-ponzi.jpg',
    summary: 'A prominent businessman arrested for running a real estate investment Ponzi scheme that defrauded over 300 investors.',
    details: 'Investors were promised returns from property development projects that never existed. Early investors were paid with money from later investors, creating the illusion of success until the scheme collapsed.',
    tip: 'If you cannot verify that the physical asset (property, mine, artwork) exists, do not invest. Demand an independent audit.'
  },
  {
    id: 8,
    category: 'Ransomware',
    title: 'Ransomware Gang Arrested After Hospital Attacks',
    location: 'Bucharest, Romania',
    recovered: '$6.8 Million',
    image: '/images/cases/case-ransomware.jpg',
    summary: 'Four suspects arrested for deploying ransomware that crippled hospitals, schools, and small businesses across Europe.',
    details: 'The group encrypted critical files and demanded cryptocurrency payments to unlock them. Victims who refused to pay lost irreplaceable data. International cooperation led to their arrest and the seizure of their infrastructure.',
    tip: 'Always keep offline backups of critical files. Never pay ransomware demands — it funds future attacks and does not guarantee recovery.'
  },
  {
    id: 9,
    category: 'Money Laundering',
    title: 'Cryptocurrency Money Laundering Ring Busted',
    location: 'Singapore',
    recovered: '$23 Million',
    image: '/images/cases/case-money-laundering.jpg',
    summary: 'Five suspects arrested for laundering proceeds from various scams through hundreds of crypto wallets and shell companies.',
    details: 'The group used a technique called "chain hopping" — converting funds between different cryptocurrencies and blockchains to hide their origin. Forensic blockchain analysts traced the funds through over 400 transactions.',
    tip: 'Be wary of anyone offering to "process" or "convert" money for you for a fee. Legitimate financial services never require you to hide the source of your funds.'
  },
  {
    id: 10,
    category: 'Business Email',
    title: 'CEO Fraud Syndicate Taken Down',
    location: 'Johannesburg, South Africa',
    recovered: '$4.9 Million',
    image: '/images/cases/case-business-email.jpg',
    summary: 'Three suspects arrested for impersonating CEOs and instructing employees to make urgent wire transfers.',
    details: 'The group studied company hierarchies and travel schedules. They would send urgent emails from fake CEO accounts asking finance staff to process time-sensitive payments before the executive "boarded a flight."',
    tip: 'Establish a company policy requiring verbal verification (by phone or in person) for any transfer over a set amount.'
  }
]

export default function ScamAlerts() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section style={{ background: 'var(--ink)', color: '#fff', padding: '80px 20px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Real Cases · Real Consequences
          </p>
          <h1 style={{ color: '#fff', fontSize: 42, marginBottom: 20 }}>
            Scam Alerts & Case Studies
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
            Learn from real cases of fraudsters brought to justice. Each story includes a cybersecurity tip to help you stay protected.
          </p>
        </div>
      </section>

      {/* CASES GRID */}
      <section className="container" style={{ padding: '72px 20px' }}>
        <div className="cases-grid">
          {scamCases.map((c) => (
            <ScamCaseCard key={c.id} caseData={c} />
          ))}
        </div>
      </section>

      {/* WARNING DISCLAIMER */}
      <section style={{ background: 'var(--paper-raised)', borderTop: '1px solid var(--border)', padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <strong>Legal Notice:</strong> The cases above are fictionalized composites based on real fraud patterns reported in public news. 
            Names, exact locations, and identities have been changed to protect privacy and comply with applicable laws. 
            If you recognize a pattern in your own situation, contact us immediately.
          </p>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .cases-grid { grid-template-columns: 1fr; }
        }

        .case-card {
          background: var(--paper-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 16px);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .case-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }

        .case-card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .case-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .case-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--gold);
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .case-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .case-card-title {
          font-family: var(--serif);
          font-size: 20px;
          color: var(--ink);
          margin: 0 0 12px 0;
        }
        .case-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 14px;
        }
        .case-card-summary {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text);
          margin-bottom: 16px;
        }
        .case-card-details {
          margin-bottom: 16px;
        }
        .case-card-details p {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .case-card-tip {
          background: #fef9e7;
          border-left: 3px solid var(--gold);
          padding: 12px 14px;
          font-size: 13px;
          color: #78350f;
          line-height: 1.5;
          border-radius: 4px;
        }
        .case-card-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--ink);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-top: auto;
          transition: all 0.2s ease;
          align-self: flex-start;
        }
        .case-card-btn:hover {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
      `}</style>
    </PublicLayout>
  )
}