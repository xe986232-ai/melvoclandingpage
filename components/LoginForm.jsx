"use client";

import { useEffect, useState } from "react";
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

const RESEND_SECONDS = 60;

const primaryBtn =
  "inline-flex h-11 w-full items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-medium text-white transition hover:opacity-90 active:scale-95 disabled:opacity-60 dark:bg-white dark:text-ink-solid";

const linkBtn =
  "font-body text-sm font-medium text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline disabled:no-underline disabled:opacity-60";

function otpErrorMessage(err) {
  const msg = (err?.message || "").toLowerCase();
  const code = err?.code || "";
  if (code === "over_email_send_rate_limit" || msg.includes("rate limit") || msg.includes("security purposes")) {
    return "Terlalu sering meminta kode. Tunggu sebentar lalu coba lagi.";
  }
  if (msg.includes("signups not allowed") || msg.includes("not allowed for otp") || code === "otp_disabled") {
    return "Email ini belum terdaftar. Pakai email yang sama dengan akun Melvoc kamu.";
  }
  if (msg.includes("error sending") || code === "unexpected_failure") {
    return "Kode belum bisa dikirim ke email ini. Coba lagi nanti atau masuk dengan password.";
  }
  return "Gagal mengirim kode. Coba lagi sebentar lagi.";
}

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [mode, setMode] = useState("otp"); // "otp" | "password"
  const [step, setStep] = useState("email"); // khusus mode otp: "email" | "code"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function getClientOrFail() {
    const supabase = createClient();
    if (!supabase) setError("Login belum dikonfigurasi. Hubungi admin.");
    return supabase;
  }

  function finish() {
    router.push(safeNext(params.get("next")));
    router.refresh();
  }

  function switchMode(next) {
    setMode(next);
    setStep("email");
    setCode("");
    setPassword("");
    setError("");
    setInfo("");
  }

  async function sendCode() {
    setError("");
    setInfo("");
    const supabase = getClientOrFail();
    if (!supabase) return false;
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false },
    });
    setLoading(false);
    if (err) {
      setError(otpErrorMessage(err));
      return false;
    }
    setCooldown(RESEND_SECONDS);
    return true;
  }

  async function onSubmitEmail(e) {
    e.preventDefault();
    if (await sendCode()) {
      setStep("code");
      setInfo(`Kode sudah dikirim ke ${email.trim()}. Cek inbox atau folder spam.`);
    }
  }

  async function onResend() {
    if (await sendCode()) setInfo("Kode baru sudah dikirim.");
  }

  async function onSubmitCode(e) {
    e.preventDefault();
    setError("");
    const supabase = getClientOrFail();
    if (!supabase) return;
    setLoading(true);
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    if (err) {
      setLoading(false);
      setError("Kode salah atau sudah kedaluwarsa. Minta kode baru lalu coba lagi.");
      return;
    }
    finish();
  }

  async function onSubmitPassword(e) {
    e.preventDefault();
    setError("");
    const supabase = getClientOrFail();
    if (!supabase) return;
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
    finish();
  }

  const notice = !isSupabaseConfigured && (
    <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2.5 text-xs text-ink">
      Login belum aktif: variabel Supabase belum diisi di server.
    </p>
  );

  const errorLine = error && (
    <p role="alert" className="text-sm text-rose-500">
      {error}
    </p>
  );

  const infoLine = info && <p className="text-sm text-ink-muted">{info}</p>;

  if (mode === "password") {
    return (
      <form onSubmit={onSubmitPassword} className="space-y-4">
        {notice}
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
        {errorLine}
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Masuk..." : "Masuk"}
        </button>
        <div className="text-center">
          <button type="button" onClick={() => switchMode("otp")} className={linkBtn}>
            Lupa password? Masuk dengan kode email
          </button>
        </div>
      </form>
    );
  }

  if (step === "code") {
    return (
      <form onSubmit={onSubmitCode} className="space-y-4">
        {notice}
        {infoLine}
        <TextField
          id="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          label="Kode dari email"
          required
          maxLength={10}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="Masukkan kode"
          className="tracking-[0.3em]"
        />
        {errorLine}
        <button type="submit" disabled={loading || code.length < 6} className={primaryBtn}>
          {loading ? "Memeriksa..." : "Masuk"}
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onResend}
            disabled={loading || cooldown > 0}
            className={linkBtn}
          >
            {cooldown > 0 ? `Kirim ulang (${cooldown})` : "Kirim ulang kode"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setCooldown(0);
              setError("");
              setInfo("");
            }}
            className={linkBtn}
          >
            Ganti email
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmitEmail} className="space-y-4">
      {notice}
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
      {errorLine}
      <button type="submit" disabled={loading || cooldown > 0} className={primaryBtn}>
        {loading ? "Mengirim kode..." : "Kirim kode ke email"}
      </button>
      <div className="text-center">
        <button type="button" onClick={() => switchMode("password")} className={linkBtn}>
          Masuk dengan password
        </button>
      </div>
    </form>
  );
}
