"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  return (
    <section id="tentang" className="relative px-6 sm:px-10 pt-12 pb-24 sm:pt-16 sm:pb-32">
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
          <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug text-ink">
            Melvoc adalah DAW khusus vocal: tempat kamu merekam, mengedit, dan mixing suara tanpa ribet.
          </p>
          <p className="font-body font-normal text-ink-muted text-lg leading-relaxed">
            Tersedia versi Demo untuk mencoba dan versi Full untuk semua fitur dan plugin. Download APK-nya di bawah, pasang, lalu mulai olah vocalmu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
