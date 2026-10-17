import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/ui/site-navbar";
import Footer from "@/components/Footer";
import PluginMenu from "@/components/PluginMenu";
import { Preview, PriceLabel, StatusChip } from "@/components/PluginSection";
import { navItems, mobileGroups } from "@/lib/nav";
import { PLUGIN_BY_ID, isFreeInstall } from "@/lib/plugins";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ownedPluginIds, pendingPluginIds } from "@/lib/plugin-access";

// Status (Dimiliki / Menunggu token) bergantung pada akun yang masuk.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }) {
  const p = PLUGIN_BY_ID[params.id];
  if (!p) return { title: "Plugin tidak ditemukan" };
  const title = `${p.name} · Plugin Melvoc`;
  return {
    title: p.name,
    description: p.desc,
    alternates: { canonical: "/plugin/" + p.id },
    openGraph: { title, description: p.desc, type: "website", url: "/plugin/" + p.id, images: p.image ? [p.image] : undefined },
    twitter: { card: p.image ? "summary_large_image" : "summary", title, description: p.desc, images: p.image ? [p.image] : undefined },
  };
}

export default async function Page({ params }) {
  const plugin = PLUGIN_BY_ID[params.id];
  if (!plugin) notFound();

  let signedIn = false;
  let owned = [];
  let pending = [];
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      signedIn = true;
      [owned, pending] = await Promise.all([ownedPluginIds(user.id), pendingPluginIds(user.id)]);
    }
  }
  const isOwned = owned.includes(plugin.id);
  const isPending = pending.includes(plugin.id);

  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="mx-auto min-h-[70vh] max-w-3xl px-5 pb-16 pt-10 sm:px-10 sm:pt-16">
        <Link href="/plugin" className="font-body text-sm font-semibold text-ink-muted transition-colors hover:text-ink">
          &larr; Semua plugin
        </Link>

        <div className="mt-6">
          <Preview plugin={plugin} />
        </div>

        <div className="mt-6 flex items-center gap-2.5">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{plugin.name}</h1>
          <PriceLabel plugin={plugin} className="!text-base" />
          <StatusChip owned={isOwned} pending={isPending} free={isFreeInstall(plugin)} />
          <PluginMenu plugin={plugin} signedIn={signedIn} owned={isOwned} pending={isPending} />
        </div>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">{plugin.desc}</p>
      </div>
      <Footer />
    </main>
  );
}
