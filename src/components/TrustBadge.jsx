// File: src/components/TrustBadge.jsx
import React from 'react';

export default function TrustBadge() {
  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Left: Star Rating Summary */}
        <div style={styles.ratingBlock}>
          <div style={styles.stars}>
            {'★'.repeat(5)}
          </div>
          <div style={styles.ratingText}>
            <strong style={styles.score}>4.7</strong>
            <span style={styles.outOf}>/ 5.0</span>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Right: Trust Text */}
        <div style={styles.trustText}>
          <p style={styles.trustTitle}>Trusted by clients worldwide</p>
          <p style={styles.trustSubtitle}>
            Based on <strong>250+</strong> verified recovery cases
          </p>
        </div>

        {/* Optional: Verified Badge */}
        <div style={styles.badge}>
          ✓ Verified
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'var(--paper-raised)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md, 16px)',
    padding: '20px 32px',
    boxShadow: 'var(--shadow-sm)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  ratingBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  stars: {
    color: 'var(--gold)',
    fontSize: '20px',
    letterSpacing: '3px',
  },
  ratingText: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  score: {
    fontSize: '22px',
    color: 'var(--ink)',
    fontWeight: '700',
  },
  outOf: {
    fontSize: '14px',
    color: 'var(--text-muted)',
  },
  divider: {
    width: '1px',
    height: '40px',
    background: 'var(--border)',
  },
  trustText: {
    textAlign: 'left',
  },
  trustTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--ink)',
  },
  trustSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  badge: {
    background: '#dcfce7',
    color: '#166534',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
  },
};