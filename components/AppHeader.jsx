"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { APP_NAME, APP_ICON } from "@/lib/melvoc";

// Header satu layar penuh: teks di atas, icon + nama di tengah, ajakan
// scroll di bawah. Tinggi = layar dikurangi navbar sticky (~4rem) supaya
// isinya benar-benar di tengah layar yang terlihat.
//
// Latar: 3 scene (Liquid Holo, Oil Slick, Sunset Glow) berganti otomatis dengan
// fade halus. Gaya-gayanya ada di app/globals.css (kelas .mh-*).
const SCENES = ["Liquid Holo", "Oil Slick", "Sunset Glow"];
const INTERVAL = 7000; // ms antar pergantian
const FADE_MS = 2600;  // sedikit > durasi fade (--mh-dur 2.4s)

export default function AppHeader() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const curRef = useRef(0);
  const timer = useRef(null);
  const clearPrev = useRef(null);
  const still = useRef(false);

  const go = useCallback((n) => {
    if (n === curRef.current) return;
    setPrev(curRef.current);
    curRef.current = n;
    setCur(n);
    clearTimeout(clearPrev.current);
    clearPrev.current = setTimeout(() => setPrev(null), FADE_MS);
  }, []);

  const loop = useCallback(() => {
    clearInterval(timer.current);
    if (still.current) return;
    timer.current = setInterval(() => go((curRef.current + 1) % SCENES.length), INTERVAL);
  }, [go]);

  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // gerak dikurangi: tidak berganti otomatis
    loop();
    return () => { clearInterval(timer.current); clearTimeout(clearPrev.current); };
  }, [loop]);

  const sceneClass = (i) => "mh-scene" + (i === cur ? " is-on" : i === prev ? " is-prev" : "");

  return (
    <header className="mh-hero relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-between overflow-hidden px-5 pb-6 pt-8 text-white sm:px-10 sm:pb-8 sm:pt-12">
      {/* latar: 3 scene saling fade, noise statis di atasnya */}
      <div aria-hidden className={sceneClass(0)}><div className="mh-layers mh-liquid" /></div>
      <div aria-hidden className={sceneClass(1)}>
        <i className="mh-blob mh-b1" /><i className="mh-blob mh-b2" /><i className="mh-blob mh-b3" />
      </div>
      <div aria-hidden className={sceneClass(2)}><div className="mh-layers mh-sunset" /></div>
      <div aria-hidden className="mh-noise" />

      {/* atas */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-[4] font-body text-sm font-medium sm:text-[1rem]"
      >
        DAW Vocal Berbasis Website
      </motion.p>

      {/* tengah */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-[4] flex max-w-md flex-col items-center text-center"
      >
        <img
          src={APP_ICON}
          alt={`Icon aplikasi ${APP_NAME}`}
          width={176}
          height={176}
          className="h-32 w-32 shrink-0 sm:h-44 sm:w-44"
        />
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="mt-3 max-w-xs font-body text-sm text-white/90 sm:max-w-sm sm:text-[1rem]">
          Susun track, edit nada, dan mixing vokalmu langsung dari browser. Install ke layar utama kapan saja.
        </p>
      </motion.div>

      {/* bawah: titik pilih latar + ajakan scroll */}
      <div className="relative z-[4] flex flex-col items-center gap-3">
        <div role="group" aria-label="Pilih tampilan latar" className="flex gap-2">
          {SCENES.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-label={name}
              aria-current={i === cur}
              onClick={() => { go(i); loop(); }}
              className="mh-dot"
            />
          ))}
        </div>
        <motion.a
          href="#pricelist"
          aria-label="Scroll ke bawah"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-1 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/80 hover:text-white"
        >
          Scroll ke bawah
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </div>
    </header>
  );
}
