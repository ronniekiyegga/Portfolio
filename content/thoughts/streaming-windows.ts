import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "Imagine checkout during a major product launch. Traffic jumps, customers keep pressing purchase as responses slow down, retries begin piling up and one expensive endpoint starts consuming far more capacity than expected.",
    "The first instinct is sensible:",
    "“Add a rate limit.”",
    "Slow the flood before it overwhelms the service. But then the harder question appears: who exactly should be slowed down? A customer completing a payment is not the same as a client polling every second, and a cached read does not consume the same resources as an export.",
    "Give all of them the same limit and we may protect the system by blocking the work we most wanted to keep alive. That is where rate limiting stops being about incrementing a counter and becomes an admission-control decision: when capacity is scarce, which work should be allowed through, which work should wait and which work should be rejected?",
  ],
  sections: [
    {
      heading: "What one shared limit ignores",
      blocks: [
        {
          type: "p",
          text: "A single limit, such as 100 requests per minute per IP address, is easy to explain and can be a reasonable first guardrail for a low-risk public endpoint. Its weakness is that requests are neither equally valuable nor equally expensive:",
        },
        {
          type: "code",
          language: "text",
          code: `GET /health
→ cheap and operationally useful

GET /applications
→ database read

POST /auth/login
→ security-sensitive and may call an identity provider

POST /exports
→ potentially expensive query and file generation

POST /checkout
→ payment-provider work and financial consequences

POST /webhooks/provider
→ externally retried events that may represent critical state changes`,
        },
        {
          type: "p",
          text: "A global request count treats each operation as the same kind of work. A client can consume the same budget with cheap requests that it would use for a time-sensitive checkout action, while the route creating the real pressure remains open. The limit appears fair because everyone receives the same number, but it is not fair if the system ignores what the requests cost and what they are for.",
        },
      ],
    },
    {
      heading: "What are we protecting?",
      blocks: [
        {
          type: "p",
          text: "Before choosing an algorithm or threshold, I want to identify the resource under pressure.",
        },
        {
          type: "code",
          language: "text",
          code: `Login route
→ Protect identity-provider capacity and reduce credential-stuffing risk.

Search route
→ Protect database or search-index capacity.

Export route
→ Protect expensive reporting and file-generation work.

Public API
→ Protect shared platform capacity and enforce customer quotas.

Webhook route
→ Protect processing capacity without losing valid provider events.`,
        },
        {
          type: "p",
          text: "The policy follows from the protected resource. An export may need a low separate limit because it consumes disproportionate capacity, a cached read route may allow a short burst, and a login route may need a stricter anonymous policy than an authenticated dashboard route. That does not require many complicated limits, only an end to treating all traffic as one undifferentiated thing.",
        },
      ],
    },
    {
      heading: "Why identity matters",
      blocks: [
        {
          type: "p",
          text: "Rate limiting needs a way to group requests. The most common choices are:",
        },
        {
          type: "code",
          language: "text",
          code: `IP address
Authenticated user ID
API key
Organisation or tenant
Session
A combination of these`,
        },
        {
          type: "p",
          text: "Each has a failure mode. An IP address can group unrelated users behind a school, office, household, or mobile carrier. A user ID is more meaningful after authentication but cannot protect a login form. An API key supports a clear integration contract but does not solve a browser route without one. A sensible policy is often layered:",
        },
        {
          type: "code",
          language: "text",
          code: `Anonymous request
→ limit by IP and route type

Authenticated request
→ limit by user or workspace

Integration request
→ limit by API key and customer plan

Expensive operation
→ apply an additional operation-specific budget`,
        },
        {
          type: "p",
          text: "Fairness here has little to do with mathematical evenness. A rate limiter is fair when it stops one actor from consuming a shared resource in a way that harms others.",
        },
      ],
    },
    {
      heading: "A fixed counter and its boundary",
      blocks: [
        {
          type: "p",
          text: "A fixed window is easy to understand:",
        },
        {
          type: "code",
          language: "text",
          code: "100 requests from 12:00:00 to 12:00:59",
        },
        {
          type: "p",
          text: "The weak point is the boundary: a client can use its full allowance at the end of one window and another full allowance at the start of the next:",
        },
        {
          type: "code",
          language: "text",
          code: `12:00:59 → 100 requests
12:01:00 → 100 requests`,
        },
        {
          type: "p",
          text: "The policy says the client is compliant; the protected system experiences a sudden burst of 200 requests. The algorithm should follow the desired behaviour.",
        },
        {
          type: "code",
          language: "text",
          code: `Fixed window
Simple and cheap, but allows boundary bursts.

Sliding window counter
A smoother approximation of recent activity.

Sliding log
More precise, but potentially more expensive.

Token bucket
Allows a controlled burst while enforcing an average rate.

Leaky bucket
Smooths work toward a steady output rate.`,
        },
        {
          type: "p",
          text: "The choice depends less on which algorithm is most advanced than on two policy questions: should this client be allowed to burst, and how quickly must the system recover afterwards?",
        },
      ],
    },
    {
      heading: "Token buckets make the burst policy explicit",
      blocks: [
        {
          type: "p",
          text: "A token bucket starts with a defined capacity; tokens are added back at a steady rate. Each request costs one or more tokens; if tokens are available, the request proceeds. If not, it is rejected or delayed.",
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
          text: "A client can make a short burst of up to 20 requests. Over time, the average is constrained to five requests per second.",
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
          text: "Unlike a fixed window, the policy does not reset to unlimited when the minute ends: it allows a limited burst while keeping sustained demand within a defined rate.",
        },
      ],
    },
    {
      heading: "Not every request should cost one token",
      blocks: [
        {
          type: "p",
          text: "A useful refinement is to recognise that work has different cost.",
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
          text: "This does not mean every route needs a complicated scoring system. It means a cheap health check and an expensive export should not have equal claims on capacity.",
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
      heading: "Saying no is part of the user experience",
      blocks: [
        {
          type: "p",
          text: "A rate limit is a refusal, and the refusal needs to be clear. `Retry-After` is given in seconds, so a client that must wait 43 minutes receives:",
        },
        {
          type: "code",
          language: "http",
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 2580`,
        },
        {
          type: "p",
          text: "For a user-facing interface:",
        },
        {
          type: "code",
          language: "text",
          code: `You have reached the export limit for this hour.

Your existing exports are still available. Try again in 43 minutes,
or narrow the data before creating another export.`,
        },
        {
          type: "p",
          text: "For a critical workflow, a queue may be more appropriate than a rejection:",
        },
        {
          type: "code",
          language: "text",
          code: `Your report is being prepared.
We will notify you when it is ready.`,
        },
        {
          type: "p",
          text: "A booking confirmation cannot silently enter an unbounded queue, while a long report may be acceptable as an asynchronous job. The policy must preserve the meaning of the workflow.",
        },
      ],
    },
    {
      heading: "Rate limits and retries can fight each other",
      blocks: [
        {
          type: "p",
          text: "A badly designed client can turn a rate limit into additional pressure.",
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
          text: "The client should respect `Retry-After`, apply backoff and jitter, and have a bounded retry budget. Mutations also need idempotency so an uncertain timeout cannot create a duplicate effect.",
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
          text: "They solve different problems and should work together.",
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
            "Are users respecting the recovery instruction?",
            "Are retries creating more rejected traffic?",
            "Is one customer consuming disproportionate expensive work?",
          ],
        },
        {
          type: "p",
          text: "Avoid logging raw personal identifiers unnecessarily; aggregated metrics and safe identifiers are often enough.",
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
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "A rate limiter is a policy for sharing a finite resource rather than a counter that says no after an arbitrary number. Start with the resource and the cost of each request, choose an identity that makes the policy fair, decide whether short bursts are legitimate, make rejection recoverable and measure who is being limited and why. The best rate limit is rarely the strictest one; it protects the requests that matter without allowing one source of traffic to consume the capacity everyone else needs.",
        },
      ],
    },
  ],
};
