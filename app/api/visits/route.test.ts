import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getVisitorCount,
  incrementVisitorCount,
} from "@/lib/visitors/visitor-store";

import { GET, POST } from "./route";

vi.mock("@/lib/visitors/visitor-store", () => ({
  getVisitorCount: vi.fn(),
  incrementVisitorCount: vi.fn(),
}));

const mockedGet = vi.mocked(getVisitorCount);
const mockedIncrement = vi.mocked(incrementVisitorCount);

function visitRequest(cookie?: string) {
  return new NextRequest("http://localhost/api/visits", {
    method: "POST",
    headers: cookie ? { cookie } : undefined,
  });
}

describe("POST /api/visits", () => {
  beforeEach(() => {
    mockedGet.mockResolvedValue(1204);
    mockedIncrement.mockResolvedValue(1205);
  });

  it("counts a first visit and marks the browser as visited", async () => {
    const response = await POST(visitRequest());

    expect(mockedIncrement).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({ count: 1205 });
    expect(response.headers.get("cache-control")).toBe("no-store");

    const cookie = response.cookies.get("rk_visited");
    expect(cookie?.value).toBe("1");
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("lax");
    expect(cookie?.path).toBe("/");
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 365);
  });

  it("does not count a returning visitor", async () => {
    const response = await POST(visitRequest("rk_visited=1"));

    expect(mockedIncrement).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({ count: 1204 });
    expect(response.cookies.get("rk_visited")).toBeUndefined();
  });

  it("returns 200 with a null count and no cookie when the store fails", async () => {
    mockedIncrement.mockResolvedValue(null);

    const response = await POST(visitRequest());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ count: null });
    expect(response.cookies.get("rk_visited")).toBeUndefined();
  });
});

describe("GET /api/visits", () => {
  it("reads without incrementing and lets the CDN cache for 30 seconds", async () => {
    mockedGet.mockResolvedValue(1204);

    const response = await GET();

    expect(mockedIncrement).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({ count: 1204 });
    expect(response.headers.get("cache-control")).toBe("public, s-maxage=30");
  });
});
