"use client";

import { motion } from "framer-motion";

// ISI: ganti dengan icon aplikasi asli. Taruh file-nya di folder /public
// (mis. /public/melvoc-icon.png) lalu ubah path di bawah.
const ICON_SRC = "/melvoc-icon.svg";
const APP_NAME = "Melvoc";
const APP_TAGLINE = "DAW Vocal untuk Android";

export default function AppHeader() {
  return (
    <header className="relative px-6 sm:px-10 pt-12 sm:pt-16 pb-2 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <img
          src={ICON_SRC}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={112}
          height={112}
          className="h-24 w-24 sm:h-28 sm:w-28 rounded-[26%] shadow-lg"
        />
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink">
          {APP_NAME}
        </h1>
        <p className="font-body font-medium text-ink-muted">{APP_TAGLINE}</p>
      </motion.div>
    </header>
  );
}
