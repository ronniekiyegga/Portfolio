"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "!<>-_/[]{}—=+*^?#________";

export function TextScramble({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const target = String(children).trim();
    let frame = 0;
    const queue = target.split("").map((c, i) => ({ char: c, delay: i * 3 }));
    const resolve = () => setDone(true);

    const tick = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { char, delay } = queue[i];
        if (delay <= frame) {
          output += char;
          complete++;
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setText(output);

      if (complete === queue.length) {
        resolve();
      } else {
        frame++;
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [children]);

  return <span className={cn(className)}>{text}</span>;
}
