'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06 }
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

    // Failsafe: after 800 ms make any still-hidden .reveal elements visible
    const failsafe = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        el.classList.add('visible')
      })
    }, 800)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(failsafe)
    }
  }, [])
}
