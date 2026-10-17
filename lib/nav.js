// Menu navbar dipakai di semua halaman. Link "/#..." = bagian di halaman
// utama (tetap jalan walau dibuka dari halaman Plugin / Cara Pakai).
export const navItems = [
  { name: "Tentang", link: "/#tentang" },
  { name: "Fitur", link: "/#fitur" },
  { name: "Plugin", link: "/plugin" },
  { name: "Cara Pakai", link: "/cara-pakai" },
  { name: "Support", link: "/#developer" },
  { name: "Download", link: "/#download" },
];

export const mobileGroups = [
  {
    label: "Menu",
    items: [
      { name: "Beranda", link: "/" },
      { name: "Tentang", link: "/#tentang" },
      { name: "Fitur", link: "/#fitur" },
      { name: "Plugin", link: "/plugin" },
      { name: "Cara Pakai", link: "/cara-pakai" },
    ],
  },
  {
    label: "Info",
    items: [
      { name: "Developer & Support", link: "/#developer" },
      { name: "FAQ", link: "/#faq" },
      { name: "Download", link: "/#download" },
    ],
  },
];
