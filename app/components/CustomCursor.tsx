"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [hasPointer, setHasPointer] = useState(true);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasPointer(mq.matches);
    const handler = () => setHasPointer(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      dotX += (tx - dotX) * 0.12;
      dotY += (ty - dotY) * 0.12;
      ringX += (tx - ringX) * 0.06;
      ringY += (ty - ringY) * 0.06;
      setPos({ x: dotX, y: dotY });
      setRingPos({ x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, [hasPointer]);

  useEffect(() => {
    if (hasPointer) {
      document.documentElement.classList.add("custom-cursor-active");
      return () => document.documentElement.classList.remove("custom-cursor-active");
    }
  }, [hasPointer]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!hasPointer || !mounted) return null;

  const cursorEl = (
    <>
      <div
        className="custom-cursor-dot"
        id="cursor"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%) scale(1)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className="custom-cursor-ring"
        id="ring"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          transform: "translate(-50%, -50%)",
          opacity: visible ? 0.5 : 0,
        }}
      />
    </>
  );

  if (typeof document !== "undefined") {
    return createPortal(cursorEl, document.body);
  }
  return null;
}
