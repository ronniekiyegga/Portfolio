import { skillGroups } from '@/lib/v2-data'

export function SkillsSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
      <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: 'var(--muted)' }}>
        Capabilities
      </p>
      <h2
        className="font-cormorant font-light leading-[1.05] tracking-tight mb-14 reveal"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
      >
        What I
        <br />
        <em className="italic" style={{ color: 'var(--accent)' }}>bring</em>
      </h2>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-[2px] rounded-2xl overflow-hidden reveal"
        style={{ background: 'var(--gap)' }}
      >
        {skillGroups.map((group, i) => (
          <div
            key={group.label}
            className="p-6 md:p-8"
            style={{ background: 'var(--surface)', transitionDelay: `${i * 0.07}s` }}
          >
            <p
              className="font-jetbrains text-[9px] tracking-[0.15em] uppercase mb-5"
              style={{ color: 'var(--muted)' }}
            >
              {group.label}
            </p>
            <ul className="flex flex-col gap-2.5 list-none">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 text-[13px]"
                  style={{ color: 'var(--text)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
