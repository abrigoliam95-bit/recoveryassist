import React from 'react';

// --- STATIC HARDCODED REVIEWS ---
const testimonials = [
  {
    id: 1,
    full_name: "Sarah Jenkins",
    company_role: "CEO, TechFlow Solutions",
    rating: 5,
    testimonial_text: "RecoveryAssist was a lifesaver. After a wire transfer fraud incident, their team guided us through the entire process. They were professional, transparent, and recovered 85% of our funds.",
    photo_url: "/images/client-sarah.jpg"
  },
  {
    id: 2,
    full_name: "David Chen",
    company_role: "Individual Client",
    rating: 5,
    testimonial_text: "I was skeptical at first, but their blockchain investigation team was incredible. They traced my stolen crypto and provided a detailed report that the authorities used to freeze the accounts.",
    photo_url: "/images/client-david.jpg"
  },
  {
    id: 3,
    full_name: "Maria Rodriguez",
    company_role: "Director, Global Logistics",
    rating: 4,
    testimonial_text: "The case management team kept me informed every step of the way. While the process took time, their persistent communication and legal expertise made a stressful situation much more bearable.",
    photo_url: "/images/client-maria.jpg"
  },
  {
    id: 4,
    full_name: "James O'Connor",
    company_role: "Retired Teacher",
    rating: 5,
    testimonial_text: "I lost my life savings to a romance scam. RecoveryAssist treated me with dignity and respect. They didn't just chase the money; they helped me understand how to protect myself in the future.",
    photo_url: "/images/client-james.jpg"
  },
  {
    id: 5,
    full_name: "Emily Watson",
    company_role: "Small Business Owner",
    rating: 5,
    testimonial_text: "After falling victim to a sophisticated phishing attack, I felt hopeless. The team at RecoveryAssist not only recovered my funds but also helped secure my business accounts against future threats.",
    photo_url: "/images/client-emily.jpg"
  },
  {
    id: 6,
    full_name: "Michael Chang",
    company_role: "Investor",
    rating: 4,
    testimonial_text: "Professional and discreet. They handled my case with the utmost confidentiality. The investigation was thorough, and their communication was excellent throughout the entire recovery process.",
    photo_url: "/images/client-michael.jpg"
  }
];

export default function TestimonialsGrid() {
  return (
    <div className="testimonial-grid">
      {testimonials.map((t) => (
        <div key={t.id} className="testimonial-card">
          
          {/* Top Row: Stars & Verified Badge */}
          <div style={styles.cardTop}>
            <div style={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
              {'★'.repeat(t.rating)}
              <span style={{ color: '#cbd5e1' }}>{'☆'.repeat(5 - t.rating)}</span>
            </div>
            <span style={styles.verifiedBadge}>✓ Verified Client</span>
          </div>

          {/* Review Text */}
          <p style={styles.testimonialText}>"{t.testimonial_text}"</p>
          
          {/* Author Info */}
          <div style={styles.authorInfo}>
            {t.photo_url ? (
              <img 
                src={t.photo_url} 
                alt={t.full_name} 
                loading="lazy" 
                style={styles.avatar} 
              />
            ) : (
              <div style={styles.avatarFallback} aria-hidden="true">
                {t.full_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p style={styles.name}>{t.full_name}</p>
              {t.company_role && <p style={styles.role}>{t.company_role}</p>}
            </div>
          </div>

        </div>
      ))}

      {/* Scoped Responsive CSS */}
      <style>{`
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .testimonial-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .testimonial-grid { grid-template-columns: 1fr; }
        }
        
        .testimonial-card {
          background: var(--paper-raised);
          border-radius: var(--radius-md, 16px);
          padding: 32px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </div>
  )
}

// --- INLINE STYLES ---
const styles = {
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  stars: {
    color: 'var(--gold)',
    fontSize: '18px',
    letterSpacing: '2px',
  },
  verifiedBadge: {
    background: '#dcfce7',
    color: '#166534',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  testimonialText: {
    fontSize: '15px',
    color: 'var(--text-main)',
    lineHeight: '1.7',
    marginBottom: '24px',
    flex: 1,
    fontStyle: 'italic',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid var(--border)',
    paddingTop: '20px',
  },
  // --- UPDATED: Smaller Avatar ---
  avatar: {
    width: '40px',   // <-- Changed from 48px
    height: '40px',  // <-- Changed from 48px
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--gold)',
  },
  // --- UPDATED: Smaller Fallback ---
  avatarFallback: {
    width: '40px',   // <-- Changed from 48px
    height: '40px',  // <-- Changed from 48px
    borderRadius: '50%',
    background: 'var(--ink)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px', // <-- Changed from 20px
    fontWeight: '700',
  },
  name: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: 'var(--ink)',
    fontWeight: '600',
  },
  role: {
    margin: 0,
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
};