"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WiStars } from "react-icons/wi";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import { useSplash } from "@/shared/contexts/SplashContext";
import { useDynamicIslandVisibility } from "@/shared/hooks/useDynamicIslandVisibility";
import {
  HOME_NAV_ITEMS,
  HOME_SECTION_HASH_EVENT,
  isHomeSectionActive,
  scrollToHomeSection,
} from "@/lib/home-nav";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import ButtonWidget from "@/shared/components/sections/ButtonWidget";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function DynamicIsland() {
  const isVisible = useDynamicIslandVisibility();
  const { splashActive, setSplashActive } = useSplash();
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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
          {/* Left pill */}
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
                      "relative size-10 shrink-0 overflow-hidden rounded-full",
                      "bg-[#F9F9F9] dark:bg-[#0a0518]",
                    )}
                  >
                    <Image
                      src="/lanyard/Ronnie.webp"
                      alt="Ronnie"
                      fill
                      sizes="40px"
                      className="object-contain object-center"
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

          {/* Middle pill */}
          <ButtonWidget className="hidden md:flex">
            <div
              className={cn(
                "island-middle-nav-pill flex min-h-11 items-center justify-center rounded-full border border-neutral-200/85 bg-white",
                "px-4 pt-3 pb-1.5 shadow-[0_6px_28px_-6px_rgba(15,23,42,0.1),0_2px_10px_-2px_rgba(99,102,241,0.12)]",
                "dark:border-white/10",
              )}
              style={{ borderRadius: "10.14463rem" }}
            >
              <nav
                className="flex shrink-0 flex-nowrap items-center justify-center gap-x-4 px-1 sm:gap-x-5 sm:px-2"
                aria-label="On this page"
              >
                {HOME_NAV_ITEMS.map(({ label, id }) => {
                  const active = isHomeSectionActive(id, pathname, hash);
                  return (
                    <a
                      key={id}
                      href={`/#${id}`}
                      onClick={(e) => scrollToHomeSection(id, pathname, setHash, e)}
                      className={cn(
                        "flex shrink-0 flex-col items-center justify-center gap-0.5 text-center text-[11px] font-medium leading-none tracking-tight no-underline duration-200 ease-out",
                        "transition-[color,opacity]",
                        active
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-400 hover:text-neutral-600 dark:text-white/55 dark:hover:text-white/85",
                      )}
                    >
                      <span className="whitespace-nowrap">{label}</span>
                      <span
                        className={cn(
                          "size-1 shrink-0 rounded-full bg-neutral-500 duration-200 ease-out dark:bg-neutral-300",
                          "transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                        aria-hidden
                      />
                    </a>
                  );
                })}
              </nav>
            </div>
          </ButtonWidget>

          {/* Right pill */}
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
                  aria-label={splashActive ? "Disable fluid cursor" : "Enable fluid cursor"}
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
