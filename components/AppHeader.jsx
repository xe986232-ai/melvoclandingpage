"use client";

import { motion } from "framer-motion";
import { APP_NAME, APP_ICON, FULL_PRICE, BUY_URL, DEMO_APK_URL } from "@/lib/melvoc";

// Tombol selalu tampil aktif. Kalau link belum diisi di lib/melvoc.js,
// tombol scroll ke bagian Download di bawah.
function ActionButton({ label, url, primary }) {
  const external = !!url;
  const base =
    "flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition active:scale-95";
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
    <header className="relative px-5 sm:px-10 pt-8 sm:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md sm:max-w-xl mx-auto flex items-center gap-4 sm:gap-6"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={112}
          height={112}
          className="h-20 w-20 sm:h-28 sm:w-28 shrink-0 rounded-[24%] shadow-lg"
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight text-ink">
            {APP_NAME}
          </h1>
          <p className="mt-0.5 flex items-baseline gap-2">
            <span className="font-display font-bold text-xl sm:text-2xl text-fuchsia-600 dark:text-fuchsia-400">
              {FULL_PRICE}
            </span>
            <span className="font-body text-xs text-ink-muted">Full Version</span>
          </p>
          <div className="mt-3 flex gap-2">
            <ActionButton primary label="Buy" url={BUY_URL} />
            <ActionButton label="Demo" url={DEMO_APK_URL} />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
