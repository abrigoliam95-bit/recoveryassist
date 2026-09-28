import PublicLayout from '../../components/PublicLayout'

export default function TermsOfService() {
  return (
    <PublicLayout>
      <section className="container" style={{ padding: '64px 0', maxWidth: 760 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Legal</p>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>
          Last updated: [Date]
        </p>

        <Notice />

        <Section title="1. Who we are">
          [Company Name] ("we," "us," "our") operates the RecoveryAssist platform
          (the "Service"), which provides case management, cybersecurity guidance,
          and related support to clients pursuing recovery of funds lost to fraud
          or scams. We are located at [Company Address].
        </Section>

        <Section title="2. Acceptance of these terms">
          By creating an account, submitting a case, or otherwise using the Service,
          you agree to these Terms of Service and our Privacy Policy. If you do not
          agree, do not use the Service.
        </Section>

        <Section title="3. Eligibility">
          You must be at least 18 years old and legally able to enter into a binding
          agreement to use the Service.
        </Section>

        <Section title="4. Description of the Service">
          The Service allows you to submit information about a suspected fraud or
          scam, track the status of a case, communicate with assigned staff, and
          manage related billing. [Company Name] does not guarantee recovery of any
          funds. Case outcomes depend on facts specific to each matter, and past
          results do not guarantee similar outcomes.
        </Section>

        <Section title="5. Client responsibilities">
          <ul>
            <li>Provide accurate, complete, and truthful information when filing a claim.</li>
            <li>Keep your login credentials confidential.</li>
            <li>Do not use the Service for any unlawful purpose.</li>
            <li>Respond to reasonable requests for documentation needed to progress your case.</li>
          </ul>
        </Section>

        <Section title="6. Fees">
          Any fees associated with your matter will be disclosed to you in advance
          and billed in accordance with your signed service agreement or retainer.
          No upfront fee is required to submit an initial claim. Fee details are
          available in your Billing & Invoices section once your case is opened.
        </Section>

        <Section title="7. No attorney-client relationship">
          Use of the Service does not, by itself, create an attorney-client
          relationship. Where independent legal counsel is engaged in connection
          with your matter, the terms of that relationship are governed separately
          by the engagement agreement with that counsel.
        </Section>

        <Section title="8. Disclaimers">
          The Service is provided "as is" without warranties of any kind, express
          or implied. We do not warrant that the Service will be uninterrupted,
          error-free, or secure at all times.
        </Section>

        <Section title="9. Limitation of liability">
          To the maximum extent permitted by law, [Company Name] shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages
          arising from your use of the Service.
        </Section>

        <Section title="10. Termination">
          We may suspend or terminate your access to the Service at our discretion,
          including for violation of these terms. You may stop using the Service at
          any time.
        </Section>

        <Section title="11. Governing law">
          These terms are governed by the laws of [State/Jurisdiction], without
          regard to its conflict of law principles.
        </Section>

        <Section title="12. Changes to these terms">
          We may update these terms from time to time. Continued use of the Service
          after changes take effect constitutes acceptance of the revised terms.
        </Section>

        <Section title="13. Contact">
          Questions about these terms can be sent to [Contact Email].
        </Section>
      </section>
    </PublicLayout>
  )
}

function Notice() {
  return (
    <div style={{ background: '#fbf3e3', border: '1px solid #ecd8a8', borderRadius: 6, padding: 16, marginBottom: 32 }}>
      <p style={{ fontSize: 13, color: '#7a5a1e', margin: 0 }}>
        This is a draft template with placeholder fields (shown in [brackets]). It is
        not legal advice. Have a licensed attorney in your jurisdiction review and
        finalize this document before publishing it for real clients.
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}
