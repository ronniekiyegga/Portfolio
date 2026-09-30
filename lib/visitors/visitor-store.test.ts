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
