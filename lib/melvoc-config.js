// ============================================================
// SEMUA ISI HALAMAN MELVOC DIEDIT DI SINI.
// Bagian bertanda "ISI:" masih placeholder -- ganti dengan data asli.
// ============================================================

export const MELVOC = {
  name: "Melvoc",
  tagline: "Studio olah vocal di genggamanmu.",
  description:
    "Melvoc adalah aplikasi DAW khusus vocal: rekam, edit, dan mixing suara dengan alur kerja yang simpel, langsung dari HP.",

  // ISI: link download APK (Google Drive / MediaFire / GitHub Releases / dll).
  // Kosongkan ("") kalau belum ada -> tombol otomatis jadi "Segera hadir".
  demo: { version: "ISI: v0.0.0", size: "ISI: 00 MB", url: "" },
  full: { version: "ISI: v0.0.0", size: "ISI: 00 MB", url: "" },

  price: "ISI: Rp 00.000", // harga versi full
  priceNote: "Sekali bayar, tanpa langganan.", // ISI: sesuaikan

  features: [
    { title: "Rekam Vocal", desc: "Rekam langsung dari mic HP atau mic eksternal." }, // ISI: sesuaikan semua fitur
    { title: "Multi-track", desc: "Susun vokal utama, backing, dan harmoni dalam satu project." },
    { title: "Mixing Vocal", desc: "Atur volume, pan, dan efek tiap track dengan mudah." },
    { title: "Koreksi Nada", desc: "Rapikan nada vokal supaya lebih pas." },
    { title: "Pengurang Noise", desc: "Bersihkan suara bising dari rekaman." },
    { title: "Export Hasil", desc: "Simpan hasil mixing siap dibagikan." },
  ],

  plugins: [
    { name: "EQ", desc: "Bentuk warna suara." }, // ISI: daftar plugin asli
    { name: "Compressor", desc: "Ratakan dinamika vokal." },
    { name: "Reverb", desc: "Tambah ruang dan kedalaman." },
    { name: "Delay", desc: "Gema ritmis di ujung kalimat." },
    { name: "Pitch Correction", desc: "Koreksi nada otomatis." },
    { name: "De-esser", desc: "Redam desis huruf S." },
  ],

  steps: [
    { title: "Install APK", desc: "Download APK, lalu izinkan install dari sumber luar (Pengaturan > Keamanan)." },
    { title: "Buat project", desc: "Buka Melvoc, buat project baru, dan pilih sumber rekaman." },
    { title: "Rekam & edit", desc: "Rekam vokal, potong, dan susun beberapa track." },
    { title: "Mixing", desc: "Pasang plugin di tiap track lalu atur sampai pas." },
    { title: "Export", desc: "Simpan hasil akhir dan bagikan." },
  ],

  // Perbandingan Demo vs Full. ISI: sesuaikan batasan demo yang sebenarnya.
  compare: [
    { label: "Rekam & edit vocal", demo: true, full: true },
    { label: "Plugin dasar", demo: true, full: true },
    { label: "Semua plugin", demo: false, full: true },
    { label: "Export tanpa batas", demo: false, full: true },
    { label: "Update & dukungan", demo: false, full: true },
  ],

  developer: { name: "ISI: Nama developer", role: "Developer Melvoc" },
  support: {
    name: "ISI: Nama support",
    contacts: [
      { label: "WhatsApp", href: "" }, // ISI: mis. https://wa.me/628xxxx
      { label: "Instagram", href: "" },
      { label: "Email", href: "" }, // ISI: mis. mailto:kamu@email.com
    ],
  },
};
