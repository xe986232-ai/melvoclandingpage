"use client";

import { Check } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { PRICELIST, BUY_URL, FULL_PRICE } from "@/lib/melvoc";

const primary =
  "inline-flex h-11 items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-ink-solid";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-base-line px-6 text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]";

// Dialog "Beli Full Version": ringkasan paket + harga. Setuju -> WhatsApp admin dengan pesan yang sudah terisi (BUY_MESSAGE di lib/melvoc.js).
export default function BuyFullDialog({ open, onClose }) {
  const plan = PRICELIST.find((p) => p.action === "buy");
  if (!plan) return null;

  return (
    <Modal open={open} onClose={onClose} label="Beli Full Version">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Beli Full Version</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">{plan.name}</h2>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-extrabold text-ink">{FULL_PRICE.replace(/\s/g, "")}</span>
        <span className="font-body text-sm font-semibold text-ink-muted">{plan.suffix}</span>
      </p>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{plan.tagline}. {plan.includedLabel}</p>

      <ul className="mt-3 max-h-48 space-y-1.5 overflow-y-auto pr-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 font-body text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" strokeWidth={2.5} />
            {f}
          </li>
        ))}
      </ul>

      <ul className="mt-4 space-y-1.5 border-t border-base-line pt-4 font-body text-sm text-ink-muted">
        <li>Sekali bayar, tanpa langganan.</li>
        <li>Setelah kamu setuju, kamu diarahkan ke WhatsApp admin dengan pesan pesanan yang sudah terisi otomatis.</li>
        <li>Admin memberikan token lisensi setelah pembayaran beres. Pakai token itu untuk masuk di halaman Masuk.</li>
      </ul>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className={ghost}>Batal</button>
        <a
          href={BUY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-autofocus
          onClick={onClose}
          className={primary}
        >
          Setuju, lanjut ke WhatsApp
        </a>
      </div>
    </Modal>
  );
}
