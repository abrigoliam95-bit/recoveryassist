import PublicLayout from '../../components/PublicLayout'

export default function TechTips() {
  return (
    <PublicLayout>
      <img
        src="/images/tech-tips-header.jpg"
        alt="Using a smartphone securely"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0', maxWidth: 640 }}>
        <h1 style={{ fontSize: 34, marginBottom: 20 }}>Tech tips</h1>
        <p style={{ fontSize: 17 }}>Practical, everyday security tips will be listed here, pulled from the articles table.</p>
      </section>
    </PublicLayout>
  )
}
