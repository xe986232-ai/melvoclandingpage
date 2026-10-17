import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

// Client dengan service role key: melewati RLS. HANYA boleh dipakai di server
// (Server Action / Route Handler). Jangan pernah diimpor dari komponen "use client".
// Mengembalikan null kalau SUPABASE_SERVICE_ROLE_KEY belum diisi.
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
