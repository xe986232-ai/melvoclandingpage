// Menu navbar dipakai di semua halaman. Link "/#..." = bagian di halaman
// utama (tetap jalan walau dibuka dari halaman Plugin / Cara Pakai).
export const navItems = [
  { name: "Tentang", link: "/#tentang" },
  { name: "Pricelist", link: "/#pricelist" },
  { name: "Plugin", link: "/plugin" },
  { name: "Cara Pakai", link: "/cara-pakai" },
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
