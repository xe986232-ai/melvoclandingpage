"use client";

import { motion } from "framer-motion";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.55, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: SMOOTH_EASE },
  },
};

function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ member, colors }) {
  return (
    <motion.li
      variants={itemVariants}
      className="relative h-16 w-16 sm:h-20 sm:w-20"
      title={member.name}
    >
      {/* thin colored ring, no glow/spin — dense grid look */}
      <div
        className="absolute inset-0 rounded-full p-[2px]"
        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
      >
        <div className="h-full w-full rounded-full bg-[#05040A] overflow-hidden">
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center font-display text-sm font-extrabold text-white"
              style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            >
              {initials(member.name)}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

function DivisionGroup({ group }) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-8 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 flex flex-col items-center text-center">
        <span className="font-accent text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
          Divisi
        </span>
        <h2
          className="font-display text-3xl sm:text-4xl font-extrabold mt-1 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${group.colors.from}, ${group.colors.to})`,
          }}
        >
          {group.label}
        </h2>
        <div
          className="mt-3 h-[3px] w-16 rounded-full"
          style={{ background: `linear-gradient(90deg, ${group.colors.from}, ${group.colors.to})` }}
        />
        <span className="font-body text-sm text-white/40 mt-3">
          {group.members.length} anggota aktif
        </span>
      </div>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 sm:gap-4 justify-items-center"
      >
        {group.members.map((member) => (
          <MemberCard key={member.id} member={member} colors={group.colors} />
        ))}
      </motion.ul>
    </section>
  );
}

export default function SopanProfileReveal({ groups, totalCount }) {
  const hasMembers = totalCount > 0;

  return (
    <div className="relative min-h-screen bg-[#05040A] overflow-hidden">
      {/* fixed cinematic backdrop: aurora gradient + grain + vignette */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30 blur-[60px] animate-aurora [background-attachment:fixed]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, #B026FF 10%, #FF2E92 15%, #00E5FF 20%, #3D5AFE 25%, #FFD166 30%)",
            backgroundSize: "200% 100%",
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-[0.06]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, transparent 0%, transparent 35%, #05040A 85%)",
          }}
        />
      </div>

      <div className="relative z-10 pt-28 sm:pt-36 pb-8 px-4 flex flex-col items-center text-center">
        <span className="font-accent text-xs sm:text-sm font-semibold tracking-[0.3em] text-white/40 uppercase mb-4">
          Sopan Team
        </span>
        <h1 className="hero-glitch-in font-hero text-4xl sm:text-6xl font-black text-white leading-tight">
          Kenalan Sama Squad
        </h1>
        {hasMembers && (
          <p className="font-body text-white/50 text-base sm:text-lg mt-5 max-w-md">
            {totalCount} kreator aktif, tiga divisi — Remix, Creator, Leadis.
          </p>
        )}
      </div>

      {hasMembers ? (
        groups.map(
          (group) =>
            group.members.length > 0 && <DivisionGroup key={group.slug} group={group} />
        )
      ) : (
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-24">
          <p className="font-body text-white/50 text-base max-w-sm">
            Belum ada anggota aktif yang ditampilkan di sini.
          </p>
          <a
            href="/gabung"
            className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-2.5 font-display font-bold text-sm text-[#05040A] hover:bg-white/90 transition-colors"
          >
            Gabung Duluan
          </a>
        </div>
      )}

      <div className="relative z-10 pb-20 pt-4 flex justify-center">
        <a
          href="/"
          className="font-body text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
        >
          Kembali ke beranda
        </a>
      </div>
    </div>
  );
}
