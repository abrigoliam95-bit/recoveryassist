import PublicLayout from '../../components/PublicLayout'
import TestimonialForm from '../../components/TestimonialForm'
import TestimonialsGrid from '../../components/TestimonialsGrid'
import TrustBadge from '../../components/TrustBadge' // <-- Imported our new component

// Custom CSS specifically for this page's beautiful design
const pageStyles = `
  .hero-banner {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* FIXED: was 'objectFit' */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(10, 25, 47, 0.6), rgba(10, 25, 47, 0.9));
    z-index: 2;
  }
  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    color: #fff;
    max-width: 800px;
    padding: 0 20px;
  }
  .hero-content h1 {
    font-size: 48px;
    margin-bottom: 16px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .hero-content p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
  }

  /* Form Section Styling */
  .form-section {
    background: var(--paper-raised);
    border-top: 1px solid var(--border);
    position: relative;
  }
  .form-section::before {
    content: '';
    position: absolute;
    top: -2px; /* Slight offset so it sits on top of the border */
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--gold);
    border-radius: 2px;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .hero-banner { height: 320px; }
    .hero-content h1 { font-size: 32px; }
    .hero-content p { font-size: 16px; }
  }
`;

export default function Testimonials() {
  return (
    <PublicLayout>
      <style>{pageStyles}</style>

      {/* 1. IMMERSIVE HERO SECTION */}
      <div className="hero-banner">
        <img
          src="/images/hero-meeting.jpg"
          alt="Clients and case handlers in conversation"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p style={{ color: 'var(--gold)', fontSize: 16, fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
            Testimonials
          </p>
          <h1>What clients say</h1>
          <p>Real stories of recovery, resolution, and peace of mind from people we've helped.</p>
        </div>
      </div>

      {/* 2. TRUST BADGE SECTION (New) */}
      <section className="container" style={{ padding: '60px 0 20px' }}>
        <TrustBadge />
      </section>

      {/* 3. TESTIMONIALS GRID SECTION */}
      <section className="container" style={{ padding: '40px 0 80px' }}>
        <TestimonialsGrid />
      </section>

      {/* 4. SHARE YOUR EXPERIENCE SECTION */}
      <section className="form-section">
        <div className="container" style={{ padding: '80px 0', maxWidth: 640 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Share your experience</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              Your feedback helps us improve and helps others who may be going through a similar situation.
            </p>
          </div>
          <TestimonialForm />
        </div>
      </section>
    </PublicLayout>
  )
}