import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Think of this as a "notice board" that any page in the app can check
// to see: is someone logged in, and are they a client, staff, or admin?
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null) // 'client' | 'staff' | 'admin'
  const [fullName, setFullName] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if someone is already logged in when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // Keep listening in case the user logs in or out while the app is open
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else {
        setRole(null)
        setFullName(null)
        setLoading(false)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Every user has a "profile" row that stores their role, name, and status
  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, full_name, status')
      .eq('id', userId)
      .single()

    // If an admin has suspended or removed this account, sign them out
    // immediately — don't let a suspended person keep using the app
    // just because their login session hasn't expired yet.
    if (!error && data && data.status !== 'active') {
      await supabase.auth.signOut()
      setRole(null)
      setFullName(null)
      setLoading(false)
      return
    }

    if (!error && data) {
      setRole(data.role)
      setFullName(data.full_name)
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, role, fullName, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// A shortcut so any page can just call useAuth() to get user + role
export function useAuth() {
  return useContext(AuthContext)
}
