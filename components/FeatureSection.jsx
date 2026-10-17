"use client";

import { motion } from "framer-motion";

// Fitur utama Melvoc (sesuai isi aplikasi). Tanpa kartu: teks polos dalam grid.
const FEATURES = [
  {
    title: "Berbasis web, bisa di-install",
    desc: "Buka lewat browser, lalu pasang ke layar utama (PWA) di Android, iPhone, atau komputer. Tanpa APK, dan tetap bisa dibuka tanpa internet.",
  },
  {
    title: "Multi-track & timeline",
    desc: "Tambah track Audio clip, Supersaw, atau DERIZ. Atur pan, volume, dan warna tiap track, lengkap dengan metronome, tap tempo, dan Pitch project.",
  },
  {
    title: "Piano roll & keyboard virtual",
    desc: "Edit note di piano roll dengan menu Slide dan panel Velocity, atau mainkan langsung lewat keyboard virtual.",
  },
  {
    title: "Plugin untuk vokal",
    desc: "MPCS untuk edit pitch manual, MGCHORD untuk chord progression, plus AUTOTUNE, BPMTUNE, PRINTER, dan plugin lainnya.",
  },
  {
    title: "Efek & mastering",
    desc: "Reverb, EQ, Filter, Delay, dan De-esser di tiap track, ditambah Master Loudness (compressor dan limiter) di output.",
  },
  {
    title: "Project, export & automation",
    desc: "Di Full Version: simpan dan buka project, export ke MP3 atau WAV, dan atur gerak knob lewat Automation Clip.",
  },
];

export default function FeatureSection() {
  return (
    <section id="fitur" className="relative px-6 sm:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
            Fitur
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
            Semua yang kamu butuh untuk olah vokal
          </h2>
        </motion.div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              <h3 className="font-display font-bold text-lg text-ink">{f.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
