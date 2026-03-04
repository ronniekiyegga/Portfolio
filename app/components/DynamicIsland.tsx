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
              "dark:!bg-[#0f0f18] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
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
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/90 bg-gradient-to-b from-[#FBFBFB] to-[#E1E7FB] dark:border-0 dark:bg-[#0a0a12]">
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
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 font-jetbrains text-[10px] tracking-[0.1em] uppercase px-2 py-1 rounded-full border transition-colors"
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
                  <div
                    className="absolute bottom-full left-0 mb-2 min-w-[160px] rounded-xl border overflow-hidden shadow-xl z-50 py-1"
                    style={{
                      background: "var(--dropdown-bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <Link
                      href="https://www.ronniekiyegga.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between px-3 py-2 text-[10px] no-underline transition-colors hover:bg-white/5"
                      style={{ color: "var(--muted)" }}
                    >
                      <span style={{ color: "var(--text)" }}>Version 1</span>
                      <span
                        className="text-[8px] px-1.5 py-0.5 rounded"
                        style={{
                          background: "var(--tag-bg)",
                          color: "var(--tag-color)",
                        }}
                      >
                        Live
                      </span>
                    </Link>
                    <div
                      style={{ height: "1px", background: "var(--border)" }}
                    />
                    <div
                      className="px-3 py-2 text-[10px]"
                      style={{ color: "var(--muted)" }}
                    >
                      <span style={{ color: "var(--text)" }}>Version 2</span>
                      <span
                        className="ml-1 text-[8px] px-1.5 py-0.5 rounded"
                        style={{
                          background: "var(--tag-bg)",
                          color: "var(--tag-color)",
                        }}
                      >
                        New
                      </span>
                    </div>
                  </div>
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

          {/* Right pill — Dark gradient: Let's chat | star | moon (solid) */}
          <div className="p-[2px] rounded-full pill-outer-cream">
            <div
              className={cn(
                "flex items-center gap-0 rounded-full px-2 py-1.5",
                "lets-chat-inner",
              )}
            >
              <Link
                href="mailto:contact@ronniekiyegga.com"
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90",
                  styleScript.className,
                )}
              >
                Let&apos;s chat
              </Link>
              <div className="h-4 w-px shrink-0 bg-white/30" />
              <button
                type="button"
                onClick={() => setSplashActive((prev) => !prev)}
                className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/10"
                aria-label={
                  splashActive ? "Disable fluid cursor" : "Enable fluid cursor"
                }
              >
                <BsStars
                  className={cn(
                    "size-4 shrink-0",
                    splashActive && "text-cyan-400",
                  )}
                />
              </button>
              <div className="h-4 w-px shrink-0 bg-white/30" />
              <div className="theme-toggle-outer shrink-0 pr-2">
                <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                  <AnimatedThemeToggler className="size-4 shrink-0 text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
