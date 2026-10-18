"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { HOLO_BG } from "@/lib/holo";

// Section "Jelajahi": pintu masuk dari halaman utama ke halaman lain (Plugin, Tutorial, Cara Pakai).
// Kartu Plugin & Tutorial menampilkan gambar asli dari /public/plugin dan /public/tutorial yang
// ditumpuk berlapis (layer) sebagai pemanis. Saat kartu di-hover / disentuh, tumpukannya melebar.
//
// Atur tumpukan gambar lewat array LAYERS di bawah:
//   src = file gambar, x / y = posisi kiri-atas (%), w = lebar (% dari area gambar),
//   r = rotasi awal (derajat), z = urutan tumpukan, fan = {x, y, r} gerakan saat hover.

const PLUGIN_LAYERS = [
  { src: "/plugin/mgchord.webp", x: 0, y: 4, w: 52, r: -7, z: 1, fan: { x: -18, y: -2, r: -6 } },
  { src: "/plugin/supersaw.webp", x: 50, y: 0, w: 48, r: 7, z: 2, fan: { x: 18, y: -4, r: 6 } },
  { src: "/plugin/delay.webp", x: 4, y: 46, w: 50, r: -4, z: 3, fan: { x: -14, y: 10, r: -4 } },
  { src: "/plugin/deriz.webp", x: 48, y: 50, w: 48, r: 5, z: 4, fan: { x: 14, y: 10, r: 5 } },
  { src: "/plugin/autotune.webp", x: 20, y: 24, w: 60, r: -1, z: 5, fan: { x: 0, y: -8, r: 0 } },
];

const TUTORIAL_LAYERS = [
  { src: "/tutorial/delay-annotated.webp", x: 0, y: 4, w: 56, r: -7, z: 1, fan: { x: -16, y: -2, r: -6 } },
  { src: "/tutorial/supersaw-annotated.webp", x: 44, y: 0, w: 56, r: 6, z: 2, fan: { x: 16, y: -4, r: 5 } },
  { src: "/tutorial/mgchord-annotated.webp", x: 4, y: 50, w: 56, r: -3, z: 3, fan: { x: -12, y: 10, r: -3 } },
  { src: "/tutorial/autotune-annotated.webp", x: 22, y: 26, w: 62, r: 2, z: 4, fan: { x: 4, y: -8, r: 2 } },
];

// Badge angka kuning (gaya anotasi di halaman Tutorial) yang melayang di atas tumpukan.
const BADGES = [
  { n: 1, x: "8%", y: "10%", d: 0 },
  { n: 2, x: "84%", y: "26%", d: 0.8 },
  { n: 3, x: "16%", y: "78%", d: 1.6 },
];

const layerVariants = {
  rest: (l) => ({ x: 0, y: 0, rotate: l.r, scale: 1 }),
  hover: (l) => ({
    x: l.fan.x,
    y: l.fan.y,
    rotate: l.r + l.fan.r,
    scale: 1.03,
    transition: { type: "spring", stiffness: 180, damping: 18 },
  }),
};

function LayerStack({ layers, alt, tone = "light" }) {
  return (
    <div className="relative mx-auto h-[17rem] w-full max-w-[34rem] sm:h-[22rem]" aria-hidden>
      {layers.map((l, i) => (
        <motion.div
          key={l.src}
          custom={l}
          variants={layerVariants}
          className="absolute"
          style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, zIndex: l.z }}
        >
          {/* gerakan melayang pelan, tiap lapis beda ritme biar terasa hidup */}
          <div
            className="animate-float-slow"
            style={{ animationDelay: `${i * -1.2}s`, animationDuration: `${5 + i * 0.7}s` }}
          >
            <img
              src={l.src}
              alt=""
              loading="lazy"
              draggable={false}
              className={
                "w-full rounded-xl object-contain " +
                (tone === "dark"
                  ? "shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
                  : "shadow-[0_18px_40px_-14px_rgba(40,20,90,0.55)] ring-1 ring-black/10")
              }
            />
          </div>
        </motion.div>
      ))}
      <span className="sr-only">{alt}</span>
    </div>
  );
}

function Badges() {
  return (
    <>
      {BADGES.map((b) => (
        <motion.span
          key={b.n}
          aria-hidden
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: b.d }}
          className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC440] font-body text-sm font-bold text-[#141004] shadow-[0_6px_16px_rgba(255,196,64,0.45)]"
          style={{ left: b.x, top: b.y }}
        >
          {b.n}
        </motion.span>
      ))}
    </>
  );
}

function ArrowChip({ dark = false }) {
  return (
    <span
      className={
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 " +
        (dark ? "bg-white text-[#0B0A10]" : "bg-[#111] text-white")
      }
    >
      <ArrowUpRight size={20} strokeWidth={2} />
    </span>
  );
}

export default function ExploreSection() {
  return (
    <section id="jelajah" className="relative px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-ink-muted">
            Jelajahi
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Kenali plugin-nya, pelajari cara pakainya
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink-muted sm:text-[1rem]">
            Intip koleksi plugin Melvoc, lalu ikuti panduan bergambar untuk tiap plugin.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ===== PLUGIN ===== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/plugin"
              aria-label="Buka halaman Plugin"
              className="group block"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                animate="rest"
                className="relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 sm:p-8"
                style={HOLO_BG}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-[#111]/60">
                      Koleksi
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">
                      Plugin
                    </h3>
                    <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-[#111]/70">
                      Reverb, EQ, Delay, MPCS, AUTOTUNE, dan lainnya. Lihat tampilan dan fungsi tiap plugin.
                    </p>
                  </div>
                  <ArrowChip />
                </div>

                <div className="mt-6 flex flex-1 items-center">
                  <LayerStack
                    layers={PLUGIN_LAYERS}
                    alt="Tumpukan tampilan plugin Melvoc: Equalizer, Reverb, MPCS, DERIZ, dan AUTOTUNE"
                  />
                </div>

                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-body text-sm font-semibold text-[#111] backdrop-blur">
                  Lihat semua plugin
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* ===== TUTORIAL ===== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <Link
              href="/tutorial"
              aria-label="Buka halaman Tutorial"
              className="group block"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                animate="rest"
                className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#0B0A10] p-6 sm:p-8"
              >
                {/* cahaya latar */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#B026FF]/35 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#3D5AFE]/35 blur-3xl"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      Panduan
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      Tutorial
                    </h3>
                    <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-white/65">
                      Gambar beranotasi dengan nomor penjelasan, langkah singkat, dan video untuk tiap plugin.
                    </p>
                  </div>
                  <ArrowChip dark />
                </div>

                <div className="relative mt-6 flex flex-1 items-center">
                  <Badges />
                  <LayerStack
                    tone="dark"
                    layers={TUTORIAL_LAYERS}
                    alt="Tumpukan gambar tutorial beranotasi: Equalizer, MPCS, DERIZ, dan AUTOTUNE"
                  />
                </div>

                <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-body text-sm font-semibold text-white backdrop-blur">
                  Buka tutorial
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ===== CARA PAKAI (baris tipis) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Link
            href="/cara-pakai"
            className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-base-line bg-base-elevated px-6 py-5 transition-colors hover:border-ink/30"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFC440] text-[#141004]">
                <BookOpen size={20} strokeWidth={2} />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-ink">Baru pertama pakai Melvoc?</span>
                <span className="block font-body text-sm text-ink-muted">
                  Mulai dari panduan Cara Pakai: dari buka app sampai export lagu.
                </span>
              </span>
            </span>
            <ArrowUpRight
              size={22}
              className="shrink-0 text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
