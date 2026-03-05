'use client'

import { useState } from 'react'
import Image from 'next/image'
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
            {/* Text panel (left) */}
            <div className="wc-text">
              <div className="wc-arrow">
                &#8599;
              </div>
              <p
                className="wc-type font-jetbrains text-[9px] tracking-[0.15em] uppercase mb-4"
                style={{ color: 'var(--muted)' }}
              >
                {item.type}
              </p>
              <h3
                className="wc-title font-cormorant text-[30px] font-normal leading-[1.1] mb-2.5"
                style={{ color: 'var(--text)' }}
              >
                {item.title}
              </h3>
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

            {/* Image panel (right) — expands on hover */}
            <div className="wc-image">
              <div
                className="wc-image-bg absolute inset-0"
                style={{ background: item.gradient }}
              />
              <div className="wc-image-inner">
                <div className="screen w-full max-w-[320px] flex items-center justify-center">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={320}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </div>
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
