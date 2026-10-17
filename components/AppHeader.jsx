"use client";

import { motion } from "framer-motion";
import { APP_NAME, APP_ICON, FULL_PRICE, BUY_URL, DEMO_APK_URL } from "@/lib/melvoc";

// Tombol selalu tampil aktif. Kalau link belum diisi di lib/melvoc.js,
// tombol scroll ke bagian Download di bawah.
function ActionButton({ label, url, primary }) {
  const external = !!url;
  const base =
    "flex h-12 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition active:scale-95";
  const style = primary
    ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md hover:opacity-90"
    : "border-2 border-violet-500/40 text-ink hover:bg-violet-500/10";
  return (
    <a
      href={external ? url : "#download"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${style}`}
    >
      {label}
    </a>
  );
}

export default function AppHeader() {
  return (
    <header className="relative overflow-hidden px-5 py-20 sm:px-10 sm:py-28">
      {/* cahaya lembut di belakang icon supaya header punya bobot visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl dark:opacity-30 sm:h-[560px] sm:w-[560px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(217,70,239,0.25) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-md flex-col items-center text-center"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={176}
          height={176}
          className="h-32 w-32 shrink-0 drop-shadow-xl sm:h-44 sm:w-44"
        />

        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="mt-1 font-body text-sm text-ink-muted sm:text-base">DAW Vocal untuk Android</p>

        <p className="mt-5 flex items-baseline justify-center gap-2">
          <span className="font-display text-3xl font-bold text-fuchsia-600 dark:text-fuchsia-400 sm:text-4xl">
            {FULL_PRICE}
          </span>
          <span className="font-body text-xs text-ink-muted sm:text-sm">Full Version</span>
        </p>

        <div className="mt-7 flex w-full max-w-xs gap-2.5">
          <ActionButton primary label="Buy" url={BUY_URL} />
          <ActionButton label="Demo" url={DEMO_APK_URL} />
        </div>
      </motion.div>
    </header>
  );
}
