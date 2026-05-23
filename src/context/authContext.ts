import { createContext } from 'react'
import type { ApiSession, ApiUser } from '../services/apiClient'

export interface AuthContextValue {
  user: ApiUser | null
  session: ApiSession | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
