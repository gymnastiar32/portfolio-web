import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../config/supabase'

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please add the required Vite environment variables.')
  }

  return supabase
}

export const authService = {
  async login(email: string, password: string) {
    const client = assertSupabase()
    const { data, error } = await client.auth.signInWithPassword({ email, password })

    if (error) {
      throw error
    }

    return data
  },

  async logout() {
    const client = assertSupabase()
    const { error } = await client.auth.signOut()

    if (error) {
      throw error
    }
  },

  async getSession(): Promise<Session | null> {
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    return data.session
  },

  async getCurrentUser(): Promise<User | null> {
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw error
    }

    return data.user
  },
}
