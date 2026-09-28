import PublicLayout from '../../components/PublicLayout'

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <section className="container" style={{ padding: '64px 0', maxWidth: 760 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Legal</p>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>
          Last updated: [Date]
        </p>

        <Notice />

        <Section title="1. Introduction">
          [Company Name] ("we," "us," "our") respects your privacy. This policy
          explains what personal information we collect through the RecoveryAssist
          platform (the "Service"), how we use it, and the choices you have.
        </Section>

        <Section title="2. Information we collect">
          <ul>
            <li><strong>Account information:</strong> name, email address, phone number, country.</li>
            <li><strong>Case information:</strong> details you submit about a suspected fraud or scam, including dates, amounts, and supporting documents you upload.</li>
            <li><strong>Communications:</strong> messages exchanged with staff through the Service.</li>
            <li><strong>Payment information:</strong> processed by our third-party payment provider — we do not store full card numbers.</li>
            <li><strong>Technical data:</strong> basic log and device information collected automatically, such as browser type.</li>
          </ul>
        </Section>

        <Section title="3. How we use your information">
          <ul>
            <li>To open, investigate, and manage your case</li>
            <li>To communicate with you about your matter</li>
            <li>To process payments in accordance with your retainer or fee agreement</li>
            <li>To comply with legal, regulatory, and Know Your Customer (KYC) / Anti-Money Laundering (AML) obligations</li>
            <li>To improve the Service and maintain security</li>
          </ul>
        </Section>

        <Section title="4. How we share information">
          We do not sell your personal information. We may share it with:
          <ul>
            <li>Staff and counsel assigned to your matter</li>
            <li>Service providers who help us operate the platform (e.g. hosting, payment processing), under confidentiality obligations</li>
            <li>Regulators or law enforcement where required by law</li>
          </ul>
        </Section>

        <Section title="5. Data security">
          We use reasonable administrative, technical, and physical safeguards to
          protect your information, including encrypted connections and access
          controls limiting who can view your case data. No system is perfectly
          secure, and we cannot guarantee absolute security.
        </Section>

        <Section title="6. Data retention">
          We retain your information for as long as needed to manage your case and
          to comply with legal and regulatory obligations, after which it is deleted
          or anonymized in accordance with our internal retention schedule.
        </Section>

        <Section title="7. Your rights">
          Depending on your location, you may have the right to access, correct, or
          request deletion of your personal information, or to object to certain
          processing. To exercise these rights, contact us at [Contact Email].
        </Section>

        <Section title="8. Cookies">
          We use only the minimum technical cookies/local storage needed to keep you
          logged in and remember basic preferences. We do not use third-party
          advertising trackers.
        </Section>

        <Section title="9. Children's privacy">
          The Service is not directed to individuals under 18, and we do not
          knowingly collect personal information from minors.
        </Section>

        <Section title="10. Changes to this policy">
          We may update this policy from time to time. We will post the updated
          version with a new "Last updated" date.
        </Section>

        <Section title="11. Contact us">
          Questions about this policy or your personal information can be sent to
          [Contact Email].
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
        finalize this document — especially given this platform handles sensitive
        financial and personal data — before publishing it for real clients.
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
