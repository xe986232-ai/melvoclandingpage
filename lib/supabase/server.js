import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_KEY, isSupabaseConfigured } from "./config";

// Client untuk Server Component / Server Action / Route Handler. Membaca
// sesi login dari cookie. Mengembalikan null kalau env belum diisi.
export function createServerSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Dipanggil dari Server Component (cookie read-only): aman diabaikan,
          // karena middleware yang menyegarkan sesi.
        }
      },
    },
  });
}
