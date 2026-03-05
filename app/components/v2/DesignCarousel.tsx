'use client'

import { designItems, type DesignItem } from '@/lib/v2-data'

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

interface DesignCarouselProps {
  controlsContainerClass?: string
}

export function DesignCarousel({}: DesignCarouselProps) {
  // Duplicate items - when first set scrolls off left, second set appears from right (seamless loop)
  const loopItems = [...designItems, ...designItems]

  return (
    <div className="reveal">
      <div
        className="w-full overflow-hidden px-4 md:px-6 lg:px-8 group"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Mask for fade edges - optional, can remove if you want sharp edges */}
        <div className="relative">
          <div
            className="flex w-max gap-[2px] animate-design-scroll"
            style={{
              willChange: 'transform',
              animation: 'design-scroll 35s linear infinite',
            }}
          >
            {loopItems.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="design-slide shrink-0 relative overflow-hidden flex flex-col justify-end"
                style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH, height: CARD_HEIGHT, background: item.gradient }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <CardCenter item={item} />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
                />
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
      </div>
    </div>
  )
}
