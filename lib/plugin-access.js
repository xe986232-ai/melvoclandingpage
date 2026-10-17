import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLUGIN_BY_ID } from "@/lib/plugins";
import { hashToken, placeholderHash } from "@/lib/plugin-vault";

// Kepemilikan plugin disimpan di tabel plugin_licenses (Supabase yang sama dengan DAW).
// DAW membaca tabel ini lewat /api/shop, jadi plugin yang diaktifkan di sini otomatis
// terbuka di DAW untuk akun yang sama. Kolom penting:
//   plugin   = id plugin (lib/plugins.js)
//   user_id  = akun pemilik
//   status   = 'active' | 'revoked'
//   token_hash wajib unik (primary key) = sha256 token plugin.
//   buyer_id = akun yang memesan (tombol Buy plugin); token pesanan hanya bisa ditebus akun itu.

// id plugin berbayar yang sudah dimiliki (token sudah ditebus) di akun ini. Plugin default tidak disimpan di sini.
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

// id plugin yang sudah dipesan akun ini (Buy plugin disetujui) tapi tokennya belum ditebus: menunggu token dari admin.
export async function pendingPluginIds(userId) {
  const admin = createAdminClient();
  if (!admin || !userId) return [];
  const { data, error } = await admin
    .from("plugin_licenses")
    .select("plugin")
    .eq("buyer_id", userId)
    .is("user_id", null)
    .eq("status", "active");
  if (error || !data) return [];
  return data.map((r) => r.plugin);
}

// Buy plugin (setelah pembeli menekan Setuju): buat pesanan = token otomatis yang dikunci ke akun ini.
// Pesanan muncul di /admin DAW (badge "Pesanan baru"). Tokennya BELUM ada: admin menekan "Buat token" setelah
// pembayaran beres, lalu menyerahkan token ke pembeli. Jadi landing page tidak butuh kunci enkripsi DAW.
export async function orderPlugin(userId, pluginId) {
  const plugin = PLUGIN_BY_ID[pluginId];
  if (!plugin || plugin.default || !(plugin.price > 0)) return { error: "Plugin ini tidak dijual." };
  const admin = createAdminClient();
  if (!admin) return { error: "Layanan belum dikonfigurasi. Hubungi admin." };
  if (!(await hasActiveLicense(admin, userId))) return { error: "Lisensi akun ini tidak aktif." };

  if ((await ownedPluginIds(userId)).includes(pluginId)) return { error: "Akun ini sudah memiliki plugin tersebut." };
  if ((await pendingPluginIds(userId)).includes(pluginId)) return { ok: true, already: true };

  const { error } = await admin.from("plugin_licenses").insert({
    token_hash: placeholderHash(),
    token_enc: null,
    plugin: pluginId,
    status: "active",
    source: "order",
    buyer_id: userId,
    note: "Pesanan dari halaman plugin",
  });
  // 23505 = indeks unik pesanan menunggu: dua klik bersamaan, pesanan sudah ada
  if (error && error.code !== "23505") return { error: "Gagal membuat pesanan. Coba lagi sebentar lagi." };
  return { ok: true };
}

// Tebus token plugin dari admin. Token pesanan hanya sah untuk akun pemesan; token manual sah untuk akun mana pun.
// Klaim atomik: UPDATE hanya kena baris yang user_id-nya masih kosong.
export async function redeemPluginToken(userId, rawToken) {
  const BAD = { error: "Token tidak valid atau sudah dipakai." };
  const raw = String(rawToken ?? "");
  if (raw.replace(/[^A-Za-z0-9]/g, "").length < 12 || raw.length > 64) return BAD;
  const admin = createAdminClient();
  if (!admin) return { error: "Layanan belum dikonfigurasi. Hubungi admin." };

  const th = await hashToken(raw);
  const { data: found } = await admin
    .from("plugin_licenses")
    .select("plugin, user_id, buyer_id, status")
    .eq("token_hash", th)
    .limit(1)
    .maybeSingle();
  if (!found || found.user_id || found.status !== "active" || !PLUGIN_BY_ID[found.plugin] || PLUGIN_BY_ID[found.plugin].default) return BAD;
  if (found.buyer_id && found.buyer_id !== userId) return { error: "Token ini dikunci untuk akun lain dan tidak bisa dipakai di akun ini." };
  if (!(await hasActiveLicense(admin, userId))) return { error: "Lisensi akun ini tidak aktif." };
  if ((await ownedPluginIds(userId)).includes(found.plugin)) return { error: "Akun ini sudah memiliki plugin tersebut. Token tidak dipakai." };

  const { data: claimed, error } = await admin
    .from("plugin_licenses")
    .update({ user_id: userId, claimed_at: new Date().toISOString() })
    .eq("token_hash", th)
    .is("user_id", null)
    .eq("status", "active")
    .or(`buyer_id.is.null,buyer_id.eq.${userId}`)
    .select("plugin");
  if (error) return { error: "Gagal menebus token. Coba lagi sebentar lagi." };
  if (!claimed?.length) return BAD;
  return { ok: true, plugin: claimed[0].plugin };
}
