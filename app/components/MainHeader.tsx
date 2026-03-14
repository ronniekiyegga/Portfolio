"use client";

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { RiMenu4Fill } from "react-icons/ri";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { VersionDropdown } from "./v2/VersionDropdown";
import SplashCursor from "./SplashCursor";
import { useSplash } from "@/app/contexts/SplashContext";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Design", href: "#design" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
];

interface NavV1Props {
  /** When true, nav hides (DynamicIsland is showing) */
  hideWhenBottomNav?: boolean;
}

export default function MainHeader({ hideWhenBottomNav = false }: NavV1Props) {
  const { splashActive, setSplashActive } = useSplash();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-100 flex items-center justify-center px-4 sm:px-5 md:px-8 py-3 md:py-4 border-b border-neutral-200/80 dark:border-neutral-700/50 bg-[#FEFBF1] dark:bg-neutral-950/90 backdrop-blur-xl transition-all duration-300 overflow-x-hidden",
          hideWhenBottomNav &&
            "pointer-events-none invisible -translate-y-full",
        )}
      >
        <div className="flex items-center justify-between gap-4 w-full max-w-7xl">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 shrink">
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
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 font-jetbrains text-[9px] sm:text-[10px] tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-transparent hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                V1
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
              <Link
                href="/Ronnie%20Kiyegga%20-%20SWE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jetbrains text-[9px] sm:text-[10px] tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-transparent hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors no-underline"
              >
                Resume
              </Link>
              {dropdownOpen && (
                <VersionDropdown
                  placement="top"
                  currentVersion="v1"
                  onClose={() => setDropdownOpen(false)}
                  anchorRef={dropdownRef}
                />
              )}
            </div>
          </div>

          <ul className="hidden md:flex items-center gap-6 list-none shrink-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[13px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline tracking-[0.02em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <div className="rounded-full pill-outer-cream">
                <div className="lets-chat-cream-wrapper">
                  <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                    <Link
                      href="mailto:ronniekiyegga@hotmail.com"
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
            </li>
          </ul>

          {/* Mobile: pill-style Let's chat + icons + menu button */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <div className="rounded-full pill-outer-cream">
              <div className="lets-chat-cream-wrapper">
                <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                  <Link
                    href="mailto:ronniekiyegga@hotmail.com"
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
          </div>
        </div>
      </nav>

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
          <div className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-[#FEFBF1] dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-700 shadow-xl flex flex-col">
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
            <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 text-base text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Link
                  href="/Ronnie%20Kiyegga%20-%20SWE.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-base text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors no-underline block"
                >
                  Resume
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
      {splashActive && <SplashCursor TRANSPARENT={true} />}
    </>
  );
}
