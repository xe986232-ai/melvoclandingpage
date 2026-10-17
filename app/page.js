import { SiteNavbar } from "@/components/ui/site-navbar";
import AppHeader from "@/components/AppHeader";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";

export default function Home() {
  return (
    <main id="top" className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <AppHeader />
      <PricingSection />
      <AboutSection />
      <TestimonialSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
