import React from 'react';

// Edit this array with real team members. 
// Photos should be placed in the public/images/ folder.
const teamMembers = [
  {
    name: "James Anderson",
    role: "CEO / Managing Director",
    bio: "MBA in Business Management. 18+ years of experience in business operations, financial services, and fraud-risk management.",
    photo: "/images/james-anderson.jpg"
  },
  {
    name: "Michael Whitmore",
    role: "Legal Director / Lead Counsel",
    bio: "LLB in Law. 15+ years of experience in financial fraud, asset recovery, commercial law, and litigation.",
    photo: "/images/michael-whitmore.jpg"
  },
  {
    name: "Daniel Carter",
    role: "Cybersecurity & Blockchain Lead",
    bio: "MSc in Cybersecurity. 12+ years of experience in cybersecurity, blockchain analysis, and cryptocurrency investigations.",
    photo: "/images/daniel-carter.jpg"
  },
  {
    name: "Robert Mitchell",
    role: "Senior Case Manager",
    bio: "MSc in Forensic Investigation. 11+ years of experience in case management, investigations, and fraud-related matters.",
    photo: "/images/robert-mitchell.jpg"
  },
  {
    name: "Ryan Thompson",
    role: "Fraud / OSINT Investigator",
    bio: "BSc in Criminology. 9+ years of experience in OSINT, digital investigations, and online fraud cases.",
    photo: "/images/ryan-thompson.jpg"
  },
  {
    name: "William Bennett",
    role: "Compliance & Risk Officer",
    bio: "MSc in Financial Crime & Compliance. 13+ years of experience in KYC/AML, risk management, and financial crime compliance.",
    photo: "/images/william-bennett.jpg"
  },
  {
    name: "Emily Richardson",
    role: "Client Relations & Intake Officer",
    bio: "BSc in Business Management. 7+ years of experience in client relations, case intake, and financial-services support.",
    photo: "/images/emily-richardson.jpg"
  }
];

export default function TeamSection() {
  const visibleMembers = teamMembers.slice(0, 7);

  if (visibleMembers.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px 0' }}>
        Team profiles coming soon.
      </div>
    );
  }

  return (
    <div className="team-grid">
      {visibleMembers.map((member) => (
        <div key={member.name} style={cardStyle} className="team-card">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`Photo of ${member.name}`}
              loading="lazy"
              width={160}
              height={160}
              // Added 'transition' and 'cursor' here for the hover effect
              style={{ 
                borderRadius: '50%', 
                objectFit: 'cover', 
                margin: '0 auto 20px', 
                display: 'block',
                transition: 'transform 0.3s ease, border 0.3s ease',
                cursor: 'pointer'
              }}
              // Adding hover effects via onMouseEnter/Leave or CSS in a real app, 
              // but here is a simple CSS-in-JS approach for the image specifically
              className="team-image"
            />
          ) : (
            <div style={{ ...avatarFallback, width: 160, height: 160 }} aria-hidden="true">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h3 style={{ fontSize: 18, margin: '0 0 6px' }}>{member.name}</h3>
          <p style={{ fontSize: 14, color: 'var(--gold)', margin: '0 0 12px', fontWeight: '500' }}>
            {member.role}
          </p>
          
          {member.bio && (
            <p style={{ fontSize: 13, margin: 0, color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {member.bio}
            </p>
          )}
        </div>
      ))}

      <style>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 420px) {
          .team-grid { grid-template-columns: 1fr; }
        }
        
        /* Hover Effect for Images */
        .team-image:hover {
          transform: scale(1.05); /* Grows slightly */
          box-shadow: 0 4px 12px rgba(0,0,0,0.15); /* Adds a subtle shadow */
        }
      `}</style>
    </div>
  );
}

const cardStyle = {
  background: 'var(--paper-raised)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: '24px 16px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth transition for the card itself
};

const avatarFallback = {
  width: 160,
  height: 160,
  borderRadius: '50%',
  background: 'var(--ink)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48,
  margin: '0 auto 20px',
  fontWeight: 'bold'
};