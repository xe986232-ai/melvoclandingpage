import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Menyegarkan sesi login Supabase (cookie) hanya di halaman yang membaca akun
// (masuk, akun, plugin). Halaman lain (beranda, cara pakai) tetap statis dan tidak lewat sini.
export async function middleware(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Wajib dipanggil agar token yang hampir kedaluwarsa diperbarui.
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/masuk", "/akun", "/plugin", "/plugin/:id"],
};
