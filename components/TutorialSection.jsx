"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import AnnotatedImage from "@/components/AnnotatedImage";
import { TUTORIALS } from "@/lib/tutorials";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

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
    <section id={t.id} className="scroll-mt-24 px-5 py-12 sm:px-10 sm:py-16">
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

        {/* 2. Penjelasan di bawah gambar: daftar polos */}
        <motion.ol {...fade} className="mt-10 divide-y divide-base-line border-y border-base-line">
          {t.parts.map((p) => (
            <li key={p.n} className="flex items-baseline gap-3 py-2.5">
              <span className="flex h-6 w-6 shrink-0 translate-y-0.5 items-center justify-center rounded-full bg-[#FFC440] font-body text-xs font-bold text-[#141004]">
                {p.n}
              </span>
              <p className="font-body text-sm text-ink-muted sm:text-base">
                <span className="font-semibold text-ink">{p.title}</span>
                <span className="mx-1.5 text-ink-dim">—</span>
                {p.desc}
              </p>
            </li>
          ))}
        </motion.ol>

        {/* 3. Langkah singkat */}
        <motion.div {...fade} className="mt-10">
          <h3 className="mb-3 font-display text-xl font-bold text-ink">Cara pakai</h3>
          <ol className="list-decimal space-y-1.5 pl-5 font-body text-sm text-ink-muted marker:font-semibold marker:text-ink sm:text-base">
            {t.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          {t.tip && (
            <p className="mt-4 font-body text-sm text-ink-dim">
              <span className="font-semibold text-ink-muted">Tips:</span> {t.tip}
            </p>
          )}
        </motion.div>

        {/* 4. Video tutorial */}
        <motion.div {...fade} className="mt-10">
          <h3 className="mb-3 font-display text-xl font-bold text-ink">Video tutorial</h3>
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
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {TUTORIALS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-base-line px-5 py-2 font-body text-sm font-semibold text-ink transition-colors hover:bg-base-elevated"
              >
                {t.name}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {TUTORIALS.map((t, i) => (
        <PluginTutorial key={t.id} t={t} index={i} />
      ))}

      <p className="px-5 pb-20 pt-4 text-center font-body text-sm text-ink-dim">
        Tutorial plugin lainnya dan cara memakai app Melvoc segera hadir.
      </p>
    </>
  );
}
