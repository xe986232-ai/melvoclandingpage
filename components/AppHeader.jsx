"use client";

import { motion } from "framer-motion";
import { APP_NAME, APP_ICON, FULL_PRICE, BUY_URL, DEMO_APK_URL } from "@/lib/melvoc";

function ActionButton({ label, url, primary }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition";
  if (!url) {
    return (
      <span
        aria-disabled="true"
        title="Segera hadir"
        className={`${base} bg-black/10 dark:bg-white/10 text-ink-muted cursor-not-allowed select-none`}
      >
        {label}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? `${base} bg-ink-solid text-white dark:bg-white dark:text-ink-solid hover:opacity-90`
          : `${base} border border-black/15 dark:border-white/20 text-ink hover:bg-black/5 dark:hover:bg-white/10`
      }
    >
      {label}
    </a>
  );
}

export default function AppHeader() {
  return (
    <header className="relative px-6 sm:px-10 pt-10 sm:pt-14 pb-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto flex items-center gap-5 sm:gap-7"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={128}
          height={128}
          className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-[26%] shadow-lg"
        />

        <div className="min-w-0">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink truncate">
            {APP_NAME}
          </h1>
          <p className="font-body font-semibold text-lg sm:text-xl text-ink-muted mt-1">
            {FULL_PRICE}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <ActionButton primary label="Buy" url={BUY_URL} />
            <ActionButton label="Demo" url={DEMO_APK_URL} />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
