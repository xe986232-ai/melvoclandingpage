// Konfigurasi Supabase untuk login. Dua nilai ini aman dipublikasikan (bukan
// rahasia): URL project dan publishable/anon key. Isi di .env.local dan di
// Vercel Project Settings. Jangan pernah taruh service role key di sini.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
