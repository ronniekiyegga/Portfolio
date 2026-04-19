"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import { Sun } from "lucide-react"
import { LuSunMoon } from "react-icons/lu"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

/** Fixed pixel size for both icons */
const ICON_SIZE = 14

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const isDark = resolvedTheme === "dark"

  const toggleTheme = useCallback(() => {
    if (!buttonRef.current) return

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    const newTheme = isDark ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }, [isDark, duration, setTheme])

  const icon = isDark ? (
    <Sun size={ICON_SIZE} strokeWidth={2} className="shrink-0" />
  ) : (
    <LuSunMoon size={ICON_SIZE} className="shrink-0" />
  )

  // Render placeholder before mount to avoid layout shift
  if (!mounted) {
    return (
      <button
        className={cn(
          "flex items-center justify-center p-0 min-w-[18px] min-h-[18px]",
          className
        )}
        {...props}
        aria-label="Toggle theme"
      >
        <LuSunMoon size={ICON_SIZE} className="shrink-0" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center p-0 min-w-[18px] min-h-[18px]",
        className
      )}
      {...props}
      aria-label="Toggle theme"
    >
      {icon}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
