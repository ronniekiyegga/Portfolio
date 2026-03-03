import { experienceItems } from '@/lib/v2-data'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
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

      <div className="flex flex-col gap-[2px] reveal">
        {experienceItems.map((exp, i) => (
          <div
            key={exp.company}
            className="rounded-xl p-5 md:p-8 transition-colors duration-300"
            style={{
              background: 'var(--surface)',
              transitionDelay: `${i * 0.07}s`,
            }}
          >
            <div className="grid gap-4 md:gap-6" style={{ gridTemplateColumns: '44px 1fr auto' }}>
              {/* Logo initial */}
              <div
                className="w-11 h-11 rounded-xl border flex items-center justify-center font-cormorant text-lg"
                style={{ borderColor: 'var(--border)', background: 'var(--surface2)', color: 'var(--muted)' }}
              >
                {exp.initial}
              </div>

              {/* Content */}
              <div>
                <p className="text-[15px] font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  {exp.company}
                </p>
                <p className="font-jetbrains text-[12px] mb-3" style={{ color: 'var(--muted)' }}>
                  {exp.role}
                </p>
                <p className="text-[13px] leading-[1.65] max-w-[560px] mb-3" style={{ color: 'var(--muted)' }}>
                  {exp.desc}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded font-jetbrains text-[9px] tracking-[0.06em] uppercase"
                      style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date */}
              <p
                className="font-jetbrains text-[10px] whitespace-nowrap pt-0.5 hidden md:block"
                style={{ color: 'var(--muted)' }}
              >
                {exp.dates}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
