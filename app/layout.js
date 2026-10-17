import { Unbounded, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// Kept ONLY for the "SOPAN TEAM" hero title — do not use elsewhere.
const hero = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-hero",
});

// Outfit is now the site-wide font (headings + body), with a wide weight
// range so we can vary bold/regular across sections instead of everything
// looking the same.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

// Space Grotesk — dipakai khusus untuk label/tag aksen kecil (mis. nama
// divisi berwarna) supaya beda karakter dari body/heading, tanpa
// mengganggu Unbounded yang direservasi untuk hero title.
const accent = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-accent",
});

export const metadata = {
  title: { default: "Melvoc — DAW Vocal", template: "%s | Melvoc" },
  description:
    "Melvoc adalah aplikasi DAW khusus vocal untuk Android: rekam, edit, dan mixing vocal. Tersedia versi Demo dan Full.",
  openGraph: {
    title: "Melvoc — DAW Vocal",
    description: "Rekam, edit, dan mixing vocal langsung dari HP.",
    siteName: "Melvoc",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${hero.variable} ${outfit.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased bg-base text-ink">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
