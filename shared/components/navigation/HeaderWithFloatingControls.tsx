"use client";

import React from "react";
import Header from "./header";
import SplashCursor from "@/shared/components/effects/SplashCursor";
import { useSplash } from "@/shared/contexts/SplashContext";

const SCROLL_THRESHOLD = 20;

/**
 * Wrapper that coordinates header visibility and floating controls.
 * - Header (with right pill: theme + SplashCursor) shows when at top
 * - SplashCursor still works when enabled from header or DynamicIsland
 */
export default function HeaderWithFloatingControls() {
  const { splashActive, setSplashActive } = useSplash();
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsHeaderVisible(window.scrollY <= SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        isHeaderVisible={isHeaderVisible || isMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuChange={setIsMobileMenuOpen}
        splashActive={splashActive}
        setSplashActive={setSplashActive}
      />
      {splashActive && <SplashCursor />}
    </>
  );
}
