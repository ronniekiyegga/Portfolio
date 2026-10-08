import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "When a screen feels cramped, the most common design-review suggestion is to **give everything more room**. Take a settings page where labels, controls, help text and destructive actions all run into one another.",
    "More padding does make it calmer. But it also pushes related controls further apart. The billing action is still mixed in with the profile settings, and the delete button still looks like part of the normal save flow. The page is bigger without being any clearer.",
    "That’s because whitespace works through **proximity**: space tells you which things belong together. If those relationships haven’t been decided, changing the gaps can’t decide them for you.",
    "In this article, I’ll look at how to settle what belongs together first, and then use spacing to make that structure obvious.",
  ],
  sections: [
    {
      heading: "What spacing can do",
      blocks: [
        {
          type: "p",
          text: "Spacing can absolutely improve readability. A form with labels pressed against inputs is difficult to scan, a dashboard with no separation between cards becomes visually noisy, and a destructive action placed too close to a routine one invites mistakes. Used deliberately, space expresses relationships like these:",
        },
        {
          type: "code",
          language: "text",
          code: `Label
Input`,
        },
        {
          type: "p",
          text: "should feel like one unit.",
        },
        {
          type: "code",
          language: "text",
          code: `Personal details

Billing preferences`,
        },
        {
          type: "p",
          text: "should feel like separate sections.",
        },
        {
          type: "code",
          language: "text",
          code: `Save changes
Cancel`,
        },
        {
          type: "p",
          text: "should feel connected to the form they affect. The problem begins when spacing becomes the answer to every organisational issue.",
        },
      ],
    },
    {
      heading: "The screen has not decided what is grouped",
      blocks: [
        {
          type: "p",
          text: "Consider that settings page:",
        },
        {
          type: "code",
          language: "text",
          code: `Name
Email address
Email notifications
Weekly summary
Payment method
Change plan
Save changes
Delete account`,
        },
        {
          type: "p",
          text: "If these items are simply stacked with arbitrary gaps, users must infer the relationships. Is “Weekly summary” a notification setting or part of the profile? Does “Save changes” apply to the payment method, or only to the fields above it? Does “Change plan” take effect immediately? Is “Delete account” part of the save flow? No amount of additional margin answers those questions reliably. The content needs a structure first:",
        },
        {
          type: "code",
          language: "text",
          code: `Profile
Name
Email address
Save changes

Notifications
Email notifications
Weekly summary

Billing
Payment method
Change plan

Delete account
Permanently remove your account and data`,
        },
        {
          type: "p",
          text: "The spacing then reinforces meaningful groups instead of trying to invent them.",
        },
      ],
    },
    {
      heading: "What relationship does this gap represent?",
      blocks: [
        {
          type: "p",
          text: "A spacing scale is useful when it encodes relationships. For example:",
        },
        {
          type: "code",
          language: "text",
          code: `Small gap:
label and input, icon and text, related metadata

Medium gap:
sibling fields, controls within one section

Large gap:
separate content groups

Extra-large gap:
major page regions or workflow stages`,
        },
        {
          type: "p",
          text: "The exact pixel values matter less than the consistency of the meaning. If 8px sometimes means “these items are tightly related” and elsewhere means “these are separate page sections,” the user loses a quiet but valuable cue. A design system should not merely offer a set of possible gaps. It should help the team use spacing as a language.",
        },
      ],
    },
    {
      heading: "Why perfectly even spacing can be wrong",
      blocks: [
        {
          type: "p",
          text: "A common attempt at making a page feel organised is to make every gap equal. That looks orderly, but it can flatten hierarchy.",
        },
        {
          type: "code",
          language: "text",
          code: `Settings
16px
Profile
16px
Name
16px
Email address
16px
Notifications
16px
Delete account`,
        },
        {
          type: "p",
          text: "The user sees a sequence of equally important items, but real information has different levels of relatedness.",
        },
        {
          type: "code",
          language: "text",
          code: `Settings
8px
Manage your account and preferences

32px
Profile
8px
Name
16px
Email address

32px
Notifications
8px
Email notifications

48px
Delete account`,
        },
        {
          type: "p",
          text: "The different gaps tell the reader which items form a unit and where a new idea begins. Equal spacing is not always neutral, and it can obscure the product’s intended structure.",
        },
      ],
    },
    {
      heading: "More whitespace can reduce operational usefulness",
      blocks: [
        {
          type: "p",
          text: "A settings page is visited occasionally, so generous space costs the user very little there. The same instinct is riskier elsewhere. Whitespace is often associated with good design because it is visible in marketing pages and editorial layouts, but operational interfaces have different constraints. Someone reviewing many applications, invoices, support cases, bookings, or alerts may need to compare information quickly. If every record becomes a large card with broad empty areas, the user sees less context at once and spends more time scrolling. The answer is not to eliminate space, but to make density intentional. A dense table can still be readable when it uses:",
        },
        {
          type: "code",
          language: "text",
          code: `Consistent column alignment
Predictable row height
Quiet secondary metadata
Clear status treatment
Stable grouping
A visible selected or focused state
Meaningful separation between rows and sections`,
        },
        {
          type: "p",
          text: "Space should help the user scan, not make the product feel spacious at the expense of the work the user needs to do.",
        },
      ],
    },
    {
      heading: "The practical test",
      blocks: [
        {
          type: "p",
          text: "A useful review question is: If the borders disappeared, would the spacing still explain the structure? If the answer is no, the layout may be relying on decorative containers rather than clear grouping. I also ask:",
        },
        {
          type: "list",
          items: [
            "Does each heading clearly introduce the content below it?",
            "Are labels visibly connected to the fields they describe?",
            "Are related actions grouped?",
            "Is a destructive action distinct from routine actions?",
            "Does the layout still make sense with longer content?",
            "Can someone scan the screen without reading every word?",
          ],
        },
        {
          type: "p",
          text: "Whitespace is a structural signal rather than a cosmetic gap. Use it after you have decided what belongs together: if the screen is unclear, fix the product structure first, then let spacing make that structure easier to read.",
        },
      ],
    },
  ],
};
