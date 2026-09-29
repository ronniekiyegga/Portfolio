# Visitor Counter — Design

## Goal

Show a public, all-time count of unique visitors in the home page status bar
("1,204 visitors", beside the moon toggle), and grow it as people visit.

## Decisions

| Question | Decision |
| --- | --- |
| Storage | Upstash Redis via the Vercel Marketplace (Vercel KV was sunset in Dec 2024). Free tier: 256 MB, 500K commands/month. |
| What counts as a visitor | One count per browser, deduplicated with a first-party cookie. |
| Where the increment happens | A route handler called from the browser, not during server render. |
| Personal data | None stored. No IPs, no user agents, no fingerprinting. |

Vercel Web Analytics is complementary (private dashboard) but unsuitable as
the source of this number: Hobby retains one month of data and pauses
collection at 50K events/month.

## Architecture

```
Browser ──(once per page load)──▶ POST /api/visits ──▶ visitor-store ──▶ Upstash Redis
                                        │                   ▲
                                        └─ sets rk_visited  │
                                                            │
IdentitySection (server, cached 60s) ── getVisitorCount ────┘
        └──▶ Statusbar ──▶ VisitorCount
```

### Units

- **`lib/visitors/visitor-store.ts`** — the only module that knows about Redis.
  - `getVisitorCount(): Promise<number | null>`
  - `incrementVisitorCount(): Promise<number | null>`
  - Key: `portfolio:visitors`.
  - Returns `null` when Redis env vars are missing or a call fails.
- **`app/api/visits/route.ts`** — `POST` only.
  - Cookie `rk_visited` present → return the current count unchanged.
  - Absent → increment, set `rk_visited=1` (`HttpOnly`, `Secure` in
    production, `SameSite=Lax`, `Path=/`, `Max-Age` one year).
  - Responds `{ count: number | null }` with `Cache-Control: no-store`.
- **`app/(home)/_features/identity/VisitTracker.tsx`** — client component,
  renders nothing, fires the `POST` once on mount. Errors are swallowed.
- **`IdentitySection`** — reads the count through a cached function
  (`revalidate: 60`) and passes it to `Statusbar`.
- **`Statusbar` / `VisitorCount`** — already implemented; hide when `null`.

## Error handling

- Missing Redis credentials (local checkout without `vercel env pull`) →
  store returns `null`, count is hidden, no crash. The store accepts either
  naming the integration may inject: `KV_REST_API_URL`/`KV_REST_API_TOKEN` or
  `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`.
- Redis outage or timeout → same behaviour; the route still returns 200 with
  `count: null` so the client never retries in a loop.
- Tracker failure never affects rendering.

## Accepted limitations

- Clearing cookies or switching browser/device counts again.
- JavaScript-executing bots can be counted; rely on Vercel bot protection.
  Rate limiting is deferred until the number looks inflated (YAGNI).
- The displayed number can lag real visits by up to 60 seconds.

## Cost check

About two Redis commands per new visitor plus one read per 60 s cache miss.
The free tier covers roughly 250K new visitors per month.

## Testing

Add Vitest (first test runner in the repo) with an in-memory fake for the store.

- Route: first visit increments and sets the cookie.
- Route: returning visit does not increment.
- Route: store returning `null` still yields 200 with `count: null`.
- `VisitorCount`: formats with thousands separators, singular/plural, hides on `null`.

## Setup

1. Vercel dashboard → Storage → Marketplace → Upstash Redis → connect to the project.
2. `vercel env pull .env.local` for local development.
3. `pnpm add @upstash/redis` and `pnpm add -D vitest`.
