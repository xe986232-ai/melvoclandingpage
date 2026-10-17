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
    <header className="relative px-5 sm:px-10 pt-14 pb-20 sm:pt-20 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md sm:max-w-2xl mx-auto flex items-center gap-4 sm:gap-8"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={160}
          height={160}
          className="h-24 w-24 sm:h-40 sm:w-40 shrink-0 drop-shadow-lg"
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight text-ink">
            {APP_NAME}
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted">DAW Vocal untuk Android</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl sm:text-3xl text-fuchsia-600 dark:text-fuchsia-400">
              {FULL_PRICE}
            </span>
            <span className="font-body text-xs text-ink-muted">Full Version</span>
          </p>
          <div className="mt-4 flex gap-2.5">
            <ActionButton primary label="Buy" url={BUY_URL} />
            <ActionButton label="Demo" url={DEMO_APK_URL} />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
