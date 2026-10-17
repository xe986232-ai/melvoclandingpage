"use client";

import { UserRound } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { CONSULT, CONSULT_CONTACTS, CONSULT_MESSAGE } from "@/lib/melvoc";

// Pop up "Tanya Sekarang": pilih Admin 1 atau Developer -> langsung ke WhatsApp masing-masing.
export default function AdminChoiceDialog({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} label="Pilih admin">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Tanya Sekarang</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">Pilih admin</h2>
      <p className="mt-1 font-body text-sm text-ink-muted">{CONSULT.subtitle}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {CONSULT_CONTACTS.map((c, i) => (
          <a
            key={c.name}
            href={`https://wa.me/${c.number}?text=${encodeURIComponent(CONSULT_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            {...(i === 0 ? { "data-autofocus": true } : {})}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-base-line px-3 py-5 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
          >
            <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-base-line bg-black/[0.04] text-ink-muted transition-transform group-hover:scale-105 dark:bg-white/[0.06]">
              {c.image ? (
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <UserRound className="h-10 w-10" strokeWidth={1.4} />
              )}
            </span>
            <span className="font-display text-sm font-semibold text-ink">{c.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center justify-center rounded-full border border-base-line px-5 text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
        >
          Batal
        </button>
      </div>
    </Modal>
  );
}
