import "server-only";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLUGIN_BY_ID } from "@/lib/plugins";

// Kepemilikan plugin disimpan di tabel plugin_licenses (Supabase yang sama dengan DAW).
// DAW membaca tabel ini lewat /api/shop, jadi plugin yang diaktifkan di sini otomatis
// terbuka di DAW untuk akun yang sama. Kolom penting:
//   plugin   = id plugin (lib/plugins.js)
//   user_id  = akun pemilik
//   status   = 'active' | 'revoked'
//   token_hash wajib unik (primary key): untuk baris dari Get plugin diisi hash acak,
//   karena tidak ada token yang dibagikan ke pembeli.

// id plugin berbayar yang sudah aktif di akun ini. Plugin default tidak disimpan di sini.
export async function ownedPluginIds(userId) {
  const admin = createAdminClient();
  if (!admin || !userId) return [];
  const { data, error } = await admin
    .from("plugin_licenses")
    .select("plugin")
    .eq("user_id", userId)
    .eq("status", "active");
  if (error || !data) return [];
  return data.map((r) => r.plugin);
}

// Akun harus punya lisensi Melvoc yang masih aktif (sama dengan syarat masuk DAW).
async function hasActiveLicense(admin, userId) {
  const { data, error } = await admin
    .from("licenses")
    .select("status, expires_at")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  if (error || !data || data.status !== "active") return false;
  return !data.expires_at || new Date(data.expires_at).getTime() > Date.now();
}

// Aktifkan plugin untuk akun. Aman dipanggil berulang (sudah dimiliki = berhasil).
// TITIK PEMBAYARAN: kalau plugin.price > 0, cek pembayaran di sini sebelum insert.
// Saat ini belum ada pembayaran, jadi Get plugin langsung mengaktifkan.
export async function grantPlugin(userId, pluginId) {
  const plugin = PLUGIN_BY_ID[pluginId];
  if (!plugin) return { error: "Plugin tidak dikenal." };
  if (plugin.default) return { ok: true, already: true };

  const admin = createAdminClient();
  if (!admin) return { error: "Layanan belum dikonfigurasi. Hubungi admin." };

  if (!(await hasActiveLicense(admin, userId))) {
    return { error: "Lisensi akun ini tidak aktif." };
  }

  const owned = await ownedPluginIds(userId);
  if (owned.includes(pluginId)) return { ok: true, already: true };

  const { error } = await admin.from("plugin_licenses").insert({
    token_hash: crypto.createHash("sha256").update(crypto.randomUUID(), "utf8").digest("hex"),
    plugin: pluginId,
    status: "active",
    source: "order",
    user_id: userId,
    claimed_at: new Date().toISOString(),
    note: "Get plugin dari halaman plugin",
  });
  // 23505 = indeks unik (user_id, plugin) aktif: dua klik bersamaan, anggap sudah dimiliki.
  if (error && error.code !== "23505") return { error: "Gagal mengaktifkan plugin. Coba lagi sebentar lagi." };
  return { ok: true };
}
