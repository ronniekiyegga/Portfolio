import Link from 'next/link'

const links = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/ronniekiyegga' },
  { label: 'GitHub',    href: 'https://github.com/BlissfulCoda' },
  { label: 'Version 1', href: '/' },
]

export function Footer() {
  return (
    <footer
      className="py-7 font-jetbrains text-[10px] section-white-bg"
      style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 reveal">
        <span>&#169; 2026 Ronnie Kiyegga</span>
        <div className="flex gap-6 flex-wrap justify-center">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              className="no-underline transition-colors duration-200 hover:opacity-100"
              style={{ color: 'var(--muted)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <span>Design + Engineered by RK</span>
      </div>
    </footer>
  )
}
