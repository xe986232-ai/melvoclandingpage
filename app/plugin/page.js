import { SiteNavbar } from "@/components/ui/site-navbar";
import PluginSection from "@/components/PluginSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ownedPluginIds, pendingPluginIds } from "@/lib/plugin-access";

export const metadata = { title: "Plugin" };
// Status tiap plugin (Dimiliki / Menunggu token / menu) bergantung pada akun yang masuk.
export const dynamic = "force-dynamic";

export default async function Page() {
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

  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="pt-8 sm:pt-12 min-h-[70vh]">
        <PluginSection signedIn={signedIn} owned={owned} pending={pending} />
      </div>
      <Footer />
    </main>
  );
}
