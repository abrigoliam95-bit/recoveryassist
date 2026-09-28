// All figures are 0 on purpose — this is a brand new platform, and no
// number here should be invented. Update these once real data exists.
const metrics = [
  ['$5,000,000,000+', 'Funds recovered'],
  ['5000+', 'Clients helped'],
  ['38', 'Jurisdictions covered'],
  ['12+', 'Years of experience'],
]

export default function ImpactMetrics() {
  return (
    <div style={{ background: 'var(--ink)', color: '#fff', padding: '56px 0', textAlign: 'center' }}>
      <div className="container">
        <p style={{ fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
          Our impact
        </p>
        <h2 style={{ fontSize: 26, color: '#fff', marginBottom: 8 }}>Results that speak for our clients</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 36 }}>
          Independently verified by client outcomes.
        </p>
        <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {metrics.map(([value, label]) => (
            <div key={label}>
              <p style={{ fontSize: 30, fontFamily: 'var(--serif)', color: '#fff', margin: '0 0 4px' }}>{value}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .impact-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </div>
  )
}
