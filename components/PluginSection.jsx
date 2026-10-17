"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PLUGINS } from "@/lib/plugins";
import { HOLO_BG } from "@/lib/holo";

function Preview({ plugin }) {
  if (plugin.image) {
    return (
      <div className="flex aspect-[5/4] items-center justify-center">
        <img
          src={plugin.image}
          alt={`Tampilan plugin ${plugin.name}`}
          loading="lazy"
          className="max-h-full max-w-full rounded-xl object-contain"
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
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink-muted sm:text-[1rem]">
            {PLUGINS.length} plugin untuk vokal, instrumen, dan produksi. Plugin bertanda
            <span className="mx-1.5 font-semibold text-ink">(Full)</span>
            hanya ada di Full Version.
          </p>
        </motion.div>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PLUGINS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="flex flex-col"
            >
              <Preview plugin={p} />
              <div className="pt-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-ink">
                    {p.name}
                  </h3>
                  {p.full && (
                    <span className="font-body text-sm font-semibold text-ink">(Full)</span>
                  )}
                  {p.full ? (
                    <Link
                      href="/#pricelist"
                      className="ml-auto rounded-full border border-base-line px-3 py-1 font-body text-xs font-semibold text-ink transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                    >
                      Get plugin
                    </Link>
                  ) : (
                    <span className="ml-auto font-body text-xs font-semibold text-ink-muted">
                      Dimiliki
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
