import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "When one route starts eating more than its share of capacity, such as an export endpoint that an integration is polling all day, the quickest protection is a number: **limit requests to 100 per minute**.",
    "It’s easy to add to middleware, and it gives clients a clear 429 Too Many Requests response. But it immediately raises harder questions. Is the limit per IP address, per user or per organisation? Should short bursts be allowed? Should an export cost the same as a cached read? And should a payment webhook be rejected because unrelated traffic used up the budget first?",
    "Until you know which resource needs protecting and whose requests should share it, 100 requests per minute is just **a counter with a threshold**.",
    "In this article, I’ll turn that number into an actual strategy: what each limit protects, who it applies to, how bursts and refusals should work and what happens when the limiter itself fails.",
  ],
  sections: [
    {
      heading: "One count for very different work",
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
          text: "A single global count treats all of these operations as equivalent. The cheap route can consume the same budget as the expensive one, a user may be blocked from a core action while the endpoint causing the pressure remains reachable, and a legitimate integration may be throttled because unrelated traffic shares its identity.",
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
          text: "The policy follows from that answer. An expensive report route may need a small per-user or per-organisation limit; a read-heavy route may need caching and a higher allowance; a login route may use an IP-level policy before authentication and a user-level policy after it. The point is not to create a unique algorithm for every endpoint, only to stop treating every request as the same kind of work.",
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
          text: "Each has limitations. IP address can be useful for anonymous abuse, but it can unfairly group users on shared Wi-Fi, mobile networks, offices, universities or schools. User ID is more meaningful after authentication, but it does not protect a public login endpoint. API keys work well for integrations when they are scoped and revocable, but they cannot protect a browser route where no key exists. A more realistic policy is layered:",
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
          text: "There is rarely a perfect key. Fairness here has little to do with mathematical evenness: a policy is fair when it stops one actor from consuming a shared resource in a way that harms others, without punishing unrelated users who happen to share an identity.",
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
          text: "The choice depends less on which algorithm is most advanced than on two policy questions: should this client be allowed to burst, and how quickly must the system recover afterwards? If a dependency can only process work steadily, a queue or leaky-bucket-like policy may fit. If a client should be able to make a small burst of valid requests, a token bucket states that policy directly.",
        },
      ],
    },
    {
      heading: "Token buckets make the burst policy explicit",
      blocks: [
        {
          type: "p",
          text: "A token bucket starts with a defined capacity, and tokens are added back at a steady rate. Each request costs one or more tokens; if enough tokens are available, the request proceeds, and if not, it is rejected or delayed.",
        },
        {
          type: "code",
          language: "text",
          code: `Bucket capacity: 20 tokens
Refill rate: 5 tokens per second
Request cost: 1 token`,
        },
        {
          type: "p",
          text: "A client can make a short burst of up to 20 requests. Over time, the average is constrained to five requests per second. That burst allowance is useful for traffic that is legitimate but uneven:",
        },
        {
          type: "code",
          language: "text",
          code: `User loads a dashboard
→ several parallel requests are normal

Client reconnects after a short network interruption
→ a small recovery burst is reasonable

Integration sends a bounded batch
→ short-term capacity is useful`,
        },
        {
          type: "p",
          text: "Unlike a fixed window, the allowance does not reset in full when the minute ends: it permits a limited burst while keeping sustained demand within a defined rate.",
        },
      ],
    },
    {
      heading: "Not every request should cost one token",
      blocks: [
        {
          type: "p",
          text: "Because a request can cost more than one token, the bucket can also reflect how expensive the work is:",
        },
        {
          type: "code",
          language: "text",
          code: `Read cached profile
→ cost 1

Search across a large dataset
→ cost 3

Generate export
→ cost 10

Create expensive report
→ cost 20`,
        },
        {
          type: "p",
          text: "This does not mean every route needs a complicated scoring system. It means a cheap health check and an expensive export should not have equal claims on capacity. The same idea applies to whole classes of work, which can draw from separate budgets:",
        },
        {
          type: "code",
          language: "text",
          code: `Interactive user actions
→ protected budget

Background jobs
→ lower-priority budget

Bulk exports
→ separate queued budget

Administrative operations
→ constrained but recoverable budget`,
        },
        {
          type: "p",
          text: "This is where rate limiting connects with product priorities: when the system is busy, which user actions must remain possible?",
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
          text: "A client may receive 300 requests of effective capacity while the intended limit was 100. That does not mean every project needs Redis immediately. A shared store, API gateway, CDN policy, managed platform feature or dedicated rate-limiting service earns its place when distributed enforcement is a real requirement. Redis is a common option because atomic counters with expiry are useful, but adding it solely to satisfy a system-design checklist is not evidence of good architecture. The system should use the simplest enforcement point that reliably protects the resource.",
        },
        {
          type: "p",
          text: "A shared store also puts a new dependency in front of every request it guards, which raises a question the local counter never had to answer: what happens when the limiter itself is slow or unavailable? Failing closed refuses traffic because enforcement cannot be trusted. Failing open admits it unchecked. Neither is right everywhere, and the choice follows from what the route is protecting. A login endpoint that exists to slow credential stuffing may be safer refusing requests than admitting them without a check. A cached read route limited mainly for fairness may be better off staying available through a short period without enforcement.",
        },
        {
          type: "p",
          text: "Either way, the limiter's own latency and errors need to be visible. Otherwise a limiter that adds delay to every request, or fails open unnoticed, has changed the policy without anyone deciding to.",
        },
      ],
    },
    {
      heading: "Reject, queue or delay",
      blocks: [
        {
          type: "p",
          text: "A rate limit is a refusal, and a `429` should not feel like a broken product. A client needs enough information to recover. `Retry-After` can be expressed as a delay in seconds, so a client that must wait 42 minutes can receive:",
        },
        {
          type: "code",
          language: "http",
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 2520`,
        },
        {
          type: "p",
          text: "A user-facing interface should explain that the action did not complete and when it can be retried, without exposing unnecessary internal detail:",
        },
        {
          type: "code",
          language: "text",
          code: `You have reached the export limit for this hour.
Try again in 42 minutes, or narrow the report before exporting.`,
        },
        {
          type: "p",
          text: "Rejection is not the only option. For work that can finish later, a queue may be more appropriate:",
        },
        {
          type: "code",
          language: "text",
          code: `Your report is being prepared.
We will notify you when it is ready.`,
        },
        {
          type: "p",
          text: "That only works when delay preserves the meaning of the workflow. A long report can reasonably become an asynchronous job; a booking confirmation cannot silently enter an unbounded queue.",
        },
      ],
    },
    {
      heading: "Rate limits and retries can fight each other",
      blocks: [
        {
          type: "p",
          text: "A badly designed client can turn a rate limit into additional pressure:",
        },
        {
          type: "code",
          language: "text",
          code: `Request receives 429
    ↓
Client retries immediately
    ↓
Another 429
    ↓
More rejected work`,
        },
        {
          type: "p",
          text: "The client should respect `Retry-After`, apply backoff and jitter, and have a bounded retry budget. Mutations need extra care: if a client times out around the point a request is processed, it may not know whether the operation happened, and retrying blindly can create a duplicate effect.",
        },
        {
          type: "code",
          language: "text",
          code: `Rate limiting
→ protects finite capacity

Idempotency
→ makes repeated mutation attempts safe`,
        },
        {
          type: "p",
          text: "They solve different problems and need to work together.",
        },
      ],
    },
    {
      heading: "Observe who is being limited",
      blocks: [
        {
          type: "p",
          text: "A rate limiter that only emits a `429` is difficult to improve. I want to know:",
        },
        {
          type: "list",
          items: [
            "Which route is rejecting requests?",
            "Which identity class is affected?",
            "Are requests legitimate, abusive, accidental, or caused by a broken client?",
            "Which limits are protecting a real resource?",
            "Are clients respecting the recovery instruction?",
            "Are retries creating more rejected traffic?",
            "Is one customer consuming disproportionate expensive work?",
          ],
        },
        {
          type: "p",
          text: "Avoid logging raw personal identifiers unnecessarily; aggregated metrics and safe identifiers are often enough. It also helps to keep rejection reasons distinct:",
        },
        {
          type: "code",
          language: "text",
          code: `Rejected because a rate policy was reached
Rejected because authentication failed
Rejected because authorisation failed
Failed because a dependency was unavailable`,
        },
        {
          type: "p",
          text: "These may look similar to a user, but they need different operational responses.",
        },
      ],
    },
    {
      heading: "Before choosing the number",
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
          text: "A rate limiter is an admission-control policy. It does not create downstream capacity. It decides how the capacity that already exists is shared, so that legitimate users keep the service when demand, bugs or abuse would otherwise consume it. The best limit is rarely the strictest one. It protects the requests that matter without letting one source of traffic consume the capacity everyone else needs.",
        },
      ],
    },
  ],
};
