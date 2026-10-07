import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A user refreshes a long form and is relieved to find their draft still there. The product also remembers the filter they chose and returns them to the file they were editing, saving several small pieces of repeated work.",
    "Then the same person searches for something private on a shared computer. The search reappears the next day, and a draft they deliberately abandoned keeps returning whenever they open the product.",
    "Nothing about the storage mechanism changed, but the experience did. Memory felt helpful while it followed a visible task; it felt invasive when the user could no longer tell what would return, where it was stored or how to remove it.",
    "That makes product memory less a question of how much context we can retain and more a question of the contract around it: what is remembered, for how long, on whose device or account, and under whose control.",
  ],
  sections: [
    {
      heading: "Why “remember everything” goes wrong",
      blocks: [
        {
          type: "p",
          text: "Persistent context has obvious benefits. If a product stores more history, it can offer more continuity:",
        },
        {
          type: "code",
          language: "text",
          code: `Restore drafts
Remember filters
Resume incomplete workflows
Suggest recent contacts
Return to the last open document
Pre-fill repeated information`,
        },
        {
          type: "p",
          text: "Forgotten context creates friction; a user rebuilding a complex filter after refreshing may feel the product is careless. A person who loses a long draft may lose trust immediately. The problem is that not all context carries the same sensitivity. Remembering a display preference is different from remembering a private search or resurfacing a document on a shared device. “Remember everything” turns a convenience feature into a retention policy.",
        },
      ],
    },
    {
      heading: "What is the user allowing us to keep?",
      blocks: [
        {
          type: "p",
          text: "Product memory is a claim about the user relationship; when a system stores context, it decides:",
        },
        {
          type: "code",
          language: "text",
          code: `What to retain
Where to retain it
Who can access it
When to resurface it
How long it remains
How the user can inspect it
How the user can remove it`,
        },
        {
          type: "p",
          text: "Those choices go beyond implementation, because they determine whether continuity feels like assistance or surveillance.",
        },
        {
          type: "code",
          language: "text",
          code: `Short-lived workflow context
→ a selected filter, multi-step form, draft, or recently viewed item

Cross-session memory
→ search history, personal preference, contact relationship, behavioural pattern, or inferred intent`,
        },
        {
          type: "p",
          text: "The first category can often be useful by default when it is visible and local to the task. The second needs a clearer contract.",
        },
      ],
    },
    {
      heading: "Keep context, not surveillance",
      blocks: [
        {
          type: "p",
          text: "The most useful memory is often narrow and immediate.",
        },
        {
          type: "code",
          language: "text",
          code: `Keep
→ the current filter during a session
→ an unsaved form draft
→ the last open file in a workspace
→ the current step of an unfinished workflow
→ a recently viewed item within a clearly defined area`,
        },
        {
          type: "p",
          text: "These forms of memory help the user continue work they visibly started. The relationship between action and recall is local and understandable.",
        },
        {
          type: "code",
          language: "text",
          code: `I selected this filter → the product kept it
I began this draft → the product restored it
I was editing this file → the product returned me there`,
        },
        {
          type: "p",
          text: "The risk increases when memory crosses contexts without warning: a private search returns weeks later, an abandoned workflow keeps resurfacing, or another person's context appears on a shared device.",
        },
        {
          type: "p",
          text: "“Keep context where the user expects continuity; ask before turning that context into a lasting profile of them.”",
        },
      ],
    },
    {
      heading: "Visibility is part of trust",
      blocks: [
        {
          type: "p",
          text: "A product should not make people guess what it knows; if the system restores a draft, say so:",
        },
        {
          type: "code",
          language: "text",
          code: `We restored your saved draft from yesterday.
Continue editing · Discard draft`,
        },
        {
          type: "p",
          text: "If it retains a filter:",
        },
        {
          type: "code",
          language: "text",
          code: `Showing results using your last saved filter.
Clear filter`,
        },
        {
          type: "p",
          text: "If it stores a preference:",
        },
        {
          type: "code",
          language: "text",
          code: `You are seeing this view because you selected “Compact layout.”
Change preference`,
        },
        {
          type: "p",
          text: "The wording does not need to be intrusive, but it does need to make the relationship visible. Trust comes from making memory legible.",
        },
      ],
    },
    {
      heading: "Why a clear-all button is not enough",
      blocks: [
        {
          type: "p",
          text: "A global clear-all option can be useful for account deletion or privacy controls. It is not enough for day-to-day control.",
        },
        {
          type: "code",
          language: "text",
          code: `Discard this draft
Clear this search
Forget this suggestion
Remove this recent item
Reset this filter
Turn off this preference`,
        },
        {
          type: "p",
          text: "Local controls reduce the cost of correcting the product, and they also provide feedback: if users repeatedly discard one kind of remembered context, it may be resurfacing at the wrong time. A memory feature should be easy to reverse.",
        },
      ],
    },
    {
      heading: "Expiry is a feature",
      blocks: [
        {
          type: "p",
          text: "Infinite retention is often an accident. Something is stored for restoration, but no expiry is set because the immediate task is not framed as retention. A useful memory policy asks:",
        },
        {
          type: "code",
          language: "text",
          code: `Is this context still useful after one hour?
After one day?
After thirty days?
After a user signs out?
After a device changes?
After a workflow completes?`,
        },
        {
          type: "p",
          text: "A draft may remain until it is completed or discarded; a temporary filter may last for one session. A sensitive search may deserve no persistence; a user preference may remain until explicitly changed.",
        },
        {
          type: "code",
          language: "text",
          code: `Context with an end
→ helpful continuity

Context with no end
→ unexamined retention`,
        },
        {
          type: "p",
          text: "Expiry makes a product intentional rather than forgetful.",
        },
      ],
    },
    {
      heading: "Shared devices and account boundaries matter",
      blocks: [
        {
          type: "p",
          text: "Memory becomes risky when assumptions about one person and one device are wrong. A shared computer, workplace browser profile, or borrowed device can reveal context through recent searches, drafts, contacts, records, autofill, and filters. The product should decide whether remembered context belongs to an account, device, browser session, or workspace.",
        },
        {
          type: "code",
          language: "text",
          code: `Session-scoped
→ temporary interaction continuity

Device-scoped
→ non-sensitive display preferences

Account-scoped
→ stable personal settings with clear controls

Workspace-scoped
→ context that must not cross organisational boundaries`,
        },
        {
          type: "p",
          text: "Choosing the wrong scope can create a privacy problem even when the feature works technically.",
        },
      ],
    },
    {
      heading: "The system should not infer more than it needs",
      blocks: [
        {
          type: "p",
          text: "A product can create memory without explicitly storing a memory object. Search history, event logs, recommendation inputs, analytics data, browser storage, cached responses, and support tooling can retain fragments of user context. Data minimisation is therefore a product design principle:",
        },
        {
          type: "code",
          language: "text",
          code: `Store the smallest useful context
For the shortest useful time
At the narrowest useful scope
With the clearest user control`,
        },
        {
          type: "p",
          text: "Less retained state means fewer privacy risks, fewer confusing recall behaviours, and fewer difficult deletion or access requests later.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "Memory can make a product feel attentive, and it can also make a product feel as though it has been watching too closely. The difference lies in the contract with the user rather than the sophistication of the technology. Remember context when continuity is clearly useful, make retained information visible, give people local control to remove it, set expiry deliberately and keep sensitive state narrow and scoped. A product should remember enough to help someone continue their work. It should not remember so much that the user has to wonder what else it knows.",
        },
      ],
    },
  ],
};
