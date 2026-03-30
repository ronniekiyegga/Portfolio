"use client";

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { Style_Script } from "next/font/google";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

interface MobileHeaderPillProps {
  splashActive: boolean;
  setSplashActive: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Single consolidated pill for mobile header.
 * Contains: Let's chat | wand | theme toggle
 */
export default function MobileHeaderPill({
  splashActive,
  setSplashActive,
}: MobileHeaderPillProps) {
  return (
    <div
      className={cn(
        "flex items-center overflow-hidden rounded-full",
        "border shadow-sm",
        "border-neutral-200/80 shadow-neutral-200/40",
        "dark:border-blue-400/40",
        "dark:[box-shadow:0_0_1.357px_0_rgba(0,0,0,0.08)_inset,0_1.018px_0_0_rgba(255,255,255,0.10)]",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1.5",
          "bg-neutral-900 text-white",
        )}
        style={{
          backgroundImage: "url(/images/backgrounds/BG_1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link
          href="mailto:kiyeggaronnie@gmail.com"
          className={cn(
            "flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-xs font-medium transition-opacity hover:opacity-90",
            styleScript.className,
          )}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
          Let&apos;s chat
        </Link>
        <div className="h-3 w-px shrink-0 bg-white/30" />
        <button
          type="button"
          onClick={() => setSplashActive((prev) => !prev)}
          className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
          aria-label={
            splashActive ? "Disable fluid cursor" : "Enable fluid cursor"
          }
        >
          <BsStars
            className={cn(
              "size-3.5 shrink-0 transition-colors",
              splashActive && "text-cyan-400",
            )}
          />
        </button>
        <div className="h-3 w-px shrink-0 bg-white/30" />
        <div className="theme-toggle-outer-mobile shrink-0 pr-1.5">
          <div className="theme-toggle-inner-mobile overflow-hidden flex items-center justify-center">
            <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-neutral-700 dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
