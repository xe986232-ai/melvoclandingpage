"use client";

import { motion } from "framer-motion";
import { APP_NAME, APP_ICON } from "@/lib/melvoc";

// Header: cuma icon + nama aplikasi. Harga & tombol Buy/Demo ada di
// section Pricelist (components/PricingSection.jsx).
export default function AppHeader() {
  return (
    <header className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-10 pt-24 sm:px-10">
      {/* cahaya lembut di belakang icon */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl dark:opacity-30 sm:h-[620px] sm:w-[620px]"
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
      </motion.div>
    </header>
  );
}
