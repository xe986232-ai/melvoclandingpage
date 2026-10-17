import { DEMO_APK_URL, FULL_APK_URL, FULL_PRICE } from "@/lib/melvoc";

export default function Footer() {
  return (
    <footer
      id="download"
      className="relative px-6 sm:px-10 py-20 border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h3 className="font-display font-extrabold text-3xl text-ink">Download Melvoc</h3>
          <p className="font-body font-normal text-ink-muted mt-3 max-w-sm">
            Coba dulu versi Demo, atau langsung ambil Full Version ({FULL_PRICE}).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[["Download Full", FULL_APK_URL, true], ["Download Demo", DEMO_APK_URL, false]].map(([label, url, primary]) =>
              url ? (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className={primary
                    ? "inline-block px-6 py-3 rounded-full bg-ink-solid text-white dark:bg-white dark:text-ink-solid text-sm font-medium hover:opacity-90 transition-opacity"
                    : "inline-block px-6 py-3 rounded-full border border-black/15 dark:border-white/20 text-ink text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"}>
                  {label}
                </a>
              ) : (
                <span key={label} aria-disabled="true" className="inline-block px-6 py-3 rounded-full bg-black/10 dark:bg-white/10 text-ink-muted text-sm font-medium cursor-not-allowed select-none">
                  {label} · Segera hadir
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex gap-12">
          <div>
            <span className="font-body font-semibold text-xs tracking-[0.3em] uppercase text-ink-dim">
              Menu
            </span>
            <ul className="font-body font-normal mt-4 space-y-2 text-ink-muted text-sm">
              <li><a href="/#fitur" className="hover:text-ink transition-colors">Fitur</a></li>
              <li><a href="/plugin" className="hover:text-ink transition-colors">Plugin</a></li>
              <li><a href="/cara-pakai" className="hover:text-ink transition-colors">Cara Pakai</a></li>
              <li><a href="/#faq" className="hover:text-ink transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <span className="font-body font-semibold text-xs tracking-[0.3em] uppercase text-ink-dim">
              Sosial
            </span>
            <ul className="font-body font-normal mt-4 space-y-2 text-ink-muted text-sm">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="font-body font-normal max-w-6xl mx-auto mt-16 text-xs text-ink-dim flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>&copy; {new Date().getFullYear()} Melvoc. Semua hak dilindungi.</span>
      </p>
    </footer>
  );
}
