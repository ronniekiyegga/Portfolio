# Visitor Counter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a live, all-time count of unique visitors in the home page status bar that ticks up when someone arrives.

**Architecture:** Upstash Redis holds one integer (`portfolio:visitors`) behind a small store module. A route handler at `/api/visits` increments it once per browser (cookie-deduplicated) on `POST` and serves a CDN-cached read on `GET`. The server renders the initial count (ISR, 60 s); a client hook records the visit, polls while the tab is visible, and feeds a presentational `VisitorCount` that animates each change.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `@upstash/redis`, Vitest, Testing Library, jsdom.

Spec: `docs/superpowers/specs/2026-09-29-visitor-counter-design.md`

## Global Constraints

- Redis key: `portfolio:visitors`.
- Cookie: `rk_visited=1`, `HttpOnly`, `Secure` in production, `SameSite=Lax`, `Path=/`, `Max-Age` one year.
- Env vars accepted: `KV_REST_API_URL`/`KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`.
- No personal data stored: no IPs, no user agents, no fingerprinting.
- `POST /api/visits` → `Cache-Control: no-store`. `GET /api/visits` → `Cache-Control: public, s-maxage=30`.
- Both methods respond `{ count: number | null }` with status 200, including on Redis failure.
- Poll interval: 30 s, only while `document.visibilityState === "visible"`.
- The displayed count never decreases on the client.
- No `aria-live` on the counter. Tick animation disabled under `prefers-reduced-motion: reduce`.
- No WebSockets or extra vendors beyond Upstash.
- Package manager: `pnpm`.

## File Structure

| File | Responsibility |
| --- | --- |
| `vitest.config.ts` (create) | Test runner config: `@/` alias, node default environment. |
| `vitest.setup.ts` (create) | Testing Library cleanup between tests. |
| `lib/visitors/visitor-store.ts` (create) | The only module that talks to Redis. |
| `lib/visitors/visitor-store.test.ts` (create) | Store behaviour against a fake client. |
| `app/api/visits/route.ts` (create) | HTTP transport: cookie dedupe, cache headers. |
| `app/api/visits/route.test.ts` (create) | Route behaviour with the store mocked. |
| `app/(home)/_features/identity/VisitorCount.tsx` (modify) | Presentational count + tick hook for CSS. |
| `app/(home)/_features/identity/VisitorCount.test.tsx` (create) | Formatting, pluralisation, tick flag. |
| `app/(home)/_features/identity/use-live-visitor-count.ts` (create) | Records the visit, polls, merges counts. |
| `app/(home)/_features/identity/use-live-visitor-count.test.tsx` (create) | Hook behaviour with fake timers and fetch. |
| `app/(home)/_features/identity/LiveVisitorCount.tsx` (create) | Client wrapper: hook → `VisitorCount`. |
| `app/(home)/_features/identity/Statusbar.tsx` (modify) | Render `LiveVisitorCount`. |
| `app/(home)/_features/identity/IdentitySection.tsx` (modify) | Read initial count on the server. |
| `app/(home)/page.tsx` (modify) | `revalidate = 60`. |
| `app/globals.css` (modify, near line 2350) | Tick animation styles. |

---

### Task 1: Test runner and visitor store

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `lib/visitors/visitor-store.ts`
- Test: `lib/visitors/visitor-store.test.ts`
- Modify: `package.json` (scripts, dependencies)

**Interfaces:**
- Produces:
  - `type CounterClient = { get(key: string): Promise<unknown>; incr(key: string): Promise<number> }`
  - `createVisitorStore(client: CounterClient | null): { getVisitorCount(): Promise<number | null>; incrementVisitorCount(): Promise<number | null> }`
  - `getVisitorCount(): Promise<number | null>` and `incrementVisitorCount(): Promise<number | null>` bound to the env-configured Redis client.
  - `pnpm test` runs Vitest once.

- [ ] **Step 1: Install dependencies**

Run:

```bash
pnpm add @upstash/redis
pnpm add -D vitest jsdom @testing-library/react @testing-library/dom
```

Expected: both commands exit 0 and `package.json` lists the packages.

- [ ] **Step 2: Add test scripts to `package.json`**

In `"scripts"`, after `"lint": "eslint"`, add:

```json
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    unstubGlobals: true,
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

- [ ] **Step 5: Write the failing store tests**

Create `lib/visitors/visitor-store.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";

import { createVisitorStore, type CounterClient } from "./visitor-store";

function fakeClient(overrides: Partial<CounterClient> = {}): CounterClient {
  return {
    get: vi.fn(async () => null),
    incr: vi.fn(async () => 1),
    ...overrides,
  };
}

describe("createVisitorStore", () => {
  it("returns null for both operations when Redis is not configured", async () => {
    const store = createVisitorStore(null);

    await expect(store.getVisitorCount()).resolves.toBeNull();
    await expect(store.incrementVisitorCount()).resolves.toBeNull();
  });

  it("reads the stored count", async () => {
    const store = createVisitorStore(fakeClient({ get: async () => 1204 }));

    await expect(store.getVisitorCount()).resolves.toBe(1204);
  });

  it("treats a missing key as zero visitors", async () => {
    const store = createVisitorStore(fakeClient({ get: async () => null }));

    await expect(store.getVisitorCount()).resolves.toBe(0);
  });

  it("accepts a numeric string from Redis", async () => {
    const store = createVisitorStore(fakeClient({ get: async () => "12" }));

    await expect(store.getVisitorCount()).resolves.toBe(12);
  });

  it("rejects a corrupted value", async () => {
    const store = createVisitorStore(fakeClient({ get: async () => "abc" }));

    await expect(store.getVisitorCount()).resolves.toBeNull();
  });

  it("increments the visitor key and returns the new count", async () => {
    const client = fakeClient({ incr: vi.fn(async () => 1205) });
    const store = createVisitorStore(client);

    await expect(store.incrementVisitorCount()).resolves.toBe(1205);
    expect(client.incr).toHaveBeenCalledWith("portfolio:visitors");
  });

  it("returns null and logs when Redis fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const store = createVisitorStore(
      fakeClient({
        get: async () => {
          throw new Error("timeout");
        },
        incr: async () => {
          throw new Error("timeout");
        },
      }),
    );

    await expect(store.getVisitorCount()).resolves.toBeNull();
    await expect(store.incrementVisitorCount()).resolves.toBeNull();
    expect(consoleError).toHaveBeenCalledTimes(2);
  });
});
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `pnpm test lib/visitors`
Expected: FAIL, cannot resolve `./visitor-store`.

- [ ] **Step 7: Implement `lib/visitors/visitor-store.ts`**

```ts
import { Redis } from "@upstash/redis";

const VISITOR_COUNT_KEY = "portfolio:visitors";

export type CounterClient = {
  get(key: string): Promise<unknown>;
  incr(key: string): Promise<number>;
};

function toVisitorCount(value: unknown): number | null {
  const count = Number(value ?? 0);
  return Number.isSafeInteger(count) && count >= 0 ? count : null;
}

export function createVisitorStore(client: CounterClient | null) {
  return {
    async getVisitorCount(): Promise<number | null> {
      if (!client) return null;
      try {
        return toVisitorCount(await client.get(VISITOR_COUNT_KEY));
      } catch (error) {
        console.error("[visitor-store] Failed to read visitor count", error);
        return null;
      }
    },

    async incrementVisitorCount(): Promise<number | null> {
      if (!client) return null;
      try {
        return toVisitorCount(await client.incr(VISITOR_COUNT_KEY));
      } catch (error) {
        console.error("[visitor-store] Failed to increment visitor count", error);
        return null;
      }
    },
  };
}

function createRedisClient(): CounterClient | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  // The SDK retries five times by default; a status-bar number should fail fast instead.
  return new Redis({ url, token, retry: { retries: 1 } });
}

export const { getVisitorCount, incrementVisitorCount } = createVisitorStore(
  createRedisClient(),
);
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `pnpm test lib/visitors`
Expected: PASS, 7 tests.

- [ ] **Step 9: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors from the new files. If `retry: { retries: 1 }` fails to type-check, look at the installed `RedisConfigNodejs` type in `node_modules/@upstash/redis` and match its `retry` shape.

- [ ] **Step 10: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts vitest.setup.ts lib/visitors
git commit -m "feat(visitors): add Redis-backed visitor store and Vitest"
```

---

### Task 2: `/api/visits` route handler

**Files:**
- Create: `app/api/visits/route.ts`
- Test: `app/api/visits/route.test.ts`

**Interfaces:**
- Consumes: `getVisitorCount()` and `incrementVisitorCount()` from `@/lib/visitors/visitor-store` (both `Promise<number | null>`).
- Produces: `POST /api/visits` and `GET /api/visits`, each responding `{ count: number | null }`.

- [ ] **Step 1: Write the failing route tests**

Create `app/api/visits/route.test.ts`:

```ts
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
```

The "no cookie on failure" case goes slightly beyond the spec on purpose: if Redis is down, the browser isn't marked as visited, so it is counted on a later visit instead of lost.

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test app/api/visits`
Expected: FAIL, cannot resolve `./route`.

- [ ] **Step 3: Implement `app/api/visits/route.ts`**

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test app/api/visits`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add app/api/visits
git commit -m "feat(visitors): add /api/visits route with cookie dedupe"
```

---

### Task 3: `VisitorCount` tick animation

**Files:**
- Modify: `app/(home)/_features/identity/VisitorCount.tsx`
- Modify: `app/globals.css` (after the `.visitorCount` rule, near line 2356)
- Modify: `docs/superpowers/specs/2026-09-29-visitor-counter-design.md` (`VisitorCount` bullet)
- Test: `app/(home)/_features/identity/VisitorCount.test.tsx`

**Interfaces:**
- Produces: `VisitorCount({ count: number | null; ticked?: boolean })`. When `ticked` is true, the root span carries `data-ticked` and the number span is keyed by `count`, so every change remounts it and replays the CSS animation.

- [ ] **Step 1: Write the failing component tests**

Create `app/(home)/_features/identity/VisitorCount.test.tsx`:

```tsx
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VisitorCount } from "./VisitorCount";

describe("VisitorCount", () => {
  it("formats the count with thousands separators", () => {
    render(<VisitorCount count={1204} />);

    expect(screen.getByText("1,204")).toBeTruthy();
    expect(screen.getByText(/visitors/)).toBeTruthy();
  });

  it("uses the singular for one visitor", () => {
    const { container } = render(<VisitorCount count={1} />);

    expect(container.textContent).toBe("1 visitor");
  });

  it("renders nothing when the count is unknown", () => {
    const { container } = render(<VisitorCount count={null} />);

    expect(container.innerHTML).toBe("");
  });

  it("marks the count as ticked only when asked", () => {
    const { container, rerender } = render(<VisitorCount count={5} />);
    const root = () => container.querySelector(".visitorCount");

    expect(root()?.hasAttribute("data-ticked")).toBe(false);

    rerender(<VisitorCount count={6} ticked />);

    expect(root()?.hasAttribute("data-ticked")).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test VisitorCount`
Expected: FAIL. "formats the count" fails because the number is not in its own element yet, and "marks the count as ticked" fails because `data-ticked` is never set.

- [ ] **Step 3: Update `VisitorCount.tsx`**

Replace the file contents with:

```tsx
const visitorCountFormat = new Intl.NumberFormat("en-GB");

type VisitorCountProps = {
  count: number | null;
  ticked?: boolean;
};

export function VisitorCount({ count, ticked = false }: VisitorCountProps) {
  if (count === null) return null;

  return (
    <span className="visitorCount" data-ticked={ticked || undefined}>
      <span key={count} className="visitorCountValue">
        {visitorCountFormat.format(count)}
      </span>{" "}
      {count === 1 ? "visitor" : "visitors"}
    </span>
  );
}
```

- [ ] **Step 4: Add the tick styles to `app/globals.css`**

Directly after the existing `.visitorCount { … }` rule:

```css
.visitorCountValue {
  display: inline-block;
}

.visitorCount[data-ticked] .visitorCountValue {
  animation: visitorCountTick 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes visitorCountTick {
  from {
    opacity: 0;
    transform: translateY(0.45em);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .visitorCount[data-ticked] .visitorCountValue {
    animation: none;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test VisitorCount`
Expected: PASS, 4 tests.

- [ ] **Step 6: Align the spec with the simpler animation**

Only the new number animates; the old number is not kept around to slide out, which would need extra state for little visual gain. In the spec's `VisitorCount` bullet, replace:

```
Adds a CSS-only tick: the old number slides out, the new one slides
  in.
```

with:

```
Adds a CSS-only tick: each new number rises and fades
  into place (the number span is keyed by count, so a change replays the
  animation). Only changes after page load animate.
```

- [ ] **Step 7: Commit**

```bash
git add "app/(home)/_features/identity/VisitorCount.tsx" "app/(home)/_features/identity/VisitorCount.test.tsx" app/globals.css docs/superpowers/specs/2026-09-29-visitor-counter-design.md
git commit -m "feat(visitors): animate visitor count changes"
```

---

### Task 4: `useLiveVisitorCount` hook and `LiveVisitorCount`

**Files:**
- Create: `app/(home)/_features/identity/use-live-visitor-count.ts`
- Create: `app/(home)/_features/identity/LiveVisitorCount.tsx`
- Test: `app/(home)/_features/identity/use-live-visitor-count.test.tsx`

**Interfaces:**
- Consumes: `POST /api/visits` and `GET /api/visits` (`{ count: number | null }`); `VisitorCount({ count, ticked })` from Task 3.
- Produces:
  - `useLiveVisitorCount(initialCount: number | null): number | null`
  - `VISITOR_POLL_INTERVAL_MS = 30_000`
  - `LiveVisitorCount({ initialCount: number | null })`

- [ ] **Step 1: Write the failing hook tests**

Create `app/(home)/_features/identity/use-live-visitor-count.test.tsx`:

```tsx
// @vitest-environment jsdom
import { StrictMode } from "react";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useLiveVisitorCount,
  VISITOR_POLL_INTERVAL_MS,
} from "./use-live-visitor-count";

type Method = "GET" | "POST";

let visibility: DocumentVisibilityState = "visible";

function setVisibility(state: DocumentVisibilityState) {
  visibility = state;
  document.dispatchEvent(new Event("visibilitychange"));
}

function mockVisitsApi(counts: Partial<Record<Method, number | null>>) {
  const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    const method = (init?.method ?? "GET") as Method;
    return {
      ok: true,
      json: async () => ({ count: counts[method] ?? null }),
    } as Response;
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function callsFor(fetchMock: ReturnType<typeof mockVisitsApi>, method: Method) {
  return fetchMock.mock.calls.filter(([, init]) => init?.method === method).length;
}

async function flushRequests() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

describe("useLiveVisitorCount", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    visibility = "visible";
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibility,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("records the visit exactly once, even under Strict Mode", async () => {
    const fetchMock = mockVisitsApi({ POST: 6 });

    renderHook(() => useLiveVisitorCount(5), { wrapper: StrictMode });
    await flushRequests();

    expect(callsFor(fetchMock, "POST")).toBe(1);
  });

  it("adopts the count returned for this visit", async () => {
    mockVisitsApi({ POST: 6 });

    const { result } = renderHook(() => useLiveVisitorCount(5));
    await flushRequests();

    expect(result.current).toBe(6);
  });

  it("shows the count even when the server had none to render", async () => {
    mockVisitsApi({ POST: 1 });

    const { result } = renderHook(() => useLiveVisitorCount(null));
    await flushRequests();

    expect(result.current).toBe(1);
  });

  it("never lowers the count when a response is stale", async () => {
    mockVisitsApi({ POST: 7, GET: 8 });

    const { result } = renderHook(() => useLiveVisitorCount(10));
    await flushRequests();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(VISITOR_POLL_INTERVAL_MS);
    });

    expect(result.current).toBe(10);
  });

  it("keeps the current count when the API has no count", async () => {
    mockVisitsApi({ POST: null, GET: null });

    const { result } = renderHook(() => useLiveVisitorCount(5));
    await flushRequests();

    expect(result.current).toBe(5);
  });

  it("keeps the current count when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    }));

    const { result } = renderHook(() => useLiveVisitorCount(5));
    await flushRequests();

    expect(result.current).toBe(5);
  });

  it("polls for other visitors every 30 seconds while visible", async () => {
    const fetchMock = mockVisitsApi({ POST: 6, GET: 9 });

    const { result } = renderHook(() => useLiveVisitorCount(5));
    await flushRequests();
    expect(callsFor(fetchMock, "GET")).toBe(0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VISITOR_POLL_INTERVAL_MS);
    });

    expect(callsFor(fetchMock, "GET")).toBe(1);
    expect(result.current).toBe(9);
  });

  it("stops polling while hidden and refreshes as soon as it is visible again", async () => {
    const fetchMock = mockVisitsApi({ POST: 6, GET: 9 });

    renderHook(() => useLiveVisitorCount(5));
    await flushRequests();

    act(() => setVisibility("hidden"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(VISITOR_POLL_INTERVAL_MS * 3);
    });
    expect(callsFor(fetchMock, "GET")).toBe(0);

    act(() => setVisibility("visible"));
    await flushRequests();
    expect(callsFor(fetchMock, "GET")).toBe(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test use-live-visitor-count`
Expected: FAIL, cannot resolve `./use-live-visitor-count`.

- [ ] **Step 3: Implement `use-live-visitor-count.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export const VISITOR_POLL_INTERVAL_MS = 30_000;

const VISITS_ENDPOINT = "/api/visits";

type VisitsResponse = { count: number | null };

async function requestVisitorCount(method: "GET" | "POST"): Promise<number | null> {
  try {
    const response = await fetch(VISITS_ENDPOINT, { method });
    if (!response.ok) return null;
    const body = (await response.json()) as VisitsResponse;
    return typeof body.count === "number" ? body.count : null;
  } catch {
    return null;
  }
}

function keepHighest(current: number | null, next: number | null): number | null {
  if (next === null) return current;
  if (current === null) return next;
  return Math.max(current, next);
}

export function useLiveVisitorCount(initialCount: number | null): number | null {
  const [count, setCount] = useState(initialCount);
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (hasRecordedVisit.current) return;
    hasRecordedVisit.current = true;

    void requestVisitorCount("POST").then((next) => {
      setCount((current) => keepHighest(current, next));
    });
  }, []);

  useEffect(() => {
    let intervalId: number | undefined;

    const refresh = () => {
      void requestVisitorCount("GET").then((next) => {
        setCount((current) => keepHighest(current, next));
      });
    };

    const startPolling = () => {
      if (intervalId === undefined) {
        intervalId = window.setInterval(refresh, VISITOR_POLL_INTERVAL_MS);
      }
    };

    const stopPolling = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
        startPolling();
      } else {
        stopPolling();
      }
    };

    if (document.visibilityState === "visible") startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return count;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test use-live-visitor-count`
Expected: PASS, 8 tests.

- [ ] **Step 5: Create `LiveVisitorCount.tsx`**

```tsx
"use client";

import { useLiveVisitorCount } from "./use-live-visitor-count";
import { VisitorCount } from "./VisitorCount";

type LiveVisitorCountProps = {
  initialCount: number | null;
};

export function LiveVisitorCount({ initialCount }: LiveVisitorCountProps) {
  const count = useLiveVisitorCount(initialCount);

  return <VisitorCount count={count} ticked={count !== initialCount} />;
}
```

- [ ] **Step 6: Run the full suite**

Run: `pnpm test`
Expected: PASS, 23 tests across 4 files.

- [ ] **Step 7: Commit**

```bash
git add "app/(home)/_features/identity/use-live-visitor-count.ts" "app/(home)/_features/identity/use-live-visitor-count.test.tsx" "app/(home)/_features/identity/LiveVisitorCount.tsx"
git commit -m "feat(visitors): add live visitor count hook with visibility-aware polling"
```

---

### Task 5: Wire into the home page and verify end to end

**Files:**
- Modify: `app/(home)/_features/identity/Statusbar.tsx`
- Modify: `app/(home)/_features/identity/IdentitySection.tsx`
- Modify: `app/(home)/page.tsx`

**Interfaces:**
- Consumes: `getVisitorCount()` (Task 1), `LiveVisitorCount({ initialCount })` (Task 4).

- [ ] **Step 1: Render `LiveVisitorCount` in `Statusbar.tsx`**

Replace the import:

```tsx
import { VisitorCount } from "./VisitorCount";
```

with:

```tsx
import { LiveVisitorCount } from "./LiveVisitorCount";
```

and replace:

```tsx
        <VisitorCount count={visitorCount} />
```

with:

```tsx
        <LiveVisitorCount initialCount={visitorCount} />
```

- [ ] **Step 2: Read the count in `IdentitySection.tsx`**

Add the import after the `@/lib/constants` import:

```tsx
import { getVisitorCount } from "@/lib/visitors/visitor-store";
```

Make the component async and pass the count:

```tsx
export async function IdentitySection() {
  const visitorCount = await getVisitorCount();

  return (
    <header className="identity reveal">
      <IdentityShader />
      <Statusbar visitorCount={visitorCount} />
```

(The rest of the JSX is unchanged.)

- [ ] **Step 3: Revalidate the home page every 60 seconds**

In `app/(home)/page.tsx`, after the imports and before `export default function Home()`:

```tsx
export const revalidate = 60;
```

- [ ] **Step 4: Lint, type-check, test, build**

Run:

```bash
pnpm lint && pnpm exec tsc --noEmit && pnpm test && pnpm build
```

Expected: all pass. In the build output, `/` is listed as ISR with a 1m revalidate, and `/api/visits` as dynamic.

- [ ] **Step 5: Verify graceful degradation without Redis**

With no Redis variables in `.env.local`, run `pnpm dev` and open `http://localhost:3000`.
Expected: the status bar shows GitHub / LinkedIn and the moon toggle with no count and no console errors. `POST /api/visits` in the Network tab returns `{"count":null}` with status 200 and no `Set-Cookie`.

- [ ] **Step 6: Connect Upstash (manual, owner only)**

1. Vercel dashboard → the Portfolio project → Storage → Marketplace → Upstash Redis → create a free database and connect it to the project (all environments).
2. Locally: `vercel env pull .env.local`.
3. Confirm `.env.local` contains `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or the `UPSTASH_REDIS_REST_*` pair) and that `.env*` is git-ignored: `git check-ignore .env.local` prints `.env.local`.

- [ ] **Step 7: Verify the real flow locally**

Restart `pnpm dev`, then:

```bash
curl -s -c /tmp/visits.jar -X POST http://localhost:3000/api/visits
curl -s -b /tmp/visits.jar -X POST http://localhost:3000/api/visits
curl -s -i http://localhost:3000/api/visits | rg -i "cache-control|count"
```

Expected: the first call returns `{"count":N}`, the second returns the same `N` (cookie deduplicated), and the `GET` shows `cache-control: public, s-maxage=30`. Open the site in a normal window and a private window: the private window's arrival bumps the count by one and the number animates. Turn on "Reduce motion" in macOS Accessibility settings and reload a private window: the number changes without animation.

- [ ] **Step 8: Commit**

```bash
git add "app/(home)/_features/identity/Statusbar.tsx" "app/(home)/_features/identity/IdentitySection.tsx" "app/(home)/page.tsx"
git commit -m "feat(visitors): show live visitor count in the status bar"
```
