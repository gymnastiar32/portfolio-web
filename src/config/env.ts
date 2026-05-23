export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  adminEmail: (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase(),
}
