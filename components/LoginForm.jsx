"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField } from "@/components/ui/text-field";
import { loginWithToken } from "@/app/masuk/actions";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginWithToken(token, params.get("next"));
      if (res?.ok) {
        router.push(res.next || "/akun");
        router.refresh();
        return;
      }
      setError(res?.error || "Gagal masuk. Coba lagi sebentar lagi.");
    } catch {
      setError("Gagal masuk. Periksa koneksi lalu coba lagi.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TextField
        id="token"
        type="password"
        label="Token lisensi"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        required
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Tempel token Melvoc kamu"
      />
      {error && (
        <p role="alert" className="text-sm text-rose-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || token.trim().length < 8}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-medium text-white transition hover:opacity-90 active:scale-95 disabled:opacity-60 dark:bg-white dark:text-ink-solid"
      >
        {loading ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
