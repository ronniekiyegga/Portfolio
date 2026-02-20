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
          <div className="flex p-[2px] pill-light pill-dark-left">
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
              style={{
                borderRadius: "10.31175rem",
                border: "1.134px solid var(--Gradients-Cream, #FFF)",
                background: "var(--Gradients-White-1)",
              }}
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src="/Avatar.svg"
                  alt="Ronnie"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-neutral-800 dark:text-neutral-100 font-(family-name:--font-style-script) text-xs font-medium">
                Ronnie
              </span>
            </div>
          </div>

          {/* Middle pill - Email (slightly bigger), hidden on mobile */}
          <div className="hidden min-w-[190px] max-w-[280px] p-[2px] md:flex pill-light pill-dark-left">
            <div
              className="flex flex-1 items-center justify-between gap-4 rounded-full px-4 py-4"
              style={{
                borderRadius: "10.31175rem",
                border: "1.134px solid var(--Gradients-Cream, #FFF)",
                background: "var(--Gradients-White-1)",
              }}
            >
              <span className="truncate font-(family-name:--font-source-serif) text-xs text-neutral-800 dark:text-neutral-100">
                Ronniekiyegga@dmi.com
              </span>
              <div className="flex shrink-0 items-center gap-2 text-gray-400 dark:text-gray-500">
                <User className="h-3.5 w-3.5" />
                <Link2 className="h-3.5 w-3.5" />
                <Mail className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right pill - Let's chat + SplashCursor + Theme */}
          <div className="flex p-[2px] pill-light pill-dark-right">
            <div
              className="flex items-center gap-1.5 p-[2px]"
              style={{
                borderRadius: "1.38813rem",
                background: "var(--Gradients-Button-Outer)",
                boxShadow:
                  "0 0 0.996px 0 rgba(0, 0, 0, 0.08) inset, 0 0.747px 0 0 rgba(255, 255, 255, 0.10)",
              }}
            >
              <Link
                href="mailto:ronniekiyegga@dmi.com"
                className="flex items-center rounded-full px-3 py-1.5 font-(family-name:--font-style-script)  text-sm font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{
                  borderRadius: "1.38813rem",
                  background: "var(--BG-Black-2)",
                  boxShadow:
                    "0 1.378px 1.102px 0 rgba(0, 0, 0, 0.12), 0 1.494px 1.494px 0 rgba(0, 0, 0, 0.14), 0 11.122px 8.898px 0 rgba(0, 0, 0, 0.14), 0 6.235px 4.988px 0 rgba(0, 0, 0, 0.14), 0 1.378px 1.102px 0 rgba(0, 0, 0, 0.12), 0 0.498px 0 0 rgba(255, 255, 255, 0.30) inset",
                }}
              >
                Let&apos;s chat
                <div className="h-3.5 w-px shrink-0 bg-white/20" />
                <button
                  type="button"
                  onClick={() => setSplashActive((prev) => !prev)}
                  className="flex items-center justify-center rounded-full p-1 transition-colors hover:opacity-80"
                  aria-label={
                    splashActive
                      ? "Disable fluid cursor"
                      : "Enable fluid cursor"
                  }
                >
                  <BsStars
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-white transition-colors",
                      splashActive && "text-sky-300",
                    )}
                  />
                </button>
                <div className="h-3.5 w-px shrink-0 bg-white/20" />
                <div className="theme-toggle-outer shrink-0 overflow-hidden">
                  <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                    <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
