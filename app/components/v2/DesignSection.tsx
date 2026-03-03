import { DesignCarousel } from './DesignCarousel'

export function DesignSection() {
  return (
    <section id="design" className="py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
        <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: 'var(--muted)' }}>
          Design Work
        </p>
        <h2
          className="font-cormorant font-light leading-[1.05] tracking-tight mb-10 reveal"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
        >
          Figma first,
          <br />
          <em className="italic" style={{ color: 'var(--accent)' }}>then code</em>
        </h2>
        <DesignCarousel />
      </div>
    </section>
  )
}
