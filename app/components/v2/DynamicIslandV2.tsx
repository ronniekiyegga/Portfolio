"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsStars } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import { VersionDropdown } from "./VersionDropdown";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const CREAM_GRADIENT =
  "var(--Gradients-Cream-Buttons, linear-gradient(135deg, rgba(255, 255, 255, 0.55) 4.86%, rgba(255, 241, 254, 0.08) 22.6%, rgba(251, 233, 217, 0.29) 35.05%, rgba(222, 168, 255, 0.13) 44.56%, rgba(251, 233, 217, 0.07) 57.23%, rgba(255, 255, 255, 0.42) 85.1%))";

interface DynamicIslandV2Props {
  splashEnabled?: boolean;
  onToggleSplash?: () => void;
}

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

export function DynamicIslandV2({
  splashEnabled,
  onToggleSplash,
}: DynamicIslandV2Props) {
  const isVisible = useDynamicIslandVisibility();
  const activeSection = useActiveSection();
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

  const pillOuter = "rounded-full p-2 shadow-[0_0_20px_rgba(59,7,242,0.08)]";
  const pillRadius = "3rem";

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
          {/* Left pill — Avatar + Ronniè + V1 dropdown (matches design spec) */}
          <div
            className="flex flex-col gap-2.5 p-1.5 rounded-[32px] dynamic-island-left-outer"
            style={{
              boxShadow: "0 0 20px rgba(59,7,242,0.06)",
              background:
                "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.26) 97.21%)",
            }}
          >
            <div
              className="flex gap-[9.65px] self-stretch rounded-full dynamic-island-left-inner"
              style={{
                background:
                  "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.26) 97.21%)",
              }}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 pl-1.5 pr-1.5 py-1 rounded-full",
                  "bg-linear-to-b from-[#f9f9f9] to-[#f6f6f6]",
                  "dark:from-[#0d0d1a] dark:to-[#0a0a12]",
                )}
              >
                <div
                  className={cn(
                    "h-[42.96px] w-[42.96px] shrink-0 overflow-hidden rounded-full dynamic-island-avatar-ring",
                    "border-[1.7px] border-solid border-[#e8e8e8]",
                    "bg-[#f9f9f9] dark:border-transparent dark:bg-[#0a0a12]",
                  )}
                >
                  <Image
                    src="/Avatar.svg"
                    alt="Ronniè"
                    width={43}
                    height={43}
                    className="size-full object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "font-normal text-[#212225] dark:text-white shrink-0",
                    styleScript.className,
                  )}
                  style={{ fontSize: "14px", lineHeight: "1.2" }}
                >
                  Ronniè
                </span>
                <div className="flex items-center gap-1 shrink-0 -ml-0.5" ref={dropdownRef}>
                  <div
                    className="h-[2.73px] w-[2.73px] shrink-0 rounded-full"
                    style={{ background: "#000d4d" }}
                  />
                  <div className="relative flex items-center">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-outfit text-[12px] transition-colors",
                        "bg-white/10 dark:bg-[#0d0d1a]",

                        "text-(--muted) hover:text-(--text)",
                      )}
                    >
                      V2
                      <svg
                        width="8"
                        height="6"
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
                        onClose={() => setDropdownOpen(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle pill — Nav links + active dot */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-0.5 dynamic-island-middle-outer",
              pillOuter,
            )}
            style={{
              borderRadius: pillRadius,
              background: CREAM_GRADIENT,
            }}
          >
            <div
              className={cn(
                "flex items-center gap-6 rounded-full px-6 py-2.5",
                "bg-white/95 dark:bg-[#0d0d1a]",
                "border border-white/30 dark:border-0",
              )}
              style={{ borderRadius: pillRadius }}
            >
              {navLinks.map((link) => {
                const isActive = link.sectionId === activeSection;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative flex flex-col items-center gap-1 py-1 transition-colors hover:opacity-100"
                    style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
                  >
                    <span className="font-outfit text-[12px]">
                      {link.label}
                    </span>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-opacity",
                        link.sectionId &&
                          (isActive ? "opacity-100" : "opacity-0"),
                      )}
                      style={{
                        background: "var(--text)",
                        ...(!link.sectionId && { opacity: 0 }),
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right pill — Same structure as V1: pill-outer-cream + lets-chat-inner */}
          <div className="p-[2px] rounded-full pill-outer-cream">
            <div
              className={cn(
                "flex items-center gap-0 rounded-full px-2 py-1.5",
                "lets-chat-inner",
              )}
              style={{
                backgroundImage: "url(/BG_1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link
                href="mailto:contact@ronniekiyegga.com"
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90",
                  styleScript.className,
                )}
              >
                <span>Let&apos;s chat</span>
                <span style={{ color: "#00CFDE", fontSize: "14px" }}>→</span>
              </Link>
              <div className="h-4 w-px shrink-0 bg-white/30" />
              <button
                type="button"
                onClick={() => onToggleSplash?.()}
                className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
                aria-label={
                  splashEnabled ? "Disable fluid cursor" : "Enable fluid cursor"
                }
              >
                <BsStars
                  className={cn(
                    "size-3 shrink-0",
                    splashEnabled && "text-cyan-400",
                  )}
                />
              </button>
              <div className="h-3 w-px shrink-0 bg-white/30" />
              <div className="theme-toggle-outer shrink-0 pr-1.5">
                <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                  <AnimatedThemeToggler className="size-3 shrink-0 text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
