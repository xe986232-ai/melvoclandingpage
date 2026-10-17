"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { PLUGINS, formatPrice } from "@/lib/plugins";
import { HOLO_BG } from "@/lib/holo";
import PluginMenu from "@/components/PluginMenu";

export function Preview({ plugin }) {
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
  { id: "default", label: "Plugin Default", match: (p) => p.default },
  { id: "shop", label: "Shop Plugin", match: (p) => !p.default },
];

const TITLE = {
  default: "Plugin bawaan Melvoc",
  shop: "Plugin tambahan Melvoc",
};

const INTRO = {
  default: "plugin bawaan yang langsung aktif di akun Melvoc kamu.",
  shop: "plugin tambahan berbayar. Buka menu titik tiga, pilih Buy plugin, lalu tebus dengan token dari admin dan plugin langsung bisa dipakai di DAW.",
};

// Label status di samping harga (hanya plugin berbayar yang punya status).
export function StatusChip({ owned, pending }) {
  if (!owned && !pending) return null;
  return (
    <span className="rounded-full border border-base-line px-2 py-0.5 font-body text-[11px] font-semibold text-ink-muted">
      {owned ? "Dimiliki" : "Menunggu token"}
    </span>
  );
}

export default function PluginSection({ signedIn = false, owned = [], pending = [] }) {
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
              <Link href={"/plugin/" + p.id} aria-label={"Buka halaman " + p.name} className="block">
                <Preview plugin={p} />
              </Link>
              <div className="pt-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-ink">
                    <Link href={"/plugin/" + p.id} className="hover:opacity-70 transition-opacity">{p.name}</Link>
                  </h3>
                  <span className="font-body text-sm font-semibold text-ink-muted">
                    {formatPrice(p.price)}
                  </span>
                  <StatusChip owned={owned.includes(p.id)} pending={pending.includes(p.id)} />
                  <PluginMenu
                    plugin={p}
                    signedIn={signedIn}
                    owned={owned.includes(p.id)}
                    pending={pending.includes(p.id)}
                  />
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
