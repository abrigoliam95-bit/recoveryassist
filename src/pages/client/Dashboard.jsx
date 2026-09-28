import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, fullName } = useAuth()
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchCases()
  }, [user])

  async function fetchCases() {
    setLoading(true)
    const { data } = await supabase.from('cases').select('*').order('created_at', { ascending: false })
    setCases(data || [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="client-dashboard-wrapper">
      
      {/* WELCOME HEADER */}
      <div className="client-header">
        <div>
          <h1>Welcome back{fullName ? `, ${fullName.split(' ')[0]}` : ''}</h1>
          <p>Here's what's happening with your cases.</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-dark">
          Log out
        </button>
      </div>

      {/* NEW CASE BUTTON */}
      <div className="client-actions-header">
        <h3>Your cases</h3>
        <Link to="/start-a-case" className="btn btn-gold">Start a new case</Link>
      </div>

      {loading && <p>Loading your cases...</p>}

      {!loading && cases.length === 0 && (
        <div className="empty-state">
          You don't have any cases yet. Start one whenever you're ready.
        </div>
      )}

      {/* CASE LIST */}
      <div className="card-grid">
        {cases.map((c) => (
          <div key={c.id} className="case-card">
            <div className="case-summary">
              <div>
                <p className="case-number">{c.case_number || 'Tracking number pending'}</p>
                <h4 className="case-title">{c.title}</h4>
              </div>
              <span className="badge badge-warning" style={{ textTransform: 'capitalize' }}>
                {c.status.replace('_', ' ')}
              </span>
            </div>
            <p className="case-description">{c.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}