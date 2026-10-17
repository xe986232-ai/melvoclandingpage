"use client";

import { motion } from "framer-motion";

// ISI: sesuaikan langkah dengan alur Melvoc yang sebenarnya.
const STEPS = [
  { title: "Buka Melvoc", desc: "Buka Melvoc di browser HP atau komputer. Tidak perlu download APK." },
  { title: "Install ke layar utama", desc: "Opsional: pasang lewat tombol Install di browser, atau dari Pengaturan > Install aplikasi, supaya terbuka seperti aplikasi biasa." },
  { title: "Buat track", desc: "Tambahkan track (Audio clip, Supersaw, atau DERIZ), upload audiomu, lalu susun pattern di timeline dan piano roll." },
  { title: "Mixing", desc: "Pasang plugin dan efek di tiap track, lalu atur pan dan volume sampai pas." },
  { title: "Export & simpan", desc: "Di Full Version: export ke MP3 atau WAV dan simpan project-nya." },
];

export default function CaraPakaiSection() {
  return (
    <section id="cara-pakai" className="relative px-6 sm:px-10 py-20 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
            Cara Pemakaian
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
            Mulai dalam 5 langkah
          </h2>
        </motion.div>

        <ol className="space-y-5">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex gap-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-solid text-white dark:bg-white dark:text-ink-solid font-semibold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-ink">{s.title}</h3>
                <p className="font-body text-sm text-ink-muted">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
