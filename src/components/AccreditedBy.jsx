import React from 'react';

// Reserved space for real accreditation logos — client will provide these
// later. Building the empty structure only, no invented names/claims.
const PLACEHOLDER_COUNT = 5

export default function AccreditedBy() {
  const marqueeCSS = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-container {
      display: flex;
      overflow: hidden;
      width: 100%;
      position: relative;
      margin-top: 20px;
    }
    .marquee-content {
      display: flex;
      gap: 64px;
      padding-right: 64px;
      animation: scroll 20s linear infinite;
      width: max-content;
    }
    .marquee-container:hover .marquee-content {
      animation-play-state: paused;
    }
  `;

  return (
    <div style={{ textAlign: 'center' }}>
      
      <p style={{ fontSize: 13, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
        Accredited & recognized by
      </p>

      <style>{marqueeCSS}</style>

      <div className="marquee-container">
        <div className="marquee-content">
          
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              
              <div style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <img src="/images/logo1.jpg" alt="Logo 1" style={{ width: '120px', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
              </div>

              <div style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <img src="/images/logo2.jpg" alt="Logo 2" style={{ width: '120px', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
              </div>

              <div style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <img src="/images/logo3.jpg" alt="Logo 3" style={{ width: '120px', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
              </div>

              <div style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <img src="/images/logo4.jpg" alt="Logo 4" style={{ width: '120px', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
              </div>

              <div style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
                <img src="/images/logo5.jpg" alt="Logo 5" style={{ width: '120px', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
              </div>

            </React.Fragment>
          ))}

        </div>
      </div>
      
    </div>
  );
}
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <line x1="9" y1="7" x2="9" y2="7.01" />
      <line x1="15" y1="7" x2="15" y2="7.01" />
      <line x1="9" y1="11" x2="9" y2="11.01" />
      <line x1="15" y1="11" x2="15" y2="11.01" />
      <line x1="9" y1="21" x2="9" y2="15" />
    </svg>
  )
}

const placeholderStyle = {
  width: 130, height: 72, background: 'var(--paper)', border: '1px dashed var(--border)',
  borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
}
