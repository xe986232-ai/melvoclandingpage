"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { buyPlugin, installPlugin, redeemPlugin } from "@/app/plugin/actions";
import { formatPrice, isFreeInstall } from "@/lib/plugins";
import { FULL_APP_URL } from "@/lib/melvoc";

const item =
  "flex w-full items-center rounded-xl px-3 py-2 text-left font-body text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] focus-visible:bg-black/[0.05] focus-visible:outline-none dark:hover:bg-white/[0.08] dark:focus-visible:bg-white/[0.08]";
const primary =
  "inline-flex h-11 items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-ink-solid";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-base-line px-6 text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] disabled:opacity-60 dark:hover:bg-white/[0.08]";

// Titik tiga di kanan nama plugin.
//   Bawaan   : Share plugin, Install Plugin (buka DAW)
//   Gratis-install (mis. VocalF): Share plugin, Install Plugin (aktif di akun, tanpa token)
//   Berbayar : Share plugin, Buy plugin -> (setelah pesanan disetujui) Tebus Plugin
export default function PluginMenu({ plugin, signedIn = false, owned = false, pending = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(null); // 'buy' | 'redeem'
  const [copied, setCopied] = useState(false);
  const [busy, startInstall] = useTransition();
  const [err, setErr] = useState("");
  const wrap = useRef(null);
  const free = isFreeInstall(plugin);   // gratis tapi harus di-install dulu (VocalF)
  const paid = !plugin.default && !free;
  const next = encodeURIComponent("/plugin/" + plugin.id);

  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(wrap, close);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function share() {
    const url = location.origin + "/plugin/" + plugin.id;
    if (navigator.share) {
      try {
        await navigator.share({ title: plugin.name + " | Melvoc", text: plugin.desc, url });
        setOpen(false);
        return;
      } catch (e) {
        if (e?.name === "AbortError") return; // pengguna menutup lembar bagikan
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1400);
  }

  function install() {
    setErr("");
    if (!signedIn) { setOpen(false); router.push("/masuk?next=" + next); return; }
    startInstall(async () => {
      const res = await installPlugin(plugin.id);
      if (res?.ok) { setOpen(false); router.refresh(); return; }
      if (res?.needLogin) { setOpen(false); return router.push("/masuk?next=" + next); }
      setErr(res?.error || "Gagal meng-install plugin.");
    });
  }

  function pick(which) {
    setOpen(false);
    if (!signedIn) { router.push("/masuk?next=" + next); return; }
    setDialog(which);
  }

  return (
    <div ref={wrap} className="relative ml-auto shrink-0">
      <button
        type="button"
        aria-label={"Menu " + plugin.name}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-black/[0.06] hover:text-ink dark:hover:bg-white/[0.1]"
      >
        <MoreVertical size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className="absolute right-0 top-full z-30 mt-1.5 w-48 origin-top-right rounded-2xl border border-base-line bg-base p-1.5 shadow-xl shadow-black/15"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.14 }}
          >
            <button type="button" role="menuitem" className={item} onClick={share}>
              {copied ? "Link disalin" : "Share plugin"}
            </button>

            {free && owned && (
              <span role="menuitem" aria-disabled="true" className={item + " cursor-default text-ink-muted hover:bg-transparent dark:hover:bg-transparent"}>
                Sudah ter-install
              </span>
            )}
            {free && !owned && (
              <button type="button" role="menuitem" className={item} onClick={install} disabled={busy}>
                {busy ? "Meng-install..." : "Install Plugin"}
              </button>
            )}
            {free && err && <p role="alert" className="px-3 py-1 font-body text-xs text-rose-500">{err}</p>}
            {!paid && !free && (
              <Link role="menuitem" href={FULL_APP_URL || "/#download"} className={item} onClick={() => setOpen(false)}>
                Install Plugin
              </Link>
            )}
            {paid && owned && (
              <span role="menuitem" aria-disabled="true" className={item + " cursor-default text-ink-muted hover:bg-transparent dark:hover:bg-transparent"}>
                Sudah dimiliki
              </span>
            )}
            {paid && !owned && !pending && (
              <button type="button" role="menuitem" className={item} onClick={() => pick("buy")}>
                Buy plugin
              </button>
            )}
            {paid && !owned && pending && (
              <button type="button" role="menuitem" className={item} onClick={() => pick("redeem")}>
                Tebus Plugin
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {paid && <BuyDialog plugin={plugin} open={dialog === "buy"} onClose={() => setDialog(null)} onDone={() => { setDialog("redeem-hint"); router.refresh(); }} />}
      {paid && <RedeemDialog plugin={plugin} open={dialog === "redeem" || dialog === "redeem-hint"} hint={dialog === "redeem-hint"} onClose={() => setDialog(null)} onDone={() => router.refresh()} />}
    </div>
  );
}

function BuyDialog({ plugin, open, onClose, onDone }) {
  const router = useRouter();
  const [busy, start] = useTransition();
  const [error, setError] = useState("");

  useEffect(() => { if (open) setError(""); }, [open]);

  function agree() {
    setError("");
    start(async () => {
      const res = await buyPlugin(plugin.id);
      if (res?.ok) return onDone();
      if (res?.needLogin) return router.push("/masuk?next=/plugin/" + plugin.id);
      setError(res?.error || "Gagal membuat pesanan. Coba lagi.");
    });
  }

  return (
    <Modal open={open} onClose={onClose} label={"Beli " + plugin.name}>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Buy plugin</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">{plugin.name}</h2>
      <p className="mt-1 font-display text-3xl font-extrabold text-ink">{formatPrice(plugin.price)}</p>
      <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">{plugin.desc}</p>
      <ul className="mt-4 space-y-1.5 border-t border-base-line pt-4 font-body text-sm text-ink-muted">
        <li>Sekali bayar, dipakai selamanya di akun ini.</li>
        <li>Setelah kamu setuju, pesanan dibuat dan admin memberikan token plugin setelah pembayaran beres.</li>
        <li>Masukkan token itu lewat menu <span className="font-semibold text-ink">Tebus Plugin</span> untuk mengaktifkan plugin.</li>
      </ul>
      {error && <p role="alert" className="mt-3 font-body text-sm text-rose-500">{error}</p>}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} disabled={busy} className={ghost}>Batal</button>
        <button type="button" onClick={agree} disabled={busy} data-autofocus className={primary}>
          {busy ? "Memproses..." : "Setuju"}
        </button>
      </div>
    </Modal>
  );
}

function RedeemDialog({ plugin, open, hint, onClose, onDone }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [busy, start] = useTransition();
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => { if (open) { setError(""); setToken(""); setOk(false); } }, [open]);

  function submit(e) {
    e.preventDefault();
    setError("");
    start(async () => {
      const res = await redeemPlugin(token);
      if (res?.ok) { setOk(true); onDone(); return; }
      if (res?.needLogin) return router.push("/masuk?next=/plugin/" + plugin.id);
      setError(res?.error || "Gagal menebus token. Coba lagi.");
    });
  }

  return (
    <Modal open={open} onClose={onClose} label={"Tebus " + plugin.name}>
      {ok ? (
        <>
          <h2 className="font-display text-2xl font-extrabold text-ink">{plugin.name} aktif</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
            Plugin sudah masuk ke akunmu dan langsung bisa dipakai di Melvoc.
          </p>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={onClose} data-autofocus className={primary}>Selesai</button>
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Tebus Plugin</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">{plugin.name}</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
            {hint
              ? "Pesananmu sudah dibuat. Setelah pembayaran beres, admin memberikan token plugin. Masukkan di sini untuk mengaktifkan plugin."
              : "Masukkan token plugin yang diberikan admin. Token ini hanya bisa dipakai di akun yang memesan."}
          </p>
          <label htmlFor={"tok-" + plugin.id} className="mt-5 block font-body text-xs font-semibold text-ink-muted">Token plugin</label>
          <input
            id={"tok-" + plugin.id}
            data-autofocus
            value={token}
            onChange={(e) => setToken(e.target.value.toUpperCase())}
            placeholder="PLG-XXXX-XXXX-XXXX-XXXX"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={64}
            className="mt-1.5 h-12 w-full rounded-xl border border-base-line bg-base-elevated px-4 font-mono text-sm tracking-wider text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-ink-muted"
          />
          {error && <p role="alert" className="mt-3 font-body text-sm text-rose-500">{error}</p>}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={busy} className={ghost}>{hint ? "Nanti" : "Batal"}</button>
            <button type="submit" disabled={busy || token.replace(/[^A-Za-z0-9]/g, "").length < 12} className={primary}>
              {busy ? "Memproses..." : "Tebus"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
