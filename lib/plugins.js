// Daftar plugin Melvoc untuk halaman /plugin (components/PluginSection.jsx).
// Diambil dari project Demo (main) dan Full. `full: true` = hanya ada di
// Full Version. `image` kosong = belum ada screenshot (tampil kotak gradasi).
// Screenshot ada di /public/plugin/.
export const PLUGINS = [
  {
    name: "DERIZ",
    image: "/plugin/deriz.webp",
    desc: "Sampler instrumen: upload audio lalu mainkan lewat keyboard. Nada (tuts + Pitch) dan kecepatan (Speed) diatur terpisah, jadi sample bisa dipercepat atau diperlambat tanpa mengubah nadanya.",
  },
  {
    name: "MPCS",
    image: "/plugin/mpcs.webp",
    desc: "Editor pitch manual untuk vokal. Nada hasil analisis tampil sebagai blok di piano roll, tinggal diseret ke atas atau bawah (snap ke semiton), lalu dihaluskan dengan knob Lock, Human, dan Glide.",
  },
  {
    name: "MGCHORD",
    image: "/plugin/mgchord.webp",
    desc: "Pembuat chord progression. Pilih key, skala, dan style, acak progression-nya, dengarkan lewat piano roll, lalu seret atau unduh hasilnya sebagai file MIDI.",
  },
  {
    name: "Supersaw",
    image: "/plugin/supersaw.webp",
    desc: "Synth supersaw untuk lead yang lebar. Tersedia bagian OSC, Filter, dan ENV, dengan knob Detune, Mix, dan Level.",
  },
  {
    name: "Reverb",
    image: "/plugin/reverb.webp",
    desc: "Tambah ruang dan kedalaman pada vokal. Atur Pre Size, Tone, Low Cut, dan Mix sesuai keinginan.",
  },
  {
    name: "Equalizer",
    image: "/plugin/equalizer.webp",
    desc: "EQ lima band (Low, LM, Mid, HM, High) dengan grafik interaktif. Tiap band punya Freq, Gain, dan Q, ditambah kontrol Output.",
  },
  {
    name: "Filter",
    image: "/plugin/filter.webp",
    desc: "Filter sederhana dengan satu knob Cutoff: ke kiri jadi low-pass, ke kanan jadi high-pass. Resonansinya diatur lewat knob Reso.",
  },
  {
    name: "Delay",
    image: "/plugin/delay.webp",
    desc: "Gema ritmis dengan Feedback, modulasi (Depth dan Rate), filter HiPass dan LoPass, serta karakter Analog. Campuran suara asli diatur lewat Dry/Wet.",
  },
  {
    name: "De-esser",
    image: "/plugin/deesser.webp",
    desc: "Redam desis huruf S yang terlalu tajam. Atur frekuensinya (Freq), batas mulai bekerja (Thresh), dan seberapa kuat peredamannya (Amount).",
  },
  {
    name: "AUTOTUNE",
    image: "/plugin/autotune.webp",
    full: true,
    desc: "Koreksi pitch real-time untuk vokal, dengan orb yang menampilkan kunci nada terdeteksi. Dilengkapi FX Mixer: lapisan Harmony 1, Harmony 2, Pitch, Double, dan Reverb, masing-masing punya fader, pan, mute, dan solo.",
  },
  {
    name: "BPMTUNE",
    image: "/plugin/bpmtune.webp",
    full: true,
    desc: "Dua alat dalam satu plugin. Tab BPM mencari tempo dari audio (ada tap tempo dan tombol ÷2 / ×2) lalu mengirimnya ke BPM project. Tab Tuner membaca suara dari mic dan menampilkan nama nada, cent, dan Hz.",
  },
  {
    name: "PRINTER",
    image: "/plugin/printer.webp",
    full: true,
    desc: "Melody Printer: masukkan vokal, lalu melodinya dicetak di kertas sebagai nada MIDI yang sudah dibulatkan. Simpan sebagai file .mid atau Tear Off langsung ke pattern di timeline.",
  },
  {
    name: "VocalF",
    image: "/plugin/vocalf.webp",
    full: true,
    desc: "Exciter “udara” untuk vokal dengan kontrol Mid Air, High Air, dan Trim. Tambahannya mengecil saat ada desis S, jadi vokal terdengar lebih terbuka tanpa jadi tajam.",
  },
  {
    name: "SAMPLER",
    image: "/plugin/sampler.webp",
    full: true,
    desc: "Sampler sederhana ala sampler klasik: upload audio, lalu mengganti nada berarti mengganti kecepatan putar. Dilengkapi knob Pitch, Attack, Release, dan Volume.",
  },
  {
    name: "CUTE",
    image: "/plugin/cute.webp",
    full: true,
    desc: "Pemotong audio dengan tampilan waveform. Pilih bagian yang diinginkan, putar untuk mengecek, lalu seret hasilnya ke DERIZ sebagai sample atau ke timeline sebagai track audio.",
  },
];
