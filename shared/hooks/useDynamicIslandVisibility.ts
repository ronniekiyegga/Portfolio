"use client";

import { useEffect, useState } from "react";

const HERO_SECTION_ID = "hero-section";

export function useDynamicIslandVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById(HERO_SECTION_ID);
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -40% 0px",
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return isVisible;
}
