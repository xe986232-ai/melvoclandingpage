import { TIKTOK_URL } from "@/lib/melvoc";

export default function Footer() {
  return (
    <footer
      id="download"
      className="relative px-6 sm:px-10 py-20 border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto flex">
        <div className="flex gap-12">
          <div>
            <span className="font-body font-semibold text-xs tracking-[0.3em] uppercase text-ink-dim">
              Menu
            </span>
            <ul className="font-body font-normal mt-4 space-y-2 text-ink-muted text-sm">
              <li><a href="/#fitur" className="hover:text-ink transition-colors">Fitur</a></li>
              <li><a href="/plugin" className="hover:text-ink transition-colors">Plugin</a></li>
              <li><a href="/cara-pakai" className="hover:text-ink transition-colors">Cara Pakai</a></li>
              <li><a href="/tutorial" className="hover:text-ink transition-colors">Tutorial</a></li>
              <li><a href="/#faq" className="hover:text-ink transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <span className="font-body font-semibold text-xs tracking-[0.3em] uppercase text-ink-dim">
              Sosial
            </span>
            <ul className="font-body font-normal mt-4 space-y-2 text-ink-muted text-sm">
              <li>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  TikTok
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
