"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { APP_NAME, APP_ICON } from "@/lib/melvoc";
import { HOLO_BG } from "@/lib/holo";

// Header satu layar penuh: teks di atas, icon + nama di tengah, ajakan
// scroll di bawah. Tinggi = layar dikurangi navbar sticky (~4rem) supaya
// isinya benar-benar di tengah layar yang terlihat.
export default function AppHeader() {
  return (
    <header
      className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-between overflow-hidden px-5 pb-6 pt-8 sm:px-10 sm:pb-8 sm:pt-12"
      style={{ backgroundColor: HOLO_BG.backgroundColor }}
    >
      {/* background holografik bergerak tipis */}
      <div
        aria-hidden
        className="holo-drift pointer-events-none absolute inset-0"
        style={{ backgroundImage: HOLO_BG.backgroundImage }}
      />

      {/* atas */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative font-body text-sm font-medium text-[#111] sm:text-base"
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
          className="h-32 w-32 shrink-0 sm:h-44 sm:w-44"
        />
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-[#111] sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="mt-3 max-w-xs font-body text-sm text-[#555] sm:max-w-sm sm:text-base">
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
        className="relative flex flex-col items-center gap-1 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#555] hover:text-[#111]"
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
