"use client";

import { LiquidChrome } from "@/shared/components/effects/LiquidChrome";

export function BlogHeroBackground() {
  return (
    <LiquidChrome
      baseColor={[0.9, 0.9, 1]}
      speed={0.2}
      amplitude={0.5}
      interactive
      className="size-full opacity-90"
    />
  );
}
