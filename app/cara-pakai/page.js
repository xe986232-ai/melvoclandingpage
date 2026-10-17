import { SiteNavbar } from "@/components/ui/site-navbar";
import CaraPakaiSection from "@/components/CaraPakaiSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";

export const metadata = { title: "Cara Pakai" };

export default function Page() {
  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="pt-8 sm:pt-12 min-h-[70vh]">
        <CaraPakaiSection />
      </div>
      <Footer />
    </main>
  );
}
