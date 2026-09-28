import PublicLayout from '../../components/PublicLayout'
import RecoveryAccordion from '../../components/RecoveryAccordion'

export default function HowItWorks() {
  return (
    <PublicLayout>
      <img
        src="/images/step-2-handler-alt.jpg"
        alt="A case handler walking through the recovery process"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0 72px', maxWidth: 720 }}>
        <RecoveryAccordion />
      </section>
    </PublicLayout>
  )
}
