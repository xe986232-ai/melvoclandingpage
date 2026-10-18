// Konten halaman /tutorial.
//
// Cara menambah plugin baru:
//   1. Tambah screenshot + anotasinya di scripts/generate-tutorial-images.py,
//      jalankan skripnya -> menghasilkan public/tutorial/<id>-annotated.webp
//   2. Tambah satu objek baru di TUTORIALS di bawah. Nomor `n` di `parts`
//      HARUS sama dengan nomor di gambar.
//
// Video tutorial: isi salah satu
//   video: { youtubeId: "dQw4w9WgXcQ" }     -> embed YouTube
//   video: { src: "/tutorial/deriz.mp4" }   -> file video di /public/tutorial/
//   video: null                              -> tampil "Video segera hadir"
//
// Baris bertanda "CEK:" = penjelasan yang disimpulkan dari tampilan/nama tombol,
// belum dikonfirmasi ke perilaku asli plugin. Tolong dicocokkan dulu dengan app.

export const TUTORIALS = [
  {
    id: "deriz",
    name: "DERIZ",
    tagline: "Sampler instrumen",
    summary:
      "Upload audio, lalu mainkan lewat keyboard. Nada dan kecepatan diatur terpisah, jadi sample bisa dipercepat atau diperlambat tanpa mengubah nadanya.",
    image: "/tutorial/deriz-annotated.webp",
    imageAlt:
      "Tampilan plugin DERIZ dengan nomor penjelasan: canvas audio, upload audio, zoom canvas, keyboard, knob Speed, Pitch, Volume, dan tombol header",
    video: null,
    parts: [
      { n: 1, title: "Canvas Audio", desc: "Tempat waveform audio yang kamu upload tampil." },
      { n: 2, title: "Upload audio", desc: "Pilih file audio untuk dijadikan sample. Di Demo maksimal 30 detik." },
      // CEK: fungsi bar ini disimpulkan dari bentuknya (bar + handle di bawah canvas).
      { n: 3, title: "Zoom Canvas", desc: "Geser untuk zoom dan menggeser tampilan waveform." },
      { n: 4, title: "Keyboard", desc: "Tuts C3–C5 untuk memainkan sample di nada yang berbeda." },
      { n: 5, title: "Speed", desc: "Atur kecepatan sample tanpa mengubah nada." },
      { n: 6, title: "Pitch", desc: "Atur nada sample tanpa mengubah kecepatan." },
      { n: 7, title: "Volume", desc: "Atur keras-pelan suara DERIZ." },
      // CEK: fungsi ikon tiga garis ini belum dipastikan.
      { n: 8, title: "Menu", desc: "Pilihan tambahan plugin." },
      // CEK: arti lampu indikator disimpulkan dari tampilannya.
      { n: 9, title: "Indikator", desc: "Lampu penanda plugin sedang aktif." },
      { n: 10, title: "Tutup", desc: "Tutup plugin." },
    ],
    steps: [
      "Klik Upload audio (2), pilih file-nya.",
      "Lihat waveform di Canvas (1), zoom lewat bar (3) kalau perlu.",
      "Mainkan lewat Keyboard (4).",
      "Atur Speed (5), Pitch (6), dan Volume (7) sesuai selera.",
    ],
    tip: "Hasil potongan dari plugin pemotong audio bisa diseret ke DERIZ sebagai sample.",
  },
  {
    id: "mpcs",
    name: "MPCS",
    tagline: "Editor pitch manual",
    summary:
      "Edit nada vokal secara manual. Nada hasil analisis tampil sebagai blok di piano roll, tinggal diseret ke atas atau bawah, lalu dihaluskan dengan knob.",
    image: "/tutorial/mpcs-annotated.webp",
    imageAlt:
      "Tampilan plugin MPCS dengan nomor penjelasan: canvas pitch, tombol upload, select all, cut, knob Glide, Human, Lock, play, dan ikon di bagian atas",
    video: null,
    parts: [
      { n: 1, title: "Canvas Pitch", desc: "Nada vokal tampil sebagai blok. Seret blok ke atas atau bawah untuk mengubah nadanya (pas ke semiton)." },
      { n: 2, title: "Upload audio", desc: "Masukkan vokal atau instrumen satu nada yang bersih tanpa efek. Di Demo maksimal 15 detik." },
      { n: 3, title: "Upload", desc: "Pilih atau ganti audio." },
      { n: 4, title: "Select all", desc: "Pilih semua blok nada sekaligus." },
      // CEK: yang dipotong (blok nada atau audio) belum dipastikan.
      { n: 5, title: "Cut", desc: "Potong bagian yang dipilih." },
      // CEK: arti Glide/Human/Lock disimpulkan dari nama dan deskripsi plugin.
      { n: 6, title: "Glide", desc: "Kehalusan perpindahan antar nada. Awalnya 50%." },
      { n: 7, title: "Human", desc: "Seberapa natural hasilnya. Awalnya 100%." },
      { n: 8, title: "Lock", desc: "Seberapa kuat nada dikunci ke blok. Awalnya 0%." },
      { n: 9, title: "Play", desc: "Putar hasil editanmu." },
      // CEK: fungsi ikon unduh belum dipastikan (simpan hasil / export).
      { n: 10, title: "Download", desc: "Simpan hasil editan." },
      { n: 11, title: "Layar penuh", desc: "Perbesar plugin." },
      // CEK: ikon titik-titik diduga pegangan untuk menyeret hasil ke timeline.
      { n: 12, title: "Seret", desc: "Pegangan untuk menyeret hasil ke tempat lain." },
      { n: 13, title: "Tutup", desc: "Tutup plugin." },
    ],
    steps: [
      "Upload audio vokal yang bersih (2).",
      "Seret blok yang fals ke atas atau bawah di Canvas (1).",
      "Haluskan dengan Glide (6), Human (7), dan Lock (8).",
      "Klik Play (9) untuk mendengarkan hasilnya.",
    ],
    tip: "Rekaman yang bersih (tanpa noise atau efek) memberi hasil paling akurat.",
  },
];
