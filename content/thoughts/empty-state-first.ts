import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "Most products get designed from the full screen first: the dashboard packed with data that shows the product working. It’s the version that looks best in a mock-up, so it’s usually the one that gets built first.",
    "But it isn’t the screen a new user sees. On day one there’s no data, and the product has to explain itself with nothing to show.",
    "That’s where **the empty state** comes in. It isn’t a placeholder for missing data; it’s the **first real version of the workflow**.",
    "In this article, I’ll walk through why it’s worth designing first, the different kinds of “empty” a product has to tell apart and what the empty state reveals about the rest of the product.",
  ],
  sections: [
    {
      heading: "A placeholder is not an explanation",
      blocks: [
        {
          type: "p",
          text: "Once the populated page works, an empty state is often added as a placeholder:",
        },
        {
          type: "code",
          language: "text",
          code: "No applications yet.",
        },
        {
          type: "p",
          text: "Maybe there is an illustration, and maybe a button:",
        },
        {
          type: "code",
          language: "text",
          code: "Create",
        },
        {
          type: "p",
          text: "That is better than a blank screen, but it does not always answer the user’s actual questions:",
        },
        {
          type: "list",
          items: [
            "What is this area for?",
            "Why should I create something here?",
            "What is the first useful thing I can do?",
            "What information will I need?",
            "Is this empty because I am new, because a filter is active, or because something failed?",
            "What will happen after I take this action?",
          ],
        },
      ],
    },
    {
      heading: "“Empty” is not one condition",
      blocks: [
        {
          type: "p",
          text: "Several situations can look identical if the product does not model them separately:",
        },
        {
          type: "code",
          language: "text",
          code: `First-use empty state
No records have ever been created.

Filtered empty state
Records exist, but none match the current filter.

Loading state
The system does not know yet whether records exist.

Error state
The request failed, so the product cannot show records.

Permission-limited state
Records may exist, but this user cannot access them.

Completed state
There is intentionally no outstanding work.`,
        },
        {
          type: "p",
          text: "Treating all of these as “No data” creates confusing behaviour. A candidate may have twenty applications but see no results because the status filter is set to “Interviewing,” and what they need is “Clear filters,” not “Create your first application.” A user may see an empty list because the request failed. The useful action is “Try again,” not “Start creating records.” A user who has completed all follow-up tasks does not need an onboarding message. They need confirmation:",
        },
        {
          type: "code",
          language: "text",
          code: `No follow-ups are due this week.
Your next scheduled action is Thursday.`,
        },
        {
          type: "p",
          text: "The product needs to know what kind of empty it is showing, and the interface can only know what the data it receives preserves. If an API answers a permission failure, a failed query and a genuinely empty collection with the same empty list, the frontend cannot recover the difference. The user is invited to add their first application when the real problem is access or a failed request.",
        },
      ],
    },
    {
      heading: "Start from the next action",
      blocks: [
        {
          type: "p",
          text: "The empty state should begin with the user’s next meaningful action. For a job-application tracker, a first-use dashboard might say:",
        },
        {
          type: "code",
          language: "text",
          code: `Your job-search pipeline starts with one opportunity.

Add an application to keep its company, role, current stage,
and next action in one place.

Add your first application`,
        },
        {
          type: "p",
          text: "That does three things:",
        },
        {
          type: "list",
          items: [
            "Explains the product object.",
            "Connects creation to a user outcome.",
            "Offers one clear next step.",
          ],
        },
        {
          type: "p",
          text: "The action label matters too. “Create” is technically correct but vague. “Add your first application” tells the user what will happen.",
        },
      ],
    },
    {
      heading: "Designing the empty state reveals unnecessary complexity",
      blocks: [
        {
          type: "p",
          text: "Writing the first-use state early forces useful product questions:",
        },
        {
          type: "list",
          items: [
            "What is the smallest unit of value?",
            "What data is actually needed to create it?",
            "Can the user create it immediately?",
            "Does creation require setup that should happen earlier?",
            "What happens after the first record exists?",
            "Which fields can be deferred?",
            "What can be prefilled or inferred safely?",
          ],
        },
        {
          type: "p",
          text: "If it takes a long explanation before the user can create the first useful record, the onboarding model may be too complex. For example, if a candidate must first create a company, then a contact, then a pipeline category, then a custom tag, then a document folder before adding an application, the product has optimised its data model ahead of the user’s first outcome. The empty state exposes that friction. A better first action may create sensible defaults:",
        },
        {
          type: "code",
          language: "text",
          code: `Company name
Role title
Current stage
Next action date`,
        },
        {
          type: "p",
          text: "Additional information can be added later when it becomes useful.",
        },
      ],
    },
    {
      heading: "The happy state can hide product assumptions",
      blocks: [
        {
          type: "p",
          text: "A populated dashboard often includes information created by previous product decisions:",
        },
        {
          type: "code",
          language: "text",
          code: `Stage
Next action
Contacts
Tags
Notes
Documents
Follow-ups
Activity history
Response analytics`,
        },
        {
          type: "p",
          text: "When those objects already exist, the page can appear coherent; the empty state asks whether the product has a clear path to creating them. It also reveals which objects are essential and which are supporting complexity. A useful product does not require users to create an entire internal model before receiving any value. The happy path should emerge naturally from the first meaningful action.",
        },
      ],
    },
    {
      heading: "Do not use empty states to hide uncertainty",
      blocks: [
        {
          type: "p",
          text: "One common mistake is showing an empty state while the application is still loading. Another is treating an error as though the user simply has no data.",
        },
        {
          type: "code",
          language: "text",
          code: `Request pending
→ not an empty state

Request failed
→ not an empty state

User has no records
→ empty state`,
        },
        {
          type: "p",
          text: "That distinction is important in any workflow involving payments, bookings, applications, approvals, or saved work. If a user submits something and the system has not confirmed the result, showing an empty state can imply that their work disappeared. The interface should show the actual state:",
        },
        {
          type: "code",
          language: "text",
          code: `Saving application…

We could not save this application.
Try again

Application saved.
View application`,
        },
        {
          type: "p",
          text: "An empty state should explain absence, not conceal uncertainty.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "The happy path tells you what the product looks like after someone has succeeded. The empty state tells you whether the product can help them succeed for the first time. Build it early, make it specific to the user’s situation, explain why the next action matters, and distinguish first use from filtered results, loading, errors, permissions and completed work. The first useful action is where the product begins.",
        },
      ],
    },
  ],
};
