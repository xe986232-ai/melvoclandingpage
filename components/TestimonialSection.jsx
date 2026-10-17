"use client";

import { motion } from "framer-motion";
import { CustomTweetCard } from "./ui/custom-tweet-card";

// ISI: ganti dengan testimoni pengguna asli (nama & teks di bawah masih contoh).
// Nggak butuh internet/API — semua konten custom & statis.
const TESTIMONIALS = [
  {
    name: "Dimas Ardiansyah",
    handle: "dimasardi",
    verified: true,
    date: "9 Jul 2026",
    text: "Melvoc bikin proses mixing vocal jadi jauh lebih gampang, cukup dari HP. Hasilnya bersih dan enak didengar.",
  },
  {
    name: "Sari Kusuma",
    handle: "sarikusuma",
    verified: false,
    date: "2 Jul 2026",
    text: "Plugin vokalnya lengkap dan ringan. Rekam, koreksi nada, langsung export — nggak perlu ribet pindah-pindah aplikasi.",
  },
  {
    name: "Bima Prasetya",
    handle: "bimapras",
    verified: false,
    date: "28 Jun 2026",
    text: "Coba versi demo dulu, ternyata cocok banget, jadi langsung beli full version. Worth it.",
  },
];

export default function TestimonialSection() {
  return (
    <section
      id="kata-mereka"
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-6 sm:px-10 mb-10 text-center"
      >
        <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
          Kata Pengguna
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
          Kata pengguna soal Melvoc
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 px-6 sm:px-10">
        {TESTIMONIALS.map((item, idx) => (
          <CustomTweetCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}