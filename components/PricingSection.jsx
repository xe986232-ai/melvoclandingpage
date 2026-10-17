"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Phone, ArrowRight } from "lucide-react";
import { APP_NAME, APP_ICON, PRICELIST, CONSULT } from "@/lib/melvoc";
import { HOLO_BG } from "@/lib/holo";
import BuyFullDialog from "@/components/BuyFullDialog";
import AdminChoiceDialog from "@/components/AdminChoiceDialog";

// Section ini sengaja pakai warna tetap (bukan token tema) supaya tampilannya
// selalu sama persis, baik di mode terang maupun gelap.

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

const PILL_CLASS =
  "inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-[13px] font-medium text-white transition active:scale-95 hover:opacity-90";
const PILL_STYLE = {
  boxShadow:
    "inset 0 0 0 1px rgba(125,135,255,0.55), 0 0 14px rgba(110,130,255,0.28), inset 0 -6px 10px rgba(110,120,255,0.18)",
};

// onClick diisi -> tombol (membuka dialog); kalau tidak -> tautan (href kosong = scroll ke #download)
function PillButton({ href, children, arrow, onClick }) {
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
          <ArrowRight className="h-3 w-3" />
        </span>
      )}
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-haspopup="dialog" className={PILL_CLASS} style={PILL_STYLE}>
        {inner}
      </button>
    );
  }
  const external = !!href;
  return (
    <a
      href={external ? href : "#download"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={PILL_CLASS}
      style={PILL_STYLE}
    >
      {inner}
    </a>
  );
}

function PlanCard({ plan, onBuy }) {
  return (
    <div
      className={`relative flex flex-col rounded-[26px] p-5 sm:p-6 ${
        plan.popular ? "bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <h3 className="font-display text-[15px] font-medium text-[#1a1a1a]">{plan.name}</h3>
      <p className="mt-0.5 font-body text-[12px] text-[#8b8b92]">{plan.tagline}</p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-[38px] font-medium leading-none tracking-tight text-[#111]">
          {plan.price}
          {plan.priceSub && <span className="text-[#c4c4c9]">{plan.priceSub}</span>}
        </span>
        <span className="font-body text-[12px] text-[#555]">{plan.suffix}</span>
      </p>

      <hr className="my-5 border-t border-[#e6e6ea]" />

      <p className="font-body text-[11px] font-semibold text-[#1a1a1a]">{plan.includedLabel}</p>
      <ul className="mt-3 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 font-body text-[11.5px] text-[#333]">
            <Check className="h-3 w-3 shrink-0 text-[#333]" strokeWidth={2.5} />
            {f}
          </li>
        ))}
      </ul>

      {plan.missing?.length > 0 && (
        <>
          <p className="mt-5 font-body text-[11px] font-semibold text-[#1a1a1a]">{plan.missingLabel}</p>
          <ul className="mt-3 space-y-2">
            {plan.missing.map((f) => (
              <li key={f} className="flex items-center gap-2 font-body text-[11.5px] text-[#8b8b92]">
                <X className="h-3 w-3 shrink-0 text-[#b4b4ba]" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-auto pt-7">
        <PillButton href={plan.url} onClick={plan.action === "buy" ? onBuy : undefined}>{plan.cta}</PillButton>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [buyOpen, setBuyOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  return (
    <section
      id="pricelist"
      aria-label="Pricelist"
      className="relative overflow-hidden bg-[#121212] px-4 py-10 sm:px-8 sm:py-16"
    >
      {/* tekstur grain + cahaya di pojok kanan atas, seperti referensi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 30% at 100% 0%, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl rounded-[34px] bg-white px-4 py-10 sm:rounded-[40px] sm:px-12 sm:py-14"
      >
        <h2 className="text-center font-display text-[30px] font-medium leading-[1.1] tracking-tight text-[#111] sm:text-[44px]">
          Dibuat untuk Setiap Tahap
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center font-body text-[12px] text-[#6f6f76] sm:text-[13px]">
          Mau coba dulu atau langsung full version, ada paket {APP_NAME} yang pas buat kamu.
        </p>

        {/* wadah abu-abu berisi 2 kartu */}
        <div className="mt-10 rounded-[30px] bg-[#f1f1f1] p-2 sm:mt-12">
          <div className="grid gap-2 sm:grid-cols-2">
            {PRICELIST.map((plan) => (
              <PlanCard key={plan.name} plan={plan} onBuy={() => setBuyOpen(true)} />
            ))}
          </div>
        </div>

        {/* panel gradasi holografik */}
        <div
          className="relative mt-3 overflow-hidden rounded-[30px] px-6 py-7 text-center"
          style={{ ...HOLO_BG, boxShadow: "inset 0 0 40px rgba(255,255,255,0.55)" }}
        >
          <div className="mx-auto flex w-fit items-center">
            <img
              src={APP_ICON}
              alt=""
              width={40}
              height={40}
              className="relative z-10 h-10 w-10 rounded-full bg-white object-cover ring-2 ring-white/70"
            />
            <span className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#222]">
              <Phone className="h-4 w-4" />
            </span>
          </div>
          <h3 className="mt-4 font-display text-[16px] font-medium text-[#1a1a1a]">{CONSULT.title}</h3>
          <p className="mt-1 font-body text-[11px] text-[#6a6a78]">{CONSULT.subtitle}</p>
          <div className="mx-auto mt-4 w-fit">
            <PillButton onClick={() => setAskOpen(true)} arrow>
              {CONSULT.cta}
            </PillButton>
          </div>
        </div>
      </motion.div>

      <BuyFullDialog open={buyOpen} onClose={() => setBuyOpen(false)} />
      <AdminChoiceDialog open={askOpen} onClose={() => setAskOpen(false)} />
    </section>
  );
}
