import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "An export endpoint starts consuming enough database and file-generation capacity to slow down the rest of the product. Most customers run an export occasionally, but one integration has begun polling the route throughout the day.",
    "The quickest protection looks obvious:",
    "“Limit requests to 100 per minute.”",
    "A concrete number is easy to add to middleware and gives the service a clear `429 Too Many Requests` response. But the first implementation immediately creates harder questions. Is the budget shared by an IP address, a user or an organisation? Should a short burst be allowed? Does an export consume the same allowance as a cached read, and should a payment webhook be rejected because unrelated traffic used the budget first?",
    "Until we know which resource is under pressure and which callers should share it, 100 requests per minute is only a counter with a threshold. The strategy begins when we decide how limited capacity ought to be distributed.",
  ],
  sections: [
    {
      heading: "The number exposes the missing policy",
      blocks: [
        {
          type: "p",
          text: "Trying to choose the threshold exposes the decisions that middleware cannot make for us: what resource needs protection, whose requests share a budget, whether a burst is acceptable and what should happen when that budget is exhausted. The values below make those choices concrete; they are examples rather than universal defaults.",
        },
      ],
    },
    {
      heading: "Not every request costs the same",
      blocks: [
        {
          type: "p",
          text: "A single global cap still has value: it can reduce obvious accidental overload, protect a small service from one poorly behaved client and set a basic boundary before more detailed policies exist. Its weakness is that it counts every request as the same amount of work.",
        },
        {
          type: "code",
          language: "text",
          code: `GET /health
→ very cheap

GET /applications
→ database query

POST /auth/login
→ security-sensitive and potentially expensive

POST /exports
→ potentially high CPU and database work

POST /checkout
→ payment-provider interaction and business risk

POST /webhooks/stripe
→ externally retried delivery that must be handled carefully`,
        },
        {
          type: "p",
          text: "A single global count treats all of these operations as equivalent. That means the cheap route may consume the same budget as the expensive one. A user may be blocked from a core action while the endpoint causing resource pressure remains reachable. A legitimate integration may be throttled because unrelated traffic shares the same identity.",
        },
      ],
    },
    {
      heading: "What each route is protecting",
      blocks: [
        {
          type: "p",
          text: "A rate limit should begin with the resource or failure mode being protected. For example:",
        },
        {
          type: "code",
          language: "text",
          code: `Login endpoint
Protect against credential stuffing and identity-provider overload.

Export endpoint
Protect database and file-generation capacity.

Search endpoint
Protect an expensive query path.

Public API
Protect shared platform capacity and provide a fair customer quota.

Webhook endpoint
Protect processing capacity while preserving safe retry behaviour.`,
        },
        {
          type: "p",
          text: "The rate-limit policy follows from that answer; an expensive report generation route may need a small per-user or per-organisation limit. A read-heavy route may need caching and a higher allowance; a login route may use an IP-level policy before authentication and a user-level policy after it. The point is not to create a unique algorithm for every endpoint. It is to avoid treating every request as the same kind of work.",
        },
      ],
    },
    {
      heading: "Identity determines whether the policy is fair",
      blocks: [
        {
          type: "p",
          text: "Every rate limiter needs a key: the identity used to group requests. Common options include:",
        },
        {
          type: "code",
          language: "text",
          code: `IP address
Authenticated user ID
API key
Organisation or tenant ID
Session ID
A combination of signals`,
        },
        {
          type: "p",
          text: "Each has limitations. IP address can be useful for anonymous abuse, but it can unfairly group users on shared Wi-Fi, mobile networks, offices, universities, or schools. User ID is more meaningful after authentication, but it does not protect a public login endpoint. API keys work well for integrations when they are scoped and revocable, but they cannot protect a browser route where no key exists. A more realistic policy is layered:",
        },
        {
          type: "code",
          language: "text",
          code: `Anonymous routes:
limit by IP and endpoint type

Authenticated routes:
limit by user or workspace

API integrations:
limit by API key and contract/plan

Expensive operations:
apply a lower separate budget`,
        },
        {
          type: "p",
          text: "There is rarely a perfect key. What matters is choosing an identity that matches the resource and does not punish unrelated users.",
        },
      ],
    },
    {
      heading: "Fixed windows look correct until the boundary",
      blocks: [
        {
          type: "p",
          text: "A fixed-window counter is straightforward:",
        },
        {
          type: "code",
          language: "text",
          code: "100 requests between 12:00:00 and 12:00:59",
        },
        {
          type: "p",
          text: "The boundary creates a familiar issue: a client can send 100 requests at the end of one minute and another 100 immediately at the beginning of the next. The policy technically allows both, but the protected system experiences a concentrated burst. That may be fine for a low-risk endpoint, but not for a route that triggers expensive work. Different approaches create different behaviour:",
        },
        {
          type: "code",
          language: "text",
          code: `Fixed window
Simple and cheap, but allows boundary bursts.

Sliding window counter
Smoother approximation of recent activity.

Sliding log
More precise, but higher storage and processing cost.

Token bucket
Allows controlled bursts while enforcing an average rate.

Leaky bucket
Smooths work toward a steady output rate.`,
        },
        {
          type: "p",
          text: "The correct algorithm depends on the behaviour you want. If a user should be able to make a small burst of valid requests, token-bucket behaviour can be appropriate. If a dependency can only process work steadily, a queue or leaky-bucket-like policy may fit better. Choose the desired behaviour before choosing the algorithm.",
        },
      ],
    },
    {
      heading: "A local counter is not a distributed policy",
      blocks: [
        {
          type: "p",
          text: "An in-memory counter can work in a single development process, but it becomes unreliable when traffic is distributed:",
        },
        {
          type: "code",
          language: "text",
          code: `Instance A allows 100 requests
Instance B allows 100 requests
Instance C allows 100 requests`,
        },
        {
          type: "p",
          text: "A client may receive 300 requests of effective capacity while the intended limit was 100. That does not mean every project needs Redis immediately. A shared store, API gateway, CDN policy, managed platform feature, or dedicated rate-limiting service earns its place when distributed enforcement is a real requirement. Redis is a common option because atomic counters with expiry are useful, but adding it solely to satisfy a system-design checklist is not evidence of good architecture. The system should use the simplest enforcement point that reliably protects the resource.",
        },
      ],
    },
    {
      heading: "A rejection needs a recovery path",
      blocks: [
        {
          type: "p",
          text: "A `429` response should not feel like a broken product. A client needs enough information to recover, and `Retry-After` is given in seconds, so a client that must wait 42 minutes receives:",
        },
        {
          type: "code",
          language: "http",
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 2520`,
        },
        {
          type: "p",
          text: "A user-facing interface should explain that the action did not complete and when it can be retried. For example:",
        },
        {
          type: "code",
          language: "text",
          code: `You have reached the export limit for this hour.
Try again in 42 minutes, or narrow the report before exporting.`,
        },
        {
          type: "p",
          text: "Avoid exposing unnecessary internal details, but do not leave the user guessing whether the request succeeded. For mutations, retries need extra care: if a client times out around the point a request is processed, it may not know whether the operation happened. Idempotency protects the business operation while the rate limit protects capacity. These mechanisms need to work together.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "“100 requests per minute” is not a strategy until it answers:",
        },
        {
          type: "code",
          language: "text",
          code: `Which resource are we protecting?
Which endpoint or operation creates the cost?
Whose requests are grouped together?
Are short bursts acceptable?
How is the policy enforced across instances?
What does recovery look like?
What do we measure?`,
        },
        {
          type: "p",
          text: "A rate limiter is an admission-control policy. Rejecting traffic is only the mechanism; its job is to preserve the service for legitimate users when demand, bugs or abuse would otherwise consume finite capacity.",
        },
      ],
    },
  ],
};
