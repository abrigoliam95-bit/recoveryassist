import PublicLayout from '../../components/PublicLayout'
import WarningSigns from '../../components/WarningSigns'

export default function ScamAlerts() {
  return (
    <PublicLayout>
      <img
        src="/images/scam-alerts-header.jpg"
        alt="Cybersecurity warning visualization"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0', maxWidth: 640 }}>
        <h1 style={{ fontSize: 34, marginBottom: 20 }}>Scam alerts</h1>
        <p style={{ fontSize: 17 }}>Latest scam warnings will be listed here, pulled from the articles table.</p>
      </section>

      <section className="container" style={{ padding: '0 0 72px', maxWidth: 900 }}>
        <WarningSigns />
      </section>
    </PublicLayout>
  )
}
