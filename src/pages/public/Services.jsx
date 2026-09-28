import { Link } from 'react-router-dom'
import PublicLayout from '../../components/PublicLayout'
import JourneySteps from '../../components/JourneySteps'

const services = [
  ['Case investigation', 'We review the evidence you provide and map out what happened and where the money went.', '/images/service-investigation.jpg'],
  ['Recovery casework', 'Ongoing case handling, documentation, and follow-through until a case reaches resolution.', '/images/service-recovery.jpg'],
  ['Cybersecurity awareness', 'Guides and alerts to help you and your organization avoid the next scam.', '/images/service-cybersecurity.jpg'],
  ['24/7 support desk', 'A place to ask urgent questions any time, without waiting on a case update.', '/images/service-support-desk.jpg'],
]

export default function Services() {
  return (
    <PublicLayout>
      <section className="container" style={{ padding: '72px 0' }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Services</p>
        <h1 style={{ fontSize: 36, marginBottom: 40, maxWidth: 640 }}>What we do for every client</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {services.map(([title, body, img]) => (
            <div key={title}>
              <img
                src={img}
                alt={title}
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6, marginBottom: 16 }}
              />
              <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20 }}>
                <h3 style={{ fontSize: 19, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 15 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/start-a-case" className="btn btn-gold">Start a case</Link>
          <Link to="/service-areas" style={{ fontSize: 15 }}>View all specialties →</Link>
        </div>
      </section>

      <section style={{ background: 'var(--paper-raised)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '72px 0', maxWidth: 720 }}>
          <JourneySteps />
        </div>
      </section>
    </PublicLayout>
  )
}
