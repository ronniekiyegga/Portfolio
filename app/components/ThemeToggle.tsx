"use client";

import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  return (
    <div className="top-16 right-5 fixed z-50">
      <AnimatedThemeToggler />
    </div>
  );
}
