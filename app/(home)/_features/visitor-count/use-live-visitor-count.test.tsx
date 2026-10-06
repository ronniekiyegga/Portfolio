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
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );

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
