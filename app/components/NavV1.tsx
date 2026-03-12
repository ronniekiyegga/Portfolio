"use client";

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { VersionDropdown } from "./v2/VersionDropdown";
import SplashCursor from "./SplashCursor";
import { useSplash } from "@/app/contexts/SplashContext";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

export default function NavV1({ hideWhenBottomNav = false }: NavV1Props) {
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
    href: string
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
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 px-4 sm:px-6 md:px-12 py-4 md:py-5 border-b border-neutral-200/80 dark:border-neutral-700/50 bg-[#F4EFE6]/85 dark:bg-neutral-950/90 backdrop-blur-xl transition-all duration-300 overflow-x-hidden",
        hideWhenBottomNav && "pointer-events-none invisible -translate-y-full"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0 shrink">
        <Link
          href="/"
          className="font-jetbrains text-[11px] sm:text-[13px] font-medium tracking-[0.08em] uppercase text-neutral-900 dark:text-neutral-100 no-underline hover:opacity-80 transition-opacity shrink-0"
        >
          RK<span className="text-blue-600 dark:text-blue-400">.</span>engineer
        </Link>

        <div className="relative shrink-0" ref={dropdownRef}>
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
              className={cn("transition-transform", dropdownOpen && "rotate-180")}
            >
              <path d="M0 0l5 6 5-6z" />
            </svg>
          </button>
          {dropdownOpen && (
            <VersionDropdown
              placement="top"
              currentVersion="v1"
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-10 list-none">
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
          <button
            onClick={() => setSplashActive((prev) => !prev)}
            className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center bg-transparent hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            aria-label={
              splashActive ? "Disable fluid cursor" : "Enable fluid cursor"
            }
          >
            <BsStars
              className={cn(
                "size-4 text-neutral-500 dark:text-neutral-400",
                splashActive && "text-blue-500 dark:text-cyan-400"
              )}
            />
          </button>
        </li>
        <li>
          <AnimatedThemeToggler
            className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center bg-transparent hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors [&_svg]:w-4 [&_svg]:h-4"
            duration={500}
          />
        </li>
        <li>
          <Link
            href="mailto:ronniekiyegga@hotmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 no-underline transition-all hover:bg-blue-600 dark:hover:bg-blue-400"
          >
            Let&apos;s chat →
          </Link>
        </li>
      </ul>

      {/* Mobile: splash toggle + theme + CTA */}
      <div className="flex md:hidden items-center gap-2 shrink-0">
        <button
          onClick={() => setSplashActive((prev) => !prev)}
          className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0"
          aria-label={splashActive ? "Disable fluid cursor" : "Enable fluid cursor"}
        >
          <BsStars
            className={cn(
              "size-4",
              splashActive ? "text-blue-500 dark:text-cyan-400" : "text-neutral-500 dark:text-neutral-400"
            )}
          />
        </button>
        <AnimatedThemeToggler
          className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4"
          duration={500}
        />
        <Link
          href="mailto:ronniekiyegga@hotmail.com"
          className="px-3 py-2 rounded-full text-[11px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 no-underline whitespace-nowrap shrink-0"
        >
          Let&apos;s chat →
        </Link>
      </div>
    </nav>
    {splashActive && <SplashCursor TRANSPARENT={true} />}
    </>
  );
}
