"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Mail } from "lucide-react";
import { GoLink } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useSplash } from "@/app/contexts/SplashContext";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });
const HERO_SECTION_ID = "hero-section";

export default function DynamicIsland() {
  const [isVisible, setIsVisible] = useState(false);
  const { splashActive, setSplashActive } = useSplash();

  useEffect(() => {
    const heroSection = document.getElementById(HERO_SECTION_ID);
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        // Trigger when hero has scrolled ~40% out of view (earlier, before lamp)
        rootMargin: "0px 0px -40% 0px",
      },
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const showPills = isVisible;

  return (
    <AnimatePresence>
      {showPills && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 px-2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Left pill - Avatar + Name */}
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-full p-2",
              "bg-linear-(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.2) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.2) 97.21%) shadow-[0_0_20px_rgba(59,7,242,0.1)]",
              "dark:pill-inner-dark",
            )}
            style={{
              borderRadius: "var(--Corner-radius-32, 2rem)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 4.86%, rgba(255, 241, 254, 0.08) 22.6%, rgba(251, 233, 217, 0.29) 35.05%, rgba(222, 168, 255, 0.13) 44.56%, rgba(251, 233, 217, 0.07) 57.23%, rgba(255, 255, 255, 0.42) 85.1%)",
            }}
          >
            <div
              className="flex h-[45px] self-stretch items-center gap-[9.65px] dark:border-linear-gradient(144deg, rgba(62, 123, 250, 0.74) 3.63%, rgba(102, 0, 204, 0.74) 94.05%); rounded-[172.11px] bg-linear-to-b from-[#050519] via-[#334254] to-[#020209]"
              style={{
                borderRadius: "9.093rem",
                background:
                  "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.26) 97.21%)",
              }}
            >
              {/* ... image container ... */}
              <div className="flex items-center gap-[4.2px] rounded-[145.49px] bg-white dark:bg-[url('/BG_1.png')]  border border-solid border-white/20 pl-1 pr-2 pt-0.5 pb-0.5 dark:border-0 dark:bg-[#fcfcfc]  dark:text-white">
                <div
                  className={cn(
                    "flex h-[42.96px] w-[42.96px] shrink-0 items-center justify-center overflow-hidden rounded-full",
                    "border-[1.698px] border-solid border-white/90",
                    "[background:linear-gradient(180deg,#FBFBFB_68.72%,#E1E7FB_130.66%)]",
                    "dark:border-0 dark:p-[1.698px] dark:[background:linear-gradient(144deg,rgba(62,123,250,0.74)_3.63%,rgba(102,0,204,0.74)_94.05%)]",
                  )}
                >
                  <div className="size-full overflow-hidden rounded-full bg-inherit dark:bg-[#0a0a12]">
                    <Image
                      src="/Avatar.svg"
                      alt="Ronnie"
                      width={47}
                      height={47}
                      className="size-full object-cover"
                    />
                  </div>
                </div>
                <span className="font-(family-name:--font-style-script) px-1 text-center text-[14.69px] leading-[28.33px] font-normal text-[#212225] dark:text-white">
                  Ronniè
                </span>
              </div>
            </div>
          </div>

          {/* Middle pill - Email, hidden on mobile */}
          <div
            className={cn(
              "items-center gap-0.5 rounded-full p-2 hidden md:flex",
              "bg-linear-(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.2) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.2) 97.21%) shadow-[0_0_20px_rgba(59,7,242,0.1)]",
              "dark:pill-inner-dark",
            )}
            style={{
              borderRadius: "var(--Corner-radius-32, 2rem)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 4.86%, rgba(255, 241, 254, 0.08) 22.6%, rgba(251, 233, 217, 0.29) 35.05%, rgba(222, 168, 255, 0.13) 44.56%, rgba(251, 233, 217, 0.07) 57.23%, rgba(255, 255, 255, 0.42) 85.1%)",
            }}
          >
            <div
              className="flex py-4.5 min-w-0 flex-1 items-center justify-between gap-4 rounded-[46px] bg-white px-8  dark:bg-[#0d0d1a]  "
              style={{
                border:
                  "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%)",
              }}
            >
              <span className="min-w-0 flex-1 font-(family-name:--font-source-serif) text-xs leading-[13.32px] text-[#212225] dark:text-white">
                Ronniekiyegga@hotmail.com
              </span>
              <div className="flex shrink-0 items-center gap-1 text-[#8d8fae] dark:text-white/70">
                <div className="h-3.5 w-px shrink-0 bg-transparent dark:bg-white/20" />
                <User className="h-3.5 w-3.5" />
                <div className="h-3.5 w-px shrink-0 bg-transparent dark:bg-white/20" />
                <GoLink className="h-3.5 w-3.5" />
                <div className="h-3.5 w-px shrink-0 bg-transparent dark:bg-white/20" />
                <Mail className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right pill - Let's chat + Theme (matches header button) */}
          <div className="p-2 pill-outer-cream">
            <div
              className={cn(
                "flex items-center gap-0.5 rounded-full px-1.5 py-1 ",
                "bg-linear-(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.2) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.2) 97.21%) shadow-[0_0_20px_rgba(59,7,242,0.1)]",
                "dark:pill-inner-dark",
              )}
              style={{
                backgroundImage: "url(/BG_1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link
                href="mailto:ronniekiyegga@hotmail.com"
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm text-nowrap font-medium text-white transition-opacity hover:opacity-90",
                  styleScript.className,
                )}
              >
                {/* <span className="size-1.5 shrink-0 rounded-full bg-teal-400 text-nowrap animate-ping" /> */}
                <span className="relative flex size-3">
                  <span className="absolute -top-0.5 -left-0.5 inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                Let&apos;s chat
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
                    "size-3.5 shrink-0 transition-colors",
                    splashActive && "text-cyan-400",
                  )}
                />
              </button>
              <div className="h-3.5 w-px shrink-0 bg-white/20" />
              <div className="theme-toggle-outer shrink-0 pr-1.5">
                <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                  <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-neutral-400 dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
