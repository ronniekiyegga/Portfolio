'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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

/* ── V1 elements carried over ────────────────────────────── */
import DynamicIsland        from './components/DynamicIsland'

const SplashCursor = dynamic(() => import('./components/SplashCursor'), {
  ssr: false,
})
const LoadingScreenGate = dynamic(() => import('./components/LoadingScreenGate'), {
  ssr: false,
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
  useScrollReveal()
  const [splashEnabled, setSplashEnabled] = useState(false)

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Loading intro (V1) */}
      <LoadingScreenGate />

      {/* WebGL fluid cursor (V1) — togglable */}
      {splashEnabled && <SplashCursor TRANSPARENT={true} />}

      {/* Fixed nav — receives splash toggle */}
      <Nav splashEnabled={splashEnabled} onToggleSplash={() => setSplashEnabled((v) => !v)} />

      {/* DynamicIsland (V1) — appears after scrolling past hero */}
      <DynamicIsland />

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
          <SkillsSection />
          <Divider />
          <CTASection />
          <Footer />
        </main>
      </TracingBeam>
    </div>
  )
}
