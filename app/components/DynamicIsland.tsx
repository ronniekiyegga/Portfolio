"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WiStars } from "react-icons/wi";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useSplash } from "@/app/contexts/SplashContext";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import { MdOutlineDynamicFeed } from "react-icons/md";
import ButtonWidget from "@/app/widgets/ButtonWidget";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const navLinks = [
  { label: "Work", href: "#projects", sectionId: "work" as const },
  { label: "Process", href: "#process", sectionId: "process" as const },
  {
    label: "Experience",
    href: "#experience",
    sectionId: "experience" as const,
  },
  { label: "Design", href: "#design", sectionId: "design" as const },
];

export default function DynamicIsland() {
  const isVisible = useDynamicIslandVisibility();
  const activeSection = useActiveSection();
  const { splashActive, setSplashActive } = useSplash();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const activeIndex = navLinks.findIndex(
      (l) => l.sectionId === activeSection,
    );
    const dot = dotRef.current;
    if (activeIndex < 0 || !navRef.current || !dot) return;
    const link = linkRefs.current[activeIndex];
    if (!link) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = linkRect.left - navRect.left + linkRect.width / 2 - 1.5;
    dot.style.left = `${left}px`;
  }, [activeSection]);

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
          {/* Left pill — Profile + Ronniè (dark: same bg as right pill via lets-chat-*, gradient ring on avatar) */}
          <ButtonWidget>
            <div className="left-pill-wrapper lets-chat-cream-wrapper">
              <div
                className={cn(
                  "left-pill-inner lets-chat-inner flex h-11 items-center gap-2 rounded-full px-1 pr-2 py-1",
                  "border border-white/10 dark:border-white/5",
                )}
              >
                <div
                  className={cn(
                    "shrink-0 rounded-full p-[2px]",
                    "bg-[linear-gradient(135deg,#FFF_54.8%,rgba(251,233,217,0.59)_69.69%,#DEDAF9_86.6%,rgba(240,172,247,0.76)_97.21%)]",
                    "dark:bg-[linear-gradient(148deg,#3E7BFA_37.67%,#60C_71.02%)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center overflow-hidden rounded-full",
                      "bg-[#F9F9F9] dark:bg-[#0a0518]",
                    )}
                  >
                    <Image
                      src="/images/profile/Avatar.svg"
                      alt="Ronnie"
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-normal text-black dark:text-white",
                    styleScript.className,
                  )}
                >
                  Ronniè
                </span>
              </div>
            </div>
          </ButtonWidget>

          {/* Middle pill — Nav links + active dot + icon (hidden on mobile) */}

          <ButtonWidget>
            <div
              ref={navRef}
              className={cn(
                "left-pill-inner lets-chat-inner relative flex gap-4 items-center rounded-full px-8 pr-2 py-4.5",
                "border border-white/10 dark:border-white/5",
              )}
              style={{
                borderRadius: "10.14463rem",
                border: "1.116px solid var(--Gradients-Cream, #FFF)",
                background:
                  "var(--Gradients-White-1, linear-gradient(180deg, #FBFBFB 38.73%, #F7F7F9 100%))",
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = link.sectionId === activeSection;
                return (
                  <Link
                    key={link.label}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "flex justify-center items-center",
                      isActive ? "" : "opacity-40",
                    )}
                  >
                    <span className="font-medium text-[12px]  leading-[14.86px] text-center text-[#000626] dark:text-white/90">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              {activeSection && (
                <div
                  ref={dotRef}
                  className="absolute bottom-2 left-0 size-[3px] rounded-full bg-[#000d4d] dark:bg-white/80 transition-[left] duration-200 ease-out pointer-events-none"
                  aria-hidden
                />
              )}
              <div className="h-4 w-px shrink-0 bg-black/20" />
              <div className="flex items-center gap-[8.92px] pr-3">
                <MdOutlineDynamicFeed
                  className="size-[12.7px] text-[#000626] dark:text-white/90 opacity-40"
                  aria-hidden
                />
              </div>
            </div>
          </ButtonWidget>

          {/* Right pill — same button as header (pill-outer-cream + lets-chat-inner) */}

          <ButtonWidget>
            <div className="right-pill-wrapper lets-chat-cream-wrapper">
              <div className="lets-chat-inner flex items-center gap-0 overflow-hidden p-1">
                <Link
                  href="mailto:kiyeggaronnie@gmail.com"
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 no-underline",
                    styleScript.className,
                  )}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                  Let&apos;s chat
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/20" />
                <button
                  type="button"
                  onClick={() => setSplashActive((prev) => !prev)}
                  className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
                  aria-label={
                    splashActive
                      ? "Disable fluid cursor"
                      : "Enable fluid cursor"
                  }
                >
                  <WiStars
                    className={cn(
                      "size-4 shrink-0 pill-icon-gradient",
                      splashActive && "text-cyan-400",
                    )}
                  />
                </button>
                <div className="h-4 w-px shrink-0 bg-white/20" />
                <div className="theme-toggle-outer shrink-0 pr-1.5">
                  <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-white">
                    <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                  </div>
                </div>
              </div>
            </div>
          </ButtonWidget>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
