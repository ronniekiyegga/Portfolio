"use client";

import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  return (
    <div className="top-8 right-5 fixed z-50 ring-1 ring-gray-200 rounded-full pt-1 px-1.5">
      <AnimatedThemeToggler />
    </div>
  );
}
