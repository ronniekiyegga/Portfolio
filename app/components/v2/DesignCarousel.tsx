'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { designItems, type DesignItem } from '@/lib/v2-data'

const AUTO_SPEED = 40 // px per second

function CardExtras({ item }: { item: DesignItem }) {
  switch (item.extras) {
    case 'buttons':
      return (
        <div className="flex gap-2 mt-4">
          <div className="h-7 w-14 rounded" style={{ background: `${item.accentColor}22`, border: `1px solid ${item.accentColor}44` }} />
          <div className="h-7 w-14 rounded" style={{ background: `${item.accentColor}11`, border: `1px solid ${item.accentColor}22` }} />
        </div>
      )
    case 'logo-circle':
      return (
        <div
          className="mt-4 w-11 h-11 rounded-full flex items-center justify-center font-jetbrains text-[8px] tracking-widest mx-auto"
          style={{ border: `1px solid ${item.accentColor}55`, color: `${item.accentColor}88` }}
        >
          LOGO
        </div>
      )
    case 'code':
      return (
        <div
          className="mt-3 w-full rounded p-3 font-jetbrains text-[10px] text-left leading-relaxed"
          style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${item.accentColor}33`, color: item.accentColor }}
        >
          <div>FOR i = 1 TO 10</div>
          <div className="pl-4">OUTPUT 1</div>
          <div>NEXT 1</div>
        </div>
      )
    case 'dots':
      return (
        <div className="flex gap-2 mt-4 justify-center">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff4777' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff8c47' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#47a8ff' }} />
        </div>
      )
    case 'search':
      return (
        <div
          className="mt-4 w-full rounded px-3 py-2 flex items-center gap-2"
          style={{ background: `${item.accentColor}18`, border: `1px solid ${item.accentColor}44` }}
        >
          <span className="font-jetbrains text-[8px] tracking-wider flex-1" style={{ color: `${item.accentColor}99` }}>
            GITHUB FINDER
          </span>
          <div className="w-6 h-4 rounded-sm" style={{ background: `${item.accentColor}44` }} />
        </div>
      )
    default:
      return null
  }
}

function CardCenter({ item }: { item: DesignItem }) {
  if (item.extras === 'code') {
    return (
      <div className="w-full px-5">
        <p
          className="font-jetbrains text-[10px] tracking-[0.18em] mb-3 text-center"
          style={{ color: item.accentColor }}
        >
          {item.label}
        </p>
        <CardExtras item={item} />
      </div>
    )
  }

  return (
    <div className="text-center">
      <div
        className="font-cormorant leading-none italic mb-2"
        style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: item.accentColor }}
      >
        {item.label}
      </div>
      {item.sublabel && (
        <p
          className="font-jetbrains text-[8px] tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {item.sublabel}
        </p>
      )}
      <CardExtras item={item} />
    </div>
  )
}

const CARD_WIDTH = 320
const CARD_HEIGHT = 420
const SLIDE_WIDTH = CARD_WIDTH + 2 // card + gap

interface DesignCarouselProps {
  controlsContainerClass?: string
}

export function DesignCarousel({ controlsContainerClass = 'max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24' }: DesignCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef(0)
  const lastTime = useRef(0)
  const rafRef = useRef<number>(0)

  const loopItems = [...designItems, ...designItems]
  const setWidth = designItems.length * SLIDE_WIDTH

  useEffect(() => {
    const animate = (time: number) => {
      const dt = lastTime.current ? (time - lastTime.current) / 1000 : 0
      lastTime.current = time
      if (!paused) {
        setOffset((prev) => {
          let next = prev + AUTO_SPEED * dt
          if (next >= setWidth) next -= setWidth
          return next
        })
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [setWidth, paused])

  useEffect(() => {
    const idx = Math.floor(offset / SLIDE_WIDTH) % designItems.length
    setCurrent(idx)
  }, [offset])

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(n, designItems.length - 1))
    setOffset(clamped * SLIDE_WIDTH)
    setCurrent(clamped)
    setPaused(true)
    setTimeout(() => setPaused(false), 3000)
  }, [])

  const handleDotClick = (i: number) => goTo(i)
  const handleArrowClick = (dir: number) => goTo(current + dir)

  const move = (dir: number) => goTo(current + dir)

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 50) move(dx > 0 ? 1 : -1)
  }

  return (
    <div className="reveal">
      {/* Track — full width */}
      <div
        className="w-full px-4 md:px-6 lg:px-8 overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-[2px]"
          style={{
            willChange: 'transform',
            transform: `translateX(-${offset}px)`,
            transition: 'none',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {loopItems.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="design-slide flex-shrink-0 relative overflow-hidden flex flex-col justify-end"
              style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH, height: CARD_HEIGHT, background: item.gradient }}
            >
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CardCenter item={item} />
              </div>

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
              />

              {/* Bottom text */}
              <div className="relative z-10 p-6">
                <p className="font-jetbrains text-[9px] tracking-[0.14em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {item.type}
                </p>
                <p className="font-cormorant text-[17px] font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls — original position (same as text container) */}
      <div className={`${controlsContainerClass} flex items-center justify-between mt-5`}>
        {/* Progress indicators */}
        <div className="flex gap-1.5 items-center">
          {designItems.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === current ? '20px' : '6px',
                height: '4px',
                background: i === current ? 'var(--accent)' : 'var(--border)',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => handleArrowClick(-1)}
            disabled={current <= 0}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-colors duration-200 disabled:opacity-30 hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' }}
          >
            ←
          </button>
          <button
            onClick={() => handleArrowClick(1)}
            disabled={current >= designItems.length - 1}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-colors duration-200 disabled:opacity-30 hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
