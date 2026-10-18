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
  {
    id: "supersaw",
    name: "Supersaw",
    tagline: "Synth lead",
    summary:
      "Synth supersaw untuk membuat lead yang lebar. Suaranya dibentuk lewat tiga bagian: OSC, FILTER, dan ENV, dengan knob Detune, Mix, dan slider Level.",
    image: "/tutorial/supersaw-annotated.webp",
    imageAlt:
      "Tampilan plugin Supersaw dengan nomor penjelasan: tab OSC, FILTER, ENV, tombol on off, knob Detune, knob Mix, dan slider Level",
    video: null,
    parts: [
      { n: 1, title: "OSC", desc: "Bagian oscillator, tempat Detune, Mix, dan Level berada. Ini tab yang sedang terbuka di gambar." },
      // CEK: isi tab FILTER dan ENV tidak tampil di screenshot, penjelasan disimpulkan dari nama bagiannya.
      { n: 2, title: "FILTER", desc: "Bagian filter untuk membentuk warna suara." },
      { n: 3, title: "ENV", desc: "Bagian envelope untuk membentuk suara dari waktu ke waktu." },
      // CEK: fungsi toggle disimpulkan dari bentuknya (on/off plugin).
      { n: 4, title: "On / Off", desc: "Nyalakan atau matikan plugin." },
      // CEK: arti Detune dan Mix disimpulkan dari nama knob (istilah umum synth supersaw).
      { n: 5, title: "Detune", desc: "Seberapa lebar suaranya. Makin besar, lapisan saw makin berbeda nadanya sehingga terdengar lebih tebal." },
      { n: 6, title: "Mix", desc: "Campuran antar lapisan saw pada suara." },
      { n: 7, title: "Level", desc: "Atur keras-pelan suara Supersaw." },
    ],
    steps: [
      "Mulai dari tab OSC (1).",
      "Atur Detune (5) dan Mix (6) sampai suaranya selebar yang kamu mau.",
      "Atur Level (7) supaya volumenya pas.",
      "Buka tab FILTER (2) dan ENV (3) untuk membentuk suara lebih jauh.",
    ],
    tip: "Detune yang terlalu besar bisa membuat lead terdengar fals. Naikkan pelan-pelan.",
  },
  {
    id: "reverb",
    name: "Reverb",
    tagline: "Ruang dan kedalaman",
    summary:
      "Tambah ruang dan kedalaman pada vokal. Atur jeda, ukuran, dan warna reverb, lalu campurkan ke suara aslinya dengan knob Mix.",
    image: "/tutorial/reverb-annotated.webp",
    imageAlt:
      "Tampilan plugin Reverb dengan nomor penjelasan: tombol on off, layar penuh, menu, knob Pre, Size, Mix, Tone, dan Low Cut",
    video: null,
    parts: [
      // CEK: fungsi toggle disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "On / Off", desc: "Nyalakan atau matikan Reverb." },
      { n: 2, title: "Layar penuh", desc: "Perbesar plugin." },
      // CEK: fungsi ikon tiga titik ini belum dipastikan.
      { n: 3, title: "Menu", desc: "Pilihan tambahan plugin." },
      // CEK: arti Pre dan Size disimpulkan dari nama dan satuannya (ms dan detik).
      { n: 4, title: "Pre", desc: "Jeda sebelum reverb mulai terdengar (di gambar: 0 ms)." },
      { n: 5, title: "Size", desc: "Ukuran ruang, atau seberapa panjang reverb bertahan (di gambar: 2.2 s)." },
      { n: 6, title: "Mix", desc: "Campuran suara asli dan reverb (di gambar: 30%)." },
      { n: 7, title: "Tone", desc: "Warna reverb, makin tinggi makin cerah (di gambar: 20.0 kHz)." },
      { n: 8, title: "Low Cut", desc: "Buang frekuensi rendah dari reverb supaya tidak keruh (di gambar: 20 Hz)." },
    ],
    steps: [
      "Atur Size (5) sesuai ruang yang kamu mau.",
      "Atur Pre (4) kalau reverb perlu muncul sedikit lebih lambat.",
      "Atur warnanya lewat Tone (7) dan Low Cut (8).",
      "Campurkan ke suara asli dengan Mix (6).",
    ],
    tip: "Mulai dari Mix kecil lalu naikkan pelan-pelan supaya vokal tetap jelas.",
  },
  {
    id: "equalizer",
    name: "Equalizer",
    tagline: "EQ lima band",
    summary:
      "EQ lima band (Low, LM, Mid, HM, High) dengan grafik interaktif. Tiap band punya Freq, Gain, dan Q, ditambah kontrol Output.",
    image: "/tutorial/equalizer-annotated.webp",
    imageAlt:
      "Tampilan plugin Equalizer dengan nomor penjelasan: tombol on off, layar penuh, menu, grafik EQ, titik band, pilihan band, knob Freq, Gain, Q, dan Output",
    video: null,
    parts: [
      // CEK: fungsi toggle disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "On / Off", desc: "Nyalakan atau matikan Equalizer." },
      { n: 2, title: "Layar penuh", desc: "Perbesar plugin." },
      // CEK: fungsi ikon tiga titik ini belum dipastikan.
      { n: 3, title: "Menu", desc: "Pilihan tambahan plugin." },
      { n: 4, title: "Grafik EQ", desc: "Garis mendatar menunjukkan frekuensi (100, 1k, 10k), garis tegak menunjukkan gain dalam dB." },
      // CEK: cara menyeret titik disimpulkan dari deskripsi plugin (grafik interaktif).
      { n: 5, title: "Titik band", desc: "Lima titik berwarna mewakili kelima band. Seret titik untuk mengubah frekuensi dan gain band itu." },
      // CEK: knob di bawah diduga mengatur band yang sedang dipilih.
      { n: 6, title: "Pilih band", desc: "Pilih band yang ingin diatur: Low, LM, Mid, HM, atau High. Knob di bawahnya mengatur band yang dipilih." },
      { n: 7, title: "Freq", desc: "Frekuensi tengah band (di gambar: 1000 Hz)." },
      { n: 8, title: "Gain", desc: "Naikkan atau turunkan volume band dalam dB (di gambar: 0.0 dB)." },
      // CEK: arti Q disimpulkan dari istilah umum EQ (lebar area yang diubah).
      { n: 9, title: "Q", desc: "Lebar area frekuensi yang diubah (di gambar: Q 0.80)." },
      { n: 10, title: "Output", desc: "Atur volume keluaran Equalizer (di gambar: 0.0 dB)." },
    ],
    steps: [
      "Pilih band lewat (6), atau seret titiknya langsung di grafik (5).",
      "Geser Freq (7) ke frekuensi yang ingin diubah.",
      "Naikkan atau turunkan Gain (8), atur lebarnya dengan Q (9).",
      "Kalau volume akhir berubah, sesuaikan lewat Output (10).",
    ],
    tip: "Sebelum menaikkan sesuatu, coba turunkan bagian yang mengganggu dulu. Hasilnya biasanya lebih natural.",
  },
  {
    id: "filter",
    name: "Filter",
    tagline: "Low-pass dan high-pass",
    summary:
      "Filter sederhana dengan satu knob Cutoff: ke kiri jadi low-pass, ke kanan jadi high-pass. Resonansinya diatur lewat knob Reso.",
    image: "/tutorial/filter-annotated.webp",
    imageAlt:
      "Tampilan plugin Filter dengan nomor penjelasan: tombol on off, menu, knob Cutoff, dan knob Reso",
    video: null,
    parts: [
      // CEK: fungsi toggle disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "On / Off", desc: "Nyalakan atau matikan Filter." },
      // CEK: fungsi ikon tiga titik ini belum dipastikan.
      { n: 2, title: "Menu", desc: "Pilihan tambahan plugin." },
      { n: 3, title: "Cutoff", desc: "Titik potong filter. Putar ke kiri jadi low-pass (frekuensi tinggi dibuang), putar ke kanan jadi high-pass (frekuensi rendah dibuang)." },
      // CEK: arti Reso disimpulkan dari nama dan deskripsi plugin (resonansi).
      { n: 4, title: "Reso", desc: "Resonansi: tonjolan suara di sekitar titik cutoff." },
    ],
    steps: [
      "Putar Cutoff (3) ke kiri atau ke kanan sambil mendengarkan hasilnya.",
      "Tambah Reso (4) untuk memberi penekanan di titik potong.",
    ],
    tip: "Putar Cutoff pelan-pelan saat lagu berjalan untuk efek sweep yang halus.",
  },
  {
    id: "autotune",
    name: "AUTOTUNE",
    tagline: "Koreksi pitch real-time",
    summary:
      "Koreksi pitch vokal secara real-time. Orb di tengah menampilkan kunci nada yang terdeteksi, dan FX Mixer menambah lapisan Harmony, Pitch, Double, dan Reverb.",
    image: "/tutorial/autotune-annotated.webp",
    imageAlt:
      "Tampilan plugin AUTOTUNE dengan nomor penjelasan: preset, FX Mixer, A/B, lock, bypass, pengaturan, knob Amount, Speed, Humanize, orb kunci, knob Key, Scale, Output, dan Notes",
    video: null,
    parts: [
      // CEK: fungsi bar preset disimpulkan dari tampilannya (nama “Custom” dan panah kiri-kanan).
      { n: 1, title: "Preset", desc: "Pilih preset. Panah kiri dan kanan untuk berpindah preset." },
      { n: 2, title: "FX Mixer", desc: "Buka mixer lapisan Harmony 1, Harmony 2, Pitch, Double, dan Reverb, masing-masing dengan fader, pan, mute, dan solo." },
      // CEK: fungsi A/B disimpulkan dari bentuknya (dua slot pengaturan).
      { n: 3, title: "A / B", desc: "Dua slot pengaturan yang bisa kamu bandingkan." },
      // CEK: fungsi ikon gembok belum dipastikan.
      { n: 4, title: "Lock", desc: "Kunci pengaturan." },
      // CEK: fungsi Bypass disimpulkan dari namanya (efek dilewati).
      { n: 5, title: "Bypass", desc: "Lewati efek supaya kamu bisa membandingkan suara sebelum dan sesudah koreksi." },
      // CEK: fungsi ikon gerigi disimpulkan dari bentuknya.
      { n: 6, title: "Settings", desc: "Buka pengaturan plugin." },
      // CEK: arti Amount, Speed, dan Humanize disimpulkan dari nama knob dan istilah umum autotune.
      { n: 7, title: "Amount", desc: "Seberapa kuat koreksi pitch (di gambar: 100%)." },
      { n: 8, title: "Speed", desc: "Seberapa cepat nada ditarik ke nada yang benar (di gambar: 90%)." },
      { n: 9, title: "Humanize", desc: "Menjaga hasil tetap terdengar natural (di gambar: 0%)." },
      { n: 10, title: "Orb kunci", desc: "Menampilkan kunci nada yang terdeteksi dari vokal. Tertulis “Listening” saat menunggu suara." },
      { n: 11, title: "Key", desc: "Pilih kunci nada lagumu (di gambar: A)." },
      { n: 12, title: "Scale", desc: "Pilih skala, misalnya Minor (di gambar: Minor)." },
      { n: 13, title: "Output", desc: "Atur volume keluaran AUTOTUNE (di gambar: 0.0 dB)." },
      // CEK: fungsi bar Notes disimpulkan dari tampilannya (tuts nada).
      { n: 14, title: "Notes", desc: "Tuts yang menunjukkan nada-nada yang dipakai." },
    ],
    steps: [
      "Pilih Key (11) dan Scale (12) sesuai lagumu, atau lihat kunci yang terdeteksi di orb (10).",
      "Atur Amount (7) untuk kekuatan koreksi, Speed (8) untuk kecepatannya, dan Humanize (9) supaya tetap natural.",
      "Tambah lapisan Harmony, Double, atau Reverb lewat FX Mixer (2).",
      "Klik Bypass (5) untuk membandingkan sebelum dan sesudah, lalu atur Output (13).",
    ],
    tip: "Pilih Key dan Scale yang benar lebih dulu. Koreksi pitch jauh lebih akurat kalau nadanya sudah sesuai lagu.",
  },
  {
    id: "bpmtune",
    name: "BPMTUNE",
    tagline: "Pencari BPM dan tuner",
    summary:
      "Dua alat dalam satu plugin. Tab BPM mencari tempo dari audio, lalu mengirimnya ke BPM project. Tab Tuner membaca suara dari mic dan menampilkan nama nada, cent, dan Hz.",
    image: "/tutorial/bpmtune-annotated.webp",
    imageAlt:
      "Tampilan plugin BPMTUNE dengan nomor penjelasan: nama audio, tombol tutup, tab BPM, tab Tuner, area drop audio, angka BPM, tombol bagi dua, kali dua, TAP, play, dan SET",
    video: null,
    parts: [
      { n: 1, title: "Nama audio", desc: "Menampilkan nama file yang sedang dipakai. Tertulis “Belum ada audio” kalau belum ada file." },
      { n: 2, title: "Tutup", desc: "Tutup plugin." },
      { n: 3, title: "Tab BPM", desc: "Mencari tempo dari audio. Ini tab yang sedang terbuka di gambar." },
      { n: 4, title: "Tab Tuner", desc: "Membaca suara dari mic dan menampilkan nama nada, cent, dan Hz." },
      { n: 5, title: "Drop audio", desc: "Seret file audio ke sini, atau ketuk area ini untuk memilih file." },
      // CEK: arti tanda “---” disimpulkan dari tampilannya (belum ada hasil).
      { n: 6, title: "Angka BPM", desc: "Tempo hasil analisis. Tanda --- berarti belum ada hasil." },
      { n: 7, title: "÷ 2", desc: "Bagi dua tempo hasil, berguna kalau tempo terbaca dua kali lipat." },
      { n: 8, title: "× 2", desc: "Kali dua tempo hasil, berguna kalau tempo terbaca setengahnya." },
      { n: 9, title: "TAP", desc: "Tap tempo: ketuk mengikuti ketukan lagu untuk mencari BPM." },
      // CEK: fungsi Play disimpulkan dari ikonnya (memutar audio untuk dicek).
      { n: 10, title: "Play", desc: "Putar audio untuk mengecek hasilnya." },
      // CEK: fungsi SET disimpulkan dari deskripsi plugin (mengirim BPM ke project).
      { n: 11, title: "SET", desc: "Kirim tempo hasil ke BPM project." },
    ],
    steps: [
      "Drop file audio ke area (5), atau ketuk area itu untuk memilih file.",
      "Lihat tempo yang muncul di Angka BPM (6).",
      "Kalau tempo terbaca dua kali lipat atau setengahnya, klik ÷ 2 (7) atau × 2 (8).",
      "Atau ketuk TAP (9) mengikuti ketukan lagu untuk mencari tempo secara manual.",
      "Klik SET (11) untuk mengirim tempo ke BPM project.",
    ],
    tip: "Untuk menyetem suara, pindah ke tab Tuner (4) dan nyanyikan atau mainkan satu nada ke mic.",
  },
  {
    id: "printer",
    name: "PRINTER",
    tagline: "Melody Printer",
    summary:
      "Masukkan vokal, lalu melodinya dicetak di kertas sebagai nada MIDI yang sudah dibulatkan. Simpan sebagai file .mid, atau Tear Off langsung ke pattern di timeline.",
    image: "/tutorial/printer-annotated.webp",
    imageAlt:
      "Tampilan plugin PRINTER dengan nomor penjelasan: status, suara, tutup, kertas, timeline, tombol VOCAL, volume vocal, BPM Grid Key, Cetak, REC, PLAY, PRINT, Tear Off, dan .MID",
    video: null,
    parts: [
      { n: 1, title: "Status", desc: "Menampilkan status plugin, misalnya READY." },
      // CEK: fungsi ikon speaker disimpulkan dari bentuknya.
      { n: 2, title: "Suara", desc: "Atur suara pemutaran." },
      { n: 3, title: "Tutup", desc: "Tutup plugin." },
      { n: 4, title: "Kertas", desc: "Tempat melodi dicetak sebagai nada MIDI. Sebelum ada audio tertulis “Masukkan vokal”: drop file audio, ketuk untuk memilih, atau tekan REC." },
      // CEK: fungsi bar ini disimpulkan dari tampilannya (posisi putar dan durasi).
      { n: 5, title: "Timeline", desc: "Menunjukkan posisi putar dan durasi audio." },
      // CEK: fungsi tombol VOCAL dan slider-nya disimpulkan dari nama dan tampilannya.
      { n: 6, title: "VOCAL", desc: "Nyalakan atau matikan suara vokal saat diputar." },
      { n: 7, title: "Volume vocal", desc: "Atur keras-pelan suara vokal (di gambar: 80%)." },
      // CEK: arti Grid dan Key disimpulkan dari nama kolomnya.
      { n: 8, title: "BPM, Grid, Key", desc: "BPM: tempo lagu (awalnya 120). Grid: ketelitian pembulatan nada (awalnya 1/16). Key: kunci nada untuk membulatkan melodi (awalnya Off)." },
      // CEK: fungsi tombol Cetak belum dipastikan.
      { n: 9, title: "Cetak", desc: "Pilihan mode cetak (di gambar: FAST)." },
      // CEK: REC diduga merekam dari mic.
      { n: 10, title: "REC", desc: "Rekam vokal langsung, lalu hasilnya dicetak." },
      { n: 11, title: "PLAY", desc: "Putar hasilnya untuk didengarkan." },
      { n: 12, title: "PRINT", desc: "Cetak melodi dari vokal ke kertas sebagai nada MIDI." },
      { n: 13, title: "Tear Off", desc: "Sobek hasil cetakan dan langsung taruh ke pattern di timeline." },
      { n: 14, title: ".MID", desc: "Simpan hasil cetakan sebagai file .mid." },
    ],
    steps: [
      "Masukkan vokal: drop file audio ke Kertas (4), atau tekan REC (10).",
      "Atur BPM, Grid, dan Key (8) sesuai lagumu.",
      "Klik PRINT (12) supaya melodinya dicetak.",
      "Dengarkan lewat PLAY (11).",
      "Simpan lewat .MID (14), atau pakai Tear Off (13) untuk langsung ke timeline.",
    ],
    tip: "Vokal yang bersih (tanpa noise atau efek) memberi hasil cetakan paling akurat.",
  },
  {
    id: "vocalf",
    name: "VocalF",
    tagline: "Exciter udara vokal",
    summary:
      "Exciter “udara” untuk vokal dengan kontrol Mid Air, High Air, dan Trim. Tambahannya mengecil saat ada desis S, jadi vokal terdengar lebih terbuka tanpa jadi tajam.",
    image: "/tutorial/vocalf-annotated.webp",
    imageAlt:
      "Tampilan plugin VocalF dengan nomor penjelasan: tombol power, menu, knob Mid Air, High Air, dan Trim",
    video: null,
    parts: [
      // CEK: fungsi ikon power disimpulkan dari bentuknya (on/off plugin).
      { n: 1, title: "Power", desc: "Nyalakan atau matikan VocalF." },
      // CEK: fungsi ikon tiga titik ini belum dipastikan.
      { n: 2, title: "Menu", desc: "Pilihan tambahan plugin." },
      // CEK: pembagian Mid Air (menengah) dan High Air (tinggi) disimpulkan dari nama knob.
      { n: 3, title: "Mid Air", desc: "Tambahkan “udara” di frekuensi menengah vokal." },
      { n: 4, title: "High Air", desc: "Tambahkan “udara” di frekuensi tinggi vokal supaya terdengar lebih terbuka." },
      // CEK: arti Trim disimpulkan dari istilah umum (penyesuaian level).
      { n: 5, title: "Trim", desc: "Penyesuaian level hasil akhir." },
    ],
    steps: [
      "Putar Mid Air (3) dan High Air (4) sedikit demi sedikit sambil mendengarkan vokal.",
      "Sesuaikan levelnya dengan Trim (5) kalau suara jadi terlalu keras.",
    ],
    tip: "Tambahan “udara” otomatis mengecil saat ada desis S, jadi kamu bisa menaikkannya tanpa vokal jadi tajam.",
  },
];
