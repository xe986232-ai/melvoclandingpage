import { SiteNavbar } from "@/components/ui/site-navbar";
import TutorialSection from "@/components/TutorialSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";

export const metadata = {
  title: "Tutorial",
  description:
    "Tutorial pemakaian semua plugin Melvoc: penjelasan bergambar fungsi tiap tombol dan knob, langkah pemakaian, dan video tutorial.",
};

export default function Page() {
  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <TutorialSection />
      <Footer />
    </main>
  );
}
