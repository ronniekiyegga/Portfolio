"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { BsStars } from "react-icons/bs";
import { RiMenu4Fill } from "react-icons/ri";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import SplashCursor from "@/shared/components/effects/SplashCursor";
import { useSplash } from "@/shared/contexts/SplashContext";
import { useRef, useEffect, useState } from "react";
import {
  HOME_NAV_ITEMS,
  HOME_SECTION_HASH_EVENT,
  isHomeSectionActive,
  scrollToHomeSection,
} from "@/lib/home-nav";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

interface NavV1Props {
  /** When true, nav hides (DynamicIsland is showing) */
  hideWhenBottomNav?: boolean;
}

export default function MainHeader({ hideWhenBottomNav = false }: NavV1Props) {
  const { splashActive, setSplashActive } = useSplash();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromUrl = () => setHash(window.location.hash.slice(1));
    const onCustom = (ev: Event) => {
      const id = (ev as CustomEvent<string>).detail;
      if (typeof id === "string") setHash(id);
    };
    queueMicrotask(syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener(HOME_SECTION_HASH_EVENT, onCustom);
    return () => {
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener(HOME_SECTION_HASH_EVENT, onCustom);
    };
  }, [pathname]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-100 flex items-center justify-center px-4 sm:px-5 md:px-8 py-3 md:py-4 bg-[#FDFBF7] dark:bg-neutral-950/90 backdrop-blur-xl transition-all duration-300 overflow-x-hidden",
          hideWhenBottomNav &&
            "pointer-events-none invisible -translate-y-full",
        )}
      >
        <div className="flex items-center justify-between gap-4 w-full max-w-7xl">
          <motion.div
            variants={navItemVariants}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 shrink"
          >
            <Link
              href="/"
              className="font-jetbrains text-[11px] sm:text-[13px] font-medium tracking-[0.08em] uppercase text-neutral-900 dark:text-neutral-100 no-underline hover:opacity-80 transition-opacity shrink-0"
            >
              RK<span className="text-blue-600 dark:text-blue-400">.</span>
              engineer
            </Link>

            <div
              className="relative shrink-0 flex items-center gap-2 sm:gap-3"
              ref={dropdownRef}
            ></div>
          </motion.div>

          <motion.ul
            variants={navItemVariants}
            className="hidden md:flex list-none shrink-0 items-center gap-5 lg:gap-6"
          >
            {HOME_NAV_ITEMS.map(({ label, id }) => {
              const active = isHomeSectionActive(id, pathname, hash);
              return (
                <motion.li key={id} variants={navItemVariants}>
                  <Link
                    href={`/#${id}`}
                    onClick={(e) =>
                      scrollToHomeSection(id, pathname, setHash, e)
                    }
                    className={cn(
                      "text-[11px] font-medium tracking-tight whitespace-nowrap no-underline transition-colors duration-200 ease-out",
                      active
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                    )}
                  >
                    {label}
                  </Link>
                </motion.li>
              );
            })}
            <motion.li variants={navItemVariants}>
              <div className="rounded-full pill-outer-cream">
                <div className="lets-chat-cream-wrapper">
                  <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                    <Link
                      href="mailto:kiyeggaronnie@gmail.com"
                      className={cn(
                        "flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 no-underline",
                        styleScript.className,
                      )}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                      Let&apos;s chat
                      {/* <span style={{ color: "#00CFDE", fontSize: "14px" }}>
                      →
                    </span> */}
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
                      <BsStars
                        className={cn(
                          "size-4 shrink-0 pill-icon-gradient",
                          splashActive && "text-cyan-400",
                        )}
                      />
                    </button>
                    <div className="h-3 w-px shrink-0 bg-white/20" />
                    <div className="theme-toggle-outer shrink-0 pr-1.5">
                      <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-white">
                        <AnimatedThemeToggler
                          className="size-3.5 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full"
                          duration={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          </motion.ul>

          {/* Mobile: pill-style Let's chat + icons + menu button */}
          <motion.div
            variants={navItemVariants}
            className="flex md:hidden items-center gap-2 shrink-0"
          >
            <div className="rounded-full pill-outer-cream">
              <div className="lets-chat-cream-wrapper">
                <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                  <Link
                    href="mailto:kiyeggaronnie@gmail.com"
                    className={cn(
                      "flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 no-underline",
                      styleScript.className,
                    )}
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-teal-400 text-[14px]" />
                    Let&apos;s chat
                    {/* <span style={{ color: "#00CFDE", fontSize: "12px" }}>→</span> */}
                  </Link>
                  <div className="h-3.5 w-px shrink-0 bg-white/20" />
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
                    <BsStars
                      className={cn(
                        "size-3.5 shrink-0 pill-icon-gradient",
                        splashActive && "text-cyan-400",
                      )}
                    />
                  </button>
                  <div className="h-3 w-px shrink-0 bg-white/20" />
                  <div className="theme-toggle-outer shrink-0 pr-1">
                    <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-white">
                      <AnimatedThemeToggler
                        className="size-3 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full"
                        duration={500}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              aria-label="Open menu"
            >
              <RiMenu4Fill className="size-5" />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9999 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-[#FDFBF7] dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-700 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <span className="font-jetbrains text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -m-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {HOME_NAV_ITEMS.map(({ label, id }) => (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      scrollToHomeSection(id, pathname, setHash);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 text-base text-neutral-700 no-underline transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {splashActive && <SplashCursor TRANSPARENT={true} />}
    </>
  );
}
