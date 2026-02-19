"use client";

import { useState } from "react";
import { FaWandSparkles } from "react-icons/fa6";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import SplashCursor from "./SplashCursor";

export function ThemeToggle() {
  const [splashActive, setSplashActive] = useState(false);

  return (
    <div className="top-8 right-5 fixed z-50 ring-1 ring-gray-200 rounded-full pt-1 px-1.5 flex items-center gap-1">
      <AnimatedThemeToggler />
      <button
        type="button"
        onClick={() => setSplashActive((prev) => !prev)}
        className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label={
          splashActive ? "Disable fluid cursor" : "Enable fluid cursor"
        }
      >
        <FaWandSparkles
          className={`size-5 transition-colors ${
            splashActive
              ? "icon-wand-sparkles icon-gradient-blue"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        />
      </button>
      {splashActive && <SplashCursor />}
    </div>
  );
}
