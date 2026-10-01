import { Link } from 'react-router-dom'
import PublicLayout from '../../components/PublicLayout'
import WhyChooseUs from '../../components/WhyChooseUs'
import ImpactMetrics from '../../components/ImpactMetrics'
import AccreditedBy from '../../components/AccreditedBy'
import HomeScamAlerts from '../../components/HomeScamAlerts'

const steps = [
  ['1', 'Tell us what happened', 'Submit your case with as much detail as you have — dates, amounts, screenshots.', '/images/step-1-notes.jpg'],
  ['2', 'A case handler is assigned', 'A real person reviews your case and reaches out within one business day.', '/images/step-2-handler.jpg'],
  ['3', 'We work the case', 'Documents, messages, and updates all live in your client dashboard.', '/images/step-3-review.jpg'],
  ['4', 'Resolution', 'We close the loop with you, whatever the outcome, in plain language.', '/images/step-4-handshake.jpg'],
]

export default function Home() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="home-hero" style={{ background: 'var(--ink)', color: '#fff' }}>
        <div
          className="container home-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 48,
            alignItems: 'center',
            padding: '96px 32px',
          }}
        >
          <div>
            <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 18 }}>
              Scam and fraud recovery casework
            </p>
            <h1 className="home-hero-headline" style={{ color: '#fff', fontSize: 46, marginBottom: 22 }}>
              Rebuilding what a scam took, one case at a time.
            </h1>
            <p className="home-hero-subtext" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, marginBottom: 32 }}>
              We open a case, assign it to a fraud investigator and stay with you
              until it's resolved, with a support desk answering questions
              any hour of the day.
            </p>
            <div className="home-hero-buttons" style={{ display: 'flex', gap: 16 }}>
              <Link to="/start-a-case" className="btn btn-gold">
                Start a case
              </Link>
              <Link to="/how-it-works" className="btn btn-outline">
                See how it works
              </Link>
            </div>
          </div>

          {/* Case card mock — echoes the product itself */}
          <div
            className="home-hero-card"
            style={{
              background: 'var(--ink-soft)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 6,
              padding: 28,
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 4 }}>
              Case #RA-2291
            </p>
            <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 18 }}>
              Wire transfer recovery
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Case opened', true],
                ['Assigned to a case handler', true],
                ['Evidence under review', true],
                ['Resolution', false],
              ].map(([label, done]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: done ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: done ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 14 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="container" style={{ padding: '48px 0 0' }}>
        <div
          className="trust-strip-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <img
            src="/images/hero-meeting.jpg"
            alt="Case handlers reviewing a client's case together"
            style={{ width: '100%', borderRadius: 6, display: 'block' }}
          />
          <div>
            <h2 style={{ fontSize: 26, marginBottom: 10 }}>
              A team behind every case, not a queue
            </h2>
            <p style={{ fontSize: 16, marginBottom: 0 }}>
              When you start a case, it goes to an actual case handler — not
              a ticket number. They stay assigned to your case from open to close.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '88px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, marginBottom: 12 }}>How a case moves forward</h2>
          <p style={{ marginBottom: 48 }}>
            Four steps, from the moment you reach out to the moment your case closes.
          </p>

          <div
            className="steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 28,
            }}
          >
            {steps.map(([n, title, body, img]) => (
              <div key={n} className="step-card">
                <img
                  src={img}
                  alt={title}
                  style={{
                    width: '100%',
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: 6,
                    marginBottom: 16,
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 24,
                    color: 'var(--gold)',
                    marginBottom: 8,
                  }}
                >
                  {n}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 15 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCAM ALERTS SECTION — NEW */}
      <HomeScamAlerts />

      {/* SUPPORT STRIP */}
      <section style={{ background: 'var(--paper-raised)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div
          className="container support-strip-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 32,
            padding: '0',
          }}
        >
          <div style={{ padding: '56px 0' }}>
            <h3 style={{ fontSize: 22, marginBottom: 6 }}>
              Questions don't wait for business hours — neither do we
            </h3>
            <p style={{ marginBottom: 20 }}>
              Our support desk is staffed around the clock for urgent enquiries.
            </p>
            <Link to="/contact" className="btn btn-outline-dark">
              Talk to support
            </Link>
          </div>
          <img
            src="/images/support-strip.jpg"
            alt="Support agent assisting a client"
            style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 6 }}
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container" style={{ padding: '88px 0 0' }}>
        <WhyChooseUs />
      </section>

      {/* OUR IMPACT */}
      <ImpactMetrics />

      {/* ACCREDITED BY */}
      <section className="container" style={{ padding: '48px 0' }}>
        <AccreditedBy />
      </section>

      {/* CLOSING CTA */}
      <section className="closing-cta" style={{ padding: '88px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, marginBottom: 14 }}>
            If you've lost money to a scam, you don't have to sort it out alone.
          </h2>
          <p style={{ margin: '0 auto 28px' }}>
            Opening a case takes a few minutes and costs nothing to start.
          </p>
          <Link to="/start-a-case" className="btn btn-gold">
            Start a case
          </Link>
        </div>
      </section>

    </PublicLayout>
  )
}