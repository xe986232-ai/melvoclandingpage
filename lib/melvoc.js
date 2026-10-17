// Data utama aplikasi -- dipakai di header atas & footer.
// ISI: ganti nilai di bawah dengan data asli.
export const APP_NAME = "Melvoc";
export const APP_ICON = "/melvoc-icon.png"; // taruh icon asli di /public lalu ganti path
export const FULL_PRICE = "Rp 70.000"; // harga full version

// Link tombol (kosongkan "" kalau belum ada -> tombol jadi "Segera hadir")
export const BUY_URL = ""; // link beli, mis. https://wa.me/628xxxx atau halaman pembayaran
export const DEMO_APK_URL = ""; // link download APK demo
export const FULL_APK_URL = ""; // link download APK full (untuk yang sudah beli)

// Pricelist -- tampil di bawah icon aplikasi (components/AppHeader.jsx).
// Tambah / ubah / hapus item sesuai kebutuhan. `highlight: true` = paket
// yang ditonjolkan. `price` boleh teks bebas (mis. "Gratis").
export const PRICELIST = [
  {
    name: "Demo",
    price: "Gratis",
    note: "Coba fitur dasar sebelum membeli",
    features: ["Download APK demo", "Fitur terbatas"],
  },
  {
    name: "Full Version",
    price: FULL_PRICE,
    note: "Sekali bayar",
    highlight: true,
    features: ["Semua fitur terbuka", "Tanpa batasan", "Update berikutnya"],
  },
];
