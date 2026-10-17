import "server-only";
import { webcrypto as crypto } from "node:crypto";

// Token dinormalisasi (huruf besar, tanpa tanda hubung/spasi) lalu di-hash SHA-256, sama dengan hashToken di DAW.
// Database hanya menyimpan hash; token asli dibuat dan dienkripsi oleh admin DAW (/admin > Buat token).
export async function hashToken(token) {
  const norm = String(token).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(norm)));
  return [...h].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Penanda unik untuk baris pesanan yang tokennya belum diterbitkan admin (tidak ada token yang cocok dengan hash ini).
export const placeholderHash = () =>
  [...crypto.getRandomValues(new Uint8Array(32))].map((b) => b.toString(16).padStart(2, "0")).join("");
