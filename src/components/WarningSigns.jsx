const signs = [
  ['Advised How to Trade', 'Were you advised to buy or sell a specific stock, commodity, or forex?'],
  ['Guaranteed Profit', 'Did they assure you of making huge profits from your investment?'],
  ['Pressured to Deposit', 'Were you pressured to deposit money quickly or under tight deadlines?'],
  ['Professional Account Upgrades', 'Were you advised to provide false information to upgrade your trading account?'],
  ['Prevented Withdrawals', 'Did you try to withdraw your money and were resisted or blocked?'],
]

export default function WarningSigns() {
  return (
    <div>
      <h2 style={{ fontSize: 26, marginBottom: 10 }}>Know the warning signs: common strategies used by fraudsters</h2>
      <p style={{ fontSize: 15, maxWidth: '70ch', marginBottom: 28 }}>
        If you experienced any of the following, you may have been targeted by a fraudulent
        scheme. Recognizing these red flags is the first step.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }} className="warning-signs-grid">
        {signs.map(([title, desc]) => (
          <div key={title} style={{ background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: 14, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
        This information is for educational purposes only and does not constitute legal
        advice. If you recognize these signs, please contact our intake team for a
        confidential review.
      </p>

      <style>{`
        @media (max-width: 640px) {
          .warning-signs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
