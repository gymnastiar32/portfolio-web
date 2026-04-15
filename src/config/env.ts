export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  adminEmail: (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase(),
}

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
