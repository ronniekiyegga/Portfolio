'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { AnimatedThemeToggler } from '@/app/components/ui/animated-theme-toggler'
import { VersionDropdown } from './VersionDropdown'
import { cn } from '@/lib/utils'
import { useLoading } from '@/app/contexts/LoadingContext'

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
  /** When true, nav is hidden (bottom DynamicIsland is showing) */
  hideWhenBottomNav?: boolean
}

export function Nav({ splashEnabled = true, onToggleSplash, hideWhenBottomNav = false }: NavProps) {
  const { isAppReady } = useLoading()
  const [mounted,      setMounted]      = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isAppReady || hasAnimated.current) return
    const nav = navRef.current
    if (!nav) return
    hasAnimated.current = true
    gsap.set(nav, { opacity: 0, y: -20, force3D: true })
    gsap.to(nav, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.35, // Matches hero ENTRANCE_DELAY — nav fades in with hero content
      force3D: true,
    })
  }, [isAppReady])

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      closeMobile()
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0",
          hideWhenBottomNav && "pointer-events-none invisible -translate-y-full",
        )}
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
              className="flex items-center gap-1.5 font-jetbrains text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-200 hover:border-(--accent)"
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
              <VersionDropdown
                placement="top"
                onClose={() => setDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        {/* CENTER — nav links (desktop) */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => link.href.startsWith('#') && handleNavClick(e, link.href)}
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
              className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-200 hover:border-(--accent)"
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
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-(--accent) [&_svg]:w-4 [&_svg]:h-4"
              style={{ borderColor: 'var(--border)', background: 'var(--pill-bg)', color: 'var(--text)' } as React.CSSProperties}
              duration={500}
            />
          )}
          <div className="hidden md:block rounded-full pill-outer-cream">
            <div className="lets-chat-cream-wrapper">
              <Link
                href="mailto:ronniekiyegga@hotmail.com"
                className="lets-chat-inner flex items-center gap-2 whitespace-nowrap px-5 py-2 no-underline transition-all duration-200 hover:opacity-90 hover:scale-[0.98]"
                style={{ fontFamily: 'var(--font-style-script), cursive' }}
              >
                <span className="text-white text-[15px]">Let&apos;s chat</span>
                <span style={{ color: '#00CFDE', fontSize: '14px' }}>→</span>
              </Link>
            </div>
          </div>
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
              onClick={(e) => {
                if (link.href.startsWith('#')) handleNavClick(e, link.href)
                else closeMobile()
              }}
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
          <div className="rounded-full pill-outer-cream">
            <div className="lets-chat-cream-wrapper">
              <Link
                href="mailto:ronniekiyegga@hotmail.com"
                onClick={closeMobile}
                className="lets-chat-inner flex items-center justify-center gap-2 w-full whitespace-nowrap px-5 py-3 no-underline transition-all duration-200 hover:opacity-90"
                style={{ fontFamily: 'var(--font-style-script), cursive' }}
              >
                <span className="text-white text-[15px]">Let&apos;s chat</span>
                <span style={{ color: '#00CFDE', fontSize: '14px' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
