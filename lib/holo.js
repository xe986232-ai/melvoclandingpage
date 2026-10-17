// Background gradasi holografik (ungu, kuning, pink, biru) -- dipakai di header
// (components/AppHeader.jsx) dan panel "Masih bingung pilih paket?"
// (components/PricingSection.jsx) supaya tampilannya selalu sama.
export const HOLO_BG = {
  backgroundColor: "#e9eeff",
  backgroundImage: [
    "radial-gradient(ellipse 45% 55% at 12% 8%, #c6a6ff 0%, rgba(198,166,255,0) 70%)",
    "radial-gradient(ellipse 40% 50% at 4% 48%, #fff29a 0%, rgba(255,242,154,0) 70%)",
    "radial-gradient(ellipse 40% 55% at 38% 70%, #ffb6e4 0%, rgba(255,182,228,0) 70%)",
    "radial-gradient(ellipse 35% 55% at 70% 30%, #ffd1ee 0%, rgba(255,209,238,0) 70%)",
    "radial-gradient(ellipse 40% 60% at 98% 95%, #86aaff 0%, rgba(134,170,255,0) 70%)",
    "radial-gradient(ellipse 45% 50% at 62% 100%, #bfe6ff 0%, rgba(191,230,255,0) 70%)",
  ].join(","),
};
