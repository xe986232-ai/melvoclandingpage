import { SiteNavbar } from "@/components/ui/site-navbar";
import PluginSection from "@/components/PluginSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";

export const metadata = { title: "Plugin" };

export default function Page() {
  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="pt-8 sm:pt-12 min-h-[70vh]">
        <PluginSection />
      </div>
      <Footer />
    </main>
  );
}
