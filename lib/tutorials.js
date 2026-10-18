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
      "Upload audio, lalu mainkan lewat keyboard di bawah. Nada dan kecepatan diatur terpisah, jadi sample bisa dipercepat atau diperlambat tanpa mengubah nadanya.",
    image: "/tutorial/deriz-annotated.webp",
    imageAlt:
      "Tampilan plugin DERIZ dengan nomor penjelasan: canvas audio, upload audio, zoom canvas, keyboard, knob Speed, Pitch, Volume, dan tombol header",
    video: null,
    groups: [
      {
        label: "Area utama",
        parts: [
          {
            n: 1,
            title: "Canvas Audio",
            desc: "Layar besar di tengah tempat audio yang kamu upload ditampilkan sebagai gelombang (waveform). Sebelum ada audio, area ini kosong dan hanya menampilkan tombol Upload audio.",
          },
          {
            n: 2,
            title: "Upload audio",
            desc: "Klik untuk memilih file audio dari perangkatmu. Audio itulah yang nanti dimainkan oleh keyboard. Di versi Demo, durasi audio dibatasi 30 detik.",
          },
          {
            // CEK: fungsi bar ini disimpulkan dari bentuknya (bar + handle di bawah canvas).
            n: 3,
            title: "Zoom Canvas",
            desc: "Bar tipis di bawah canvas. Geser handle-nya untuk memperbesar (zoom) atau menggeser tampilan waveform, supaya bagian audio yang kecil bisa dilihat lebih detail.",
          },
          {
            n: 4,
            title: "Keyboard",
            desc: "Tuts piano dari C3 sampai C5. Tekan tuts untuk memainkan sample di nada yang berbeda: tuts ke kanan = nada lebih tinggi, ke kiri = lebih rendah.",
          },
        ],
      },
      {
        label: "Knob kontrol",
        parts: [
          {
            n: 5,
            title: "Knob Speed",
            desc: "Mengatur kecepatan putar sample. Putar untuk mempercepat atau memperlambat, dan nadanya tidak ikut berubah.",
          },
          {
            n: 6,
            title: "Knob Pitch",
            desc: "Mengatur nada sample secara halus, terpisah dari Speed. Pakai ini untuk menaikkan atau menurunkan nada tanpa mengubah kecepatan.",
          },
          {
            n: 7,
            title: "Knob Volume",
            desc: "Mengatur keras-pelan suara DERIZ. Lingkaran ungu di sekeliling knob menunjukkan seberapa besar volumenya.",
          },
        ],
      },
      {
        label: "Bagian atas",
        parts: [
          {
            // CEK: fungsi ikon tiga garis ini belum dipastikan.
            n: 8,
            title: "Menu",
            desc: "Ikon tiga garis di pojok kanan atas, untuk membuka pilihan tambahan plugin.",
          },
          {
            // CEK: arti lampu indikator disimpulkan dari tampilannya.
            n: 9,
            title: "Indikator",
            desc: "Lampu ungu kecil sebagai penanda bahwa plugin sedang aktif.",
          },
          {
            n: 10,
            title: "Tutup",
            desc: "Menutup jendela plugin DERIZ.",
          },
        ],
      },
    ],
    steps: [
      { title: "Buka DERIZ", desc: "Tambahkan track DERIZ di Melvoc, lalu buka plugin-nya." },
      { title: "Upload audio", desc: "Klik Upload audio (2) dan pilih file yang mau dijadikan sample. Waveform-nya muncul di Canvas Audio (1)." },
      { title: "Lihat lebih detail", desc: "Pakai Zoom Canvas (3) kalau perlu memeriksa bagian tertentu dari waveform." },
      { title: "Mainkan lewat keyboard", desc: "Tekan tuts di Keyboard (4). Tiap tuts memainkan sample di nada berbeda." },
      { title: "Atur Speed dan Pitch", desc: "Putar Speed (5) untuk mengubah kecepatan dan Pitch (6) untuk mengubah nada. Keduanya bekerja sendiri-sendiri." },
      { title: "Atur Volume", desc: "Sesuaikan Volume (7) sampai pas dengan track lainnya." },
    ],
    tip: "Sample dari plugin lain bisa langsung dipakai di DERIZ. Misalnya, hasil potongan dari plugin pemotong audio bisa diseret ke DERIZ sebagai sample.",
  },
  {
    id: "mpcs",
    name: "MPCS",
    tagline: "Editor pitch manual",
    summary:
      "Edit nada vokal secara manual. Nada hasil analisis tampil sebagai blok di piano roll, tinggal diseret ke atas atau bawah, lalu dihaluskan dengan knob Glide, Human, dan Lock.",
    image: "/tutorial/mpcs-annotated.webp",
    imageAlt:
      "Tampilan plugin MPCS dengan nomor penjelasan: canvas pitch, tombol upload, select all, cut, knob Glide, Human, Lock, play, dan ikon di bagian atas",
    video: null,
    groups: [
      {
        label: "Area utama",
        parts: [
          {
            n: 1,
            title: "Canvas Pitch (piano roll)",
            desc: "Layar besar tempat nada vokal kamu tampil. Setelah audio dianalisis, nadanya muncul sebagai blok di piano roll. Seret blok ke atas untuk menaikkan nada atau ke bawah untuk menurunkannya (otomatis pas ke semiton).",
          },
          {
            n: 2,
            title: "Upload audio",
            desc: "Tombol di tengah canvas untuk memasukkan audio. Pakai vokal atau instrumen satu nada (monofonik) yang bersih dan belum diberi efek, supaya nadanya terbaca dengan akurat. Di versi Demo, audio dibatasi 15 detik.",
          },
        ],
      },
      {
        label: "Tombol di bawah",
        parts: [
          {
            n: 3,
            title: "Upload",
            desc: "Sama seperti tombol Upload audio di tengah: memilih file audio untuk dianalisis. Tombol ini selalu ada di bawah, bahkan setelah audio masuk.",
          },
          {
            n: 4,
            title: "Select all",
            desc: "Memilih semua blok nada sekaligus, supaya bisa digeser bersamaan.",
          },
          {
            // CEK: yang dipotong (blok nada atau audio) belum dipastikan.
            n: 5,
            title: "Cut",
            desc: "Alat potong (ikon gunting) untuk memotong bagian yang dipilih.",
          },
          {
            n: 9,
            title: "Play",
            desc: "Memutar hasil editanmu, supaya bisa langsung didengar sebelum dipakai.",
          },
        ],
      },
      {
        label: "Knob penghalus",
        parts: [
          {
            // CEK: arti Glide/Human/Lock disimpulkan dari nama dan deskripsi plugin.
            n: 6,
            title: "Knob Glide",
            desc: "Mengatur seberapa halus perpindahan dari satu nada ke nada berikutnya. Makin besar, perpindahannya makin meluncur. Nilai awal 50%.",
          },
          {
            n: 7,
            title: "Knob Human",
            desc: "Mengatur seberapa natural hasilnya, yaitu sisa getaran dan variasi alami suara aslimu. Nilai awal 100%.",
          },
          {
            n: 8,
            title: "Knob Lock",
            desc: "Mengatur seberapa kuat nada dikunci ke blok yang sudah kamu atur. Nilai awal 0%.",
          },
        ],
      },
      {
        label: "Bagian atas",
        parts: [
          {
            // CEK: fungsi ikon unduh belum dipastikan (simpan hasil / export).
            n: 10,
            title: "Download",
            desc: "Ikon unduh untuk menyimpan hasil editan.",
          },
          {
            n: 11,
            title: "Layar penuh",
            desc: "Memperbesar plugin supaya canvas lebih luas dan blok nada lebih mudah diedit.",
          },
          {
            // CEK: ikon titik-titik diduga pegangan untuk menyeret hasil ke timeline.
            n: 12,
            title: "Seret",
            desc: "Ikon titik-titik sebagai pegangan untuk menyeret hasil dari plugin ke tempat lain.",
          },
          {
            n: 13,
            title: "Tutup",
            desc: "Menutup jendela plugin MPCS.",
          },
        ],
      },
    ],
    steps: [
      { title: "Siapkan audio yang bersih", desc: "Pakai vokal solo atau instrumen satu nada tanpa efek (tanpa reverb, delay, atau harmoni)." },
      { title: "Upload audio", desc: "Klik Upload audio (2) atau Upload (3) dan pilih file-nya." },
      { title: "Lihat blok nadanya", desc: "Nada hasil analisis muncul sebagai blok di Canvas Pitch (1)." },
      { title: "Perbaiki nada", desc: "Seret blok yang fals ke atas atau bawah sampai pas. Pakai Select all (4) kalau mau menggeser semuanya sekaligus." },
      { title: "Haluskan hasilnya", desc: "Atur Glide (6), Human (7), dan Lock (8) sampai suaranya terdengar natural." },
      { title: "Dengarkan", desc: "Klik Play (9) untuk mengecek hasilnya, lalu ulangi bagian yang masih kurang pas." },
    ],
    tip: "Hasil terbaik didapat dari rekaman vokal yang bersih. Kalau ada banyak noise atau efek di rekaman, nadanya bisa salah terbaca.",
  },
];
