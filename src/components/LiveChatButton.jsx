import { useState, useEffect } from 'react'

export default function LiveChatButton() {
  const [tawkReady, setTawkReady] = useState(false)

  // Check every 500ms if Tawk.to is loaded
  useEffect(() => {
    const checkTawk = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.maximize) {
        setTawkReady(true)
        clearInterval(checkTawk)
      }
    }, 500)

    return () => clearInterval(checkTawk)
  }, [])

  const handleChatClick = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize()
    } else {
      alert("Live chat is still loading. Please try again in a moment.")
    }
  }

  return (
    <button
      onClick={handleChatClick}
      className="live-chat-gold-btn"
      aria-label="Open Live Chat"
      title={tawkReady ? 'Chat with us' : 'Loading chat...'}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  )
}