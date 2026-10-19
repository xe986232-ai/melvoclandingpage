"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// FAQ seputar Melvoc — edit teksnya langsung di sini.
const FAQ_ITEMS = [
  {
    id: "1",
    title: "Apa itu Melvoc?",
    content:
      "Melvoc adalah DAW khusus vokal berbasis web. Kamu bisa menyusun track, mengedit nada di piano roll, memasang plugin dan efek, lalu mixing, semuanya langsung di browser tanpa pasang aplikasi.",
  },
  {
    id: "2",
    title: "Apa bedanya versi Demo dan Full Version?",
    content:
      "Demo gratis untuk mencoba, dengan batas 4 track, timeline 32 bar, dan audio 30 detik, serta tanpa export dan simpan project. Full Version membuka semua fitur dan plugin bawaan tanpa batas, dan diakses dengan akun. Plugin AUTOTUNE dan LIVETUNE tidak termasuk, dibeli terpisah di halaman Plugin.",
  },
  {
    id: "3",
    title: "Apakah perlu download APK?",
    content:
      "Tidak. Melvoc berbasis website, jadi cukup dibuka lewat browser. Kalau mau terasa seperti aplikasi, install ke layar utama: di Android lewat tombol Install atau menu browser, di iPhone lewat Safari > Bagikan > Tambah ke Layar Utama, dan di komputer lewat ikon install di address bar. Di dalam Melvoc juga ada kartu Install aplikasi di Pengaturan.",
  },
  {
    id: "4",
    title: "Bisa dipakai tanpa internet?",
    content:
      "Setelah pertama kali dimuat, Melvoc tersimpan di perangkatmu dan bisa dibuka tanpa internet. Khusus Full Version, perangkat perlu terhubung internet sesekali (maksimal 7 hari) untuk verifikasi lisensi.",
  },
  {
    id: "5",
    title: "Bagaimana cara mengaktifkan Full Version?",
    content:
      "Setelah membeli, kamu mendapat token. Buka Full Version, pilih Aktifkan token, buat akunmu, lalu masuk dengan email dan password. Satu token hanya untuk satu akun dan beberapa perangkat terbatas.",
  },
  {
    id: "6",
    title: "Berapa harga Full Version dan ke mana kalau butuh bantuan?",
    content:
      "Harga Full Version tertera di bagian Pricelist. Kalau ada kendala, hubungi tim support lewat kontak di bagian bawah halaman.",
  },
];

export default function FaqSection() {
  // Default item pertama kebuka, sama kayak contoh "defaultValue" di kode asli.
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-6 sm:px-10 mb-10 text-center"
      >
        <span className="font-body font-semibold text-sm tracking-[0.3em] uppercase text-ink-muted">
          FAQ
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4 text-ink">
          Pertanyaan yang sering ditanyain
        </h2>
        <p className="mt-3 text-ink-muted">
          Belum nemu jawabannya? Hubungi support lewat kontak di bagian bawah halaman.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-6 sm:px-10"
      >
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border-b border-black/10 dark:border-white/10"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display font-bold text-base sm:text-lg text-ink">
                  {item.title}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-ink transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-ink-muted leading-relaxed">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
