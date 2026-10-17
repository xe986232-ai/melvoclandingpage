"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

// ISI: sesuaikan dengan fitur Melvoc yang sebenarnya.
const FITUR = [
  { name: "Rekam Vocal", title: "Fitur", quote: "Rekam langsung dari mic HP atau mic eksternal dengan kualitas jernih." },
  { name: "Multi-track", title: "Fitur", quote: "Susun vokal utama, backing, dan harmoni dalam satu project." },
  { name: "Mixing Vocal", title: "Fitur", quote: "Atur volume, pan, dan efek tiap track dengan mudah." },
  { name: "Koreksi Nada", title: "Fitur", quote: "Rapikan nada vokal supaya lebih pas dan enak didengar." },
  { name: "Pengurang Noise", title: "Fitur", quote: "Bersihkan suara bising dari hasil rekaman." },
  { name: "Export Hasil", title: "Fitur", quote: "Simpan hasil mixing siap dibagikan kapan saja." },
];

export default function FiturSection() {
  return (
    <section id="fitur" className="relative py-20 sm:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-6 sm:px-10 mb-10 text-center"
      >
        <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
          Perkenalan Fitur
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
          Semua yang kamu butuh buat olah vocal
        </h2>
      </motion.div>

      <InfiniteMovingCards items={FITUR} direction="left" speed="slow" />
    </section>
  );
}
