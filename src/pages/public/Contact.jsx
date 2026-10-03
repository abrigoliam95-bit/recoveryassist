import PublicLayout from '../../components/PublicLayout'

export default function Contact() {
  return (
    <PublicLayout>
      <img
        src="/images/contact-header.jpg"
        alt="Filling out a contact form"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0', maxWidth: 640 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>Contact</p>
        <h1 style={{ fontSize: 34, marginBottom: 20 }}>Reach our support desk</h1>
        <p style={{ fontSize: 17, marginBottom: 32 }}>
          Our support desk is staffed around the clock. For an existing case, log in to your
          client dashboard to message your case handler directly — it's the fastest way to get
          an answer tied to your case.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 16 }}>
          <div><strong>Email:</strong> contact@recoveryassist.support</div>
          <div><strong>Phone:</strong> +1(870)318-2847</div>
          <div><strong>Live chat:</strong> Bottom-right corner of any page</div>
        </div>
      </section>
    </PublicLayout>
  )
}
