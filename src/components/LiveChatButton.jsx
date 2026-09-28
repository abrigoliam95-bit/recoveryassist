import { useState } from 'react';

export default function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace this with your actual chat widget (e.g., Tawk.to, Crisp, Intercom)
  const handleChatClick = () => {
    setIsOpen(!isOpen);
    // If you have a third-party script, trigger it here:
    // if (window.Tawk_API) window.Tawk_API.maximize();
  };

  return (
    <div style={styles.container}>
      {/* The Chat Window (Hidden by default) */}
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>RecoveryAssist Support</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              style={styles.closeBtn}
            >
              &times;
            </button>
          </div>
          <div style={styles.chatBody}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>
              👋 Hi there! How can we help you today?
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', textAlign: 'center' }}>
              (Connect your live chat provider here)
            </p>
          </div>
        </div>
      )}

      {/* The Floating Button */}
      <button 
        onClick={handleChatClick} 
        style={styles.chatButton}
        aria-label="Open Live Chat"
      >
        {isOpen ? (
          <span style={{ fontSize: '24px' }}>&times;</span> // X icon when open
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 9999, // Ensures it sits on top of everything
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '15px',
  },
  chatButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'var(--gold)', // Uses your brand gold color
    color: 'var(--ink)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  chatWindow: {
    width: '320px',
    height: '400px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border)',
    animation: 'fadeIn 0.3s ease',
  },
  chatHeader: {
    background: 'var(--ink)',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
  },
  chatBody: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }
};