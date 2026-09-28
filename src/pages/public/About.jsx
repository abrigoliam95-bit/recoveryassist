import PublicLayout from '../../components/PublicLayout'
import TeamSection from '../../components/TeamSection'
import LegalNetworkSection from '../../components/LegalNetworkSection'

export default function About() {
  return (
    <PublicLayout>
      <img
        src="/images/about-team.jpg"
        alt="Our team in a meeting"
        style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0', maxWidth: 760 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>About us</p>
        <h1 style={{ fontSize: 36, marginBottom: 20 }}>We handle recovery cases like they matter, because they do.</h1>
        <p style={{ fontSize: 17 }}>
          RecoveryAssist was built around a simple idea: when someone loses money to a scam,
          they shouldn't also have to lose time chasing updates or wondering if anyone is
          actually working on their case. Every case that comes through our doors is assigned
          to a real handler, tracked from start to finish, and backed by a support desk that
          never fully closes.
        </p>
        <p style={{ fontSize: 17 }}>
          Alongside casework, we publish plain-language guidance on scams and online safety,
          because prevention is cheaper than recovery — for everyone.
        </p>
      </section>

      <section className="container" style={{ padding: '0 0 72px' }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Meet the team</p>
        <h2 style={{ fontSize: 26, marginBottom: 32 }}>The people behind your case</h2>
        <TeamSection />
      </section>

      <section className="container" style={{ padding: '0 0 72px' }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Our network</p>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>Access a network of elite legal experts</h2>
        <p style={{ fontSize: 15, maxWidth: '70ch', marginBottom: 32 }}>
          We connect clients with independent, highly credentialed attorneys specializing
          in complex financial litigation, digital asset tracing, and regulatory defense.
        </p>
        <LegalNetworkSection />
      </section>
    </PublicLayout>
  )
}
