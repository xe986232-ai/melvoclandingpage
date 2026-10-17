// Data utama Melvoc (web app / PWA) -- dipakai di header atas & footer.
// ISI: ganti nilai di bawah dengan data asli.
export const APP_NAME = "Melvoc";
export const APP_ICON = "/melvoc-icon.png"; // taruh icon asli di /public lalu ganti path
export const FULL_PRICE = "Rp 70.000"; // harga full version

// Link tombol (kosongkan "" kalau belum ada -> tombol jadi "Segera hadir")
export const BUY_URL = ""; // link beli, mis. https://wa.me/628xxxx atau halaman pembayaran
export const DEMO_APP_URL = "https://melvox-demo.vercel.app/"; // link web lain tempat PWA Demo di-install (tombol "Download Demo" di pricing)
export const FULL_APP_URL = ""; // link buka versi Full (halaman masuk / aktivasi token)

// Pricelist -- section "Pricelist" di bawah header (components/PricingSection.jsx).
// Tiap paket: price = angka utama, priceSub = bagian abu-abu di belakangnya
// (mis. "Rp70" + ".000" -> tampil "Rp70.000"), suffix = teks kecil di kanan harga.
// `popular: true` = kartu putih + badge. `url` kosong -> tombol scroll ke #download.
export const PRICELIST = [
  {
    name: "Demo",
    tagline: "Coba semua dasar, dengan batasan",
    price: "Gratis",
    priceSub: "",
    suffix: "/Selamanya",
    includedLabel: "Yang kamu dapat:",
    features: [
      "Langsung dipakai di browser, bisa di-install (PWA)",
      "DERIZ, MPCS, MGCHORD & Supersaw",
      "Reverb, EQ, Filter, Delay, De-esser",
      "Maks. 4 track, timeline 32 bar",
      "Audio dibatasi 30 detik (MPCS 15 detik)",
      "MGCHORD: 3 style, 4 bar, suara piano",
    ],
    missingLabel: "Tidak ada di Demo:",
    missing: [
      "Export audio MP3 / WAV",
      "Simpan & buka project",
      "Automation Clip",
      "AUTOTUNE, BPMTUNE, PRINTER, VocalF",
      "SAMPLER, CUTE",
      "Spectrum analyzer",
    ],
    cta: "Buka Demo",
    url: DEMO_APP_URL,
  },
  {
    name: "Full Version",
    tagline: "Semua fitur, tanpa batas",
    price: "Rp70",
    priceSub: ".000",
    suffix: "/Sekali bayar",
    includedLabel: "Semua di Demo, tanpa batas, plus:",
    features: [
      "Track, bar & durasi audio tanpa batas",
      "Export audio MP3 / WAV",
      "Simpan, buka & cadangkan project",
      "Automation Clip",
      "AUTOTUNE + FX Mixer (harmony, double, reverb)",
      "BPMTUNE: deteksi BPM & tuner",
      "PRINTER: ubah vokal jadi MIDI",
      "VocalF, SAMPLER & CUTE",
      "MGCHORD penuh: 10 style, semua suara, 8 bar",
      "Spectrum analyzer 2 gaya",
    ],
    cta: "Beli Full Version",
    url: BUY_URL,
    popular: true,
  },
];

// Panel gradasi di bawah kartu harga.
export const CONSULT = {
  title: "Masih bingung pilih paket?",
  subtitle: "Tanya langsung, kami bantu pilihkan yang cocok.",
  cta: "Tanya Sekarang",
  url: "", // mis. https://wa.me/628xxxx
};
