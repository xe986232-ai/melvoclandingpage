"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import AnnouncementBanner from "@/components/ui/announcement-banner";

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
            <a
              key={`nav-${idx}`}
              href={item.link}
              className="font-body font-medium text-xs text-ink-muted hover:text-ink transition-colors"
            >
              {item.name}
            </a>
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
                      <a
                        key={`mnav-${gIdx}-${idx}`}
                        href={item.link}
                        onClick={() => setOpen(false)}
                        className="font-body font-semibold tracking-tight text-xl text-ink py-1.5 transition-colors hover:text-ink-muted"
                      >
                        {item.name}
                      </a>
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
