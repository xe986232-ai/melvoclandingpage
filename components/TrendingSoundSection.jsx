import TrendingSoundPlayer from "./TrendingSoundPlayer";

// Fallback kalau tabel `trending_sounds` belum di-setup / Supabase lagi
// error, biar homepage tetap tampil bagus persis kayak sebelumnya (data
// placeholder yang sama seperti isi awal migration_trending_sounds.sql).
const DEFAULT_TRACKS = [
  {
    id: "trend-01",
    title: "Shiver",
    creator: "John Summit & Hayla",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    durationFallback: 234,
    cover: "https://picsum.photos/seed/sopan-shiver/700/800",
    panelColor: "#0d2530",
  },
  {
    id: "trend-02",
    title: "Say Nothing",
    creator: "Flume & MAY-A",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    durationFallback: 233,
    cover: "https://picsum.photos/seed/sopan-saynothing/700/800",
    panelColor: "#2b1911",
  },
  {
    id: "trend-03",
    title: "Innerbloom",
    creator: "RÜFÜS DU SOL",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    durationFallback: 238,
    cover: "https://picsum.photos/seed/sopan-innerbloom/700/800",
    panelColor: "#211a29",
  },
];

export default function TrendingSoundSection() {
  const tracks = DEFAULT_TRACKS;

  // TrendingSoundPlayer ("use client") yang render <section>, heading, dan
  // seluruh stage 3D interaktif -- di sini cuma tanggung jawab ambil data
  // dari database (Server Component, boleh pakai admin client).
  return <TrendingSoundPlayer tracks={tracks} />;
}
