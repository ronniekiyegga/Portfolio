import { type NextRequest, NextResponse } from "next/server";

import {
  getVisitorCount,
  incrementVisitorCount,
} from "@/lib/visitors/visitor-store";

export const runtime = "nodejs";

const VISITED_COOKIE = "rk_visited";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function GET() {
  const count = await getVisitorCount();
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "public, s-maxage=30" } },
  );
}

export async function POST(request: NextRequest) {
  const isReturningVisitor = request.cookies.has(VISITED_COOKIE);
  const count = isReturningVisitor
    ? await getVisitorCount()
    : await incrementVisitorCount();

  const response = NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store" } },
  );

  if (!isReturningVisitor && count !== null) {
    response.cookies.set(VISITED_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR_IN_SECONDS,
    });
  }

  return response;
}
