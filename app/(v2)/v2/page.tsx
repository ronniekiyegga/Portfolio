"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";

/* ── V2 sections ─────────────────────────────────────────── */
import { Nav } from "@/app/components/v2/Nav";
import { Hero } from "@/app/components/v2/Hero";
import { WorkSection } from "@/app/components/v2/WorkSection";
import { DesignSection } from "@/app/components/v2/DesignSection";
import { ProcessSection } from "@/app/components/v2/ProcessSection";
import { ExperienceSection } from "@/app/components/v2/ExperienceSection";
import { SkillsSection } from "@/app/components/v2/SkillsSection";
import { CTASection } from "@/app/components/v2/CTASection";
import { Footer } from "@/app/components/v2/Footer";

/* ── V2 DynamicIsland (replaces top nav when visible) ───── */
import { DynamicIslandV2 } from "@/app/components/v2/DynamicIslandV2";

const SplashCursor = dynamic(() => import("@/app/components/SplashCursor"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/app/components/CustomCursor"), {
  ssr: false,
});
const Marquee = dynamic(() => import("@/app/components/Marquee"), {
  loading: () => <section className="min-h-[200px]" aria-hidden />,
});
import { TracingBeam } from "@/app/components/ui/tracing-beam";

/* ── Divider ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
      <div style={{ height: "1px", background: "var(--border)" }} />
    </div>
  );
}

export default function V2Page() {
  const [splashEnabled, setSplashEnabled] = useState(false);
  const dynamicIslandVisible = useDynamicIslandVisibility();

  return (
    <div
      data-version="v2"
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <ScrollReveal />

      {/* Custom cursor (dot + ring) — desktop only, hidden when fluid cursor is on */}
      {!splashEnabled && <CustomCursor />}

      {/* WebGL fluid cursor (V1) — togglable */}
      {splashEnabled && <SplashCursor TRANSPARENT={true} />}

      {/* Fixed nav — hides when bottom DynamicIsland appears */}
      <Nav
        splashEnabled={splashEnabled}
        onToggleSplash={() => setSplashEnabled((v) => !v)}
        hideWhenBottomNav={dynamicIslandVisible}
      />

      {/* DynamicIsland V2 — appears after scrolling past hero, replaces top nav */}
      <DynamicIslandV2
        splashEnabled={splashEnabled}
        onToggleSplash={() => setSplashEnabled((v) => !v)}
      />

      {/* Main content wrapped in TracingBeam scroll indicator (V1) */}
      <TracingBeam className="w-full max-w-none pl-0">
        <main>
          <Hero />
          <Divider />
          <WorkSection />
          <Divider />
          <DesignSection />
          <Divider />
          <ProcessSection />
          <Divider />
          <ExperienceSection />
          <Divider />
          {/* <SkillsSection /> */}
          <Divider />
          <Marquee />
          <Divider />
          <CTASection />
          <Footer />
        </main>
      </TracingBeam>
    </div>
  );
}
