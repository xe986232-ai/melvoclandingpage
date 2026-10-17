"use client";

import { motion } from "framer-motion";
import { PLUGINS } from "@/lib/plugins";
import { HOLO_BG } from "@/lib/holo";

function Preview({ plugin }) {
  if (plugin.image) {
    return (
      <div className="flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl bg-black/[0.04] p-4 dark:bg-white/[0.06]">
        <img
          src={plugin.image}
          alt={`Tampilan plugin ${plugin.name}`}
          loading="lazy"
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>
    );
  }
  // belum ada screenshot: kartu gradasi dengan nama plugin
  return (
    <div
      className="flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl p-4"
      style={HOLO_BG}
      aria-hidden
    >
      <span className="font-display text-3xl font-extrabold tracking-tight text-[#111]/70 sm:text-4xl">
        {plugin.name}
      </span>
    </div>
  );
}

export default function PluginSection() {
  return (
    <section id="plugin" className="relative px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-ink-muted">
            Plugin
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-5xl">
            Plugin bawaan Melvoc
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink-muted sm:text-base">
            {PLUGINS.length} plugin untuk vokal, instrumen, dan produksi. Plugin bertanda
            <span className="mx-1.5 rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
              Full
            </span>
            hanya ada di Full Version.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLUGINS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="flex flex-col rounded-3xl border border-base-line bg-base-elevated p-3 sm:p-4"
            >
              <Preview plugin={p} />
              <div className="px-1.5 pb-2 pt-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-ink">
                    {p.name}
                  </h3>
                  {p.full && (
                    <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 font-body text-[11px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                      Full
                    </span>
                  )}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
