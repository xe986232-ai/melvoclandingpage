"use server";

import crypto from "node:crypto";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const GENERIC_ERROR = "Token tidak valid atau sudah tidak aktif.";

// Hanya izinkan redirect ke path internal (cegah open redirect).
function safeNext(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/akun";
}

const sha256 = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");

// Kolom licenses.token_hash berisi hash 64 karakter hex (SHA-256). Format
// token bisa dinormalisasi berbeda (huruf besar/kecil, tanda strip), jadi
// kita coba beberapa bentuk umum. Kalau app Full memakai garam/HMAC rahasia,
// fungsi ini perlu disesuaikan.
function hashCandidates(token) {
  const bare = token.replace(/[\s-]/g, "");
  const forms = [token, token.toUpperCase(), token.toLowerCase(), bare, bare.toUpperCase(), bare.toLowerCase()];
  return [...new Set(forms.map(sha256))];
}

// Masuk memakai token lisensi Full: token = bukti kepemilikan akun.
export async function loginWithToken(rawToken, next) {
  const token = String(rawToken ?? "").trim();
  if (token.length < 8 || token.length > 200) return { error: GENERIC_ERROR };

  const admin = createAdminClient();
  const supabase = createServerSupabaseClient();
  if (!admin || !supabase) {
    return { error: "Login belum dikonfigurasi. Hubungi admin." };
  }

  // 1) Cari lisensi dari hash token.
  const { data: lic, error: licErr } = await admin
    .from("licenses")
    .select("user_id, status")
    .in("token_hash", hashCandidates(token))
    .limit(1)
    .maybeSingle();
  if (licErr || !lic || lic.status !== "active" || !lic.user_id) {
    return { error: GENERIC_ERROR };
  }

  // 2) Ambil email akun pemilik token.
  const { data: found, error: userErr } = await admin.auth.admin.getUserById(lic.user_id);
  const email = found?.user?.email;
  if (userErr || !email) return { error: GENERIC_ERROR };

  // 3) Buat link sekali pakai (tidak mengirim email) lalu tukar jadi sesi login
  //    di cookie browser ini.
  const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  const tokenHash = link?.properties?.hashed_token;
  if (linkErr || !tokenHash) return { error: "Gagal masuk. Coba lagi sebentar lagi." };

  const { error: verifyErr } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "magiclink",
  });
  if (verifyErr) return { error: "Gagal masuk. Coba lagi sebentar lagi." };

  return { ok: true, next: safeNext(next) };
}
