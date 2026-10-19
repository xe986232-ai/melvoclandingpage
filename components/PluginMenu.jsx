"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { buyPlugin, installPlugin, redeemPlugin } from "@/app/plugin/actions";
import { buildPluginOrderUrl, formatPrice, isFreeInstall } from "@/lib/plugins";
import { FULL_APP_URL } from "@/lib/melvoc";

const primary =
  "inline-flex h-11 items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-ink-solid";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-base-line px-6 text-sm font-semibold text-ink transition-colors hover:bg-black/[0.05] disabled:opacity-60 dark:hover:bg-white/[0.08]";

// Ikon Share premium (SVG): tiga node terhubung dengan gradient stroke + kilau halus.
function ShareIcon({ size = 18, gid }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="0.55" stopColor="#F472B6" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <path d="M8.6 10.9l6.8-3.8M8.6 13.1l6.8 3.8" stroke={"url(#" + gid + ")"} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6.5" cy="12" r="3" fill={"url(#" + gid + ")"} />
      <circle cx="17.5" cy="6" r="3" fill={"url(#" + gid + ")"} />
      <circle cx="17.5" cy="18" r="3" fill={"url(#" + gid + ")"} />
      <circle cx="5.7" cy="11.1" r="0.9" fill="#fff" fillOpacity="0.55" />
      <circle cx="16.7" cy="5.1" r="0.9" fill="#fff" fillOpacity="0.55" />
      <circle cx="16.7" cy="17.1" r="0.9" fill="#fff" fillOpacity="0.55" />
    </svg>
  );
}

function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cta =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-ink-solid px-5 font-body text-sm font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.97] disabled:opacity-60 dark:bg-white dark:text-ink-solid";
const ctaSoft =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-base-line px-4 font-body text-sm font-bold text-ink transition-colors hover:bg-black/[0.05] active:scale-[0.97] dark:hover:bg-white/[0.08]";

// Di kanan nama plugin: tombol Share (ikon SVG) + tombol aksi langsung (tanpa titik tiga).
//   Bawaan   : Share, Get (buka DAW)
//   Gratis-install (mis. VocalF): Share, Get (aktif di akun, tanpa token)
//   Berbayar : Share, Buy -> (setelah pesanan disetujui) Tebus + Chat admin
export default function PluginMenu({ plugin, signedIn = false, owned = false, pending = false }) {
  const router = useRouter();
  const gid = "share-grad-" + useId().replace(/:/g, "");
  const [dialog, setDialog] = useState(null); // 'buy' | 'ordered' | 'redeem'
  const [copied, setCopied] = useState(false);
  const [busy, startInstall] = useTransition();
  const [err, setErr] = useState("");
  const free = isFreeInstall(plugin);   // gratis tapi harus di-install dulu (VocalF)
  const paid = !plugin.default && !free;
  const next = encodeURIComponent("/plugin/" + plugin.id);
  const loginHref = "/masuk?next=" + next;   // semua aksi plugin (Get / Buy / Tebus) wajib masuk dulu: belum masuk -> langsung ke halaman masuk
  const appHref = FULL_APP_URL || "/#download";

  async function share() {
    const url = location.origin + "/plugin/" + plugin.id;
    if (navigator.share) {
      try {
        await navigator.share({ title: plugin.name + " | Melvoc", text: plugin.desc, url });
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
    setTimeout(() => setCopied(false), 1400);
  }

  function install() {
    setErr("");
    if (!signedIn) { router.push(loginHref); return; }
    startInstall(async () => {
      const res = await installPlugin(plugin.id);
      if (res?.ok) { router.refresh(); return; }
      if (res?.needLogin) return router.push(loginHref);
      setErr(res?.error || "Gagal meng-install plugin.");
    });
  }

  function pick(which) {
    if (!signedIn) { router.push(loginHref); return; }
    setDialog(which);
  }

  // Get untuk plugin bawaan: belum masuk -> halaman masuk; sudah masuk -> buka aplikasi
  function installDefault() {
    if (!signedIn) { router.push(loginHref); return; }
    if (/^https?:\/\//.test(appHref)) window.location.assign(appHref); else router.push(appHref);
  }

  return (
    <div className="relative ml-auto flex shrink-0 items-center gap-2">
      <div className="relative">
        <button
          type="button"
          aria-label={"Share " + plugin.name}
          title="Share plugin"
          onClick={share}
          className="group relative grid h-9 w-9 place-items-center rounded-full border border-base-line bg-base-elevated shadow-sm transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-fuchsia-500/25 active:scale-95 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-br before:from-violet-400/0 before:via-pink-400/0 before:to-amber-300/0 before:blur-md before:transition-all hover:before:from-violet-400/40 hover:before:via-pink-400/40 hover:before:to-amber-300/40"
        >
          <span className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
            {copied ? <CheckIcon /> : <ShareIcon gid={gid} />}
          </span>
        </button>
        <span
          role="status"
          aria-live="polite"
          className={"pointer-events-none absolute right-0 top-full z-30 mt-1.5 whitespace-nowrap rounded-lg bg-ink-solid px-2.5 py-1 font-body text-xs font-semibold text-white shadow-lg transition-all dark:bg-white dark:text-ink-solid " + (copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0")}
        >
          Link disalin
        </span>
      </div>

      {!paid && !free && (
        <button type="button" className={cta} onClick={installDefault}>Get</button>
      )}
      {free && !owned && (
        <button type="button" className={cta} onClick={install} disabled={busy}>
          {busy ? "..." : "Get"}
        </button>
      )}
      {paid && !owned && !pending && (
        <button type="button" className={cta} onClick={() => pick("buy")}>Buy</button>
      )}
      {paid && !owned && pending && (
        <>
          <button type="button" className={cta} onClick={() => pick("redeem")}>Tebus</button>
          <a
            className={ctaSoft}
            href={buildPluginOrderUrl(plugin)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat admin
          </a>
        </>
      )}
      {free && err && (
        <p role="alert" className="absolute right-0 top-full z-30 mt-1.5 w-56 rounded-lg border border-base-line bg-base p-2 text-right font-body text-xs text-rose-500 shadow-lg">{err}</p>
      )}

      {paid && <BuyDialog plugin={plugin} open={dialog === "buy"} onClose={() => setDialog(null)} onDone={() => { setDialog("ordered"); router.refresh(); }} />}
      {paid && <OrderedDialog plugin={plugin} open={dialog === "ordered"} onClose={() => setDialog(null)} onRedeem={() => setDialog("redeem")} />}
      {paid && <RedeemDialog plugin={plugin} open={dialog === "redeem"} hint={false} onClose={() => setDialog(null)} onDone={() => router.refresh()} />}
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
      <div className="mt-1 flex flex-col items-start leading-tight">
        {plugin.listPrice > 0 && (
          <s className="font-display text-base font-semibold text-ink-muted opacity-60" aria-label={"Harga normal " + formatPrice(plugin.listPrice)}>
            {formatPrice(plugin.listPrice)}
          </s>
        )}
        <p className="font-display text-3xl font-extrabold text-ink">{formatPrice(plugin.price)}</p>
      </div>
      <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">{plugin.desc}</p>
      <ul className="mt-4 space-y-1.5 border-t border-base-line pt-4 font-body text-sm text-ink-muted">
        <li>Sekali bayar, dipakai selamanya di akun ini.</li>
        <li>Setelah kamu setuju, pesanan dibuat dan kamu diarahkan ke WhatsApp admin untuk dibantu cara pembeliannya.</li>
        <li>Admin memberikan token plugin setelah pembayaran beres.</li>
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

// Setelah pesanan dibuat: ajak pembeli mengirim pesan ke admin (tombol = klik pengguna, jadi tidak diblokir popup blocker).
function OrderedDialog({ plugin, open, onClose, onRedeem }) {
  return (
    <Modal open={open} onClose={onClose} label={"Pesanan " + plugin.name}>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Pesanan dibuat</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">{plugin.name}</h2>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
        Pesananmu sudah tercatat. Kirim pesan ke admin lewat WhatsApp supaya kamu dibantu cara pembeliannya. Pesannya sudah terisi otomatis, tinggal kirim.
      </p>
      <ul className="mt-4 space-y-1.5 border-t border-base-line pt-4 font-body text-sm text-ink-muted">
        <li>Admin memberikan token plugin setelah pembayaran beres.</li>
        <li>Masukkan token itu lewat menu <span className="font-semibold text-ink">Tebus Plugin</span>.</li>
      </ul>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className={ghost}>Nanti</button>
        <button type="button" onClick={onRedeem} className={ghost}>Sudah punya token</button>
        <a href={buildPluginOrderUrl(plugin)} target="_blank" rel="noopener noreferrer" data-autofocus onClick={onClose} className={primary}>
          Kirim pesan ke WhatsApp
        </a>
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
