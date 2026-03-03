'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatedThemeToggler } from '@/app/components/ui/animated-theme-toggler'

const navLinks = [
  { label: 'Work',       href: '#work' },
  { label: 'Design',     href: '#design' },
  { label: 'Process',    href: '#process' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog',       href: '/blog' },
]

interface NavProps {
  splashEnabled?: boolean
  onToggleSplash?: () => void
}

export function Nav({ splashEnabled = true, onToggleSplash }: NavProps) {
  const [mounted,      setMounted]      = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-4 md:py-5 flex items-center justify-between">
        {/* LEFT — logo + version */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-jetbrains text-[11px] tracking-[0.15em] uppercase no-underline opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text)' }}
          >
            RK<span style={{ color: 'var(--accent)' }}>.</span>engineer
          </Link>

          {/* Version dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 font-jetbrains text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border transition-colors duration-200 hover:border-[var(--accent)]"
              style={{
                color: 'var(--muted)',
                background: 'var(--pill-bg)',
                borderColor: 'var(--border)',
              }}
            >
              V2
              <svg
                width="8" height="6" viewBox="0 0 10 6" fill="currentColor"
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 min-w-[180px] rounded-xl border overflow-hidden shadow-2xl z-50"
                style={{ background: 'var(--dropdown-bg)', borderColor: 'var(--border)' }}
              >
                <Link
                  href="/v1"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-between px-4 py-3 no-underline transition-colors duration-150 hover:opacity-80"
                  style={{ color: 'var(--muted)' }}
                >
                  <div>
                    <div className="font-jetbrains text-[10px] font-medium" style={{ color: 'var(--text)' }}>
                      Version 1
                    </div>
                    <div className="font-jetbrains text-[9px] mt-0.5">Classic design</div>
                  </div>
                  <span
                    className="font-jetbrains text-[8px] px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}
                  >
                    Live
                  </span>
                </Link>
                <div style={{ height: '1px', background: 'var(--border)' }} />
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:opacity-80"
                  style={{ color: 'var(--muted)' }}
                >
                  <div>
                    <div className="font-jetbrains text-[10px] font-medium" style={{ color: 'var(--text)' }}>
                      Version 2
                    </div>
                    <div className="font-jetbrains text-[9px] mt-0.5">This design</div>
                  </div>
                  <span
                    className="font-jetbrains text-[8px] px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--tag-bg)', color: 'var(--tag-color)' }}
                  >
                    New
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CENTER — nav links (desktop) */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-outfit text-[13px] no-underline transition-colors duration-200 relative group"
                style={{ color: 'var(--muted)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                  style={{ background: 'var(--accent)' }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SplashCursor toggle */}
          {mounted && onToggleSplash && (
            <button
              onClick={onToggleSplash}
              title={splashEnabled ? 'Disable fluid cursor' : 'Enable fluid cursor'}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-200 hover:border-[var(--accent)]"
              style={{
                borderColor: splashEnabled ? 'var(--accent)' : 'var(--border)',
                background: splashEnabled ? 'var(--tag-bg)' : 'var(--pill-bg)',
                color: splashEnabled ? 'var(--accent)' : 'var(--muted)',
              }}
            >
              ✦
            </button>
          )}

          {/* Theme toggle — animated circular ripple from V1 */}
          {mounted && (
            <AnimatedThemeToggler
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--accent)] [&_svg]:w-4 [&_svg]:h-4"
              style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' } as React.CSSProperties}
              duration={500}
            />
          )}
          <Link
            href="mailto:contact@ronniekiyegga.com"
            className="hidden md:flex items-center px-5 py-2 rounded-full font-jetbrains text-[12px] font-semibold no-underline transition-all duration-200 hover:opacity-85 hover:scale-[0.98]"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            {"Let's chat →"}
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1 relative w-6 h-5"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className="absolute block w-[22px] h-[1.5px] transition-all duration-300 origin-center"
              style={{
                background: 'var(--text)',
                top: mobileOpen ? '50%' : '0',
                transform: mobileOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="absolute block w-[22px] h-[1.5px] transition-all duration-300"
              style={{
                background: 'var(--text)',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="absolute block w-[22px] h-[1.5px] transition-all duration-300 origin-center"
              style={{
                background: 'var(--text)',
                bottom: mobileOpen ? '50%' : '0',
                transform: mobileOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
        </div>{/* end max-width wrapper */}
      </nav>

      {/* Mobile menu — right-side drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={closeMobile}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
            Menu
          </span>
          <button
            onClick={closeMobile}
            className="w-7 h-7 flex items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="font-outfit text-[17px] no-underline py-3 border-b transition-colors duration-200 hover:opacity-100"
              style={{
                color: 'var(--muted)',
                borderColor: 'var(--border)',
                transitionDelay: mobileOpen ? `${i * 40}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div className="px-6 pb-8">
          <Link
            href="mailto:contact@ronniekiyegga.com"
            onClick={closeMobile}
            className="flex items-center justify-center w-full px-5 py-3 rounded-full font-jetbrains text-[12px] font-semibold no-underline transition-all duration-200 hover:opacity-85"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            {"Let's chat →"}
          </Link>
        </div>
      </div>
    </>
  )
}
