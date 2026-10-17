import { SiteNavbar } from "@/components/ui/site-navbar";
import AppHeader from "@/components/AppHeader";
import AboutSection from "@/components/AboutSection";
import FiturSection from "@/components/FiturSection";
import AdminSection from "@/components/AdminSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { navItems, mobileGroups } from "@/lib/nav";

export default function Home() {
  return (
    <main id="top" className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <AppHeader />
      <AboutSection />
      <FiturSection />
      <AdminSection />
      <TestimonialSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
