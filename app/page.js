import { MELVOC as M } from "@/lib/melvoc-config";

function DownloadButton({ label, info, primary }) {
  const base =
    "flex flex-col items-center justify-center rounded-2xl px-6 py-4 text-center transition";
  const style = primary
    ? "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white hover:opacity-90"
    : "border border-white/20 text-white hover:bg-white/10";
  const inner = (
    <>
      <span className="text-base font-semibold">{label}</span>
      <span className="text-xs opacity-80">
        {info.url ? `${info.version} · ${info.size}` : "Segera hadir"}
      </span>
    </>
  );
  return info.url ? (
    <a href={info.url} target="_blank" rel="noopener noreferrer" className={`${base} ${style}`}>
      {inner}
    </a>
  ) : (
    <span aria-disabled="true" className={`${base} border border-white/10 text-white/40 cursor-not-allowed`}>
      {inner}
    </span>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-body">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <a href="#top" className="text-lg font-bold">{M.name}</a>
          <div className="hidden gap-6 text-sm text-white/70 sm:flex">
            <a href="#fitur" className="hover:text-white">Fitur</a>
            <a href="#plugin" className="hover:text-white">Plugin</a>
            <a href="#cara-pakai" className="hover:text-white">Cara Pakai</a>
            <a href="#harga" className="hover:text-white">Harga</a>
            <a href="#kontak" className="hover:text-white">Kontak</a>
          </div>
        </div>
      </nav>

      <header id="top" className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(168,85,247,0.35),transparent)]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-fuchsia-400">DAW Vocal untuk Android</p>
          <h1 className="mt-3 text-5xl font-extrabold sm:text-7xl">{M.name}</h1>
          <p className="mt-4 text-xl text-white/80">{M.tagline}</p>
          <p className="mt-3 text-white/60">{M.description}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <DownloadButton primary label="Download Full Version" info={M.full} />
            <DownloadButton label="Download Demo" info={M.demo} />
          </div>
        </div>
      </header>

      <Section id="fitur" title="Fitur">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {M.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="plugin" title="Plugin Vocal">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {M.plugins.map((p) => (
            <div key={p.name} className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
              <h3 className="font-semibold text-violet-200">{p.name}</h3>
              <p className="mt-1 text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="cara-pakai" title="Cara Pemakaian">
        <ol className="space-y-4">
          {M.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-500 font-bold">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="harga" title="Demo vs Full Version">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr><th className="p-4">Fitur</th><th className="p-4">Demo</th><th className="p-4">Full</th></tr>
            </thead>
            <tbody>
              {M.compare.map((r) => (
                <tr key={r.label} className="border-t border-white/10">
                  <td className="p-4">{r.label}</td>
                  <td className="p-4">{r.demo ? "✓" : "—"}</td>
                  <td className="p-4 text-fuchsia-300">{r.full ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-6 text-center">
          <p className="text-sm text-white/70">Harga Full Version</p>
          <p className="mt-1 text-4xl font-extrabold">{M.price}</p>
          <p className="mt-1 text-sm text-white/60">{M.priceNote}</p>
        </div>
      </Section>

      <Section id="kontak" title="Developer & Support">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-white/50">Developer</p>
            <p className="mt-1 text-lg font-semibold">{M.developer.name}</p>
            <p className="text-sm text-white/60">{M.developer.role}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-white/50">Support</p>
            <p className="mt-1 text-lg font-semibold">{M.support.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {M.support.contacts.filter((c) => c.href).map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-3 py-1 text-sm hover:bg-white/10">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} {M.name}. Semua hak dilindungi.
      </footer>
    </main>
  );
}
