import { SiteNavbar } from "@/components/ui/site-navbar";
import Footer from "@/components/Footer";
import SopanProfileReveal from "@/components/SopanProfileReveal";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { divisionLabel } from "@/lib/division";

const navItems = [
  { name: "Tentang", link: "/#tentang" },
  { name: "Divisi", link: "/#divisi" },
  { name: "Anggota", link: "/anggota" },
];

const mobileGroups = [
  {
    label: "Menu",
    items: [
      { name: "Beranda", link: "/#top" },
      { name: "Tentang", link: "/#tentang" },
      { name: "Divisi", link: "/#divisi" },
      { name: "Anggota", link: "/anggota" },
    ],
  },
];

export const metadata = {
  title: "Sopan Profile | SOPAN TEAM",
  description: "Kenalan sama squad SOPAN TEAM dari divisi Remix, Creator, dan Leadis.",
};

// Sama seperti /anggota: revalidate berkala biar member baru otomatis
// kepakai tanpa perlu deploy ulang.
export const revalidate = 60;

// Warna per-divisi, sama persis dengan token di tailwind.config.js
// (colors.remix / creator / leadis) supaya identitas visual konsisten
// di seluruh situs.
const DIVISION_COLORS = {
  remix: { from: "#B026FF", to: "#FF2E92" },
  creator: { from: "#00E5FF", to: "#3D5AFE" },
  leadis: { from: "#FFD166", to: "#FF6FB5" },
};
const DIVISION_ORDER = ["remix", "creator", "leadis"];

export default async function SopanProfilePage() {
  const supabase = createAdminSupabaseClient();
  const { data } = await supabase
    .from("members")
    .select("id, full_name, division, role, avatar_url")
    .eq("status", "aktif")
    .order("joined_at", { ascending: true });

  const members = data || [];

  const groups = DIVISION_ORDER.map((slug) => ({
    slug,
    label: divisionLabel(slug),
    colors: DIVISION_COLORS[slug],
    members: members
      .filter((m) => m.division === slug)
      .map((m) => ({
        id: m.id,
        name: m.full_name,
        role: m.role || null,
        avatarUrl: m.avatar_url || null,
      })),
  }));

  return (
    <main className="relative bg-[#05040A]">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <SopanProfileReveal groups={groups} totalCount={members.length} />
      <Footer />
    </main>
  );
}
