"use client";

import { motion } from "framer-motion";
import { APP_NAME, APP_ICON, FULL_PRICE, BUY_URL, DEMO_APK_URL, PRICELIST } from "@/lib/melvoc";

// Tombol selalu tampil aktif. Kalau link belum diisi di lib/melvoc.js,
// tombol scroll ke bagian Download di bawah.
function ActionButton({ label, url, primary }) {
  const external = !!url;
  const base =
    "flex h-12 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition active:scale-95";
  const style = primary
    ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md hover:opacity-90"
    : "border-2 border-violet-500/40 text-ink hover:bg-violet-500/10";
  return (
    <a
      href={external ? url : "#download"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${style}`}
    >
      {label}
    </a>
  );
}

function PriceCard({ item }) {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 text-left ${
        item.highlight
          ? "border-2 border-fuchsia-500/60 bg-fuchsia-500/10 shadow-md"
          : "border border-base-line bg-base-elevated"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display font-bold text-base sm:text-lg text-ink">{item.name}</h3>
        <span
          className={`font-display font-bold text-lg sm:text-2xl ${
            item.highlight ? "text-fuchsia-600 dark:text-fuchsia-400" : "text-ink"
          }`}
        >
          {item.price}
        </span>
      </div>
      {item.note && <p className="mt-0.5 font-body text-xs text-ink-muted">{item.note}</p>}
      {item.features?.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {item.features.map((f) => (
            <li key={f} className="flex items-start gap-2 font-body text-xs sm:text-sm text-ink">
              <span aria-hidden className="mt-0.5 text-fuchsia-500">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AppHeader() {
  return (
    <header className="relative px-5 sm:px-10 pt-14 pb-20 sm:pt-20 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md sm:max-w-2xl mx-auto flex items-center gap-4 sm:gap-8"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={160}
          height={160}
          className="h-24 w-24 sm:h-40 sm:w-40 shrink-0 drop-shadow-lg"
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight text-ink">
            {APP_NAME}
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted">DAW Vocal untuk Android</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl sm:text-3xl text-fuchsia-600 dark:text-fuchsia-400">
              {FULL_PRICE}
            </span>
            <span className="font-body text-xs text-ink-muted">Full Version</span>
          </p>
          <div className="mt-4 flex gap-2.5">
            <ActionButton primary label="Buy" url={BUY_URL} />
            <ActionButton label="Demo" url={DEMO_APK_URL} />
          </div>
        </div>
      </motion.div>

      <motion.section
        id="pricelist"
        aria-label="Pricelist"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-md sm:max-w-2xl mx-auto mt-8 sm:mt-12"
      >
        <h2 className="mb-3 font-display font-bold text-sm uppercase tracking-wider text-ink-muted">
          Pricelist
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRICELIST.map((item) => (
            <PriceCard key={item.name} item={item} />
          ))}
        </div>
      </motion.section>
    </header>
  );
}
