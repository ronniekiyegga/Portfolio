import Link from 'next/link'
import { workItems } from '@/lib/v2-data'

export function WorkSection() {
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
          <Link
            key={item.title}
            href={item.href}
            className="work-card block relative overflow-hidden no-underline transition-all duration-300 group"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
              minHeight: '300px',
              transitionDelay: `${i * 0.07}s`,
            }}
          >
            {/* Hover overlay — Tailwind group-hover for reliable Tailwind 4 support */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
              style={{ backgroundImage: item.gradient }}
            >
              {/* Dark gradient so text stays readable over the image */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.80) 100%)' }} />
            </div>

            {/* Arrow */}
            <div
              className="absolute top-9 right-9 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 group-hover:rotate-45 group-hover:border-white/40 z-[3]"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
            >
              <span className="group-hover:text-white transition-colors">
                &#8599;
              </span>
            </div>

            <div className="work-card-body relative z-[2] p-9">
              <p
                className="wc-type font-jetbrains text-[9px] tracking-[0.15em] uppercase mb-5 transition-colors duration-300 group-hover:text-white/60"
                style={{ color: 'var(--muted)' }}
              >
                {item.type}
              </p>
              <h3
                className="wc-title font-cormorant text-[28px] font-normal leading-[1.1] mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ color: 'var(--text)' }}
              >
                {item.title}
              </h3>
              <p
                className="wc-desc text-[13px] leading-[1.6] max-w-[380px] mb-5 transition-colors duration-300 group-hover:text-white/70"
                style={{ color: 'var(--muted)' }}
              >
                {item.desc}
              </p>
              <div className="flex gap-2 flex-wrap mb-6">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="wc-tag px-2.5 py-1 border rounded font-jetbrains text-[9px] tracking-[0.06em] uppercase transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/60"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-cormorant text-[20px] italic transition-colors duration-300 group-hover:text-white/90" style={{ color: 'var(--metric-color)' }}>
                {item.metric}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  )
}
