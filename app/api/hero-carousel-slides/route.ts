import { NextResponse } from "next/server";
import { getResolvedHeroCarouselSlides } from "@/lib/hero-carousel-images";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Re-reads `public/carousel` on every request so new `*_up.webp` / `*_down.webp`
 * files show up without redeploy (used by HeroCarousel polling).
 */
export async function GET() {
  const slides = getResolvedHeroCarouselSlides();
  return NextResponse.json(slides, {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
