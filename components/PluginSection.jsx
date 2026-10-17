"use client";

import Link from "next/link";
import { useState } from "react";
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

const TABS = [
  { id: "default", label: "Plugin Default", match: (p) => !p.full },
  { id: "shop", label: "Shop Plugin", match: (p) => !!p.full },
];

const TITLE = {
  default: "Plugin bawaan Melvoc",
  shop: "Plugin tambahan Melvoc",
};

const INTRO = {
  default: "plugin bawaan yang sudah ada di semua versi Melvoc, termasuk Demo.",
  shop: "plugin tambahan yang hanya ada di Full Version.",
};

export default function PluginSection() {
  const [tab, setTab] = useState("default");
  const active = TABS.find((t) => t.id === tab);
  const list = PLUGINS.filter(active.match);

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
          <div
            role="tablist"
            aria-label="Kategori plugin"
            className="mx-auto mb-10 flex w-fit rounded-full border border-base-line p-1"
          >
            {TABS.map((t) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.id)}
                  className={
                    "rounded-full px-5 py-2 font-body text-sm font-semibold transition-colors " +
                    (on
                      ? "bg-ink text-[rgb(var(--base))]"
                      : "text-ink-muted hover:text-ink")
                  }
                >
                  {t.label}
                  <span className="ml-1.5 opacity-60">{PLUGINS.filter(t.match).length}</span>
                </button>
              );
            })}
          </div>
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-ink-muted">
            Plugin
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-5xl">
            {TITLE[tab]}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink-muted sm:text-[1rem]">
            {list.length} {INTRO[tab]}
          </p>
        </motion.div>

        <div key={tab} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
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
