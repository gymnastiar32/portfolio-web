import { apiClient, type ApiSession, type ApiUser } from './apiClient'

interface AuthResponse {
  user: ApiUser | null
  session: ApiSession | null
}

export const authService = {
  async getAuthState() {
    return apiClient.get<AuthResponse>('/auth/me')
  },

  async login(email: string, password: string) {
    return apiClient.post<AuthResponse>('/auth/login', { email, password })
  },

  async logout() {
    await apiClient.post<{ ok: boolean }>('/auth/logout')
  },

  async getSession(): Promise<ApiSession | null> {
    const data = await this.getAuthState()
    return data.session
  },

  async getCurrentUser(): Promise<ApiUser | null> {
    const data = await this.getAuthState()
    return data.user
  },
}
