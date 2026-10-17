// Katalog plugin Melvoc: dipakai halaman /plugin, /akun, dan aksi "Get plugin".
// Setiap plugin punya nilai sendiri:
//   id       = kunci tetap, SAMA dengan id plugin di DAW (src/shop-page.ts, server/plugins.ts) dan kolom
//              plugin_licenses.plugin di Supabase (huruf kecil, a-z 0-9 _ -, maks 32). Jangan diubah setelah dipakai.
//   price    = harga dalam rupiah. 0 = gratis.
//   default  = true: langsung aktif di setiap akun, tanpa perlu Get plugin.
//              false: baru aktif di akun setelah pemilik klik "Get plugin" (tersimpan di plugin_licenses).
// Sekarang semua plugin default kecuali AUTOTUNE.
// `image` kosong = belum ada screenshot (tampil kotak gradasi). Screenshot ada di /public/plugin/.

// HARGA AUTOTUNE: angka sementara, ganti dengan harga sebenarnya.
export const AUTOTUNE_PRICE = 25000;

export const PLUGINS = [
  {
    id: "deriz",
    name: "DERIZ",
    image: "/plugin/deriz.webp",
    price: 0,
    default: true,
    desc: "Sampler instrumen: upload audio lalu mainkan lewat keyboard. Nada (tuts + Pitch) dan kecepatan (Speed) diatur terpisah, jadi sample bisa dipercepat atau diperlambat tanpa mengubah nadanya.",
  },
  {
    id: "mpcs",
    name: "MPCS",
    image: "/plugin/mpcs.webp",
    price: 0,
    default: true,
    desc: "Editor pitch manual untuk vokal. Nada hasil analisis tampil sebagai blok di piano roll, tinggal diseret ke atas atau bawah (snap ke semiton), lalu dihaluskan dengan knob Lock, Human, dan Glide.",
  },
  {
    id: "mgchord",
    name: "MGCHORD",
    image: "/plugin/mgchord.webp",
    price: 0,
    default: true,
    desc: "Pembuat chord progression. Pilih key, skala, dan style, acak progression-nya, dengarkan lewat piano roll, lalu seret atau unduh hasilnya sebagai file MIDI.",
  },
  {
    id: "supersaw",
    name: "Supersaw",
    image: "/plugin/supersaw.webp",
    price: 0,
    default: true,
    desc: "Synth supersaw untuk lead yang lebar. Tersedia bagian OSC, Filter, dan ENV, dengan knob Detune, Mix, dan Level.",
  },
  {
    id: "reverb",
    name: "Reverb",
    image: "/plugin/reverb.webp",
    price: 0,
    default: true,
    desc: "Tambah ruang dan kedalaman pada vokal. Atur Pre Size, Tone, Low Cut, dan Mix sesuai keinginan.",
  },
  {
    id: "equalizer",
    name: "Equalizer",
    image: "/plugin/equalizer.webp",
    price: 0,
    default: true,
    desc: "EQ lima band (Low, LM, Mid, HM, High) dengan grafik interaktif. Tiap band punya Freq, Gain, dan Q, ditambah kontrol Output.",
  },
  {
    id: "filter",
    name: "Filter",
    image: "/plugin/filter.webp",
    price: 0,
    default: true,
    desc: "Filter sederhana dengan satu knob Cutoff: ke kiri jadi low-pass, ke kanan jadi high-pass. Resonansinya diatur lewat knob Reso.",
  },
  {
    id: "delay",
    name: "Delay",
    image: "/plugin/delay.webp",
    price: 0,
    default: true,
    desc: "Gema ritmis dengan Feedback, modulasi (Depth dan Rate), filter HiPass dan LoPass, serta karakter Analog. Campuran suara asli diatur lewat Dry/Wet.",
  },
  {
    id: "deesser",
    name: "De-esser",
    image: "/plugin/deesser.webp",
    price: 0,
    default: true,
    desc: "Redam desis huruf S yang terlalu tajam. Atur frekuensinya (Freq), batas mulai bekerja (Thresh), dan seberapa kuat peredamannya (Amount).",
  },
  {
    id: "autotune",
    name: "AUTOTUNE",
    image: "/plugin/autotune.webp",
    price: AUTOTUNE_PRICE,
    default: false,
    desc: "Koreksi pitch real-time untuk vokal, dengan orb yang menampilkan kunci nada terdeteksi. Dilengkapi FX Mixer: lapisan Harmony 1, Harmony 2, Pitch, Double, dan Reverb, masing-masing punya fader, pan, mute, dan solo.",
  },
  {
    id: "bpmtune",
    name: "BPMTUNE",
    image: "/plugin/bpmtune.webp",
    price: 0,
    default: true,
    desc: "Dua alat dalam satu plugin. Tab BPM mencari tempo dari audio (ada tap tempo dan tombol ÷2 / ×2) lalu mengirimnya ke BPM project. Tab Tuner membaca suara dari mic dan menampilkan nama nada, cent, dan Hz.",
  },
  {
    id: "printer",
    name: "PRINTER",
    image: "/plugin/printer.webp",
    price: 0,
    default: true,
    desc: "Melody Printer: masukkan vokal, lalu melodinya dicetak di kertas sebagai nada MIDI yang sudah dibulatkan. Simpan sebagai file .mid atau Tear Off langsung ke pattern di timeline.",
  },
  {
    id: "vocalf",
    name: "VocalF",
    image: "/plugin/vocalf.webp",
    price: 0,
    default: true,
    desc: "Exciter “udara” untuk vokal dengan kontrol Mid Air, High Air, dan Trim. Tambahannya mengecil saat ada desis S, jadi vokal terdengar lebih terbuka tanpa jadi tajam.",
  },
  {
    id: "sampler",
    name: "SAMPLER",
    image: "/plugin/sampler.webp",
    price: 0,
    default: true,
    desc: "Sampler sederhana ala sampler klasik: upload audio, lalu mengganti nada berarti mengganti kecepatan putar. Dilengkapi knob Pitch, Attack, Release, dan Volume.",
  },
  {
    id: "cute",
    name: "CUTE",
    image: "/plugin/cute.webp",
    price: 0,
    default: true,
    desc: "Pemotong audio dengan tampilan waveform. Pilih bagian yang diinginkan, putar untuk mengecek, lalu seret hasilnya ke DERIZ sebagai sample atau ke timeline sebagai track audio.",
  },
];

export const PLUGIN_BY_ID = Object.fromEntries(PLUGINS.map((p) => [p.id, p]));

// Plugin yang hanya aktif setelah Get plugin.
export const GET_PLUGINS = PLUGINS.filter((p) => !p.default);

export const isDefaultPlugin = (id) => PLUGIN_BY_ID[id]?.default === true;

// 25000 -> "Rp25.000"; 0 -> "Gratis"
export function formatPrice(n) {
  return n > 0 ? "Rp" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "Gratis";
}
