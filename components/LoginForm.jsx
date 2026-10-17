"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { TextField } from "@/components/ui/text-field";

// Hanya izinkan redirect ke path internal (cegah open redirect).
function safeNext(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/akun";
}

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Login belum dikonfigurasi. Hubungi admin.");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (err) {
      setLoading(false);
      setError(
        err.message === "Invalid login credentials"
          ? "Email atau password salah."
          : "Gagal masuk. Coba lagi sebentar lagi."
      );
      return;
    }
    router.push(safeNext(params.get("next")));
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isSupabaseConfigured && (
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2.5 text-xs text-ink">
          Login belum aktif: variabel Supabase belum diisi di server.
        </p>
      )}
      <TextField
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@kamu.com"
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password akun Melvoc"
      />
      {error && (
        <p role="alert" className="text-sm text-rose-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-medium text-white transition hover:opacity-90 active:scale-95 disabled:opacity-60 dark:bg-white dark:text-ink-solid"
      >
        {loading ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
}
