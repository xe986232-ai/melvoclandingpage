"use client";

import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

// Gambar tutorial beranotasi. Di layar kecil teks di dalam gambar ikut mengecil,
// jadi gambar bisa diketuk untuk dibuka ukuran penuh (bisa di-scroll / digeser).
export default function AnnotatedImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Perbesar gambar"
        className="group relative block w-full overflow-hidden rounded-2xl border border-black/10 bg-[#0e0d14] dark:border-white/10"
      >
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 font-body text-xs font-medium text-white opacity-90 backdrop-blur transition-opacity group-hover:opacity-100">
          <Maximize2 size={13} />
          Ketuk untuk perbesar
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          data-lenis-prevent
          className="fixed inset-0 z-[6000] overflow-auto bg-black/95"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup"
            className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
          >
            <X size={20} />
          </button>
          <div className="flex min-h-full items-center justify-center p-4">
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="h-auto w-[1500px] max-w-none sm:w-[min(1500px,100%)]"
            />
          </div>
        </div>
      )}
    </>
  );
}
