'use client'

import { useEffect } from 'react'
import { useLoading } from '@/app/contexts/LoadingContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollReveal() {
  const { isAppReady } = useLoading()

  useEffect(() => {
    if (!isAppReady || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-once').forEach((el) => el.classList.add('visible'))
      return
    }

    ScrollTrigger.config({ limitCallbacks: true })

    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const onceEls = document.querySelectorAll<HTMLElement>('.reveal-once')
    const allRevealEls = [...els, ...onceEls]
    if (allRevealEls.length === 0) return

    gsap.set(allRevealEls, { opacity: 0, y: 16, force3D: true })

    const tweens: gsap.core.Tween[] = []

    els.forEach((el) => {
      const t = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 55%',
          scrub: true,
        },
      })
      tweens.push(t)
    })

    onceEls.forEach((el) => {
      const t = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
      tweens.push(t)
    })

    const refresh = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    }
    refresh()
    const refreshTimer = setTimeout(refresh, 500)

    return () => {
      clearTimeout(refreshTimer)
      tweens.forEach((tw) => tw.kill())
    }
  }, [isAppReady])

  return null
}
