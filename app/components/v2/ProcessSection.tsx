const steps = [
  {
    num: '01',
    step: 'Design',
    title: 'Design',
    desc: 'Every project starts in Figma. I define the information architecture, design the component system, prototype interactions, and validate the visual language before writing a single line of code.',
    tools: ['Figma', 'Component Systems', 'Prototyping'],
  },
  {
    num: '02',
    step: 'Engineer',
    title: 'Engineer',
    desc: 'Designs translate directly to production TypeScript. React and Next.js on the frontend; Node, PostgreSQL, and Docker on the backend. All tested with Jest, Cypress, and React Testing Library.',
    tools: ['TypeScript', 'React', 'Node.js', 'Jest'],
  },
  {
    num: '03',
    step: 'Ship',
    title: 'Ship',
    desc: 'Zero-downtime deployments via GitHub Actions CI/CD. Containerised with Docker, monitored with Sentry, secured with rate limiting. I own it from commit to production and beyond.',
    tools: ['Docker', 'GitHub Actions', 'AWS', 'Sentry'],
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="py-24"
      style={{ background: 'var(--process-bg)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
      <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal" style={{ color: 'var(--muted)' }}>
        How I Work
      </p>
      <h2
        className="font-cormorant font-light leading-[1.05] tracking-tight mb-3 reveal"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
      >
        Design to Code
        <br />
        <em className="italic" style={{ color: 'var(--accent)' }}>to Production</em>
      </h2>
      <p className="text-[14px] leading-[1.7] max-w-[480px] mb-12 reveal" style={{ color: 'var(--muted)' }}>
        Most engineers cannot design. Most designers cannot ship. I do both — here is how every project moves from concept to deployed product.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-[2px] rounded-2xl overflow-hidden reveal"
        style={{ background: 'var(--gap)' }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="p-8 md:p-10 group transition-colors duration-300"
            style={{
              background: 'var(--bg)',
              transitionDelay: `${i * 0.07}s`,
            }}
          >
            <div
              className="font-cormorant font-light leading-none mb-4 transition-all duration-300 group-hover:opacity-20"
              style={{ fontSize: '72px', color: 'var(--border)' }}
            >
              {step.num}
            </div>
            <p className="font-jetbrains text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
              {step.step}
            </p>
            <h3 className="font-cormorant text-[26px] font-normal mb-3" style={{ color: 'var(--text)' }}>
              {step.title}
            </h3>
            <p className="text-[13px] leading-[1.65] mb-5" style={{ color: 'var(--muted)' }}>
              {step.desc}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {step.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 rounded font-jetbrains text-[9px]"
                  style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
