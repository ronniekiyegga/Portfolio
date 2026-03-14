"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WiStars } from "react-icons/wi";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useSplash } from "@/app/contexts/SplashContext";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import { VersionDropdown } from "./v2/VersionDropdown";
import { HiOutlineLink, HiOutlineMail } from "react-icons/hi";
import ButtonWidget from "@/app/widgets/ButtonWidget";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const pillOuterGradient =
  "bg-gradient-to-b from-white via-[#fff1fe] via-[#fbe9d9] via-[#dea8ff] to-white dark:from-[#0f0f18] dark:via-[#0f0f18] dark:to-[#0f0f18]";

export default function DynamicIsland() {
  const isVisible = useDynamicIslandVisibility();
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
          {/* Left pill — Profile + Ronniè + V1 dropdown */}
          <ButtonWidget>
            <div
              className="bg-white rounded-full"
              // className={cn(
              //   "flex flex-col gap-2.5 rounded-[32px] p-1.5",
              //   pillOuterGradient,
              //   "shadow-[0_0_20px_rgba(59,7,242,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
              // )}
            >
              <div
                className={cn(
                  "flex h-11 items-center gap-2 rounded-full px-1 pr-2 py-1",
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 4.86%, rgba(255, 241, 254, 0.08) 22.6%, rgba(251, 233, 217, 0.29) 35.05%, rgba(222, 168, 255, 0.13) 44.56%, rgba(251, 233, 217, 0.07) 57.23%, rgba(255, 255, 255, 0.42) 85.1%)",
                  "dark:from-[#0d0d1a] dark:via-[#0d0d1a] dark:to-[#0d0d1a]",
                  "border border-white/10",
                )}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e1e7fb] bg-gradient-to-b from-[#fbfbfb] to-[#e1e7fb] dark:border-white/10 dark:from-[#1a1a24] dark:to-[#0a0a12]"
                  style={{
                    borderRadius: "894.93506rem",
                    border: "1.698px solid var(--Gradients-Cream, #FFF)",
                    background: "#F9F9F9",
                  }}
                >
                  <Image
                    src="/Avatar.svg"
                    alt="Ronnie"
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "text-sm font-normal text-[#212225] dark:text-white",
                    styleScript.className,
                  )}
                >
                  Ronniè
                </span>
                {/* <div className="relative ml-1" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 font-jetbrains text-[10px] tracking-widest uppercase text-white/80 transition-colors hover:bg-white/20"
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
                </div> */}
              </div>
            </div>
          </ButtonWidget>

          {/* Middle pill — Email + icons only (single pill, matches first image) */}
          <ButtonWidget >
            <div
              className={cn(
                "items-center justify-between rounded-full gap-2 px-4 py-3 hidden md:flex",
                "bg-linear-to-b from-[#fbfbfb] to-[#f7f7f9] dark:from-[#0d0d1a] dark:to-[#0a0a12] rounded-full",
                "border border-[#e5e7eb] dark:border-white/10 rounded-full",
              )}
            >
              <Link
                href="mailto:ronniekiyegga@hotmail.com"
                className="text-xs text-[#000626] no-underline transition-opacity hover:opacity-80 dark:text-white/90"
              >
                Ronniekiyegga@hotmail.com
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  aria-label="Home"
                  className="flex size-5 items-center justify-center text-[#8d8fae] transition-colors hover:text-[#212225] dark:hover:text-white"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ronniekiyegga"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-5 items-center justify-center text-[#8d8fae] transition-colors hover:text-[#212225] dark:hover:text-white"
                >
                  <HiOutlineLink className="size-3.5" />
                </Link>
                <Link
                  href="mailto:ronniekiyegga@hotmail.com"
                  aria-label="Email"
                  className="flex size-5 items-center justify-center text-[#8d8fae] transition-colors hover:text-[#212225] dark:hover:text-white"
                >
                  <HiOutlineMail className="size-3.5" />
                </Link>
              </div>
            </div>
          </ButtonWidget>

          {/* Right pill — same button as header (pill-outer-cream + lets-chat-inner) */}

          <ButtonWidget>
            <div className="lets-chat-cream-wrapper">
              <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                <Link
                  href="mailto:ronniekiyegga@hotmail.com"
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
