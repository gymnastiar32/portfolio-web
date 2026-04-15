import { useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { env } from '../config/env'
import { supabase } from '../config/supabase'
import { authService } from '../services/authService'
import { AuthContext, type AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function bootstrapAuth() {
      try {
        const currentSession = await authService.getSession()
        if (!active) {
          return
        }

        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void bootstrapAuth()

    if (!supabase) {
      return () => {
        active = false
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
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
