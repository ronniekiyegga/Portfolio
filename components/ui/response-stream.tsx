'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type Mode = 'typewriter' | 'fade'

export type UseTextStreamOptions = {
  textStream: string | AsyncIterable<string>
  speed?: number
  mode?: Mode
  fadeDuration?: number
  segmentDelay?: number
  characterChunkSize?: number
  onError?: (error: unknown) => void
}

export type UseTextStreamResult = {
  displayedText: string
  isComplete: boolean
  segments: { text: string; index: number }[]
  getFadeDuration: () => number
  getSegmentDelay: () => number
  reset: () => void
  startStreaming: () => void
  pause: () => void
  resume: () => void
}

function useTextStream({
  textStream,
  speed = 20,
  mode = 'typewriter',
  fadeDuration,
  segmentDelay,
  characterChunkSize,
  onError,
}: UseTextStreamOptions): UseTextStreamResult {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [segments, setSegments] = useState<{ text: string; index: number }[]>([])

  const displayedTextRef = useRef('')
  const isCompleteRef = useRef(false)
  const pausedRef = useRef(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const queueRef = useRef<string[]>([])
  const sourceDoneRef = useRef(false)
  const startedRef = useRef(false)

  const speedRef = useRef(speed)
  const modeRef = useRef(mode)
  const fadeDurationRef = useRef(fadeDuration)
  const segmentDelayRef = useRef(segmentDelay)
  const characterChunkSizeRef = useRef(characterChunkSize)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    fadeDurationRef.current = fadeDuration
  }, [fadeDuration])

  useEffect(() => {
    segmentDelayRef.current = segmentDelay
  }, [segmentDelay])

  useEffect(() => {
    characterChunkSizeRef.current = characterChunkSize
  }, [characterChunkSize])

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const getChunkSize = useCallback(() => {
    if (typeof characterChunkSizeRef.current === 'number') {
      return Math.max(1, characterChunkSizeRef.current)
    }

    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current))

    if (modeRef.current === 'typewriter') {
      if (normalizedSpeed < 25) return 1
      return Math.max(1, Math.round((normalizedSpeed - 25) / 10))
    }

    return 1
  }, [])

  const getProcessingDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === 'number') {
      return Math.max(0, segmentDelayRef.current)
    }

    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current))
    return Math.max(8, Math.round(100 / Math.sqrt(normalizedSpeed)))
  }, [])

  const getFadeDuration = useCallback(() => {
    if (typeof fadeDurationRef.current === 'number') {
      return Math.max(10, fadeDurationRef.current)
    }

    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current))
    return Math.round(1000 / Math.sqrt(normalizedSpeed))
  }, [])

  const getSegmentDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === 'number') {
      return Math.max(0, segmentDelayRef.current)
    }

    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current))
    return Math.max(8, Math.round(100 / Math.sqrt(normalizedSpeed)))
  }, [])

  const updateSegments = useCallback((text: string) => {
    if (modeRef.current !== 'fade') {
      setSegments([])
      return
    }

    try {
      type SegmenterPart = { segment: string }
      type SegmenterLike = { segment: (input: string) => Iterable<SegmenterPart> }
      type SegmenterConstructor = new (
        locales?: string | string[],
        options?: { granularity?: 'grapheme' | 'word' | 'sentence' }
      ) => SegmenterLike

      const SegmenterCtor = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter

      if (typeof SegmenterCtor === 'function') {
        const locale =
          typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en'
        const segmenter = new SegmenterCtor(locale, { granularity: 'word' })

        const nextSegments = Array.from(segmenter.segment(text)).map((part, index) => ({
          text: part.segment,
          index,
        }))

        setSegments(nextSegments)
        return
      }

      const fallbackSegments = text
        .split(/(\s+)/)
        .filter(Boolean)
        .map((part, index) => ({
          text: part,
          index,
        }))

      setSegments(fallbackSegments)
    } catch (error) {
      const fallbackSegments = text
        .split(/(\s+)/)
        .filter(Boolean)
        .map((part, index) => ({
          text: part,
          index,
        }))

      setSegments(fallbackSegments)
      onErrorRef.current?.(error)
    }
  }, [])

  const applyDisplayedText = useCallback(
    (nextText: string) => {
      displayedTextRef.current = nextText
      setDisplayedText(nextText)
      updateSegments(nextText)
    },
    [updateSegments]
  )

  const markComplete = useCallback(() => {
    if (isCompleteRef.current) return
    isCompleteRef.current = true
    setIsComplete(true)
  }, [])

  const tick = useCallback(() => {
    clearTimer()

    if (pausedRef.current) {
      timeoutRef.current = setTimeout(tick, 50)
      return
    }

    const chunkSize = getChunkSize()

    if (queueRef.current.length === 0) {
      if (sourceDoneRef.current) {
        markComplete()
        return
      }

      timeoutRef.current = setTimeout(tick, getProcessingDelay())
      return
    }

    let remaining = chunkSize
    let nextText = displayedTextRef.current

    while (remaining > 0 && queueRef.current.length > 0) {
      const currentChunk = queueRef.current[0]

      if (currentChunk.length <= remaining) {
        nextText += currentChunk
        remaining -= currentChunk.length
        queueRef.current.shift()
      } else {
        nextText += currentChunk.slice(0, remaining)
        queueRef.current[0] = currentChunk.slice(remaining)
        remaining = 0
      }
    }

    applyDisplayedText(nextText)

    if (queueRef.current.length === 0 && sourceDoneRef.current) {
      markComplete()
      return
    }

    timeoutRef.current = setTimeout(tick, getProcessingDelay())
  }, [applyDisplayedText, clearTimer, getChunkSize, getProcessingDelay, markComplete])

  const reset = useCallback(() => {
    clearTimer()

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    startedRef.current = false
    pausedRef.current = false
    queueRef.current = []
    sourceDoneRef.current = false
    displayedTextRef.current = ''
    isCompleteRef.current = false

    setDisplayedText('')
    setSegments([])
    setIsComplete(false)
  }, [clearTimer])

  const startStreaming = useCallback(() => {
    reset()
    startedRef.current = true

    if (typeof textStream === 'string') {
      queueRef.current = [textStream]
      sourceDoneRef.current = true
      tick()
      return
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    ;(async () => {
      try {
        for await (const chunk of textStream) {
          if (controller.signal.aborted) return
          if (!chunk) continue
          queueRef.current.push(chunk)

          if (!pausedRef.current && !timeoutRef.current && !isCompleteRef.current) {
            tick()
          }
        }

        sourceDoneRef.current = true

        if (!pausedRef.current && !timeoutRef.current && !isCompleteRef.current) {
          tick()
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          onErrorRef.current?.(error)
          sourceDoneRef.current = true
          tick()
        }
      }
    })()

    tick()
  }, [reset, textStream, tick])

  const pause = useCallback(() => {
    pausedRef.current = true
  }, [])

  const resume = useCallback(() => {
    if (!startedRef.current || isCompleteRef.current) return
    pausedRef.current = false

    if (!timeoutRef.current) {
      tick()
    }
  }, [tick])

  useEffect(() => {
    startStreaming()

    return () => {
      clearTimer()

      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [startStreaming, clearTimer])

  return {
    displayedText,
    isComplete,
    segments,
    getFadeDuration,
    getSegmentDelay,
    reset,
    startStreaming,
    pause,
    resume,
  }
}

export type ResponseStreamProps = {
  textStream: string | AsyncIterable<string>
  mode?: Mode
  speed?: number
  className?: string
  onComplete?: () => void
  as?: React.ElementType
  fadeDuration?: number
  segmentDelay?: number
  characterChunkSize?: number
}

function ResponseStream({
  textStream,
  mode = 'typewriter',
  speed = 20,
  className = '',
  onComplete,
  as: Component = 'div',
  fadeDuration,
  segmentDelay,
  characterChunkSize,
}: ResponseStreamProps) {
  const completionCalledRef = useRef(false)

  const { displayedText, isComplete, segments, getFadeDuration, getSegmentDelay } = useTextStream({
    textStream,
    speed,
    mode,
    fadeDuration,
    segmentDelay,
    characterChunkSize,
  })

  useEffect(() => {
    completionCalledRef.current = false
  }, [textStream, mode])

  useEffect(() => {
    if (mode === 'typewriter' && isComplete && !completionCalledRef.current) {
      completionCalledRef.current = true
      onComplete?.()
    }
  }, [isComplete, mode, onComplete])

  const handleLastSegmentAnimationEnd = useCallback(() => {
    if (mode === 'fade' && isComplete && !completionCalledRef.current) {
      completionCalledRef.current = true
      onComplete?.()
    }
  }, [isComplete, mode, onComplete])

  const fadeStyle = useMemo(
    () => `
      @keyframes response-stream-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .response-stream-fade-segment {
        display: inline-block;
        opacity: 0;
        animation-name: response-stream-fade-in;
        animation-duration: ${getFadeDuration()}ms;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }

      .response-stream-fade-space {
        white-space: pre;
      }
    `,
    [getFadeDuration]
  )

  const renderContent = () => {
    if (mode === 'fade') {
      return (
        <>
          <style>{fadeStyle}</style>
          <div className="relative">
            {segments.map((segment, idx) => {
              const isWhitespace = /^\s+$/.test(segment.text)
              const isLastSegment = idx === segments.length - 1

              return (
                <span
                  key={`${segment.index}-${idx}`}
                  className={cn(
                    'response-stream-fade-segment',
                    isWhitespace && 'response-stream-fade-space'
                  )}
                  style={{
                    animationDelay: `${idx * getSegmentDelay()}ms`,
                  }}
                  onAnimationEnd={isLastSegment ? handleLastSegmentAnimationEnd : undefined}
                >
                  {segment.text}
                </span>
              )
            })}
          </div>
        </>
      )
    }

    return <>{displayedText}</>
  }

  return React.createElement(Component as string, { className }, renderContent())
}

export { useTextStream, ResponseStream }