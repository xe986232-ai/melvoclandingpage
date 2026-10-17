import { divisionLabel } from "@/lib/division";
import DivisionImageRingClient from "./DivisionImageRingClient";

// Warna badge per divisi, dipertahankan sama seperti sebelumnya supaya
// identitas visual tiap divisi (Remix/Creator/Leadis) tetap konsisten.
const DIVISION_COLORS = {
  remix: { from: "#B026FF", to: "#FF2E92" },
  creator: { from: "#00E5FF", to: "#3D5AFE" },
  leadis: { from: "#FFD166", to: "#FF6FB5" },
};
const DIVISION_ORDER = ["remix", "creator", "leadis"];
const DEFAULT_COLORS = DIVISION_COLORS.remix;

// Ring ini sengaja diisi MINIMAL 20 kartu supaya nggak keliatan kosong/sepi
// pas member aktif masih dikit (mis. baru 3-4 orang). Slot yang belum
// kepakai member asli ditampilkan sebagai kartu "logo default" (bukan
// wajah member palsu). Begitu ada member baru daftar, satu slot default
// otomatis kegantiin member itu -- kalau member aktif sudah lebih dari 20,
// slot default habis semua dan ring isinya murni member asli (bisa lebih
// dari 20 kartu, ring makin padat/halus).
const MIN_SLOT_COUNT = 20;

function buildPlaceholderSlides(count) {
  return Array.from({ length: count }, (_, i) => {
    const divisionSlug = DIVISION_ORDER[i % DIVISION_ORDER.length];
    const colors = DIVISION_COLORS[divisionSlug];
    return {
      id: `slot-default-${i}`,
      isPlaceholder: true,
      division: divisionLabel(divisionSlug),
      from: colors.from,
      to: colors.to,
    };
  });
}

// Dipakai HANYA kalau Supabase belum di-setup / lagi error total -- biar
// section ini tidak tampil kosong/rusak. Tetap pakai kartu logo default,
// bukan foto placeholder Unsplash lagi.
const FALLBACK_SLIDES = buildPlaceholderSlides(MIN_SLOT_COUNT);

export default function DivisionImageRing() {
  const slides = FALLBACK_SLIDES;
  const activeCount = 0;
  return <DivisionImageRingClient slides={slides} activeCount={activeCount} />;
}
