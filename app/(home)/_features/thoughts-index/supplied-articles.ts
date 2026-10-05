import type { ThoughtArticleSection } from "./thought-articles";

export const suppliedArticleSections: Record<string, ThoughtArticleSection[]> = {
  "10000-concurrent-database-connections": [
    {
      heading: "The obvious solution: increase the connection limit",
      blocks: [
        { type: "p", text: "Most databases expose a setting for the number of connections they will accept. Increasing it can feel like the direct fix:" },
        { type: "code", language: "text", code: "Current limit: 100 connections\nExpected demand: 10,000 users\nNew limit: 10,000 connections" },
        { type: "p", text: "The reasoning is not irrational." },
        { type: "p", text: "If requests are failing because the database refuses new connections, a higher limit may reduce those immediate failures. In a small system, raising a low default can even be the correct short-term mitigation." },
        { type: "p", text: "But it does not answer the important question:" },
        { type: "p", text: "What will all of those connections do once they are accepted?" },
        { type: "p", text: "Every open connection consumes memory, socket resources, session state, and scheduling overhead. More importantly, a larger number of connections permits more work to arrive at the database at the same time." },
        { type: "p", text: "If the workload contains expensive queries, long transactions, lock contention, or inefficient read patterns, increasing the connection ceiling can turn a controlled queue into an overloaded database." },
        { type: "code", language: "text", code: "More accepted connections\n    ↓\nMore concurrent queries\n    ↓\nMore CPU, memory, lock, and I/O pressure\n    ↓\nLonger query duration\n    ↓\nConnections stay occupied longer\n    ↓\nMore requests wait" },
        { type: "p", text: "At that point, the system can have a higher configured connection limit and worse user-facing latency." },
        { type: "p", text: "The setting changed. The bottleneck did not." },
      ],
    },
    {
      heading: "The second obvious solution: make the pool bigger",
      blocks: [
        { type: "p", text: "The next response is usually more sophisticated:" },
        { type: "p", text: "“Fine. We will use a connection pool.”" },
        { type: "p", text: "That is directionally correct." },
        { type: "p", text: "A pool is better than letting every request create a fresh connection. It reuses a bounded set of database sessions and avoids the cost of repeated connection establishment." },
        { type: "p", text: "But a pool can still hide the real problem if it is treated as a number to keep increasing." },
        { type: "code", language: "text", code: "Application instances: 10\nConnections per instance: 30\nPotential database connections: 300" },
        { type: "p", text: "Then the application scales out:" },
        { type: "code", language: "text", code: "Application instances: 50\nConnections per instance: 30\nPotential database connections: 1,500" },
        { type: "p", text: "Nothing in the pool configuration changed. The database pressure did." },
        { type: "p", text: "This is especially easy to miss in serverless or autoscaling environments. One function instance may seem to have a modest pool, but a burst of traffic creates many instances at once. Each one opens connections. The aggregate connection count becomes the real system behaviour." },
        { type: "p", text: "A connection pool is not merely an optimisation. It is a concurrency-control mechanism, and its size needs to be part of the capacity model." },
      ],
    },
    {
      heading: "The hidden question: are queries slow, or are requests waiting?",
      blocks: [
        { type: "p", text: "When someone says “the database is slow,” I want to separate two different measurements:" },
        { type: "code", language: "text", code: "Time waiting to acquire a connection\nTime executing a query" },
        { type: "p", text: "They are often confused because the user experiences both as a slow request." },
        { type: "p", text: "Imagine this request:" },
        { type: "code", language: "text", code: "2,400ms  waiting for an available connection\n45ms     query execution\n30ms     serialisation and response" },
        { type: "p", text: "The query is not the immediate bottleneck. The request spent most of its time waiting for a shared resource." },
        { type: "p", text: "Now compare it with this:" },
        { type: "code", language: "text", code: "10ms     waiting for a connection\n2,900ms  query execution\n30ms     serialisation and response" },
        { type: "p", text: "Here, increasing the pool may make things worse. More queries will arrive concurrently, and each slow query will keep a connection occupied longer." },
        { type: "p", text: "The diagnosis changes the fix." },
        { type: "p", text: "Before changing limits, I would want to know:" },
        { type: "list", items: ["How many connections are open, active, and idle?","How long do requests wait to acquire a connection?","Which queries occupy connections longest?","Are transactions held open while waiting for another dependency?","Are there lock waits?","Is the application creating more connections than expected during scale-out?","Are slow queries returning too much data or missing an index?","Are non-critical jobs competing with interactive user work?"] },
        { type: "p", text: "Without those answers, “increase the pool” is only a guess." },
      ],
    },
    {
      heading: "The useful model: connections are a shared, bounded resource",
      blocks: [
        { type: "p", text: "The more reliable model is:" },
        { type: "code", language: "text", code: "Many users\n    ↓\nMany short application requests\n    ↓\nA bounded number of reusable connections\n    ↓\nA database doing a bounded amount of useful concurrent work" },
        { type: "p", text: "A request borrows a connection, performs a short query or transaction, and returns it quickly." },
        { type: "p", text: "That means the rest of the architecture should work to minimise connection occupancy:" },
        { type: "list", items: ["Keep transactions short.","Avoid holding database transactions open across network calls.","Avoid loading data that the screen does not need.","Use pagination and filtering for large collections.","Index the queries that matter.","Move non-critical work off the interactive request path.","Bound application concurrency where the database is the limiting resource.","Use a pooler when the deployment model produces many short-lived application connections."] },
        { type: "p", text: "The objective is not to eliminate waiting entirely. A small, bounded queue can be healthier than allowing unlimited work to overwhelm the database." },
        { type: "p", text: "The objective is to make waiting visible, controlled, and proportionate." },
      ],
    },
    {
      heading: "Do not hold a database connection across user time",
      blocks: [
        { type: "p", text: "One failure mode is easy to introduce in multi-step workflows." },
        { type: "p", text: "A service starts a database transaction, creates a pending record, then waits for a user to complete a payment flow or for an external provider to respond." },
        { type: "p", text: "That connection is now held across human and network time." },
        { type: "code", language: "text", code: "Begin transaction\n    ↓\nCreate pending record\n    ↓\nWait for payment redirect\n    ↓\nWait for provider callback\n    ↓\nCommit" },
        { type: "p", text: "That model does not survive concurrency well. User and provider delays become database resource consumption." },
        { type: "p", text: "A safer model persists the state and releases the connection:" },
        { type: "code", language: "text", code: "Create pending record\n    ↓\nCommit transaction\n    ↓\nWait for external callback\n    ↓\nReceive callback\n    ↓\nStart a new short transaction\n    ↓\nVerify and transition state\n    ↓\nCommit" },
        { type: "p", text: "This is why workflow state, idempotency, and connection management connect. Durable state lets a system wait without holding scarce resources open." },
      ],
    },
    {
      heading: "When a bigger pool is actually justified",
      blocks: [
        { type: "p", text: "None of this means a pool should never grow." },
        { type: "p", text: "A larger pool can be appropriate when measurement shows:" },
        { type: "list", items: ["The database has spare capacity.","Query latency is low.","Connection acquisition wait is the dominant delay.","The workload is short-lived and efficiently indexed.","Scale-out behaviour is understood.","Other clients and workers have been included in the connection budget."] },
        { type: "p", text: "The point is that pool size should be an observed capacity decision, not a proxy for user count." },
        { type: "p", text: "A connection budget might include:" },
        { type: "code", language: "text", code: "Web application\nBackground jobs\nScheduled work\nAdmin tooling\nDatabase migrations\nPreview deployments\nMonitoring\nOther internal services" },
        { type: "p", text: "The number that matters is the total possible connection pressure, not the value in one application configuration file." },
      ],
    },
    {
      heading: "The closing rule",
      blocks: [
        { type: "p", text: "Ten thousand concurrent users does not mean ten thousand database connections." },
        { type: "p", text: "The question is not:" },
        { type: "p", text: "“What should I set the connection limit to?”" },
        { type: "p", text: "It is:" },
        { type: "p", text: "“How much concurrent database work is safe for this workload, how long does that work occupy a connection, and where should excess work wait?”" },
        { type: "p", text: "A connection is not a user session." },
        { type: "p", text: "It is a scarce, shared resource. Borrow it briefly, use it efficiently, return it quickly, and measure where requests wait before increasing any limit." },
      ],
    },
  ],
  "idempotency-matters": [
    {
      heading: "The visible symptom was not the root cause",
      blocks: [
        { type: "p", text: "The incident that made this concrete for me looked small at first. A user performed an action, received an unexpected result, and then the same action appeared again." },
        { type: "p", text: "It is tempting to start at the interface:" },
        {
          type: "list",
          items: [
            "Was the button clicked twice?",
            "Did a loading state fail to disable the control?",
            "Did the form submit on both Enter and click?",
            "Did React render something twice?"
          ],
        },
        { type: "p", text: "Those are reasonable things to inspect. They are not enough." },
        { type: "p", text: "A disabled button can reduce accidental double submission, but it cannot stop a mobile connection retrying a request. It cannot stop an upstream service from redelivering a webhook. It cannot stop a worker retrying after a timeout. It cannot guarantee that a user who refreshes at exactly the wrong time will not send the operation again." },
        { type: "p", text: "The user interface is a helpful guardrail. It is not the authority that makes an important operation safe." },
      ],
    },
    {
      heading: "“Exactly once” is usually the wrong promise",
      blocks: [
        { type: "p", text: "I try not to promise exactly-once delivery where the system cannot honestly provide it." },
        { type: "p", text: "Distributed systems routinely produce duplicate delivery because retrying is often safer than silently losing work. If a service does not know whether a previous attempt succeeded, it has two bad options:" },
        {
          type: "list",
          items: [
            "Retry and risk performing the action again.",
            "Do not retry and risk losing the action entirely."
          ],
        },
        { type: "p", text: "For most important workflows, retrying is the correct default. The receiving system must therefore tolerate duplicates." },
        { type: "p", text: "That is what idempotency gives you." },
        { type: "p", text: "An idempotent operation can be performed more than once without changing the final result after the first successful application." },
        { type: "p", text: "For example:" },
        {
          type: "code",
          language: "text",
          code: "Confirm booking B-1042",
        },
        { type: "p", text: "The first successful request changes the booking from:" },
        {
          type: "code",
          language: "text",
          code: "pending_payment → confirmed",
        },
        { type: "p", text: "A second identical request should not create another booking, charge again, send another confirmation, or move the state into something new. It should safely return the already-confirmed result." },
        { type: "p", text: "The delivery may happen at least once. The effect must happen once." },
      ],
    },
    {
      heading: "An idempotency key gives the operation an identity",
      blocks: [
        { type: "p", text: "A common pattern is to require an idempotency key for a mutation with meaningful side effects." },
        {
          type: "code",
          language: "http",
          code: "POST /api/bookings/B-1042/confirm\nIdempotency-Key: 7ccd5c5a-3e81-4ac1-8b20-1d1e9ea81f44",
        },
        { type: "p", text: "The key does not magically make a system safe. It provides a stable identity for the requested operation." },
        { type: "p", text: "The server records it with enough information to decide what to do when it appears again:" },
        {
          type: "code",
          language: "text",
          code: "idempotency_records\n- key\n- actor_id\n- request_fingerprint\n- operation_type\n- status\n- response_status\n- response_body_reference\n- created_at\n- completed_at",
        },
        { type: "p", text: "On the first request, the service reserves or creates the record and performs the work." },
        { type: "p", text: "On a repeat request with the same key and matching request fingerprint, it returns the saved outcome instead of performing the work again." },
        { type: "p", text: "On a request that reuses the same key with different content, it should fail clearly. Reusing a key for a different action makes the request ambiguous and should not silently produce an unexpected result." },
        {
          type: "code",
          language: "text",
          code: "Request arrives\n    ↓\nHas this idempotency key been completed?\n    ├── Yes, same request → return stored result\n    ├── Yes, different request → reject conflict\n    └── No → process safely and store outcome",
        },
        { type: "p", text: "The key must be protected by a database constraint or equivalent atomic operation. A memory cache alone is not enough for work that must remain safe across process restarts, deployments, or concurrent requests." },
      ],
    },
    {
      heading: "The transaction boundary matters",
      blocks: [
        { type: "p", text: "A key table without a transaction can still create duplicates." },
        { type: "p", text: "Imagine two requests arriving at nearly the same moment:" },
        {
          type: "code",
          language: "text",
          code: "Request A: no existing key found\nRequest B: no existing key found\nRequest A: creates booking\nRequest B: creates booking",
        },
        { type: "p", text: "Both requests observed the same initial state before either wrote anything." },
        { type: "p", text: "The database needs to be the final arbiter. Depending on the domain, that might mean:" },
        {
          type: "list",
          items: [
            "A unique constraint on `idempotency_key`.",
            "A unique provider-event identifier for webhooks.",
            "A transactional insert that reserves the key.",
            "A row lock around a state transition.",
            "A uniqueness or exclusion constraint that makes an invalid duplicate impossible."
          ],
        },
        { type: "p", text: "For an external payment event, I would normally persist the provider’s immutable event identifier:" },
        {
          type: "code",
          language: "text",
          code: "webhook_events\n- provider\n- provider_event_id\n- event_type\n- received_at\n- processing_status",
        },
        { type: "p", text: "Then enforce:" },
        {
          type: "code",
          language: "text",
          code: "unique(provider, provider_event_id)",
        },
        { type: "p", text: "If the provider sends the same event twice, the second insert conflicts. That is not an exceptional business failure; it is evidence that the duplicate guard is working." },
      ],
    },
    {
      heading: "A successful HTTP response is not necessarily a successful outcome",
      blocks: [
        { type: "p", text: "One subtle failure mode is the gap between performing work and replying to the caller." },
        { type: "p", text: "Suppose the service confirms a booking and commits the transaction, but crashes before returning `200 OK`. The caller sees a timeout and retries. From its perspective, the first request may have failed. From the database’s perspective, it succeeded." },
        { type: "p", text: "Without idempotency, the retry can create a second effect." },
        { type: "p", text: "The system therefore needs to preserve enough outcome data to answer a retry consistently. It is not enough to know that “something happened.” The caller should receive a stable response explaining the actual resulting state." },
        { type: "p", text: "That also improves supportability. When someone reports, “I was charged but do not see the booking,” you want an operator to trace:" },
        {
          type: "code",
          language: "text",
          code: "checkout reference\n    ↓\nprovider event\n    ↓\nwebhook processing record\n    ↓\npayment state\n    ↓\nbooking transition\n    ↓\nnotification/outbox event",
        },
        { type: "p", text: "Idempotency is not merely an API detail. It creates an audit trail for the workflow." },
      ],
    },
    {
      heading: "Retries need deliberate failure states",
      blocks: [
        { type: "p", text: "Not every failure should be retried blindly." },
        { type: "p", text: "A temporary network problem may be retryable. An invalid signature, invalid payload, or failed validation is not fixed by repeating the same request." },
        { type: "p", text: "A useful model makes that visible:" },
        {
          type: "code",
          language: "text",
          code: "received → processing → processed\n                    ↘ retryable_failure\n                    ↘ permanent_failure\n                    ↘ manual_review",
        },
        { type: "p", text: "The system should record the failure reason without leaking sensitive payloads into logs. It should also make a stuck operation discoverable rather than leaving the user with an unexplained spinner or a silently missing outcome." },
        { type: "p", text: "For an important user-facing workflow, I want an explicit answer to:" },
        {
          type: "list",
          items: [
            "How long do we retry?",
            "What backoff do we use?",
            "Which errors are safe to retry?",
            "When do we stop?",
            "Who can see that manual action is required?",
            "What prevents a retry from repeating a successful side effect?"
          ],
        },
        { type: "p", text: "Those questions are more valuable than casually adding a retry loop." },
      ],
    },
    {
      heading: "The test that proves the claim",
      blocks: [
        { type: "p", text: "The highest-value test is not “the endpoint returns 200.”" },
        { type: "p", text: "It is this:" },
        {
          type: "code",
          language: "text",
          code: "Given a valid operation and idempotency key\nWhen the same request is submitted twice\nThen the business transition occurs once\nAnd the second request returns the original outcome\nAnd no duplicate notification or downstream action is created",
        },
        { type: "p", text: "For a webhook:" },
        {
          type: "code",
          language: "text",
          code: "Given a verified payment event\nWhen the provider redelivers the same event\nThen the payment and entitlement are updated once\nAnd the second delivery is recorded as duplicate-safe",
        },
        { type: "p", text: "A test like that proves the system has considered the uncomfortable reality: external calls are not exactly-once, users do not behave perfectly, and a timeout is not proof that nothing happened." },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "The first question is not “how do I stop duplicate clicks?”" },
        { type: "p", text: "It is:" },
        { type: "p", text: "What operation is this, what is its durable identity, and what outcome is safe if the same request arrives again?" },
        { type: "p", text: "Sometimes a button disable is enough for a low-risk interaction. For workflow transitions, bookings, payments, account provisioning, notifications, or any action with external side effects, it is not." },
        { type: "p", text: "The system must assume repetition is normal." },
        { type: "p", text: "The goal is not to make every request arrive once. The goal is to make repetition safe." },
      ],
    },
  ],
  "debug-peak-traffic": [
    {
      heading: "“The app is slow” is not a diagnosis",
      blocks: [
        { type: "p", text: "During peak load, a user sees an outcome:" },
        {
          type: "code",
          language: "text",
          code: "Click → wait → timeout / spinner / stale screen / duplicate retry",
        },
        { type: "p", text: "That is useful evidence. It is not a root cause." },
        { type: "p", text: "I want a request-level timeline:" },
        {
          type: "code",
          language: "text",
          code: "request received\n    ↓\nauthentication\n    ↓\napplication work\n    ↓\ndatabase connection acquired\n    ↓\nquery executed\n    ↓\nexternal dependency called\n    ↓\nresponse returned",
        },
        { type: "p", text: "Without timing at those boundaries, every explanation is speculation." },
        { type: "p", text: "A request that takes eight seconds might contain:" },
        {
          type: "code",
          language: "text",
          code: "20ms    application code\n5,900ms waiting for a database connection\n80ms    database query\n1,800ms waiting for an external API\n200ms   serialization and response",
        },
        { type: "p", text: "Optimising the query in that situation would be mostly theatre. The query was not the dominant cost." },
        { type: "p", text: "The first useful question is:" },
        { type: "p", text: "Is work slow, or is work waiting?" },
      ],
    },
    {
      heading: "Queueing is often the hidden mechanism",
      blocks: [
        { type: "p", text: "A system does not need to be fully saturated before it becomes unpleasant." },
        { type: "p", text: "As utilisation approaches capacity, the amount of time work spends waiting often grows much faster than the amount of work itself. A small increase in traffic can produce a large increase in latency if a pool, worker group, database, or third-party dependency is near its limit." },
        { type: "p", text: "That is why average latency can hide the problem." },
        { type: "p", text: "If 95 requests complete in 100ms and five wait for 10 seconds, the average may look survivable while five real users experience a broken product. I care about percentile latency, error rate, concurrency, queue depth, and dependency timing together." },
        { type: "p", text: "At minimum, I want to see:" },
        {
          type: "list",
          items: [
            "Request count and request concurrency.",
            "p50, p95, and p99 latency.",
            "HTTP status distribution and timeout count.",
            "Database pool utilisation and wait time.",
            "Query duration separately from query wait time.",
            "Worker or queue depth, if asynchronous work exists.",
            "Downstream dependency latency and error rate.",
            "Retry volume.",
            "CPU and memory only as supporting signals."
          ],
        },
        { type: "p", text: "CPU being low does not prove the application is healthy. A service can have low CPU while every request waits for an exhausted connection pool." },
      ],
    },
    {
      heading: "Start with the time window",
      blocks: [
        { type: "p", text: "A peak-only problem must be investigated around the period it occurs." },
        { type: "p", text: "I begin with a narrow incident window:" },
        {
          type: "code",
          language: "text",
          code: "When did the increase begin?\nWhich routes were affected?\nWhich users or regions saw it?\nWas the rise gradual or step-like?\nWhat changed shortly before it?\nDid dependency latency move first, or did our own latency move first?",
        },
        { type: "p", text: "I compare that window against a normal baseline. A graph is more useful when it can answer, “what changed?” rather than merely, “was it bad?”" },
        { type: "p", text: "For example:" },
        {
          type: "code",
          language: "text",
          code: "14:00   demand rises\n14:03   database connection wait begins to rise\n14:05   API p95 increases\n14:06   client retries increase\n14:08   database connections reach configured limit\n14:10   error rate rises",
        },
        { type: "p", text: "That sequence suggests a causal direction worth testing. If retries rose before the database wait, then the original issue may be elsewhere and the retries may be making it worse." },
        { type: "p", text: "A timeline is not proof, but it gives the investigation a hypothesis." },
      ],
    },
    {
      heading: "Preserve evidence before changing limits",
      blocks: [
        { type: "p", text: "The instinct during an incident is often to increase every limit:" },
        {
          type: "list",
          items: [
            "More database connections.",
            "More application replicas.",
            "More request timeout.",
            "More queue concurrency.",
            "More retries."
          ],
        },
        { type: "p", text: "Sometimes one of those actions is the correct mitigation. Changing them all at once destroys the evidence and can turn a local problem into a larger one." },
        { type: "p", text: "I want to preserve enough information to answer:" },
        {
          type: "list",
          items: [
            "Which resource first approached saturation?",
            "Which route created the pressure?",
            "Was the work useful or duplicated?",
            "Were requests blocked on a lock, connection, CPU, network, or dependency?",
            "Was a deployment, feature release, scheduled task, or external event involved?"
          ],
        },
        { type: "p", text: "The immediate goal is to restore service safely. The next goal is to avoid learning nothing from the restoration." },
      ],
    },
    {
      heading: "The dependency you do not measure becomes the explanation you cannot verify",
      blocks: [
        { type: "p", text: "Many peak incidents become confusing because the system traces only its own route duration." },
        { type: "p", text: "A request that calls an identity provider, payment service, database, cache, search service, internal API, and email provider is a chain. If one part slows down, callers may pile up behind it." },
        { type: "p", text: "I prefer structured fields over log messages that need to be manually interpreted:" },
        {
          type: "code",
          language: "text",
          code: "request_id\nroute\nuser_or_tenant_scope\nstatus_code\nduration_ms\ndb_wait_ms\ndb_query_ms\ndependency_name\ndependency_duration_ms\nretry_attempt\nerror_class",
        },
        { type: "p", text: "The exact telemetry tooling matters less than being able to correlate one request through the work it caused." },
        { type: "p", text: "This is also why a request ID should move through async work. If a request creates an outbox event and a worker later sends a notification, the operator should be able to connect the original action to the delayed downstream effect." },
      ],
    },
    {
      heading: "The fix should match the pressure",
      blocks: [
        { type: "p", text: "Peak traffic does not have one solution." },
        { type: "p", text: "If a small number of expensive endpoints are doing repeated work, caching or precomputation may be appropriate." },
        { type: "p", text: "If requests wait for connections while queries are fast, connection pooling or reducing concurrent database work may be the better response." },
        { type: "p", text: "If a synchronous request is doing work that does not need to block the user, moving that work into a durable background path can reduce the critical path." },
        { type: "p", text: "If a third-party dependency is slow, a timeout, circuit breaker, fallback, queue, or degraded experience may be better than allowing every web request to wait indefinitely." },
        { type: "p", text: "If clients retry aggressively, retry budgets, exponential backoff, and jitter may reduce self-inflicted load." },
        { type: "p", text: "If the database is doing unnecessary large reads, query shape, indexing, pagination, and data modelling deserve attention." },
        { type: "p", text: "The goal is not to add every resilience pattern. It is to remove the actual bottleneck." },
      ],
    },
    {
      heading: "Avoid turning retries into an outage multiplier",
      blocks: [
        { type: "p", text: "Retries are especially dangerous during a demand spike." },
        { type: "p", text: "Suppose a dependency starts responding slowly. Clients time out at five seconds, assume failure, and retry immediately. The dependency now receives original requests plus retries. That increases queueing, which increases timeouts, which creates more retries." },
        { type: "p", text: "A small degradation becomes a feedback loop." },
        { type: "p", text: "For retryable operations, I prefer:" },
        {
          type: "code",
          language: "text",
          code: "bounded attempts\n+ exponential backoff\n+ jitter\n+ clear timeout budgets\n+ idempotency for mutations",
        },
        { type: "p", text: "And for non-essential work, I would rather fail clearly or defer work than let it consume all capacity needed for the primary user action." },
        { type: "p", text: "A retry policy is not a reliability feature unless it includes a policy for stopping." },
      ],
    },
    {
      heading: "The useful post-incident question",
      blocks: [
        { type: "p", text: "After a peak-only incident, “what line of code was wrong?” can be too narrow." },
        { type: "p", text: "I want to ask:" },
        {
          type: "list",
          items: [
            "What assumption about demand or dependency behaviour was false?",
            "Why did the system make the failure hard to see?",
            "Which signal would have revealed the pressure earlier?",
            "What user-facing failure mode would have been safer?",
            "What test, load profile, limit, or alert now prevents recurrence?"
          ],
        },
        { type: "p", text: "A useful outcome might be small:" },
        {
          type: "code",
          language: "text",
          code: "Before: no measurement of database connection acquisition time.\nAfter: connection wait is traced per route, alerted before pool exhaustion,\nand a slow non-critical report runs asynchronously.",
        },
        { type: "p", text: "That is more meaningful than writing “improved performance.”" },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "A bug that only appears at peak is often not hiding in a single function. It emerges from the interaction between finite capacity, concurrency, retries, dependencies, and waiting." },
        { type: "p", text: "Do not start by guessing the fix." },
        { type: "p", text: "Start by locating where time accumulates. Then identify which queue, pool, lock, or dependency creates it. Then make the smallest change that changes the system’s behaviour under the pressure that actually caused the incident." },
      ],
    },
  ],
  "empty-state-first": [
    {
      heading: "An empty dashboard is asking a question",
      blocks: [
        { type: "p", text: "When a product shows an empty screen, the user is usually trying to answer one of these questions:" },
        {
          type: "list",
          items: [
            "What is this area for?",
            "What should I do first?",
            "Do I have permission to create something here?",
            "Is the product still loading?",
            "Did I filter everything out?",
            "Is there a problem?",
            "What will this look like after I use it?"
          ],
        },
        { type: "p", text: "A blank canvas answers none of them." },
        { type: "p", text: "A generic illustration and “Nothing here yet” answers very little. It may be visually pleasant, but it does not help someone make progress." },
        { type: "p", text: "The strongest empty states explain the object, the immediate next step, and why that step is useful." },
        { type: "p", text: "For a candidate workflow product, that might be:" },
        {
          type: "code",
          language: "text",
          code: "Track the opportunities you care about.\n\nAdd your first application to keep its role, stage, next action,\nand interview history in one place.\n\nAdd an application",
        },
        { type: "p", text: "The call to action is not just “Create.” It connects the action to the outcome." },
      ],
    },
    {
      heading: "Empty is not one state",
      blocks: [
        { type: "p", text: "A useful distinction is that several different situations can look empty:" },
        {
          type: "code",
          language: "text",
          code: "First-use empty state\nNo records exist yet.\n\nZero-results state\nRecords exist, but the current search or filter matches none.\n\nPermission-limited state\nRecords may exist, but this user cannot access them.\n\nLoading state\nThe product does not know whether records exist yet.\n\nError state\nThe product failed to retrieve records.\n\nCompleted state\nThere are intentionally no outstanding items.",
        },
        { type: "p", text: "Treating every one as “No data” creates confusion." },
        { type: "p", text: "For example, if a task list has a filter applied, telling the user “You have no tasks” is misleading. They may have many tasks; none match the current filter. The right action may be “Clear filters,” not “Create task.”" },
        { type: "p", text: "Similarly, showing an empty state before the request resolves makes the interface flicker between an empty message and actual content. The user may interpret that as a broken product." },
        { type: "p", text: "State modelling is product design here:" },
        {
          type: "code",
          language: "ts",
          code: "type ViewState =\n  | { kind: \"loading\" }\n  | { kind: \"error\"; message: string }\n  | { kind: \"empty-first-use\" }\n  | { kind: \"empty-filtered\" }\n  | { kind: \"ready\"; items: Item[] };",
        },
        { type: "p", text: "This is not about making a simple screen look architecturally impressive. It is about representing meanings that lead to different user actions." },
      ],
    },
    {
      heading: "Design the first action, not the illustration",
      blocks: [
        { type: "p", text: "I start with the action the user should take next." },
        { type: "p", text: "If the action is genuinely simple and low-risk, one clear primary action is enough:" },
        {
          type: "code",
          language: "text",
          code: "No applications yet\nAdd your first application",
        },
        { type: "p", text: "If the action requires context, the empty state should provide it:" },
        {
          type: "code",
          language: "text",
          code: "No follow-up tasks are due this week.\n\nAdd a next action to an application, such as sending a follow-up\nor preparing for an interview.\n\nView applications",
        },
        { type: "p", text: "If first-use creation requires several decisions, a guided template can reduce friction:" },
        {
          type: "code",
          language: "text",
          code: "Start with an application\n- Company\n- Role\n- Current stage\n- Next action date",
        },
        { type: "p", text: "The right answer depends on the cost of getting started. A user should not have to read a feature tour to complete a straightforward first action." },
      ],
    },
    {
      heading: "Empty states reveal product assumptions",
      blocks: [
        { type: "p", text: "Designing the empty state early forces useful questions:" },
        {
          type: "list",
          items: [
            "What counts as the first meaningful unit of value?",
            "What information is actually required to create it?",
            "Which user can create it?",
            "What should happen after creation?",
            "What should the user see if creation fails?",
            "Which examples are safe to show?",
            "What does the product do when someone returns after inactivity?"
          ],
        },
        { type: "p", text: "Those questions often expose unnecessary complexity in the happy path." },
        { type: "p", text: "If it is difficult to explain how to create the first record, the object model may be too complicated. If the user needs five prerequisite entities before they can do anything useful, the onboarding flow may be asking too much too soon." },
        { type: "p", text: "An empty state is where product strategy becomes visible at interface level." },
      ],
    },
    {
      heading: "Avoid false emptiness",
      blocks: [
        { type: "p", text: "There are a few failure modes I watch for:" },
        {
          type: "list",
          items: [
            "Showing an empty state while data is loading.",
            "Treating a failed request as an empty result.",
            "Hiding content because of permissions but presenting it as if no content exists.",
            "Making the primary action unavailable without explaining why.",
            "Giving a user a generic call to action that creates the wrong thing.",
            "Using placeholder content that looks like real user data.",
            "Showing a successful blank state after an operation that has not actually completed."
          ],
        },
        { type: "p", text: "The final one matters in workflow-heavy products. If a user creates an application, submits a payment, or confirms a booking, the next screen should accurately represent the server-confirmed state. An optimistic UI can improve responsiveness, but it should recover clearly if the server rejects or fails to persist the action." },
        { type: "p", text: "An empty state should never be used to conceal uncertainty." },
      ],
    },
    {
      heading: "The “done” version also matters",
      blocks: [
        { type: "p", text: "Empty does not always mean that someone should create more work." },
        { type: "p", text: "A completed state can be an important positive outcome:" },
        {
          type: "code",
          language: "text",
          code: "You have no follow-ups due this week.\n\nYour next scheduled action is on Thursday.",
        },
        { type: "p", text: "This is different from “Nothing here yet.” It confirms progress and tells the user when they need to re-engage." },
        { type: "p", text: "The product should understand the difference between a new user who has not started and an active user who has finished their current work." },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "The empty state is not a final visual polish task." },
        { type: "p", text: "It is a design exercise in product clarity: identify the user’s current situation, explain what the area is for, and offer the smallest useful next action." },
        { type: "p", text: "The happy path shows what the product looks like after value has been created." },
        { type: "p", text: "The empty state is often where the product has to help create that value in the first place." },
      ],
    },
  ],
  "design-systems-remove-decisions": [
    {
      heading: "Consistency is not the same as uniformity",
      blocks: [
        { type: "p", text: "The purpose is not to make every page look identical." },
        { type: "p", text: "Different workflows require different information hierarchy, density, sequencing, and interaction patterns. A reporting dashboard, an onboarding form, a checkout flow, and a destructive settings screen should not all feel like the same component demo." },
        { type: "p", text: "The system should standardise the stable parts:" },
        {
          type: "list",
          items: [
            "Colour roles rather than arbitrary colour choices.",
            "Spacing scale rather than one-off margins.",
            "Typography roles rather than manually chosen sizes.",
            "Form behaviours and validation states.",
            "Button hierarchy and loading states.",
            "Overlay, dialog, and focus behaviour.",
            "Accessible interaction primitives.",
            "Content patterns for common system feedback."
          ],
        },
        { type: "p", text: "It should leave product-specific decisions open:" },
        {
          type: "list",
          items: [
            "What the user needs to understand first.",
            "Whether a table, timeline, card list, or form suits the task.",
            "What the primary action is.",
            "How much information is necessary at a given point.",
            "Whether a workflow is linear or exploratory."
          ],
        },
        { type: "p", text: "A design system should provide a vocabulary, not replace product judgment." },
      ],
    },
    {
      heading: "Start with the decisions that keep recurring",
      blocks: [
        { type: "p", text: "I would not begin a design system by trying to catalogue every component a product could ever need." },
        { type: "p", text: "That produces a large inventory before the team has learned what it actually repeats." },
        { type: "p", text: "Instead, I look for repeated friction:" },
        {
          type: "list",
          items: [
            "Engineers recreate the same input validation behaviour.",
            "Product screens use multiple subtly different button hierarchies.",
            "Designers repeatedly specify the same spacing corrections.",
            "Keyboard focus changes from component to component.",
            "Loading, disabled, and error states are missing or inconsistent.",
            "A change to a base style requires editing many unrelated screens."
          ],
        },
        { type: "p", text: "Those are signals that a shared primitive could remove work." },
        { type: "p", text: "For example, a form field is not just a styled input. It has a label, help text, error message, disabled state, required indicator, validation semantics, focus treatment, and potentially an asynchronous validation state." },
        { type: "p", text: "A component that solves those concerns once can prevent dozens of partial reimplementations." },
        {
          type: "code",
          language: "tsx",
          code: "<Field label=\"Company name\" error={errors.companyName?.message}>\n  <Input\n    {...register(\"companyName\")}\n    aria-invalid={Boolean(errors.companyName)}\n  />\n</Field>",
        },
        { type: "p", text: "The value is not that this code is shorter. The value is that important states behave consistently." },
      ],
    },
    {
      heading: "Tokens are a contract",
      blocks: [
        { type: "p", text: "Design tokens are useful when they represent meaningful roles." },
        { type: "p", text: "This:" },
        {
          type: "code",
          language: "css",
          code: "--color-blue-500: #2563eb;\n--space-14: 14px;",
        },
        { type: "p", text: "may be necessary at a low level, but it is not enough to guide product work." },
        { type: "p", text: "A higher-level contract is more useful:" },
        {
          type: "code",
          language: "css",
          code: "--color-action-primary;\n--color-text-default;\n--color-text-muted;\n--color-surface-raised;\n--color-border-subtle;\n--space-control-gap;\n--space-section-gap;\n--radius-control;",
        },
        { type: "p", text: "That naming says what the value is for, not merely what it looks like." },
        { type: "p", text: "When a brand or accessibility requirement changes, a role-based token lets the system change coherently. It also makes code reviews easier: a reviewer can ask whether something is a primary action, not debate whether a particular shade of blue looks acceptable." },
        { type: "p", text: "The same applies to typography and spacing. The system should express hierarchy and relationships, not create a menu of arbitrary options." },
      ],
    },
    {
      heading: "Documentation should answer working questions",
      blocks: [
        { type: "p", text: "Documentation earns its place when it answers questions people genuinely have while shipping:" },
        {
          type: "list",
          items: [
            "When should I use a dialog rather than navigate to a page?",
            "Which button variant is appropriate for a destructive action?",
            "How does this component behave on keyboard navigation?",
            "Which states must a form field support?",
            "How do I compose a filter bar accessibly?",
            "What does the empty, loading, error, and populated version of this pattern look like?"
          ],
        },
        { type: "p", text: "A component catalogue without usage guidance can still leave people guessing." },
        { type: "p", text: "On the other hand, documentation that takes longer to maintain than the components themselves creates paperwork. The answer is not no documentation. It is documentation that is close to the decisions and examples that repeatedly cause inconsistency." },
      ],
    },
    {
      heading: "Avoid premature abstraction",
      blocks: [
        { type: "p", text: "A common failure mode is creating a generic component before there are enough real examples to understand the variation." },
        { type: "p", text: "A `Card` component with twenty props and five layout modes is often a sign that the abstraction is absorbing unresolved design decisions." },
        { type: "p", text: "I prefer small primitives with clear responsibilities:" },
        {
          type: "code",
          language: "text",
          code: "Button\nInput\nField\nSelect\nDialog\nMenu\nBadge\nTabs\nTable\nEmptyState\nToast",
        },
        { type: "p", text: "Then I compose them into product-specific patterns:" },
        {
          type: "code",
          language: "text",
          code: "ApplicationPipeline\nInterviewTimeline\nSubscriptionStatusPanel\nFollowUpTaskList",
        },
        { type: "p", text: "The first list should stay stable and well-tested. The second list can evolve with the product." },
        { type: "p", text: "That separation stops the design system becoming a dumping ground for every UI pattern the product has ever used." },
      ],
    },
    {
      heading: "Accessibility is one of the decisions worth centralising",
      blocks: [
        { type: "p", text: "Accessibility is a strong reason to use shared primitives." },
        { type: "p", text: "A well-built dialog needs focus management, escape behaviour, focus return, semantic labelling, keyboard navigation, and appropriate handling for screen readers. Recreating that behaviour ad hoc across product screens is expensive and error-prone." },
        { type: "p", text: "The same is true for menus, comboboxes, form validation, notifications, and interactive tables." },
        { type: "p", text: "A design system cannot make a product accessible by itself. Content order, labels, workflow decisions, contrast, and error recovery still need product-level care. But it can prevent teams from repeatedly breaking fundamental interaction behaviour." },
      ],
    },
    {
      heading: "Measure whether it removes work",
      blocks: [
        { type: "p", text: "A design system should be judged by outcomes, not by the number of components it contains." },
        { type: "p", text: "Useful questions include:" },
        {
          type: "list",
          items: [
            "Are common screens faster to implement?",
            "Do engineers need fewer one-off styling decisions?",
            "Are accessibility regressions reduced?",
            "Can a global visual change be made safely?",
            "Are design reviews focused more on user flow than on recurring details?",
            "Do users see more consistent interaction behaviour?",
            "Does the system make the correct choice easier than the incorrect one?"
          ],
        },
        { type: "p", text: "If the answer is no, adding more components will not fix the problem." },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "A design system should not be a monument to consistency." },
        { type: "p", text: "It should be a set of tested, accessible, well-understood decisions that removes repetitive work while leaving room for product-specific judgment." },
        { type: "p", text: "When it makes a common task easier, it is doing its job." },
        { type: "p", text: "When it creates more negotiation than it removes, it needs to become smaller, clearer, or closer to the real workflows people are building." },
      ],
    },
  ],
};

export const suppliedArticleLede: Record<string, string[]> = {
  "10000-concurrent-database-connections": ["Every system eventually reaches this moment.","Traffic grows. A campaign works. A feature gets adopted faster than expected. A dashboard that was quiet last month becomes part of someone’s daily workflow.","Then someone asks:","“Can this handle 10,000 concurrent users?”","It sounds like a capacity question.","Very quickly, it becomes a database question:","“Should we increase the maximum connection count to 10,000?”","That response is understandable. More users appear to imply more simultaneous work, and more simultaneous work appears to imply more database connections.","The problem is that a user is not a database connection.","A browser can be open for an hour while making only a handful of short requests. A database query may need a connection for 20 milliseconds. A background worker may need one for a transaction and then not touch the database again for several minutes.","Giving every potential user their own connection is not scaling. It is turning user concurrency into database overhead."],
  "idempotency-matters": [
    "A request arriving twice is not necessarily a bug.",
    "Networks retry. Browsers retry. Users click twice when a screen looks unresponsive. A queue can redeliver a message after a worker crashes between doing the work and acknowledging it. A payment provider can send the same webhook more than once because the first delivery timed out or did not receive a successful response.",
    "The mistake is treating “the client called this endpoint twice” as the entire problem.",
    "The question I now ask is different:",
    "If this operation is repeated, what must remain true?",
    "For a read, the answer is usually simple. Repeating a `GET` should not change anything.",
    "For an operation that changes state, the answer depends on the domain. Creating a payment, confirming a booking, sending an email, provisioning an account, or applying a subscription entitlement can all become expensive or harmful when repeated.",
    "The important distinction is between a request being repeated and a business action being repeated."
  ],
  "debug-peak-traffic": [
    "Some bugs are easy to reproduce because they are local and deterministic. You click a button, the page throws an error, and the browser console points at the line.",
    "Peak-traffic failures are different.",
    "The system may behave normally for hours. A route may pass every development test. CPU may appear low. Then a predictable demand spike arrives and users report timeouts, stalled pages, duplicate actions, or requests that eventually succeed after the person has already tried again.",
    "The hard part is that the visible symptom often appears far away from the cause.",
    "A slow page can be caused by a slow database query. It can also be a connection pool waiting, a queue backing up, a dependency slowing down, a retry storm, a lock, a saturated serverless concurrency limit, or a downstream API that has become latent enough to make every caller wait.",
    "When a failure appears only at peak, I start by trying to understand **where time is accumulating**."
  ],
  "empty-state-first": [
    "The happy path is usually the most polished part of a product.",
    "It is the screen full of data, activity, completed tasks, charts, messages, bookings, applications, users, or results. It is the screen a team has in mind when they describe the feature.",
    "But a new user does not arrive there.",
    "They arrive before anything has happened.",
    "No applications. No saved reports. No assignments. No bookings. No customer records. No activity yet. The first meaningful screen is often empty.",
    "That makes the empty state part of the product’s onboarding, not a decorative placeholder to add after the main interface is complete."
  ],
  "design-systems-remove-decisions": [
    "A design system can make teams faster. It can also become a library of rules, meetings, Figma pages, naming debates, and components that make a simple product change harder than it was before.",
    "The difference is not whether a team has tokens, a component library, or documentation.",
    "The difference is whether the system removes decisions that people should not have to keep making.",
    "A useful design system reduces repeated cognitive work:",
    "If every team answers those questions independently, the result is inconsistency and slow delivery. If the design system answers them clearly, people can focus on the specific user problem instead."
  ],
};
