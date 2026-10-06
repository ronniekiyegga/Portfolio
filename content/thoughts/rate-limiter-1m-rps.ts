import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "An endpoint becomes slow. Maybe a public API receives more traffic than expected; maybe an expensive export route is being called repeatedly. Maybe login attempts spike; maybe an integration starts polling too aggressively. Maybe one customer is consuming enough work to affect everyone else. The obvious response is simple:",
    "“Limit requests to 100 per minute.”",
    "A number feels concrete, and it is easy to add to middleware. It produces a `429 Too Many Requests` response; the system appears protected. But 100 requests per minute from whom? To which endpoint? For which operation? Against which resource? Is a burst acceptable? What happens to a user behind a shared office network? What happens to a payment provider webhook that retries after a timeout? Without those answers, the number is not a rate-limiting strategy. It is a counter with a threshold.",
  ],
  sections: [
    {
      heading: "Start with the policy",
      blocks: [
        {
          type: "p",
          text: "The important decision comes before the counter: what resource is being protected, whose requests share a budget, whether a burst is acceptable, and what should happen when that budget is exhausted. The values below make the policy concrete, and they are examples, not universal defaults.",
        },
      ],
    },
    {
      heading: "The obvious solution: one global request cap",
      blocks: [
        {
          type: "p",
          text: "A global limit has some benefits, and it is easy to understand:",
        },
        {
          type: "code",
          language: "text",
          code: `If requests exceed the threshold:
return 429`,
        },
        {
          type: "p",
          text: "It can reduce obvious accidental overload, and it can protect a small service from a single poorly behaved client. It can create a basic boundary before more detailed policies exist. The problem is that not all requests cost the same.",
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
      heading: "The hidden question: what resource needs protection?",
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
          text: "The strategy is not “choose the perfect key.” It is “choose an identity that matches the resource and does not punish unrelated users.”",
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
          text: "The boundary creates a familiar issue; a client can send 100 requests at the end of one minute and another 100 immediately at the beginning of the next. The policy technically allows both, but the protected system experiences a concentrated burst. That may be fine for a low-risk endpoint, and it may not be fine for a route that triggers expensive work. Different approaches create different behaviour:",
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
          text: "The correct algorithm depends on the behaviour you want; if a user should be able to make a small burst of valid requests, token-bucket behaviour can be appropriate. If a dependency can only process work steadily, a queue or leaky-bucket-like policy may fit better. Choose the desired behaviour before choosing the algorithm.",
        },
      ],
    },
    {
      heading: "A local counter is not a distributed policy",
      blocks: [
        {
          type: "p",
          text: "An in-memory counter can work in a single development process, and it becomes unreliable when traffic is distributed:",
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
          text: "A `429` response should not feel like a broken product; a client needs enough information to recover:",
        },
        {
          type: "code",
          language: "http",
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 60`,
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
          text: "Avoid exposing unnecessary internal details, but do not leave the user guessing whether the request succeeded. For mutations, retries need extra care; if a client times out around the point a request is processed, it may not know whether the operation happened. Idempotency protects the business operation while the rate limit protects capacity. These mechanisms need to work together.",
        },
      ],
    },
    {
      heading: "The practical lesson",
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
          text: "A rate limiter is an admission-control policy. Its job is not merely to reject traffic. Its job is to preserve the service for legitimate users when demand, bugs, or abuse would otherwise consume finite capacity.",
        },
      ],
    },
  ],
};
