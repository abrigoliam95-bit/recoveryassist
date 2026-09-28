const cards = [
  ['No-Win, No-Fee assurance', 'You only pay if we successfully recover funds on your behalf.'],
  ['Confidential & discreet', 'Every case handled under strict solicitor-client privilege.'],
  ['Regulatory Specialists', 'Authorised and regulated by Financial Conduct Authority (FCA).'],
  ['Multi-jurisdictional reach', 'Cross-border recovery across 38 jurisdictions worldwide.'],
]

export default function WhyChooseUs() {
  return (
    <div>
      <h2 style={{ fontSize: 28, marginBottom: 10 }}>A law firm built around victims, not headlines</h2>
      <p style={{ fontSize: 15, maxWidth: '68ch', marginBottom: 32 }}>
        We combine specialist legal expertise with forensic investigators and global banking
        partners to give you the strongest possible chance of recovery.
      </p>
      <div className="why-choose-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {cards.map(([title, desc]) => (
          <div key={title} style={{ background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 22 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: 14, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .why-choose-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
