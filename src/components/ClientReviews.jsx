import React from 'react';

// --- 6 CLIENT REVIEWS WITH PICTURES ---
const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO, TechFlow Solutions",
    location: "New York, USA",
    rating: 5,
    text: "RecoveryAssist was a lifesaver. After a wire transfer fraud incident, their team guided us through the entire process. They were professional, transparent, and recovered 85% of our funds.",
    date: "September 2026",
    photo: "/images/client-sarah.jpg" 
  },
  {
    id: 2,
    name: "David Chen",
    role: "Individual Client",
    location: "London, UK",
    rating: 5,
    text: "I was skeptical at first, but their blockchain investigation team was incredible. They traced my stolen crypto and provided a detailed report that the authorities used to freeze the accounts.",
    date: "August 2026",
    photo: "/images/client-david.jpg"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Director, Global Logistics",
    location: "Madrid, Spain",
    rating: 4,
    text: "The case management team kept me informed every step of the way. While the process took time, their persistent communication and legal expertise made a stressful situation much more bearable.",
    date: "July 2026",
    photo: "/images/client-maria.jpg"
  },
  {
    id: 4,
    name: "James O'Connor",
    role: "Retired Teacher",
    location: "Dublin, Ireland",
    rating: 5,
    text: "I lost my life savings to a romance scam. RecoveryAssist treated me with dignity and respect. They didn't just chase the money; they helped me understand how to protect myself in the future.",
    date: "June 2026",
    photo: "/images/client-james.jpg"
  },
  {
    id: 5,
    name: "Emily Watson",
    role: "Small Business Owner",
    location: "Sydney, Australia",
    rating: 5,
    text: "After falling victim to a sophisticated phishing attack, I felt hopeless. The team at RecoveryAssist not only recovered my funds but also helped secure my business accounts against future threats.",
    date: "May 2026",
    photo: "/images/client-emily.jpg"
  },
  {
    id: 6,
    name: "Michael Chang",
    role: "Investor",
    location: "Singapore",
    rating: 4,
    text: "Professional and discreet. They handled my case with the utmost confidentiality. The investigation was thorough, and their communication was excellent throughout the entire recovery process.",
    date: "April 2026",
    photo: "/images/client-michael.jpg"
  }
];

export default function ClientReviews() {
  return (
    <section style={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>What Our Clients Say</h2>
          <p style={styles.subtitle}>
            Real stories from individuals and businesses who have trusted us with their recovery journey.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid" style={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className="review-card" style={styles.card}>
              
              {/* Rating & Verified Badge */}
              <div style={styles.cardTop}>
                <div style={styles.stars}>
                  {'★'.repeat(review.rating)}
                  <span style={{ color: '#cbd5e1' }}>{'★'.repeat(5 - review.rating)}</span>
                </div>
                <span style={styles.verifiedBadge}>✓ Verified Client</span>
              </div>

              {/* Review Text */}
              <p style={styles.reviewText}>"{review.text}"</p>

              {/* Client Info with Picture */}
              <div style={styles.clientInfo}>
                <img 
                  src={review.photo} 
                  alt={review.name} 
                  style={styles.avatarImage} 
                />
                <div>
                  <h4 style={styles.clientName}>{review.name}</h4>
                  <p style={styles.clientMeta}>{review.role} • {review.location}</p>
                </div>
              </div>
              
              <span style={styles.date}>{review.date}</span>

            </div>
          ))}
        </div>

      </div>

      {/* Inline CSS for responsiveness */}
      <style>{`
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 columns on desktop */
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); } /* 2 columns on tablet */
        }
        @media (max-width: 640px) {
          .reviews-grid { grid-template-columns: 1fr; } /* 1 column on mobile */
        }
        .review-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}

// --- INLINE STYLES USING YOUR GLOBAL VARIABLES ---
const styles = {
  section: {
    padding: '80px 0',
    backgroundColor: 'var(--paper)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
    maxWidth: '700px',
    margin: '0 auto 48px auto',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--ink)',
    marginBottom: '16px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
  },
  card: {
    background: 'var(--paper-raised)',
    borderRadius: 'var(--radius-md)',
    padding: '32px',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
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
  reviewText: {
    fontSize: '15px',
    color: 'var(--text-main)',
    lineHeight: '1.7',
    marginBottom: '24px',
    flex: 1, 
    fontStyle: 'italic',
  },
  clientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid var(--border)',
    paddingTop: '20px',
  },
  // --- NEW: Image Avatar Style ---
  avatarImage: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--gold)', // Adds a nice gold ring around the photo
  },
  clientName: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: 'var(--ink)',
  },
  clientMeta: {
    margin: 0,
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  date: {
    position: 'absolute',
    bottom: '32px',
    right: '32px',
    fontSize: '12px',
    color: '#cbd5e1',
  }
};