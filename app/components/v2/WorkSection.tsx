'use client'

import { useState } from 'react'
import { workItems } from '@/lib/v2-data'
import { ProjectModal } from './ProjectModal'

export function WorkSection() {
  const [selectedItem, setSelectedItem] = useState<typeof workItems[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (item: typeof workItems[0]) => {
    setSelectedItem(item)
    setModalOpen(true)
  }

  return (
    <section id="work" className="py-24 section-cream-bg">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
      <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: 'var(--muted)' }}>
        Selected Work
      </p>
      <h2
        className="font-cormorant font-light leading-[1.05] tracking-tight mb-16 reveal"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
      >
        Things shipped
        <br />
        <em className="italic" style={{ color: 'var(--accent)' }}>in production</em>
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-[2px] rounded-2xl overflow-hidden reveal"
        style={{ background: 'var(--gap)' }}
      >
        {workItems.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => openModal(item)}
            className="work-card-v2 block w-full text-left no-underline transition-all duration-300 cursor-pointer border-0"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
              transitionDelay: `${i * 0.07}s`,
            }}
          >
            {/* Image panel (right) — default visible with label+title, shrinks right on hover */}
            <div className="wc-image">
              <div
                className="wc-image-bg absolute inset-0"
                style={{ background: item.gradient }}
              />
              <div className="wc-image-inner">
                <div className="screen w-full max-w-[420px] min-h-[240px] flex items-center justify-center bg-transparent">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="w-full h-auto max-h-[290px] object-contain block work-card-img"
                    loading="eager"
                  />
                </div>
              </div>
              {/* Label + title overlay — inside image so it anchors to bottom on mobile */}
              <div className="wc-image-label">
              <p
                className="wc-type font-jetbrains text-[8px] tracking-[0.12em] uppercase mb-1"
                style={{ color: 'var(--muted)' }}
              >
                {item.type}
              </p>
              <h3
                className="wc-title font-cormorant text-[20px] font-normal leading-[1.1]"
                style={{ color: 'var(--text)' }}
              >
                {item.title}
              </h3>
            </div>
            </div>

            {/* Text panel (left) — slides in from left on hover, matches reference layout */}
            <div className="wc-text">
              <div className="wc-text-inner">
                <div className="wc-text-header flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p
                      className="wc-text-type font-jetbrains text-[8px] tracking-[0.12em] uppercase mb-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.type}
                    </p>
                    <h3
                      className="wc-text-title font-cormorant text-[20px] font-normal leading-[1.1]"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="wc-arrow shrink-0">&#8599;</div>
                </div>
                <p
                  className="wc-desc text-[13px] leading-[1.65] max-w-[320px] mb-5"
                  style={{ color: 'var(--muted)' }}
                >
                  {item.desc}
                </p>
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="wc-tag px-2.5 py-1 border rounded font-jetbrains text-[9px] tracking-[0.06em] uppercase"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="wc-metric font-cormorant text-[19px] italic" style={{ color: 'var(--metric-color)' }}>
                  {item.metric}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      </div>
    </section>
  )
}
