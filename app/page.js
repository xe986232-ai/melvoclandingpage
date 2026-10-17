import { SiteNavbar } from "@/components/ui/site-navbar";
import AboutSection from "@/components/AboutSection";
import FiturSection from "@/components/FiturSection";
import PluginSection from "@/components/PluginSection";
import CaraPakaiSection from "@/components/CaraPakaiSection";
import AdminSection from "@/components/AdminSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const navItems = [
  { name: "Tentang", link: "#tentang" },
  { name: "Fitur", link: "#fitur" },
  { name: "Plugin", link: "#plugin" },
  { name: "Cara Pakai", link: "#cara-pakai" },
  { name: "Support", link: "#developer" },
  { name: "Download", link: "#download" },
];

const mobileGroups = [
  {
    label: "Menu",
    items: [
      { name: "Beranda", link: "#top" },
      { name: "Tentang", link: "#tentang" },
      { name: "Fitur", link: "#fitur" },
      { name: "Plugin", link: "#plugin" },
      { name: "Cara Pakai", link: "#cara-pakai" },
    ],
  },
  {
    label: "Info",
    items: [
      { name: "Developer & Support", link: "#developer" },
      { name: "FAQ", link: "#faq" },
      { name: "Download", link: "#download" },
    ],
  },
];

export default function Home() {
  return (
    <main id="top" className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <AboutSection />
      <FiturSection />
      <PluginSection />
      <CaraPakaiSection />
      <AdminSection />
      <TestimonialSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
