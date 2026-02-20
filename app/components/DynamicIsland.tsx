"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Link2, Mail } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useSplash } from "@/app/contexts/SplashContext";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });
const CONTACT_SECTION_ID = "contact-info-section";

export default function DynamicIsland() {
  const [isVisible, setIsVisible] = useState(false);
  const { splashActive, setSplashActive } = useSplash();

  useEffect(() => {
    const contactSection = document.getElementById(CONTACT_SECTION_ID);
    if (!contactSection) return;

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

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const showPills = isVisible;

  return (
    <AnimatePresence>
      {showPills && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 px-2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Left pill - Avatar + Name */}
          <div className="flex flex-col gap-2.5 rounded-[32px] bg-gradient-to-b from-white via-[#fff1fe] via-[#fbe9d9] via-[#dea8ff] to-white p-1.5 dark:from-[#050519] dark:via-[#1a2134] dark:via-[#334254] dark:to-[#020209]">
            <div className="flex h-[44.07px] self-stretch items-center gap-[9.65px] rounded-[172.11px] bg-gradient-to-b from-[#050519] via-[#1a2134] via-[#334254] to-[#020209]">
              <div className="flex items-center gap-[4.2px] rounded-[145.49px] border border-solid border-white/20 bg-gradient-to-b from-[#fbfbfb] to-[#e1e7fb] pl-1 pr-2 pt-0.5 pb-0.5 dark:border-0 dark:bg-[#fcfcfc] dark:pl-1.5">
                <div className="flex h-[42.96px] w-[42.96px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.698px] border-solid border-white/90 bg-[#f9f9f9] dark:border-white/20 dark:bg-[linear-gradient(to_bottom,#3e7bfa,#c7e9e8,#3e7bfa)]">
                  <Image
                    src="/Avatar.svg"
                    alt="Ronnie"
                    width={47}
                    height={47}
                    className="object-cover"
                  />
                </div>
                <span className="font-(family-name:--font-style-script) text-center text-[14.69px] leading-[28.33px] font-normal text-[#212225] dark:text-[#f0f0f0]">
                  Ronniè
                </span>
              </div>
            </div>
          </div>

          {/* Middle pill - Email, hidden on mobile */}
          <div className="middle-pill-outer hidden min-w-[190px] max-w-[280px] md:flex items-center">
            <div className="flex h-[44px] min-w-0 flex-1 items-center justify-between gap-4 rounded-[46px] bg-white px-4 py-3 dark:bg-[#fcfcfc]">
              <span className="truncate font-(family-name:--font-source-serif) text-[12px] leading-[13.32px] text-[#212225] dark:text-[#f0f0f0]">
                Ronniekiyegga@hotmail.com
              </span>
              <div className="flex shrink-0 items-center gap-2 text-[#8d8fae]">
                <User className="h-3.5 w-3.5" />
                <Link2 className="h-3.5 w-3.5" />
                <Mail className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right pill - Let's chat + SplashCursor + Theme (matches header button) */}
          <div className="p-2 pill-outer-cream">
            <div
              className={cn(
                "flex items-center gap-0.5 rounded-full px-1.5 py-0.5",
                "bg-linear-(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%) shadow-[0_0_20px_rgba(59,7,242,0.3)]",
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
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90",
                  styleScript.className,
                )}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
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
                    "size-3 shrink-0 transition-colors",
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
