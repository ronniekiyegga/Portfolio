'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ScrollReveal } from './components/ScrollReveal'
import { useDynamicIslandVisibility } from './hooks/useDynamicIslandVisibility'

/* ── V2 sections ─────────────────────────────────────────── */
import { Nav }              from './components/v2/Nav'
import { Hero }             from './components/v2/Hero'
import { WorkSection }      from './components/v2/WorkSection'
import { DesignSection }    from './components/v2/DesignSection'
import { ProcessSection }   from './components/v2/ProcessSection'
import { ExperienceSection } from './components/v2/ExperienceSection'
import { SkillsSection }    from './components/v2/SkillsSection'
import { CTASection }       from './components/v2/CTASection'
import { Footer }           from './components/v2/Footer'

/* ── V2 DynamicIsland (replaces top nav when visible) ───── */
import { DynamicIslandV2 }   from './components/v2/DynamicIslandV2'

const SplashCursor = dynamic(() => import('./components/SplashCursor'), {
  ssr: false,
})
const CustomCursor = dynamic(() => import('./components/CustomCursor'), {
  ssr: false,
})
const LoadingScreenGate = dynamic(() => import('./components/LoadingScreenGate'), {
  ssr: false,
})
const Marquee = dynamic(() => import('./components/Marquee'), {
  loading: () => <section className="min-h-[200px]" aria-hidden />,
})
// TracingBeam is a client component — static import so children render immediately
import { TracingBeam } from './components/ui/tracing-beam'

/* ── Divider ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
      <div style={{ height: '1px', background: 'var(--border)' }} />
    </div>
  )
}

export default function Home() {
  const [splashEnabled, setSplashEnabled] = useState(false)
  const dynamicIslandVisible = useDynamicIslandVisibility()

  return (
    <div
      data-version="v2"
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Loading intro — DESIGN / CODE / PRODUCTION sequence */}
      <LoadingScreenGate />
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
  )
}
