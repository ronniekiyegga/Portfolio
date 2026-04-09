import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Stable HTML/SVG id prefix; identical on server and client (avoid useId + Framer Motion hydration skew). */
export function stableDomIdSlug(text: string, prefix: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${prefix}-${base || "item"}`;
}
