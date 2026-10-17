"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// Dialog kustom: latar gelap, kartu di tengah, Esc / klik latar menutup, fokus dikembalikan ke pemicu.
export function Modal({ open, onClose, label, children }) {
  const card = useRef(null);
  const last = useRef(null);

  useEffect(() => {
    if (!open) return;
    last.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => card.current?.querySelector("[data-autofocus]")?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && card.current) {
        const f = [...card.current.querySelectorAll("button:not([disabled]), input, a[href]")];
        if (!f.length) return;
        const first = f[0], end = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); end.focus(); }
        else if (!e.shiftKey && document.activeElement === end) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      last.current?.focus?.();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            ref={card}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="relative w-full max-w-md rounded-3xl border border-base-line bg-base p-6 shadow-2xl shadow-black/30 sm:p-7"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
