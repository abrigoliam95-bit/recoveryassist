import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth()

  // Show a loading state while the auth check + profile fetch is running
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--text-muted)',
        fontFamily: 'var(--sans)',
        fontSize: 15,
      }}>
        Loading…
      </div>
    )
  }

  // No user? Send to login (not home — home doesn't help them)
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // User logged in but wrong role? Send to their correct home
  if (allowedRoles && !allowedRoles.includes(role)) {
    // If they're a client trying to see admin, send to client dashboard, and vice versa
    if (role === 'client') return <Navigate to="/dashboard" replace />
    if (role === 'admin' || role === 'staff') return <Navigate to="/admin" replace />
    return <Navigate to="/" replace />
  }

  // Auth is ready and user has access
  return children
}