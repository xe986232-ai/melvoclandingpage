"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PLUGINS, formatPrice } from "@/lib/plugins";
import { getPlugin } from "@/app/plugin/actions";
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
  { id: "default", label: "Plugin Default", match: (p) => p.default },
  { id: "shop", label: "Shop Plugin", match: (p) => !p.default },
];

const TITLE = {
  default: "Plugin bawaan Melvoc",
  shop: "Plugin tambahan Melvoc",
};

const INTRO = {
  default: "plugin bawaan yang langsung aktif di akun Melvoc kamu.",
  shop: "plugin tambahan. Klik Get plugin dan plugin langsung masuk ke akunmu, lalu bisa dipakai di DAW.",
};

// Tombol di kanan nama plugin, mengikuti status akun:
//   default            -> "Aktif"
//   sudah diambil      -> "Dimiliki"
//   belum masuk        -> "Get plugin" (ke halaman masuk, lalu kembali ke sini)
//   sudah masuk        -> "Get plugin" (aksi server, plugin masuk ke akun)
function PluginAction({ plugin, signedIn, owned, paidOpen }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (plugin.default) {
    return <span className="ml-auto font-body text-xs font-semibold text-ink-muted">Aktif</span>;
  }
  if (owned) {
    return <span className="ml-auto font-body text-xs font-semibold text-ink">Dimiliki</span>;
  }

  // Berbayar tapi pembayaran belum tersambung: jangan tawarkan Get plugin.
  if (plugin.price > 0 && !paidOpen) {
    return <span className="ml-auto font-body text-xs font-semibold text-ink-muted">Segera hadir</span>;
  }

  const btn =
    "rounded-full border border-base-line px-3 py-1 font-body text-xs font-semibold text-ink transition-colors hover:bg-black/[0.05] disabled:opacity-60 dark:hover:bg-white/[0.08]";

  if (!signedIn) {
    return (
      <Link href="/masuk?next=/plugin" className={"ml-auto " + btn}>
        Get plugin
      </Link>
    );
  }

  function onGet() {
    setError("");
    startTransition(async () => {
      const res = await getPlugin(plugin.id);
      if (res?.ok) {
        router.refresh();
        return;
      }
      if (res?.needLogin) {
        router.push("/masuk?next=/plugin");
        return;
      }
      setError(res?.error || "Gagal mengambil plugin. Coba lagi.");
    });
  }

  return (
    <span className="ml-auto flex flex-col items-end gap-1">
      <button type="button" onClick={onGet} disabled={pending} className={btn}>
        {pending ? "Memproses..." : "Get plugin"}
      </button>
      {error && (
        <span role="alert" className="max-w-[16rem] text-right font-body text-xs text-rose-500">
          {error}
        </span>
      )}
    </span>
  );
}

export default function PluginSection({ signedIn = false, owned = [], paidOpen = false }) {
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
                  <span className="font-body text-sm font-semibold text-ink-muted">
                    {formatPrice(p.price)}
                  </span>
                  <PluginAction
                    plugin={p}
                    signedIn={signedIn}
                    owned={owned.includes(p.id)}
                    paidOpen={paidOpen}
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
