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
  {
    id: "cute",
    name: "CUTE",
    tagline: "Pemotong audio",
    summary:
      "Potong bagian audio yang kamu butuhkan lewat tampilan waveform, cek dengan Play, lalu seret hasilnya ke DERIZ sebagai sample atau ke timeline sebagai track audio.",
    image: "/tutorial/cute-annotated.webp",
    imageAlt:
      "Tampilan plugin CUTE dengan nomor penjelasan: nama audio, area drop audio, zoom out, play, zoom in, pegangan seret, dan tombol tutup",
    video: null,
    parts: [
      { n: 1, title: "Nama audio", desc: "Menampilkan nama file yang sedang dipakai. Tertulis “Belum ada audio” kalau belum ada file." },
      { n: 2, title: "Drop audio", desc: "Seret file audio ke sini, atau ketuk area ini untuk memilih file dari perangkatmu." },
      // CEK: fungsi tombol zoom disimpulkan dari ikon kaca pembesar (−/+).
      { n: 3, title: "Zoom out", desc: "Perkecil tampilan waveform supaya seluruh audio kelihatan." },
      { n: 4, title: "Play", desc: "Putar audio untuk mengecek bagian yang kamu pilih." },
      { n: 5, title: "Zoom in", desc: "Perbesar tampilan waveform supaya pemotongan lebih presisi." },
      // CEK: ikon titik-titik diduga pegangan untuk menyeret hasil potongan.
      { n: 6, title: "Seret", desc: "Pegangan untuk menyeret hasil potongan ke DERIZ atau ke timeline." },
      { n: 7, title: "Tutup", desc: "Tutup plugin." },
    ],
    steps: [
      "Drop file audio ke area (2), atau ketuk area itu untuk memilih file.",
      "Lihat waveform-nya, lalu pakai Zoom in (5) dan Zoom out (3) kalau perlu.",
      "Pilih bagian yang kamu inginkan, lalu klik Play (4) untuk mengeceknya.",
      "Seret hasilnya lewat pegangan (6) ke DERIZ sebagai sample, atau ke timeline sebagai track audio.",
    ],
    tip: "Hasil potongan CUTE bisa langsung dimainkan lewat keyboard di DERIZ.",
  },
  {
    id: "sampler",
    name: "SAMPLER",
    tagline: "Sampler klasik",
    summary:
      "Sampler sederhana ala sampler klasik: upload audio, lalu atur Pitch, Attack, Release, dan Volume. Mengganti nada di sini berarti mengganti kecepatan putar.",
    image: "/tutorial/sampler-annotated.webp",
    imageAlt:
      "Tampilan plugin SAMPLER dengan nomor penjelasan: tombol power, knob Pitch, Attack, Release, Volume, area audio, tombol upload, dan status audio",
    video: null,
    parts: [
      // CEK: fungsi ikon power disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "Power", desc: "Nyalakan atau matikan plugin." },
      { n: 2, title: "Pitch", desc: "Atur nada sample. Nada naik berarti sample juga diputar lebih cepat, nada turun berarti lebih lambat." },
      // CEK: arti Attack/Release disimpulkan dari nama knob (istilah umum sampler).
      { n: 3, title: "Attack", desc: "Berapa lama suara naik dari pelan sampai penuh saat mulai dimainkan." },
      { n: 4, title: "Release", desc: "Berapa lama suara memudar sampai hilang setelah dilepas." },
      { n: 5, title: "Volume", desc: "Atur keras-pelan suara SAMPLER." },
      // CEK: area ini diduga tempat sample tampil setelah di-upload.
      { n: 6, title: "Area audio", desc: "Tempat sample yang kamu upload ditampilkan." },
      { n: 7, title: "Upload audio", desc: "Pilih file audio untuk dijadikan sample." },
      { n: 8, title: "Status", desc: "Menampilkan keterangan audio. Tertulis “Belum ada audio” sebelum kamu upload." },
    ],
    steps: [
      "Klik Upload audio (7), pilih file-nya.",
      "Atur Pitch (2) untuk mengubah nada sample.",
      "Bentuk suaranya dengan Attack (3) dan Release (4).",
      "Atur Volume (5) sesuai selera.",
    ],
    tip: "Butuh nada dan kecepatan yang diatur terpisah? Pakai DERIZ. Di SAMPLER, Pitch ikut mengubah kecepatan putar.",
  },
  {
    id: "mgchord",
    name: "MGCHORD",
    tagline: "Pembuat chord progression",
    summary:
      "Susun chord progression dengan cepat. Pilih skala, style, dan suara, tambah chord lewat keyboard atau acak otomatis, dengarkan di piano roll, lalu seret atau unduh sebagai file MIDI.",
    image: "/tutorial/mgchord-annotated.webp",
    imageAlt:
      "Tampilan plugin MGCHORD dengan nomor penjelasan: piano roll, keyboard, range tuts, style, major minor, sound, bars, undo redo, acak, play, seret MIDI, dan download",
    video: null,
    parts: [
      { n: 1, title: "Piano roll", desc: "Chord yang kamu pilih tampil di sini sebagai nada. Kosong sampai kamu menambah chord." },
      { n: 2, title: "Keyboard", desc: "Klik tuts untuk menambah chord ke progression." },
      // CEK: fungsi dropdown ini disimpulkan dari tulisan “KEYS C3–C4”.
      { n: 3, title: "Range tuts", desc: "Pilih rentang tuts keyboard (di gambar: C3–C4)." },
      { n: 4, title: "Style", desc: "Pilih gaya pola chord (di gambar: Block)." },
      { n: 5, title: "Major / Minor", desc: "Pilih skala mayor atau minor." },
      { n: 6, title: "Sound", desc: "Pilih suara untuk mendengarkan chord (di gambar: Piano)." },
      // CEK: arti “4 BARS” disimpulkan dari tulisannya (panjang progression).
      { n: 7, title: "Bars", desc: "Panjang progression dalam bar (di gambar: 4 Bars)." },
      // CEK: fungsi tiga ikon ini disimpulkan dari bentuknya (undo, redo, tong sampah).
      { n: 8, title: "Undo / Redo", desc: "Batalkan atau ulangi perubahan. Ikon tong sampah untuk menghapus." },
      { n: 9, title: "Acak", desc: "Acak progression otomatis sesuai pilihanmu." },
      { n: 10, title: "Play", desc: "Putar progression untuk didengarkan." },
      { n: 11, title: "Seret MIDI", desc: "Seret progression sebagai file MIDI ke timeline." },
      { n: 12, title: "Download .mid", desc: "Unduh progression sebagai file .mid." },
    ],
    steps: [
      "Pilih skala Major atau Minor (5), Style (4), dan Sound (6).",
      "Tentukan panjang progression lewat Bars (7).",
      "Klik tuts di Keyboard (2) untuk menambah chord, atau klik Acak (9) supaya dibuatkan otomatis.",
      "Klik Play (10) untuk mendengarkan hasilnya di Piano roll (1).",
      "Seret lewat (11) ke timeline, atau unduh lewat Download (12).",
    ],
    tip: "Belum cocok? Klik Acak lagi sampai dapat progression yang kamu suka.",
  },
  {
    id: "delay",
    name: "Delay",
    tagline: "Gema ritmis",
    summary:
      "Tambah gema yang mengikuti ritme lagu. Atur waktu dan jumlah pengulangan gema, beri sentuhan modulasi dan karakter analog, lalu haluskan dengan filter.",
    image: "/tutorial/delay-annotated.webp",
    imageAlt:
      "Tampilan plugin Delay dengan nomor penjelasan: knob Delay, layar waktu dan mode, Feedback, Dry/Wet, Output, Analog, Depth, Rate, HiPass, Link, dan LoPass",
    video: null,
    parts: [
      { n: 1, title: "Delay", desc: "Atur jarak waktu antar gema, dari 1/64T sampai 2 Bar." },
      // CEK: fungsi tombol Ø L / PING PONG / DUAL / Ø R dan BPM / HOST / MS disimpulkan dari tulisannya.
      { n: 2, title: "Waktu & mode", desc: "Layar menampilkan waktu delay dan tempo. Tombol di atasnya (Ø L, Ping Pong, Dual, Ø R) mengatur cara gema di kiri-kanan, tombol di bawahnya (BPM, Host, MS) memilih acuan waktunya." },
      { n: 3, title: "Feedback", desc: "Berapa kali gema diulang. Makin besar, gema makin panjang." },
      { n: 4, title: "Dry/Wet", desc: "Campuran suara asli (Dry) dan suara gema (Wet)." },
      { n: 5, title: "Output", desc: "Atur volume keluaran Delay, dari −18 sampai +18." },
      // CEK: arti tiap level Analog (1–4) belum dipastikan.
      { n: 6, title: "Analog", desc: "Pilih seberapa kuat karakter analog pada gema: Off atau level 1 sampai 4." },
      { n: 7, title: "Depth", desc: "Seberapa dalam modulasi pada gema (0–100)." },
      { n: 8, title: "Rate", desc: "Seberapa cepat modulasi bergerak." },
      { n: 9, title: "HiPass", desc: "Buang frekuensi rendah dari gema (20 Hz–20 kHz)." },
      // CEK: fungsi tombol Link diduga mengunci HiPass dan LoPass supaya bergerak bersama.
      { n: 10, title: "Link", desc: "Hubungkan HiPass dan LoPass supaya digeser bersamaan." },
      { n: 11, title: "LoPass", desc: "Buang frekuensi tinggi dari gema supaya lebih redup." },
    ],
    steps: [
      "Atur waktu gema lewat Delay (1), dan pilih mode di Waktu & mode (2).",
      "Atur jumlah pengulangan dengan Feedback (3).",
      "Campurkan gema ke suara asli lewat Dry/Wet (4).",
      "Haluskan gema dengan HiPass (9) dan LoPass (11), tambahkan gerak lewat Depth (7) dan Rate (8).",
      "Sesuaikan volume akhir di Output (5).",
    ],
    tip: "Gema terasa menabrak vokal? Turunkan LoPass (11) supaya gema lebih redup.",
  },
  {
    id: "deesser",
    name: "De-esser",
    tagline: "Peredam desis",
    summary:
      "Redam desis huruf S yang terlalu tajam pada vokal. Cukup atur tiga knob: frekuensi desis, batas mulai bekerja, dan kekuatan peredamannya.",
    image: "/tutorial/deesser-annotated.webp",
    imageAlt:
      "Tampilan plugin De-esser dengan nomor penjelasan: tombol on off, menu, knob Freq, Thresh, dan Amount",
    video: null,
    parts: [
      // CEK: fungsi toggle disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "On / Off", desc: "Nyalakan atau matikan De-esser." },
      // CEK: fungsi ikon tiga titik ini belum dipastikan.
      { n: 2, title: "Menu", desc: "Pilihan tambahan plugin." },
      { n: 3, title: "Freq", desc: "Frekuensi desis yang diredam. Arahkan ke frekuensi huruf S pada vokalmu." },
      { n: 4, title: "Thresh", desc: "Batas mulai bekerja. Hanya desis yang melewati batas ini yang diredam." },
      { n: 5, title: "Amount", desc: "Seberapa kuat desis diredam." },
    ],
    steps: [
      "Putar vokal yang desisnya terlalu tajam.",
      "Geser Freq (3) sampai pas di frekuensi desis huruf S.",
      "Atur Thresh (4) supaya De-esser hanya bekerja saat ada desis.",
      "Tambah Amount (5) sampai desisnya terdengar nyaman.",
    ],
    tip: "Jangan terlalu kuat: peredaman berlebihan bisa membuat vokal terdengar cadel.",
  },
];
