"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { WiStars } from "react-icons/wi";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import { useSplash } from "@/shared/contexts/SplashContext";
import { useDynamicIslandVisibility } from "@/shared/hooks/useDynamicIslandVisibility";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";
import ButtonWidget from "@/shared/components/sections/ButtonWidget";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const CONTACT_EMAIL = "kiyeggaronnie@gmail.com";

const middlePillSocial = [
  {
    href: "https://www.linkedin.com/in/ronnie-kiyegga/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://github.com/ronniekiyegga",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Email",
    Icon: Mail,
  },
] as const;

export default function DynamicIsland() {
  const isVisible = useDynamicIslandVisibility();
  const { splashActive, setSplashActive } = useSplash();

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

          {/* Middle pill — email + LinkedIn / GitHub / mail (hidden on mobile) */}

          <ButtonWidget className="hidden md:flex max-w-[min(100vw-10rem,36rem)]">
            <div
              className={cn(
                "left-pill-inner lets-chat-inner flex min-h-12 w-full max-w-full items-center justify-between gap-4 rounded-full px-4 py-3.5 sm:px-6 sm:py-4",
                "border border-white/10 dark:border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.18)]",
              )}
              style={{
                borderRadius: "10.14463rem",
                border: "1.116px solid var(--Gradients-Cream, #FFF)",
                background:
                  "var(--Gradients-White-1, linear-gradient(180deg, #FBFBFB 38.73%, #F7F7F9 100%))",
              }}
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={cn(
                  "min-w-0 shrink truncate text-[12px] font-medium leading-tight tracking-tight text-[#000626] sm:text-[13px]",
                  "font-(family-name:--font-source-serif) hover:opacity-80 no-underline",
                )}
              >
                {CONTACT_EMAIL}
              </a>
              <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                {middlePillSocial.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex text-[#000626] transition-opacity hover:opacity-65"
                    aria-label={label}
                  >
                    <Icon className="size-[14px] sm:size-[15px]" strokeWidth={1.5} />
                  </Link>
                ))}
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
