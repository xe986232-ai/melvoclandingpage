// Data utama aplikasi -- dipakai di header atas & footer.
// ISI: ganti nilai di bawah dengan data asli.
export const APP_NAME = "Melvoc";
export const APP_ICON = "/melvoc-icon.png"; // taruh icon asli di /public lalu ganti path
export const FULL_PRICE = "Rp 70.000"; // harga full version

// Link tombol (kosongkan "" kalau belum ada -> tombol jadi "Segera hadir")
export const BUY_URL = ""; // link beli, mis. https://wa.me/628xxxx atau halaman pembayaran
export const DEMO_APK_URL = ""; // link download APK demo
export const FULL_APK_URL = ""; // link download APK full (untuk yang sudah beli)

// Pricelist -- section "Pricelist" di bawah header (components/PricingSection.jsx).
// Tiap paket: price = angka utama, priceSub = bagian abu-abu di belakangnya
// (mis. "Rp70" + ".000" -> tampil "Rp70.000"), suffix = teks kecil di kanan harga.
// `popular: true` = kartu putih + badge. `url` kosong -> tombol scroll ke #download.
export const PRICELIST = [
  {
    name: "Demo",
    tagline: "Untuk yang mau coba dulu",
    price: "Gratis",
    priceSub: "",
    suffix: "/Selamanya",
    includedLabel: "Yang kamu dapat:",
    features: ["Download APK demo", "Fitur dasar vocal", "Tanpa daftar akun"],
    cta: "Download Demo",
    url: DEMO_APK_URL,
    icon: "square",
  },
  {
    name: "Full Version",
    tagline: "Untuk produksi tanpa batas",
    price: "Rp70",
    priceSub: ".000",
    suffix: "/Sekali bayar",
    includedLabel: "Semua di Demo, plus:",
    features: ["Semua fitur terbuka", "Tanpa batasan export", "Update berikutnya", "Dukungan prioritas"],
    cta: "Beli Full Version",
    url: BUY_URL,
    popular: true,
    icon: "orb",
  },
];

// Panel gradasi di bawah kartu harga.
export const CONSULT = {
  title: "Masih bingung pilih paket?",
  subtitle: "Tanya langsung, kami bantu pilihkan yang cocok.",
  cta: "Tanya Sekarang",
  url: "", // mis. https://wa.me/628xxxx
};
