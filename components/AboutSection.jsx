"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  return (
    <section id="tentang" className="relative px-6 sm:px-10 pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
            Tentang Melvoc
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="space-y-6"
        >
          <p className="font-display font-bold text-xl sm:text-2xl leading-snug text-ink">
            Melvoc adalah DAW khusus vokal yang berjalan langsung di browser: susun track, edit nada di piano roll, pasang plugin dan efek, lalu mixing tanpa ribet.
          </p>
          <p className="font-body font-normal text-ink-muted text-base leading-relaxed">
            Tidak ada file APK yang perlu diunduh. Buka Melvoc di browser HP atau komputer, lalu install ke layar utama (PWA) supaya terbuka seperti aplikasi biasa dan tetap bisa dibuka tanpa internet. Tersedia versi Demo untuk mencoba dan versi Full untuk semua fitur dan plugin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
