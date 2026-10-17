"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { APP_NAME, APP_ICON } from "@/lib/melvoc";

// Header satu layar penuh: teks di atas, icon + nama di tengah, ajakan
// scroll di bawah. Tinggi = layar dikurangi navbar sticky (~4rem) supaya
// isinya benar-benar di tengah layar yang terlihat.
export default function AppHeader() {
  return (
    <header className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-between overflow-hidden px-5 pb-6 pt-8 sm:px-10 sm:pb-8 sm:pt-12">
      {/* cahaya lembut di belakang icon */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl dark:opacity-30 sm:h-[620px] sm:w-[620px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(217,70,239,0.25) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* atas */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300 sm:text-xs"
      >
        DAW Vocal untuk Android
      </motion.p>

      {/* tengah */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex max-w-md flex-col items-center text-center"
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
        <p className="mt-3 max-w-xs font-body text-sm text-ink-muted sm:max-w-sm sm:text-base">
          Rekam, edit, dan mix vokalmu langsung dari HP.
        </p>
      </motion.div>

      {/* bawah: ajakan scroll */}
      <motion.a
        href="#pricelist"
        aria-label="Scroll ke bawah"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative flex flex-col items-center gap-1 font-body text-xs font-medium uppercase tracking-[0.2em] text-ink-muted hover:text-ink"
      >
        Scroll ke bawah
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </header>
  );
}
