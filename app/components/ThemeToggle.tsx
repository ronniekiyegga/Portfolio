"use client";

import React from "react";
import { BsStars } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  isVisible: boolean;
  splashActive: boolean;
  setSplashActive: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

/**
 * Floating div with theme toggle + SplashCursor wand.
 * Only visible when header is hidden (user has scrolled).
 */
export default function ThemeToggle({
  isVisible,
  splashActive,
  setSplashActive,
  className,
}: ThemeToggleProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-6 z-100 flex items-center lg:top-6 lg:right-10",
        className,
      )}
    >
      <div className="theme-toggle-outer shrink-0 overflow-hidden">
        <div className="theme-toggle-inner overflow-hidden">
          <button
            type="button"
            onClick={() => setSplashActive((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={
              splashActive ? "Disable fluid cursor" : "Enable fluid cursor"
            }
          >
            <BsStars
              className={cn(
                "size-3 shrink-0 text-neutral-600 transition-colors dark:text-neutral-400",
                splashActive && "text-cyan-500",
              )}
            />
          </button>
        </div>
      </div>
      <div className="theme-toggle-outer shrink-0 overflow-hidden">
        <div className="theme-toggle-inner overflow-hidden">
          <AnimatedThemeToggler className="size-3 shrink-0 overflow-hidden text-neutral-700 dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
        </div>
      </div>
    </div>
  );
}
