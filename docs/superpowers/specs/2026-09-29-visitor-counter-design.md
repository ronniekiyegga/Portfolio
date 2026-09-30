# Visitor Counter — Design

## Goal

Show a public, all-time count of unique visitors in the home page status bar
("1,204 visitors", beside the moon toggle), and grow it as people visit. The
arriving visitor sees the count tick up (1,203 → 1,204); visitors already on
the page pick up other arrivals within about a minute.

This is a public vanity metric, not observability. Private traffic insight
(pages, referrers, countries) belongs in Vercel Web Analytics.

## Decisions

| Question | Decision |
| --- | --- |
| Storage | Upstash Redis via the Vercel Marketplace (Vercel KV was sunset in Dec 2024). Free tier: 256 MB, 500K commands/month. |
| What counts as a visitor | One count per browser, deduplicated with a first-party cookie. |
| Where the increment happens | A route handler called from the browser, not during server render. |
| Personal data | None stored. No IPs, no user agents, no fingerprinting. |
| Live updates | Animate the arriving visitor's own tick; poll a CDN-cached read every 30 s while the tab is visible. No WebSockets. |

WebSockets (Pusher/Ably, or PartyKit/Durable Objects) were rejected: an extra
vendor, secrets and client bundle for a number that rarely changes while two
people are on the page at once. Upgrade path if ever wanted: broadcast from
`POST /api/visits`; nothing else in this design changes.

Vercel Web Analytics is complementary (private dashboard) but unsuitable as
the source of this number: Hobby retains one month of data and pauses
collection at 50K events/month.

## Architecture

```
IdentitySection (server) ── getVisitorCount (cached 60s) ──▶ initial count
        └──▶ Statusbar ──▶ LiveVisitorCount (client)
                              ├─ on mount:     POST /api/visits ──▶ count after this visit
                              └─ tab visible:  GET  /api/visits every 30s ──▶ latest count
                                               (CDN-cached 30s)

POST/GET /api/visits ──▶ visitor-store ──▶ Upstash Redis
```

### Units

- **`lib/visitors/visitor-store.ts`** — the only module that knows about Redis.
  - `getVisitorCount(): Promise<number | null>`
  - `incrementVisitorCount(): Promise<number | null>`
  - Key: `portfolio:visitors`.
  - Returns `null` when Redis env vars are missing or a call fails.
- **`app/api/visits/route.ts`**
  - `POST`: cookie `rk_visited` present → return the current count unchanged.
    Absent → increment, set `rk_visited=1` (`HttpOnly`, `Secure` in
    production, `SameSite=Lax`, `Path=/`, `Max-Age` one year). Responds
    `{ count: number | null }` with `Cache-Control: no-store`.
  - `GET`: returns `{ count: number | null }` with
    `Cache-Control: public, s-maxage=30`, so the Vercel CDN absorbs polling
    and Redis sees roughly two reads a minute regardless of open tabs.
- **`app/(home)/_features/identity/use-live-visitor-count.ts`** —
  `useLiveVisitorCount(initialCount: number | null): number | null`.
  - Fires the `POST` once per page load, guarded by a ref so React Strict
    Mode's double effect cannot double-count in development.
  - Polls `GET` every 30 s only while `document.visibilityState === "visible"`.
  - Merges results with `Math.max`, so a stale cached response never moves
    the count backwards. `null` responses leave the current value unchanged.
  - Network errors are swallowed; the last known count stays on screen.
- **`app/(home)/_features/identity/LiveVisitorCount.tsx`** — client wrapper:
  `useLiveVisitorCount` → `VisitorCount`. Replaces the earlier `VisitTracker`
  idea, since tracking and display now share one lifecycle.
- **`VisitorCount`** — stays presentational (format, pluralise, hide on
  `null`). Adds a CSS-only tick: the old number slides out, the new one slides
  in. Under `prefers-reduced-motion: reduce` the number swaps instantly. No
  `aria-live`: announcing the count every poll would be noise.
- **`IdentitySection`** — reads the count through a cached function
  (`revalidate: 60`) and passes it to `Statusbar` as the initial count.
- **`Statusbar`** — renders `LiveVisitorCount` instead of `VisitorCount`.

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
- Other people's arrivals appear within 30–60 seconds (CDN cache plus poll
  interval), not instantly.

## Cost check

About two Redis commands per new visitor, one read per 60 s server cache miss,
and at most two polling reads per minute thanks to the CDN cache (~86K/month
worst case). The free tier (500K commands/month) still covers roughly 200K new
visitors per month.

## Testing

Add Vitest (first test runner in the repo) with an in-memory fake for the store.

- Route: first visit increments and sets the cookie.
- Route: returning visit does not increment.
- Route: store returning `null` still yields 200 with `count: null`.
- Route: `GET` never increments and sends the CDN cache header.
- Hook: sends exactly one `POST` even when the effect runs twice.
- Hook: never lowers the count when a response is smaller than the current value.
- Hook: does not poll while the tab is hidden; resumes when it becomes visible.
- `VisitorCount`: formats with thousands separators, singular/plural, hides on `null`.

## Setup

1. Vercel dashboard → Storage → Marketplace → Upstash Redis → connect to the project.
2. `vercel env pull .env.local` for local development.
3. `pnpm add @upstash/redis` and `pnpm add -D vitest`.
