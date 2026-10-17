"use client";

import { motion } from "framer-motion";

// ISI: daftar plugin Melvoc yang sebenarnya.
const PLUGINS = [
  { name: "EQ", desc: "Bentuk warna suara vokalmu." },
  { name: "Compressor", desc: "Ratakan dinamika supaya vokal stabil." },
  { name: "Reverb", desc: "Tambah ruang dan kedalaman." },
  { name: "Delay", desc: "Gema ritmis di ujung kalimat." },
  { name: "Pitch Correction", desc: "Koreksi nada otomatis." },
  { name: "De-esser", desc: "Redam desis huruf S yang tajam." },
];

export default function PluginSection() {
  return (
    <section id="plugin" className="relative px-6 sm:px-10 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
            Plugin
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
            Plugin vocal bawaan Melvoc
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLUGINS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-5"
            >
              <h3 className="font-display font-bold text-lg text-ink">{p.name}</h3>
              <p className="font-body text-sm text-ink-muted mt-1">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
