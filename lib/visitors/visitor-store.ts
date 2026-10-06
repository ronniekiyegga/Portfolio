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

  return new Redis({ url, token, retry: { retries: 1 } });
}

export const { getVisitorCount, incrementVisitorCount } = createVisitorStore(
  createRedisClient(),
);
