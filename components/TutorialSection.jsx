"use client";

import { motion } from "framer-motion";
import { Lightbulb, PlayCircle, Sparkles } from "lucide-react";
import AnnotatedImage from "@/components/AnnotatedImage";
import { TUTORIALS } from "@/lib/tutorials";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

// Nomor kuning, sama dengan badge di dalam gambar.
function NumBadge({ n }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC440] font-body text-sm font-bold text-[#141004]">
      {n}
    </span>
  );
}

function VideoBlock({ video, name }) {
  const frame = "relative aspect-video w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10";

  if (video?.youtubeId) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={`Video tutorial ${name}`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (video?.src) {
    return (
      <div className={frame}>
        <video src={video.src} controls preload="metadata" className="h-full w-full bg-black" />
      </div>
    );
  }

  return (
    <div
      className={
        frame +
        " flex flex-col items-center justify-center gap-3 bg-base-elevated text-center"
      }
    >
      <PlayCircle size={44} strokeWidth={1.5} className="text-ink-dim" />
      <p className="font-display text-lg font-bold text-ink">Video tutorial segera hadir</p>
      <p className="max-w-xs px-4 font-body text-sm text-ink-muted">
        Video penjelasan {name} sedang disiapkan. Sementara itu, ikuti panduan bergambar di atas.
      </p>
    </div>
  );
}

function PluginTutorial({ t, index }) {
  return (
    <section id={t.id} className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fade} className="mb-8">
          <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-ink-dim">
            Plugin {String(index + 1).padStart(2, "0")} · {t.tagline}
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {t.name}
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base text-ink-muted">{t.summary}</p>
        </motion.div>

        {/* 1. Gambar beranotasi (penjelasan di dalam gambar) */}
        <motion.div {...fade}>
          <AnnotatedImage src={t.image} alt={t.imageAlt} />
          <p className="mt-3 text-center font-body text-xs text-ink-dim">
            Angka kuning pada gambar sama dengan nomor di penjelasan di bawah.
          </p>
        </motion.div>

        {/* 2. Penjelasan di luar gambar (di bawahnya), dikelompokkan */}
        <div className="mt-12 space-y-10">
          {t.groups.map((g) => (
            <motion.div key={g.label} {...fade}>
              <h3 className="mb-4 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-ink-dim">
                {g.label}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.parts.map((p) => (
                  <div
                    key={p.n}
                    className="flex gap-3 rounded-2xl border border-base-line bg-base-elevated p-4"
                  >
                    <NumBadge n={p.n} />
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">{p.title}</h4>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Langkah pemakaian */}
        <motion.div {...fade} className="mt-14">
          <h3 className="mb-5 font-display text-2xl font-bold text-ink">
            Cara pakai {t.name} langkah demi langkah
          </h3>
          <ol className="space-y-4">
            {t.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-solid font-semibold text-white dark:bg-white dark:text-ink-solid">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-display text-lg font-bold text-ink">{s.title}</h4>
                  <p className="font-body text-sm text-ink-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {t.tip && (
            <div className="mt-6 flex gap-3 rounded-2xl border border-[#FFC440]/40 bg-[#FFC440]/10 p-4">
              <Lightbulb size={20} className="mt-0.5 shrink-0 text-[#C98F00] dark:text-[#FFC440]" />
              <p className="font-body text-sm text-ink">
                <span className="font-semibold">Tips: </span>
                {t.tip}
              </p>
            </div>
          )}
        </motion.div>

        {/* 4. Video tutorial */}
        <motion.div {...fade} className="mt-14">
          <h3 className="mb-5 font-display text-2xl font-bold text-ink">Video tutorial {t.name}</h3>
          <VideoBlock video={t.video} name={t.name} />
        </motion.div>
      </div>
    </section>
  );
}

export default function TutorialSection() {
  return (
    <>
      <section className="relative px-5 pb-6 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fade} className="text-center">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-ink-muted">
              Tutorial
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Belajar pakai plugin Melvoc
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-base text-ink-muted">
              Panduan bergambar dan video untuk tiap plugin: apa fungsi setiap tombol dan knob, lalu
              cara memakainya dari awal.
            </p>
          </motion.div>

          <motion.nav
            {...fade}
            aria-label="Pilih plugin"
            className="mt-10 grid gap-3 sm:grid-cols-2"
          >
            {TUTORIALS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="group rounded-2xl border border-base-line bg-base-elevated p-5 transition-colors hover:border-ink-dim"
              >
                <span className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-ink-dim">
                  {t.tagline}
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-ink">{t.name}</span>
                  <span className="font-body text-sm font-medium text-ink-muted transition-transform group-hover:translate-x-1">
                    Lihat tutorial →
                  </span>
                </div>
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {TUTORIALS.map((t, i) => (
        <PluginTutorial key={t.id} t={t} index={i} />
      ))}

      <section className="px-5 pb-20 pt-6 sm:px-10">
        <motion.div
          {...fade}
          className="mx-auto flex max-w-5xl items-start gap-3 rounded-2xl border border-dashed border-base-line p-5"
        >
          <Sparkles size={20} className="mt-0.5 shrink-0 text-ink-dim" />
          <p className="font-body text-sm text-ink-muted">
            <span className="font-semibold text-ink">Segera hadir:</span> tutorial plugin lainnya
            (MGCHORD, Supersaw, AUTOTUNE, dan lainnya) serta tutorial cara memakai app Melvoc.
          </p>
        </motion.div>
      </section>
    </>
  );
}
