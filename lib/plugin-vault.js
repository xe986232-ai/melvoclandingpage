import "server-only";
import { webcrypto as crypto } from "node:crypto";

// Sama dengan DAW (server/vault.ts + api/shop.ts): token asli plugin disimpan TERENKRIPSI AES-GCM di
// plugin_licenses.token_enc, supaya admin bisa membukanya lewat ikon mata di /admin DAW.
// Kunci diturunkan dari SESSION_SECRET, jadi nilainya HARUS SAMA dengan SESSION_SECRET di project DAW.
const ALPHA = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // tanpa 0/O/1/I

const enc = new TextEncoder();
const b64 = (u) => Buffer.from(u).toString("base64url");

export const vaultReady = () => !!process.env.SESSION_SECRET;

async function vaultKey() {
  const raw = await crypto.subtle.digest("SHA-256", enc.encode("melvox-token-vault:" + process.env.SESSION_SECRET));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt"]);
}

// PLG-XXXX-XXXX-XXXX-XXXX (80 bit acak; 32 huruf => x & 31 tanpa bias)
export function newPluginToken() {
  const c = [...crypto.getRandomValues(new Uint8Array(16))].map((x) => ALPHA[x & 31]);
  return "PLG-" + [0, 1, 2, 3].map((i) => c.slice(i * 4, i * 4 + 4).join("")).join("-");
}

// Token dinormalisasi (huruf besar, tanpa tanda hubung/spasi) lalu di-hash, sama dengan hashToken di DAW.
export async function hashToken(token) {
  const norm = String(token).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(norm)));
  return [...h].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// base64url(iv 12 byte || ciphertext+tag); token_hash dipakai sebagai AAD.
export async function seal(token, hash) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: enc.encode(hash) }, await vaultKey(), enc.encode(token))
  );
  const o = new Uint8Array(12 + ct.length);
  o.set(iv);
  o.set(ct, 12);
  return b64(o);
}
