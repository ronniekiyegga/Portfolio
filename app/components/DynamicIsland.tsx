"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsStars } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useSplash } from "@/app/contexts/SplashContext";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import { VersionDropdown } from "./v2/VersionDropdown";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const navLinks = [
  { label: "Work", href: "#work", sectionId: "work" as const },
  { label: "Design", href: "#design", sectionId: "design" as const },
  { label: "Process", href: "#process", sectionId: "process" as const },
  {
    label: "Experience",
    href: "#experience",
    sectionId: "experience" as const,
  },
  { label: "Blog", href: "/blog", sectionId: null },
];

export default function DynamicIsland() {
  const isVisible = useDynamicIslandVisibility();
  const activeSection = useActiveSection();
  const { splashActive, setSplashActive } = useSplash();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 px-2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Left pill — Avatar + Ronnie + V1 dropdown (solid cream/dark) */}
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-full p-2",
              "shadow-[0_0_20px_rgba(59,7,242,0.1)]",
              "bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_4.86%,rgba(251,233,217,0.9)_35.05%,rgba(222,168,255,0.75)_44.56%,rgba(255,255,255,0.9)_85.1%)]",
              "dark:bg-[#0f0f18]! dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
            )}
            style={{ borderRadius: "2rem" }}
          >
            <div
              className={cn(
                "flex items-center gap-2 pl-1 pr-2 py-1 rounded-full",
                "bg-white dark:bg-[#0d0d1a]",
                "border border-white/20 dark:border-0",
              )}
              style={{ borderRadius: "9rem" }}
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/90 bg-linear-to-b from-[#FBFBFB] to-[#E1E7FB] dark:border-0 dark:bg-[#0a0a12]">
                <Image
                  src="/Avatar.svg"
                  alt="Ronnie"
                  width={36}
                  height={36}
                  className="size-full object-cover"
                />
              </div>
              <span
                className={cn("text-[14px] font-normal", styleScript.className)}
                style={{ color: "var(--text)" }}
              >
                Ronnie
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-(--muted)" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 font-jetbrains text-[10px] tracking-widest uppercase px-2 py-1 rounded-full border transition-colors"
                  style={{
                    color: "var(--muted)",
                    background: "var(--pill-bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  V1
                  <svg
                    width="6"
                    height="4"
                    viewBox="0 0 10 6"
                    fill="currentColor"
                    className={cn(
                      "transition-transform",
                      dropdownOpen && "rotate-180",
                    )}
                  >
                    <path d="M0 0l5 6 5-6z" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <VersionDropdown
                    placement="bottom"
                    currentVersion="v1"
                    onClose={() => setDropdownOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Middle pill — Nav links + active dot (solid cream/dark) */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-0.5 rounded-full p-2",
              "shadow-[0_0_20px_rgba(59,7,242,0.1)]",
              "bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_4.86%,rgba(251,233,217,0.3)_35.05%,rgba(222,168,255,0.75)_44.56%,rgba(255,255,255,0.1)_85.1%)]",
              "dark:bg-[#0f0f186d]! dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
            )}
            style={{ borderRadius: "2rem" }}
          >
            <div
              className={cn(
                "flex items-center gap-6 rounded-full px-6 py-2.5",
                "bg-white dark:bg-[#0d0d1a]",
                "border border-white/20 dark:border-0",
              )}
              style={{ borderRadius: "2rem" }}
            >
              {navLinks.map((link) => {
                const isActive = link.sectionId === activeSection;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative flex flex-col items-center gap-1 py-0.5 transition-colors hover:opacity-100"
                    style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
                  >
                    <span className="font-outfit text-[13px]">
                      {link.label}
                    </span>
                    {link.sectionId && (
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                        style={{ background: "var(--text)" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right pill — cream outer (padding matches left), white inner, Let's chat + icons */}
          <div className="rounded-full pill-outer-cream">
            <div className="pill-right-inner flex items-center gap-0 rounded-full overflow-hidden">
              <div className="lets-chat-cream-wrapper shrink-0">
                <Link
                  href="mailto:ronniekiyegga@hotmail.com"
                  className={cn(
                    "lets-chat-inner flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90",
                    styleScript.className,
                  )}
                >
                  <span>Let&apos;s chat</span>
                  <span style={{ color: "#00CFDE", fontSize: "14px" }}>→</span>
                </Link>
              </div>
              <div className="pill-icons-white flex items-center gap-0 pl-2 pr-2 py-3">
                <div className="h-4 w-px shrink-0 bg-black/10 dark:bg-white/30" />
                <button
                  type="button"
                  onClick={() => setSplashActive((prev) => !prev)}
                  className="rounded-full p-2 text-black/70 dark:text-white/90 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label={
                    splashActive
                      ? "Disable fluid cursor"
                      : "Enable fluid cursor"
                  }
                >
                  <BsStars
                    className={cn(
                      "size-4 shrink-0 pill-icon-gradient",
                      splashActive && "dark:text-cyan-400",
                    )}
                  />
                </button>
                <div className="h-4 w-px shrink-0 bg-black/10 dark:bg-white/30" />
                <div className="theme-toggle-outer shrink-0 pr-2">
                  <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-gradient">
                    <AnimatedThemeToggler className="size-4 shrink-0 text-black dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
