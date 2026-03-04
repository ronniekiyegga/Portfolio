'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { LayoutTextFlip } from '@/app/components/ui/layout-text-flip'

const Lanyard = dynamic(() => import('../Lanyard'), { ssr: false })

const stats = [
  { number: '1.2', suffix: 'k', label: 'Students Reached' },
  { number: '95',  suffix: '%', label: 'Test Coverage' },
  { number: '40',  suffix: '%', label: 'Cost Reduction' },
  { number: '3',   suffix: '+', label: 'Years Shipped' },
]

const stack = ['TypeScript', 'React', 'Next.js', 'Node', 'AWS', 'Docker', 'Figma']

export function Hero() {
  return (
    <section
      id="hero-section"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Subtle grid background — stays full-width */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      {/* Constrained 3-col grid */}
      <div className="max-w-[1440px] mx-auto min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 items-center pt-28 pb-12 md:pt-0 md:pb-0">

      {/* ── LEFT: text content ───────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 px-3 pr-4 py-1.5 rounded-full border font-jetbrains text-[10px] tracking-[0.1em] uppercase mb-8 self-start"
          style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--muted)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'linear-gradient(144deg, #00CFDE 3.63%, #05A660 94.05%)' }} />
          Available for roles · London, UK
        </div>

        {/* Name */}
        <h1
          className="font-cormorant font-light leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: 'clamp(52px, 6vw, 100px)', color: 'var(--text)' }}
        >
          Ronnie
          <br />
          <em className="italic" style={{ color: 'var(--accent)' }}>Kiyegga</em>
        </h1>

        {/* Animated role cycle */}
        <div className="mb-8">
          <LayoutTextFlip text="I'M A " words={["UI DESIGNER", "SOFTWARE ENGINEER", "FULL STACK DEV"]} />
        </div>

        <p className="text-[15px] leading-[1.7] max-w-[400px] mb-10" style={{ color: 'var(--muted)' }}>
          I{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>design in Figma</strong>
          {' '}and{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>build in TypeScript</strong>
          {' '}— no handoff, no translation loss. From pixel-perfect interfaces to containerised systems, I own the full stack.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="#work"
            className="px-7 py-3.5 text-[13px] font-semibold rounded-lg no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            View Work
          </Link>
          <Link
            href="/Ronnie-Kiyegga-SWE.pdf"
            target="_blank"
            className="px-7 py-3.5 text-[13px] rounded-lg no-underline border transition-all duration-200 hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            Resume ↗
          </Link>
        </div>
      </div>

{/* ── RIGHT: stats grid ────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-10 lg:px-16 py-20" style={{ transitionDelay: '0.15s' }}>
        <div
          className="grid grid-cols-2 gap-[2px] rounded-2xl overflow-hidden mb-[2px]"
          style={{ background: 'var(--gap)' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 transition-colors duration-200"
              style={{ background: 'var(--surface)' }}
            >
              <div
                className="font-cormorant font-light leading-none mb-1"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: 'var(--text)' }}
              >
                {s.number}
                <span style={{ color: 'var(--stat-suffix)' }}>{s.suffix}</span>
              </div>
              <div className="font-jetbrains text-[10px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {/* Stack row */}
        <div
          className="rounded-xl px-5 py-4 flex gap-2 flex-wrap items-center"
          style={{ background: 'var(--surface)' }}
        >
          <span className="font-jetbrains text-[9px] tracking-[0.12em] uppercase mr-1" style={{ color: 'var(--muted)' }}>
            Stack
          </span>
          {stack.map((s) => (
            <span
              key={s}
              className="px-2 py-1 rounded font-jetbrains text-[10px]"
              style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      </div>{/* end max-width grid wrapper */}

      {/* Lanyard 3D overlay — rendered after content so it appears on top */}
      <Lanyard />
    </section>
  )
}
