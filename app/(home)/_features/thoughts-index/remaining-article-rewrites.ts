import type { ThoughtArticleSection } from "./thought-articles";

export const remainingArticleSections: Record<string, ThoughtArticleSection[]> = {
  "streaming-windows": [
    {
      heading: "The obvious solution: give everyone the same limit",
      blocks: [
        { type: "p", text: "A single global limit is attractive because it is easy to explain and implement." },
        { type: "code", language: "text", code: "100 requests per minute per IP address" },
        { type: "p", text: "It may stop a basic burst and can be a reasonable first guardrail for a low-risk public endpoint. The problem is that requests are not equally valuable or equally expensive." },
        { type: "code", language: "text", code: "GET /health\n→ cheap and operationally useful\n\nGET /applications\n→ database read\n\nPOST /auth/login\n→ security-sensitive and may call an identity provider\n\nPOST /exports\n→ potentially expensive query and file generation\n\nPOST /checkout\n→ payment-provider work and financial consequences\n\nPOST /webhooks/provider\n→ externally retried events that may represent critical state changes" },
        { type: "p", text: "A global request count treats each operation as the same kind of work. A client can consume the same budget with cheap requests that it would use for a time-sensitive checkout action, while the route creating the real pressure remains open." },
        { type: "p", text: "The limit appears fair because everyone receives the same number. It is not fair if the system ignores what the requests cost and what they are for." },
      ],
    },
    {
      heading: "The hidden question: what are we protecting?",
      blocks: [
        { type: "p", text: "Before choosing an algorithm or threshold, I want to identify the resource under pressure." },
        { type: "code", language: "text", code: "Login route\n→ Protect identity-provider capacity and reduce credential-stuffing risk.\n\nSearch route\n→ Protect database or search-index capacity.\n\nExport route\n→ Protect expensive reporting and file-generation work.\n\nPublic API\n→ Protect shared platform capacity and enforce customer quotas.\n\nWebhook route\n→ Protect processing capacity without losing valid provider events." },
        { type: "p", text: "The policy follows from the protected resource. An export may need a low separate limit because it consumes disproportionate capacity. A cached read route may allow a short burst. A login route may need a stricter anonymous policy than an authenticated dashboard route." },
        { type: "p", text: "The goal is not to create many complicated limits. It is to stop treating all traffic as one undifferentiated thing." },
      ],
    },
    {
      heading: "Why identity matters",
      blocks: [
        { type: "p", text: "Rate limiting needs a way to group requests. The most common choices are:" },
        { type: "code", language: "text", code: "IP address\nAuthenticated user ID\nAPI key\nOrganisation or tenant\nSession\nA combination of these" },
        { type: "p", text: "Each has a failure mode. An IP address can group unrelated users behind a school, office, household, or mobile carrier. A user ID is more meaningful after authentication but cannot protect a login form. An API key supports a clear integration contract but does not solve a browser route without one." },
        { type: "p", text: "A sensible policy is often layered:" },
        { type: "code", language: "text", code: "Anonymous request\n→ limit by IP and route type\n\nAuthenticated request\n→ limit by user or workspace\n\nIntegration request\n→ limit by API key and customer plan\n\nExpensive operation\n→ apply an additional operation-specific budget" },
        { type: "p", text: "A rate limiter is not fair because it is mathematically even. It is fair because it prevents one actor from consuming a shared resource in a way that harms others." },
      ],
    },
    {
      heading: "The obvious algorithm: a fixed counter",
      blocks: [
        { type: "p", text: "A fixed window is easy to understand:" },
        { type: "code", language: "text", code: "100 requests from 12:00:00 to 12:00:59" },
        { type: "p", text: "The hidden problem is the boundary. A client can use its full allowance at the end of one window and another full allowance at the start of the next:" },
        { type: "code", language: "text", code: "12:00:59 → 100 requests\n12:01:00 → 100 requests" },
        { type: "p", text: "The policy says the client is compliant. The protected system experiences a sudden burst of 200 requests. The algorithm should follow the desired behaviour." },
        { type: "code", language: "text", code: "Fixed window\nSimple and cheap, but allows boundary bursts.\n\nSliding window counter\nA smoother approximation of recent activity.\n\nSliding log\nMore precise, but potentially more expensive.\n\nToken bucket\nAllows a controlled burst while enforcing an average rate.\n\nLeaky bucket\nSmooths work toward a steady output rate." },
        { type: "p", text: "The question is not which algorithm is most advanced." },
        { type: "p", text: "“Should this client be allowed to burst, and how quickly must the system recover after the burst?”" },
      ],
    },
    {
      heading: "Token buckets make the burst policy explicit",
      blocks: [
        { type: "p", text: "A token bucket starts with a defined capacity. Tokens are added back at a steady rate. Each request costs one or more tokens. If tokens are available, the request proceeds. If not, it is rejected or delayed." },
        { type: "code", language: "text", code: "Bucket capacity: 20 tokens\nRefill rate: 5 tokens per second\nRequest cost: 1 token" },
        { type: "p", text: "A client can make a short burst of up to 20 requests. Over time, the average is constrained to five requests per second." },
        { type: "code", language: "text", code: "User loads a dashboard\n→ several parallel requests are normal\n\nClient reconnects after a short network interruption\n→ a small recovery burst is reasonable\n\nIntegration sends a bounded batch\n→ short-term capacity is useful" },
        { type: "p", text: "The policy is not unlimited until the minute ends. It allows a limited burst while sustained demand stays within a defined rate." },
      ],
    },
    {
      heading: "Not every request should cost one token",
      blocks: [
        { type: "p", text: "A useful refinement is to recognise that work has different cost." },
        { type: "code", language: "text", code: "Read cached profile\n→ cost 1\n\nSearch across a large dataset\n→ cost 3\n\nGenerate export\n→ cost 10\n\nCreate expensive report\n→ cost 20" },
        { type: "p", text: "This does not mean every route needs a complicated scoring system. It means a cheap health check and an expensive export should not have equal claims on capacity." },
        { type: "code", language: "text", code: "Interactive user actions\n→ protected budget\n\nBackground jobs\n→ lower-priority budget\n\nBulk exports\n→ separate queued budget\n\nAdministrative operations\n→ constrained but recoverable budget" },
        { type: "p", text: "This is where rate limiting connects with product priorities: when the system is busy, which user actions must remain possible?" },
      ],
    },
    {
      heading: "Saying no is part of the user experience",
      blocks: [
        { type: "p", text: "A rate limit is a refusal. The refusal needs to be clear." },
        { type: "code", language: "http", code: "HTTP/1.1 429 Too Many Requests\nRetry-After: 60" },
        { type: "p", text: "For a user-facing interface:" },
        { type: "code", language: "text", code: "You have reached the export limit for this hour.\n\nYour existing exports are still available. Try again in 43 minutes,\nor narrow the data before creating another export." },
        { type: "p", text: "For a critical workflow, a queue may be more appropriate than a rejection:" },
        { type: "code", language: "text", code: "Your report is being prepared.\nWe will notify you when it is ready." },
        { type: "p", text: "A booking confirmation cannot silently enter an unbounded queue. A long report may be acceptable as an asynchronous job. The policy must preserve the meaning of the workflow." },
      ],
    },
    {
      heading: "Rate limits and retries can fight each other",
      blocks: [
        { type: "p", text: "A badly designed client can turn a rate limit into additional pressure." },
        { type: "code", language: "text", code: "Request receives 429\n    ↓\nClient retries immediately\n    ↓\nAnother 429\n    ↓\nMore rejected work" },
        { type: "p", text: "The client should respect `Retry-After`, apply backoff and jitter, and have a bounded retry budget. Mutations also need idempotency so an uncertain timeout cannot create a duplicate effect." },
        { type: "code", language: "text", code: "Rate limiting\n→ protects finite capacity\n\nIdempotency\n→ makes repeated mutation attempts safe" },
        { type: "p", text: "They solve different problems and should work together." },
      ],
    },
    {
      heading: "Observe who is being limited",
      blocks: [
        { type: "p", text: "A rate limiter that only emits a `429` is difficult to improve. I want to know:" },
        { type: "list", items: ["Which route is rejecting requests?", "Which identity class is affected?", "Are requests legitimate, abusive, accidental, or caused by a broken client?", "Which limits are protecting a real resource?", "Are users respecting the recovery instruction?", "Are retries creating more rejected traffic?", "Is one customer consuming disproportionate expensive work?"] },
        { type: "p", text: "Avoid logging raw personal identifiers unnecessarily. Aggregated metrics and safe identifiers are often enough." },
        { type: "code", language: "text", code: "Rejected because a rate policy was reached\nRejected because authentication failed\nRejected because authorisation failed\nFailed because a dependency was unavailable" },
        { type: "p", text: "These may look similar to a user, but they need different operational responses." },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "A rate limiter is not a counter that says no after an arbitrary number. It is a policy that decides how a finite resource is shared." },
        { type: "p", text: "Start with the resource. Identify the request cost. Choose an identity that makes the policy fair. Decide whether short bursts are legitimate. Make rejection recoverable. Measure who is being limited and why." },
        { type: "p", text: "The best rate limit is not the strictest one. It is the one that protects the requests that matter without allowing one source of traffic to consume the capacity everyone else needs." },
      ],
    },
  ],
  "memory-inclusion": [
    {
      heading: "The obvious solution: remember everything",
      blocks: [
        { type: "p", text: "Persistent context has obvious benefits. If a product stores more history, it can offer more continuity:" },
        { type: "code", language: "text", code: "Restore drafts\nRemember filters\nResume incomplete workflows\nSuggest recent contacts\nReturn to the last open document\nPre-fill repeated information" },
        { type: "p", text: "Forgotten context creates friction. A user rebuilding a complex filter after refreshing may feel the product is careless. A person who loses a long draft may lose trust immediately." },
        { type: "p", text: "The problem is that not all context carries the same sensitivity. Remembering a display preference is different from remembering a private search or resurfacing a document on a shared device." },
        { type: "p", text: "“Remember everything” turns a convenience feature into a retention policy." },
      ],
    },
    {
      heading: "The hidden question: what is the user allowing us to keep?",
      blocks: [
        { type: "p", text: "Product memory is a claim about the user relationship. When a system stores context, it decides:" },
        { type: "code", language: "text", code: "What to retain\nWhere to retain it\nWho can access it\nWhen to resurface it\nHow long it remains\nHow the user can inspect it\nHow the user can remove it" },
        { type: "p", text: "Those are not only implementation questions. They determine whether continuity feels like assistance or surveillance." },
        { type: "code", language: "text", code: "Short-lived workflow context\n→ a selected filter, multi-step form, draft, or recently viewed item\n\nCross-session memory\n→ search history, personal preference, contact relationship, behavioural pattern, or inferred intent" },
        { type: "p", text: "The first category can often be useful by default when it is visible and local to the task. The second needs a clearer contract." },
      ],
    },
    {
      heading: "Keep context, not surveillance",
      blocks: [
        { type: "p", text: "The most useful memory is often narrow and immediate." },
        { type: "code", language: "text", code: "Keep\n→ the current filter during a session\n→ an unsaved form draft\n→ the last open file in a workspace\n→ the current step of an unfinished workflow\n→ a recently viewed item within a clearly defined area" },
        { type: "p", text: "These forms of memory help the user continue work they visibly started. The relationship between action and recall is local and understandable." },
        { type: "code", language: "text", code: "I selected this filter → the product kept it\nI began this draft → the product restored it\nI was editing this file → the product returned me there" },
        { type: "p", text: "The risk increases when memory crosses contexts without warning: a private search returns weeks later, an abandoned workflow keeps resurfacing, or another person's context appears on a shared device." },
        { type: "p", text: "“Keep context where the user expects continuity. Ask before turning that context into a lasting profile of them.”" },
      ],
    },
    {
      heading: "Visibility is part of trust",
      blocks: [
        { type: "p", text: "A product should not make people guess what it knows. If the system restores a draft, say so:" },
        { type: "code", language: "text", code: "We restored your saved draft from yesterday.\nContinue editing · Discard draft" },
        { type: "p", text: "If it retains a filter:" },
        { type: "code", language: "text", code: "Showing results using your last saved filter.\nClear filter" },
        { type: "p", text: "If it stores a preference:" },
        { type: "code", language: "text", code: "You are seeing this view because you selected “Compact layout.”\nChange preference" },
        { type: "p", text: "The wording does not need to be intrusive. It needs to make the relationship visible. Trust comes from making memory legible." },
      ],
    },
    {
      heading: "The obvious solution: add a clear-all-data button",
      blocks: [
        { type: "p", text: "A global clear-all option can be useful for account deletion or privacy controls. It is not enough for day-to-day control." },
        { type: "code", language: "text", code: "Discard this draft\nClear this search\nForget this suggestion\nRemove this recent item\nReset this filter\nTurn off this preference" },
        { type: "p", text: "Local controls reduce the cost of correcting the product. They also provide feedback: if users repeatedly discard one kind of remembered context, it may be resurfacing at the wrong time." },
        { type: "p", text: "A memory feature should be easy to reverse." },
      ],
    },
    {
      heading: "Expiry is a feature",
      blocks: [
        { type: "p", text: "Infinite retention is often an accident. Something is stored for restoration, but no expiry is set because the immediate task is not framed as retention." },
        { type: "p", text: "A useful memory policy asks:" },
        { type: "code", language: "text", code: "Is this context still useful after one hour?\nAfter one day?\nAfter thirty days?\nAfter a user signs out?\nAfter a device changes?\nAfter a workflow completes?" },
        { type: "p", text: "A draft may remain until it is completed or discarded. A temporary filter may last for one session. A sensitive search may deserve no persistence. A user preference may remain until explicitly changed." },
        { type: "code", language: "text", code: "Context with an end\n→ helpful continuity\n\nContext with no end\n→ unexamined retention" },
        { type: "p", text: "Expiry does not make a product forgetful. It makes the product intentional." },
      ],
    },
    {
      heading: "Shared devices and account boundaries matter",
      blocks: [
        { type: "p", text: "Memory becomes risky when assumptions about one person and one device are wrong. A shared computer, workplace browser profile, or borrowed device can reveal context through recent searches, drafts, contacts, records, autofill, and filters." },
        { type: "p", text: "The product should decide whether remembered context belongs to an account, device, browser session, or workspace." },
        { type: "code", language: "text", code: "Session-scoped\n→ temporary interaction continuity\n\nDevice-scoped\n→ non-sensitive display preferences\n\nAccount-scoped\n→ stable personal settings with clear controls\n\nWorkspace-scoped\n→ context that must not cross organisational boundaries" },
        { type: "p", text: "Choosing the wrong scope can create a privacy problem even when the feature works technically." },
      ],
    },
    {
      heading: "The system should not infer more than it needs",
      blocks: [
        { type: "p", text: "A product can create memory without explicitly storing a memory object. Search history, event logs, recommendation inputs, analytics data, browser storage, cached responses, and support tooling can retain fragments of user context." },
        { type: "p", text: "Data minimisation is therefore a product design principle:" },
        { type: "code", language: "text", code: "Store the smallest useful context\nFor the shortest useful time\nAt the narrowest useful scope\nWith the clearest user control" },
        { type: "p", text: "Less retained state means fewer privacy risks, fewer confusing recall behaviours, and fewer difficult deletion or access requests later." },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        { type: "p", text: "Memory can make a product feel attentive. It can also make a product feel as though it has been watching too closely." },
        { type: "p", text: "The difference is not the sophistication of the technology. It is the contract with the user." },
        { type: "p", text: "Remember context when continuity is clearly useful. Make retained information visible. Give people local control to remove it. Set expiry deliberately. Keep sensitive state narrow and scoped." },
        { type: "p", text: "A product should remember enough to help someone continue their work. It should not remember so much that the user has to wonder what else it knows." },
      ],
    },
  ],
};

export const remainingArticleLede: Record<string, string[]> = {
  "streaming-windows": [
    "A service begins to struggle under load.",
    "An export route is expensive. A public endpoint receives bursts of traffic. One integration polls far more often than expected. A login route attracts suspicious activity. Background work competes with interactive user work.",
    "The obvious response is:",
    "“Add a rate limit.”",
    "A limit can protect a system. It can also block legitimate users, preserve the wrong work, and make an already confusing failure mode feel arbitrary.",
    "The difficult part is not incrementing a counter. It is deciding which requests deserve capacity when there is not enough capacity for all of them.",
    "That is what rate limiting really is: an admission-control policy.",
  ],
  "memory-inclusion": [
    "A product remembers something.",
    "It restores a draft after a browser refresh. It keeps the filter a user selected. It returns them to the file they were editing. It remembers the last workspace they used.",
    "At first, this feels intelligent. The product understands continuity, saves time, and prevents someone from repeating work.",
    "Then the same capability crosses a line.",
    "A private search appears again after the user thought they had moved on. A draft returns after they intentionally abandoned it. A shared computer reveals a previous person’s context.",
    "The product stops feeling helpful. It starts feeling haunted.",
    "The difference is not whether the system can remember. It is whether the user understands what is remembered, why it is remembered, how long it remains, and how to make it disappear.",
  ],
};
