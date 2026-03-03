'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { designItems } from '@/lib/v2-data'

export function DesignCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const [current,   setCurrent]   = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [visible,   setVisible]   = useState(4)
  const touchStart  = useRef(0)

  const totalItems = designItems.length
  const pages = Math.max(1, totalItems - visible + 1)

  const calcDimensions = useCallback(() => {
    if (!trackRef.current) return
    const containerW = trackRef.current.parentElement?.offsetWidth ?? 0
    let vis = 4
    if (containerW < 480) vis = 1
    else if (containerW < 640) vis = 2
    else if (containerW < 900) vis = 3
    setVisible(vis)

    const items = trackRef.current.querySelectorAll<HTMLElement>('.design-slide')
    if (items.length > 0) setItemWidth(items[0].offsetWidth + 2)
  }, [])

  useEffect(() => {
    calcDimensions()
    window.addEventListener('resize', calcDimensions)
    return () => window.removeEventListener('resize', calcDimensions)
  }, [calcDimensions])

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(n, pages - 1))
    setCurrent(clamped)
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${clamped * itemWidth}px)`
    }
  }, [pages, itemWidth])

  const move = (dir: number) => goTo(current + dir)

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 50) move(dx > 0 ? 1 : -1)
  }

  return (
    <div className="reveal">
      {/* Track */}
      <div
        className="overflow-hidden rounded-2xl border"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          ref={trackRef}
          className="flex gap-[2px] transition-transform duration-500 ease-out"
          style={{ willChange: 'transform' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {designItems.map((item) => (
            <div
              key={item.name}
              className="design-slide flex-shrink-0 relative overflow-hidden flex flex-col justify-end"
              style={{
                minWidth: '280px',
                height: '360px',
                background: 'var(--surface)',
              }}
            >
              {/* Coloured preview bg */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: item.gradient }}
              >
                <div className="text-center">
                  <div
                    className="font-cormorant text-4xl mb-2 italic"
                    style={{ color: item.accentColor }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-jetbrains text-[8px] tracking-[0.12em]"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none design-fade"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
              />

              <div className="relative z-10 p-6">
                <p className="font-jetbrains text-[9px] tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                  {item.type}
                </p>
                <p className="font-cormorant text-[18px] font-normal" style={{ color: 'var(--text)' }}>
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        {/* Dots */}
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                background: i === current ? 'var(--accent)' : 'var(--border)',
                borderRadius: i === current ? '3px' : '50%',
              }}
            />
          ))}
        </div>
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => move(-1)}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-colors duration-200 disabled:opacity-30 hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' }}
          >
            &#8592;
          </button>
          <button
            onClick={() => move(1)}
            disabled={current >= pages - 1}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-colors duration-200 disabled:opacity-30 hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  )
}
