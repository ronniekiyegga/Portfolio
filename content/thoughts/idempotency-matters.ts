import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A customer completes a booking, sees the confirmation and then receives the same email again. In the admin view, the booking appears twice even though the customer insists they pressed the button once.",
    "The interface offers an easy explanation:",
    "“The user clicked the button twice.”",
    "So the team reaches for a sensible first fix:",
    "“Disable the button after the first click.”",
    "Disabling the button improves feedback and prevents one source of duplicate requests. It does not explain why the server received the operation twice after a timeout, why a queue redelivered a message or why a provider sent the same webhook again. Those are normal behaviours in distributed systems, not unusual user mistakes.",
    "Once delivery can repeat, preventing the second click is no longer the central problem. The real question is not:",
    "“How do we stop someone clicking twice?”",
    "It is:",
    "“What must remain true if this operation arrives more than once?”",
    "That question moves the investigation from the button to the business operation, where duplicate safety can actually be guaranteed.",
  ],
  sections: [
    {
      heading: "How the second request still arrives",
      blocks: [
        {
          type: "p",
          text: "Even with the button disabled, this sequence produces a second request:",
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
          text: "In a system that prefers retrying work to silently losing it, that duplicate is expected behaviour rather than a mistake.",
        },
      ],
    },
    {
      heading: "Delivery and effect are different things",
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
      heading: "What identifies this operation?",
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
          text: "The in-progress branch assumes the first attempt will finish. If the process that claimed the key crashes before completing, every retry is told the operation is still pending, indefinitely. An in-progress record therefore needs a recovery boundary: a lease or expiry after which the operation can be retried or reconciled against what actually happened. The right boundary depends on how long the operation can legitimately take, and it has a risk of its own, because a slow attempt that is still running can overlap with the retry. The atomic guarantee described below still has to hold. Records that stay in progress long past their boundary are worth surfacing to operators, since each one is an outcome nobody is producing.",
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
          text: "That may work during a local test, but it fails under exactly the conditions idempotency is meant to address. A process can restart, a second application instance can receive the retry, a deployment can move traffic, or a concurrent request can arrive before the first process has stored the result. A serverless function may not share memory with the function that handled the previous delivery. The idempotency state must live in a shared, durable system of record. For an operation that changes database state, the database is often the right authority.",
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
          text: "Idempotency matters most on the uncertain path rather than the happy one. Imagine a request that successfully updates the database, but the process crashes before it replies. The client sees a timeout and retries. Without a stored operation identity and result, the server cannot distinguish:",
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
          text: "Retries are not inherently safe. A temporary network failure may justify a retry, but a validation error, invalid signature, permission denial or malformed request generally does not. A useful failure model distinguishes:",
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
      heading: "Testing for duplicate safety",
      blocks: [
        {
          type: "p",
          text: "The most valuable test goes beyond “the endpoint returns 200”:",
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
          text: "A disabled button improves the interface, while idempotency protects the business operation. When the workflow matters, build both, and do not mistake one for the other.",
        },
      ],
    },
  ],
};
