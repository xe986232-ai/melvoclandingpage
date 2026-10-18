import { TUTORIALS } from "@/lib/tutorials";

// Menu bertingkat: item yang punya `children` jadi dropdown (desktop) / accordion (mobile).
// Tutorial -> Plugin -> daftar plugin (otomatis dari lib/tutorials.js, jadi plugin baru
// yang ditambah di sana langsung muncul di menu).
const tutorialMenu = {
  name: "Tutorial",
  link: "/tutorial",
  children: [
    {
      name: "Plugin",
      children: TUTORIALS.map((t) => ({ name: t.name, link: `/tutorial#${t.id}` })),
    },
  ],
};

// Menu navbar dipakai di semua halaman. Link "/#..." = bagian di halaman
// utama (tetap jalan walau dibuka dari halaman Plugin / Cara Pakai / Tutorial).
export const navItems = [
  { name: "Tentang", link: "/#tentang" },
  { name: "Pricelist", link: "/#pricelist" },
  { name: "Plugin", link: "/plugin" },
  { name: "Cara Pakai", link: "/cara-pakai" },
  tutorialMenu,
  { name: "Buka App", link: "/#download" },
  { name: "Masuk", link: "/akun" },
];

export const mobileGroups = [
  {
    label: "Menu",
    items: [
      { name: "Beranda", link: "/" },
      { name: "Tentang", link: "/#tentang" },
      { name: "Pricelist", link: "/#pricelist" },
      { name: "Plugin", link: "/plugin" },
      { name: "Cara Pakai", link: "/cara-pakai" },
      tutorialMenu,
      { name: "Masuk / Akun", link: "/akun" },
    ],
  },
  {
    label: "Info",
    items: [
      { name: "FAQ", link: "/#faq" },
      { name: "Buka App", link: "/#download" },
    ],
  },
];
