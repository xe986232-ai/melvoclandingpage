"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { PRICELIST, FULL_PRICE, BUY_TERMS, BUY_TERMS_TITLE, BUY_AGREE_LABEL, buildBuyUrl } from "@/lib/melvoc";

const primary =
  "inline-flex h-11 items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-ink-solid";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-base-line px-6 text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]";
const eyebrow = "font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted";

// Alur "Beli Full Version" (3 langkah di satu dialog):
// 1) ringkasan paket + harga -> 2) isi nama -> 3) perjanjian + centang setuju -> WhatsApp dengan pesan berisi nama & persetujuan.
export default function BuyFullDialog({ open, onClose }) {
  const plan = PRICELIST.find((p) => p.action === "buy");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);

  // Mulai dari awal setiap kali dialog dibuka.
  useEffect(() => {
    if (open) { setStep(1); setName(""); setAgree(false); }
  }, [open]);

  if (!plan) return null;
  const nameOk = name.trim().length >= 2;

  return (
    <Modal open={open} onClose={onClose} label="Beli Full Version">
      <p className={eyebrow}>Beli Full Version &middot; Langkah {step}/3</p>

      {step === 1 && (
        <>
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
            <li>Berikutnya kamu isi nama dan menyetujui perjanjian, lalu diarahkan ke WhatsApp admin dengan pesan pesanan yang sudah terisi.</li>
            <li>Admin memberikan token lisensi setelah pembayaran beres. Pakai token itu untuk masuk di halaman Masuk.</li>
          </ul>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className={ghost}>Batal</button>
            <button type="button" data-autofocus onClick={() => setStep(2)} className={primary}>Lanjut</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">Isi data kamu</h2>
          <p className="mt-1 font-body text-sm text-ink-muted">Nama ini dikirim ke admin supaya pesananmu mudah dicatat.</p>

          <label htmlFor="buy-name" className="mt-5 block font-body text-sm font-semibold text-ink">Nama</label>
          <input
            id="buy-name"
            data-autofocus
            type="text"
            value={name}
            maxLength={60}
            autoComplete="name"
            placeholder="Nama lengkap atau panggilan"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && nameOk) setStep(3); }}
            className="mt-2 h-11 w-full rounded-xl border border-base-line bg-transparent px-4 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink"
          />

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setStep(1)} className={ghost}>Kembali</button>
            <button type="button" disabled={!nameOk} onClick={() => setStep(3)} className={primary}>Lanjut</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">{BUY_TERMS_TITLE}</h2>
          <p className="mt-1 font-body text-sm text-ink-muted">Baca dulu sebelum lanjut, {name.trim()}.</p>

          <ul className="mt-4 space-y-3 rounded-2xl border border-base-line p-4">
            {BUY_TERMS.map((t) => (
              <li key={t} className="flex items-start gap-2 font-body text-sm leading-relaxed text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>

          <label className="mt-4 flex cursor-pointer items-start gap-3 font-body text-sm text-ink">
            <input
              type="checkbox"
              data-autofocus
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-current"
            />
            {BUY_AGREE_LABEL}
          </label>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setStep(2)} className={ghost}>Kembali</button>
            {agree ? (
              <a href={buildBuyUrl(name)} target="_blank" rel="noopener noreferrer" onClick={onClose} className={primary}>
                Lanjut ke WhatsApp
              </a>
            ) : (
              <button type="button" disabled className={primary}>Lanjut ke WhatsApp</button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
