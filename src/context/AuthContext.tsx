import { useEffect, useMemo, useState } from 'react'
import { env } from '../config/env'
import type { ApiSession, ApiUser } from '../services/apiClient'
import { authService } from '../services/authService'
import { AuthContext, type AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [session, setSession] = useState<ApiSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function bootstrapAuth() {
      try {
        const { session: currentSession, user: currentUser } = await authService.getAuthState()
        if (!active) {
          return
        }

        setSession(currentSession)
        setUser(currentUser)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void bootstrapAuth()

    return () => {
      active = false
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const email = user?.email?.toLowerCase() ?? ''
    const isAdmin = Boolean(env.adminEmail && email === env.adminEmail)

    return {
      user,
      session,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin,
      async login(email, password) {
        const result = await authService.login(email, password)
        setSession(result.session)
        setUser(result.user)
      },
      async logout() {
        await authService.logout()
        setSession(null)
        setUser(null)
      },
    }
  }, [loading, session, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
