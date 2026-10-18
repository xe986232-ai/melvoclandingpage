"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Users, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import AnnouncementBanner from "@/components/ui/announcement-banner";

const linkCls =
  "block whitespace-nowrap rounded-lg px-3 py-2 font-body text-xs font-medium text-ink-muted transition-colors hover:bg-black/5 hover:text-ink dark:hover:bg-white/5";

// Daftar menu dropdown (desktop). Item yang punya `children` membuka flyout ke kanan.
function MenuList({ items, onNavigate }) {
  const [openIdx, setOpenIdx] = useState(null);
  const lastPointer = useRef("mouse");
  return (
    <ul className="min-w-[170px] rounded-xl border border-black/10 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-base">
      {items.map((c, i) =>
        c.children ? (
          <li
            key={c.name}
            className="relative"
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpenIdx(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOpenIdx(null)}
          >
            <button
              type="button"
              aria-expanded={openIdx === i}
              onPointerDown={(e) => (lastPointer.current = e.pointerType)}
              onClick={() =>
                setOpenIdx(lastPointer.current === "mouse" ? i : openIdx === i ? null : i)
              }
              className={linkCls + " flex w-full items-center justify-between gap-6 text-left"}
            >
              {c.name}
              <ChevronRight size={13} />
            </button>
            {openIdx === i && (
              <div className="absolute left-full top-0 pl-1.5">
                <MenuList items={c.children} onNavigate={onNavigate} />
              </div>
            )}
          </li>
        ) : (
          <li key={c.name}>
            <a href={c.link} onClick={onNavigate} className={linkCls}>
              {c.name}
            </a>
          </li>
        )
      )}
    </ul>
  );
}

// Item menu atas di desktop: biasa (link) atau dropdown (buka lewat hover/klik).
function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const lastPointer = useRef("mouse");

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!item.children) {
    return (
      <a
        href={item.link}
        className="font-body font-medium text-xs text-ink-muted hover:text-ink transition-colors"
      >
        {item.name}
      </a>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onClick={() => setOpen(lastPointer.current === "mouse" ? true : !open)}
        className="flex items-center gap-1 font-body font-medium text-xs text-ink-muted hover:text-ink transition-colors"
      >
        {item.name}
        <ChevronDown size={12} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 pt-3">
          <MenuList items={item.children} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

// Item menu di mobile: link biasa atau accordion (bisa bertingkat).
function MobileNavItem({ item, depth = 0, onNavigate }) {
  const [open, setOpen] = useState(false);
  const base =
    depth === 0
      ? "font-body font-semibold tracking-tight text-xl text-ink py-1.5"
      : "font-body font-medium text-base text-ink-muted py-1.5";

  if (!item.children) {
    return (
      <a
        href={item.link}
        onClick={onNavigate}
        className={cn(base, "block transition-colors hover:text-ink-muted")}
      >
        {item.name}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(base, "flex w-full items-center justify-between text-left")}
      >
        {item.name}
        <ChevronDown size={depth === 0 ? 18 : 16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-3 flex flex-col border-l border-black/10 pl-4 dark:border-white/10">
          {item.children.map((c) => (
            <MobileNavItem key={c.name} item={c} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export const SiteNavbar = ({ navItems, mobileGroups, className }) => {
  const [open, setOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(57);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);
  const groups = mobileGroups || [{ label: "Menu", items: navItems }];
  const { resolvedTheme, setTheme } = useTheme();

  // Tampilan statis: logo, banner, dan status rekrutmen memakai nilai tetap
  // (tidak ada koneksi ke database).
  const banner = { enabled: false, text: "", link: "" };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.getBoundingClientRect().bottom);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
    };
  }, [open]);

  return (
    <>
      <div
        ref={navRef}
        className={cn(
          "sticky top-0 z-[5000] w-full",
          className
        )}
      >
      <AnnouncementBanner
        enabled={banner.enabled}
        text={banner.text}
        link={banner.link}
      />
      <div className="border-b border-black/5 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-ink"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

        <a href="/" className="flex items-center">
  <span className="font-display font-extrabold text-ink text-xl sm:text-2xl leading-none whitespace-nowrap">
    Melvoc
  </span>
</a>
        </div>


        <div className="hidden sm:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <DesktopNavItem key={`nav-${idx}`} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-xs text-ink-muted border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5">
            <Users size={13} />
            180+
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-xs text-ink-muted border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Rekrutmen buka
          </span>
          {mounted && (
            <AnimatedThemeToggler
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              onThemeChange={(t) => setTheme(t)}
            />
          )}
        </div>
      </div>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ top: `${navHeight}px` }}
            data-lenis-prevent
            className="sm:hidden fixed inset-x-0 bottom-0 z-[4999] bg-white dark:bg-base overflow-y-auto"
          >
            <div className="flex flex-col px-6 pt-6 pb-10">
              {groups.map((group, gIdx) => (
                <div key={`group-${gIdx}`} className={gIdx > 0 ? "mt-8" : ""}>
                  <span className="text-xs tracking-[0.3em] uppercase text-ink-dim mb-3 block">
                    {group.label}
                  </span>
                  <div className="flex flex-col">
                    {group.items.map((item, idx) => (
                      <MobileNavItem
                        key={`mnav-${gIdx}-${idx}`}
                        item={item}
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 mt-8">
                <span className="flex items-center gap-1.5 text-xs text-ink-muted border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5">
                  <Users size={13} />
                  180+
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ink-muted border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Rekrutmen buka
                </span>
                {mounted && (
                  <AnimatedThemeToggler
                    theme={resolvedTheme === "dark" ? "dark" : "light"}
                    onThemeChange={(t) => setTheme(t)}
                    className="border border-black/10 dark:border-white/10"
                  />
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
