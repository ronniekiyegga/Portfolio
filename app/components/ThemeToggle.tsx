"use client";

import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  return (
    <div className="top-10 right-5 fixed z-50">
      <AnimatedThemeToggler />
    </div>
  );
}
