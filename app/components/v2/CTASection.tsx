import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36 section-white-bg">
      {/* Glow — stays full-width */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, var(--cta-glow) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 text-center">
      <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-5 reveal" style={{ color: 'var(--muted)' }}>
        Open to Opportunities
      </p>
      <h2
        className="font-cormorant font-light leading-none tracking-tight mb-6 reveal"
        style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--text)' }}
      >
        Open to
        <br />
        <em className="italic" style={{ color: 'var(--accent)' }}>new roles</em>
      </h2>
      <p className="text-[15px] mb-12 reveal" style={{ color: 'var(--muted)' }}>
        Based in London &middot; Available immediately &middot; Open to hybrid and remote
      </p>
      <Link
        href="mailto:kiyeggaronnie@gmail.com"
        className="font-jetbrains text-[13px] no-underline reveal inline-block"
        style={{
          color: 'var(--accent)',
          borderBottom: '1px solid var(--accent)',
          paddingBottom: '2px',
        }}
      >
        kiyeggaronnie@gmail.com
      </Link>
      </div>
    </section>
  )
}
