import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A user reports that an action happened twice. Maybe they received two confirmation emails; maybe a booking appeared twice. Maybe an entitlement was applied twice. Maybe an external provider sent the same event again and the application treated both deliveries as new work. The obvious explanation is usually:",
    "“The user clicked the button twice.”",
    "The obvious fix follows:",
    "“Disable the button after the first click.”",
    "That is a sensible interface improvement, and it can prevent accidental double clicks and reassure users that their action is processing. It is not a duplicate-safety guarantee. A button only controls one way a request can be repeated. The system still has to handle retries, timeouts, browser refreshes, flaky connections, queue redelivery, application restarts, and providers that intentionally send the same webhook more than once. The real question is not:",
    "“How do we stop someone clicking twice?”",
    "It is:",
    "“What must remain true if this operation arrives more than once?”",
  ],
  sections: [
    {
      heading: "The invariant",
      blocks: [
        {
          type: "p",
          text: "A request may be delivered more than once; the business effect must remain correct after the first valid application. The booking, payment, and subscription examples below are representative transitions; the design requirement is that duplicate delivery does not create duplicate business effects.",
        },
      ],
    },
    {
      heading: "The obvious solution: block the second click",
      blocks: [
        {
          type: "p",
          text: "A disabled button can improve a user experience:",
        },
        {
          type: "code",
          language: "text",
          code: `User clicks “Confirm booking”
    ↓
Button enters loading state
    ↓
Second click is prevented`,
        },
        {
          type: "p",
          text: "That is useful, and it prevents visible confusion and removes one source of duplicate submission. But it does not account for this sequence:",
        },
        {
          type: "code",
          language: "text",
          code: `User clicks “Confirm booking”
    ↓
Server processes the request
    ↓
Network response is lost or delayed
    ↓
Browser shows an error or spinner
    ↓
User refreshes and retries`,
        },
        {
          type: "p",
          text: "From the user’s perspective, the first attempt may have failed; from the server’s perspective, it may already have succeeded. The same problem appears with integrations:",
        },
        {
          type: "code",
          language: "text",
          code: `Payment provider sends webhook
    ↓
Application processes payment
    ↓
Application times out before acknowledging
    ↓
Provider retries webhook`,
        },
        {
          type: "p",
          text: "The duplicate is not a mistake, but it is expected behaviour in a system that prefers retrying work over silently losing it.",
        },
      ],
    },
    {
      heading: "The hidden problem: delivery and effect are different things",
      blocks: [
        {
          type: "p",
          text: "A request can be delivered multiple times; a business effect should occur only when it is valid. That distinction matters for operations such as:",
        },
        {
          type: "code",
          language: "text",
          code: `Confirm a booking
Create a payment record
Grant subscription access
Send a confirmation message
Create an invoice
Provision an account
Publish a workflow transition`,
        },
        {
          type: "p",
          text: "The transport layer may only be able to promise at least once delivery. The application needs to make the business operation idempotent:",
        },
        {
          type: "code",
          language: "text",
          code: `Many deliveries
    ↓
One durable business outcome`,
        },
        {
          type: "p",
          text: "For example:",
        },
        {
          type: "code",
          language: "text",
          code: `Booking B-1042
pending_payment → confirmed`,
        },
        {
          type: "p",
          text: "The first valid confirmation should move the booking into `confirmed`; a repeat confirmation should return the already-confirmed result, and it should not create another booking, trigger another entitlement, or send another “booking confirmed” email.",
        },
      ],
    },
    {
      heading: "The better question: what identifies this operation?",
      blocks: [
        {
          type: "p",
          text: "The system needs a durable identity for the attempted operation; for a client-created mutation, that may be an idempotency key:",
        },
        {
          type: "code",
          language: "http",
          code: `POST /api/bookings/B-1042/confirm
Idempotency-Key: 7ccd5c5a-3e81-4ac1-8b20-1d1e9ea81f44`,
        },
        {
          type: "p",
          text: "For a provider webhook, it is commonly the provider’s immutable event ID. The application persists the identity before—or atomically with—performing the important work.",
        },
        {
          type: "code",
          language: "text",
          code: `idempotency_records
- key
- operation_type
- actor_id
- request_fingerprint
- status
- response_reference
- created_at
- completed_at`,
        },
        {
          type: "p",
          text: "The next request with the same key can be handled safely:",
        },
        {
          type: "code",
          language: "text",
          code: `No previous record
→ process the operation

Previous completed record, same request
→ return the stored outcome

Previous record, different request content
→ reject as a conflict

Previous in-progress record
→ return an appropriate pending/retry response`,
        },
        {
          type: "p",
          text: "The key turns “I think this is the same request” into something the system can verify.",
        },
      ],
    },
    {
      heading: "Why an in-memory check fails",
      blocks: [
        {
          type: "p",
          text: "It can be tempting to track recent request IDs in memory:",
        },
        {
          type: "code",
          language: "ts",
          code: `if (processedRequests.has(key)) {
  return previousResult;
}`,
        },
        {
          type: "p",
          text: "That may work during a local test, and it fails under the conditions idempotency is meant to address. A process can restart; a second application instance can receive the retry. A deployment can move traffic; a concurrent request can arrive before the first process has stored the result. A serverless function may not share memory with the function that handled the previous delivery. The idempotency state must live in a shared, durable system of record. For an operation that changes database state, the database is often the right authority.",
        },
      ],
    },
    {
      heading: "The database must resolve the race",
      blocks: [
        {
          type: "p",
          text: "A check followed by an insert is not enough if two requests arrive at once:",
        },
        {
          type: "code",
          language: "text",
          code: `Request A: no idempotency record found
Request B: no idempotency record found
Request A: performs the action
Request B: performs the action`,
        },
        {
          type: "p",
          text: "Both requests saw the same world before either committed a result. The protection needs an atomic boundary:",
        },
        {
          type: "code",
          language: "sql",
          code: "unique (provider, provider_event_id)",
        },
        {
          type: "p",
          text: "or:",
        },
        {
          type: "code",
          language: "sql",
          code: "unique (idempotency_key)",
        },
        {
          type: "p",
          text: "Then the database resolves the concurrency; one request creates the record. The other discovers that the operation already exists. That is a more important guarantee than the client-side loading state.",
        },
      ],
    },
    {
      heading: "The difficult gap: work succeeded but the response did not",
      blocks: [
        {
          type: "p",
          text: "The reason idempotency matters most is not the happy path, but it is the uncertain one. Imagine a request that successfully updates the database, but the process crashes before it replies. The client sees a timeout and retries. Without a stored operation identity and result, the server cannot distinguish:",
        },
        {
          type: "code",
          language: "text",
          code: "The first request never reached us",
        },
        {
          type: "p",
          text: "from:",
        },
        {
          type: "code",
          language: "text",
          code: "The first request completed, but the client did not receive the response",
        },
        {
          type: "p",
          text: "The safe response is to make both cases converge on the same final state. That requires the system to store enough information to explain what happened later:",
        },
        {
          type: "code",
          language: "text",
          code: `Client request
    ↓
Idempotency record
    ↓
Domain state transition
    ↓
Outbox or notification record
    ↓
External side effect`,
        },
        {
          type: "p",
          text: "That chain is useful not only for duplicate safety but also for support, auditing, incident response, and recovery.",
        },
      ],
    },
    {
      heading: "Retrying needs a policy too",
      blocks: [
        {
          type: "p",
          text: "Retries are not inherently safe; a temporary network failure may justify a retry; a validation error, invalid signature, permission denial, or malformed request generally does not. A useful failure model distinguishes:",
        },
        {
          type: "code",
          language: "text",
          code: `received
→ processing
→ completed
→ retryable_failure
→ permanent_failure
→ manual_review`,
        },
        {
          type: "p",
          text: "The application should define:",
        },
        {
          type: "list",
          items: [
            "Which failures are retryable",
            "How many attempts are allowed",
            "How backoff is applied",
            "When an operation becomes visible for manual review",
            "What stops a retry from creating a second effect",
          ],
        },
        {
          type: "p",
          text: "A retry loop without a durable operation identity is just a more efficient way to duplicate work.",
        },
      ],
    },
    {
      heading: "The test that proves the system is safe",
      blocks: [
        {
          type: "p",
          text: "The highest-value test is not “the endpoint returns 200.” It is:",
        },
        {
          type: "code",
          language: "text",
          code: `Given a valid request and idempotency key
When the same request is delivered twice
Then the business state changes once
And the second request returns the original result
And no duplicate downstream event is created`,
        },
        {
          type: "p",
          text: "For a webhook:",
        },
        {
          type: "code",
          language: "text",
          code: `Given a verified payment event
When the provider delivers the same event twice
Then the entitlement is activated once
And the duplicate delivery is visible but harmless`,
        },
        {
          type: "p",
          text: "The practical lesson: A disabled button improves the interface; idempotency protects the business operation. Build both when the workflow matters; just do not confuse one for the other.",
        },
      ],
    },
  ],
};
