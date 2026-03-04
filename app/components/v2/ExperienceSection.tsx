'use client'

import { useState } from 'react'
import { CornerDownRight } from 'lucide-react'
import Integrations from '@/app/components/integrations-one'
import { experienceItems } from '@/lib/v2-data'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="experience" className="py-24 section-cream-bg">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
        <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: 'var(--muted)' }}>
          Career
        </p>
        <h2
          className="font-cormorant font-light leading-[1.05] tracking-tight mb-14 reveal"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
        >
          {"Where I've"}
          <br />
          <em className="italic" style={{ color: 'var(--accent)' }}>worked</em>
        </h2>

        <div className="flex flex-col gap-6 reveal">
          {experienceItems.map((item) => {
            const isOpen = hoveredId === item.company
            const gridClass = isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            return (
              <div
                key={item.company}
                className="group cursor-pointer rounded-lg transition-all duration-300 ease-out"
                onMouseEnter={() => setHoveredId(item.company)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex flex-col py-2">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4 mb-2">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="text-base md:text-lg font-bold" style={{ color: 'var(--text)' }}>
                        {item.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="font-jetbrains text-[12px] md:text-[13px]" style={{ color: 'var(--muted)' }}>
                          {item.role}
                        </p>
                        {item.techStack && item.techStack.length > 0 && (
                          <>
                            <span style={{ color: 'var(--muted)' }}>&bull;</span>
                            <Integrations variant="inline" icons={item.techStack} />
                          </>
                        )}
                      </div>
                    </div>
                    <p
                      className="font-jetbrains text-[11px] md:text-xs whitespace-nowrap shrink-0"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.dates}
                    </p>
                  </div>

                  <div className={cn('grid transition-all duration-500 ease-out', gridClass)}>
                    <div className="overflow-hidden">
                      <div className="flex gap-2 pt-1 pb-2">
                        <CornerDownRight
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
                          style={{ color: 'var(--muted)' }}
                        />
                        <p
                          className="text-[13px] leading-[1.65] max-w-[560px]"
                          style={{ color: 'var(--muted)' }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
