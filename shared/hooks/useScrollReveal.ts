'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const observe = (el: Element) => {
      if (!el.classList.contains('visible')) io.observe(el)
    }

    // Observe elements already in the DOM
    document.querySelectorAll('.reveal').forEach(observe)

    // Watch for .reveal elements added later (e.g. inside lazy/dynamic imports)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.classList.contains('reveal')) observe(node)
          node.querySelectorAll('.reveal').forEach(observe)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Failsafe: after 2.5s make any still-hidden .reveal elements visible (handles edge cases)
    const failsafe = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        el.classList.add('visible')
      })
    }, 2500)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(failsafe)
    }
  }, [])
}
