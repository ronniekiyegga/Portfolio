import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A product team starts noticing inconsistency. Buttons look slightly different across screens; forms handle errors differently. Spacing values vary; one dialog traps focus correctly while another does not. Teams recreate the same patterns with small variations because the existing components do not quite fit their needs. The obvious response is:",
    "“We need a design system.”",
    "That can be the right conclusion; the problem is that “design system” can become shorthand for a large component library, a Figma catalogue, many tokens, extensive documentation, contribution processes, and debates about whether every product pattern should become a shared primitive. At that point, the system intended to accelerate delivery can become the slowest part of it. A design system should remove repeated decisions; if it creates more decisions than it removes, it is not yet serving the product.",
  ],
  sections: [
    {
      heading: "The obvious solution: build components for every pattern",
      blocks: [
        {
          type: "p",
          text: "The appeal is clear; if the product has cards, tables, filters, settings panels, application views, onboarding flows, data summaries, empty states, badges, and modals, creating reusable versions of all of them appears to prevent future duplication. The first version often looks efficient:",
        },
        {
          type: "code",
          language: "text",
          code: `Card
CardHeader
CardBody
CardFooter
CardActionArea
CardMeta
CardVariant
CardLayout`,
        },
        {
          type: "p",
          text: "Then a new screen needs something slightly different; a prop is added; then another. Then the component supports several layout modes, action placements, density settings, border treatments, and content slots. Eventually, the “reusable” component requires more time to understand than a focused piece of product UI would have taken to build. The component library has become a place where unresolved product variation is stored.",
        },
      ],
    },
    {
      heading: "The hidden problem: abstraction arrived before repetition",
      blocks: [
        {
          type: "p",
          text: "A shared component is most useful when the team understands the thing it is sharing. That generally requires more than one example. If two forms need the same label, validation, error, help text, focus treatment, disabled behaviour, and accessibility semantics, a shared `Field` primitive can remove real repeated work. If two screens happen to put text inside a rounded rectangle, that does not automatically mean they need the same `Card` abstraction. The better question is: Which decisions are genuinely repeated, stable, and expensive to get wrong? Strong candidates often include:",
        },
        {
          type: "code",
          language: "text",
          code: `Buttons
Form fields
Validation states
Focus treatment
Dialogs
Menus
Toasts
Status badges
Tabs
Tables
Empty states
Loading and error patterns
Spacing and typography tokens`,
        },
        {
          type: "p",
          text: "These are areas where inconsistency creates user confusion, accessibility failures, or repeated engineering effort. Product-specific compositions often should remain product-specific:",
        },
        {
          type: "code",
          language: "text",
          code: `Job-search pipeline
Interview timeline
Subscription status panel
Candidate activity feed
Application review workflow`,
        },
        {
          type: "p",
          text: "The first group is infrastructure for interaction; the second group is where the product keeps learning.",
        },
      ],
    },
    {
      heading: "The second obvious solution: make every component flexible",
      blocks: [
        {
          type: "p",
          text: "Once a library exists, teams often try to prevent future duplication by making each component highly configurable. That can lead to APIs like:",
        },
        {
          type: "code",
          language: "tsx",
          code: `<Card
  variant="outlined"
  density="compact"
  headerAlignment="between"
  footerPosition="sticky"
  actionPlacement="top-right"
  responsiveMode="stack"
  elevation="medium"
  withDivider
/>`,
        },
        {
          type: "p",
          text: "A configurable component can be useful; too much configurability moves design complexity into props. The user of the component now has to understand:",
        },
        {
          type: "list",
          items: [
            "Which combinations are valid",
            "Which variants are visually coherent",
            "Which behaviours remain accessible",
            "Which choices are approved",
            "Whether a new requirement belongs in the component or outside it",
          ],
        },
        {
          type: "p",
          text: "The library has not removed decisions, and it has made them indirect. I prefer smaller primitives with clearer responsibilities, then composition at the product layer.",
        },
        {
          type: "code",
          language: "tsx",
          code: `<Panel>
  <Stack gap="space-4">
    <ApplicationStatus />
    <NextAction />
    <TaskList />
  </Stack>
</Panel>`,
        },
        {
          type: "p",
          text: "This is often easier to evolve than a “universal dashboard card” that tries to anticipate every product screen.",
        },
      ],
    },
    {
      heading: "Accessibility is a strong reason to share primitives",
      blocks: [
        {
          type: "p",
          text: "Some interaction problems are too expensive and risky to rebuild repeatedly. A dialog needs more than visual styling, and it needs focus management, accessible naming, keyboard behaviour, escape handling, focus restoration, and a predictable relationship to the underlying page. The same is true for menus, selects, comboboxes, validation messages, toast notifications, and interactive tables. These are strong design-system candidates because a well-tested primitive prevents repeated accessibility regressions.",
        },
        {
          type: "p",
          text: "The system does not make the product automatically accessible, and it cannot decide whether a label is clear or whether a workflow is understandable. It can make fundamental interaction behaviour reliable enough that teams do not need to rediscover it on every feature.",
        },
      ],
    },
    {
      heading: "Documentation should answer real delivery questions",
      blocks: [
        {
          type: "p",
          text: "A component library can also become slow because its documentation is detached from actual work. The useful documentation answers questions people face while building:",
        },
        {
          type: "list",
          items: [
            "When should I use a dialog rather than navigate to a page?",
            "Which button treatment is appropriate for destructive action?",
            "How should a field show asynchronous validation?",
            "What should happen when a table has no results?",
            "How does this component behave on keyboard navigation?",
            "Which loading, empty, error, and success states are required?",
          ],
        },
        {
          type: "p",
          text: "A catalogue that only shows every prop may be complete but still not help someone make a good product decision. The most useful documentation sits close to the decisions that otherwise get repeated inconsistently.",
        },
      ],
    },
    {
      heading: "Measure whether the system is helping",
      blocks: [
        {
          type: "p",
          text: "A design system should be evaluated by outcomes:",
        },
        {
          type: "list",
          items: [
            "Do common screens take less time to build?",
            "Are engineers making fewer repeated styling decisions?",
            "Do accessibility regressions decrease?",
            "Can cross-product changes be made safely?",
            "Are design reviews focused more on workflow and hierarchy?",
            "Are components easier to use than recreating them?",
            "Does the system make the correct default easier than an incorrect one?",
          ],
        },
        {
          type: "p",
          text: "If the answers are no, adding more components is unlikely to fix the issue. The system may need to become smaller, more opinionated, better documented, or closer to the real work teams are doing.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "A component library is not automatically a design system; a useful design system is a set of shared, tested decisions that removes recurring work and protects important interaction behaviour. Start with the places where inconsistency is costly; abstract only after repetition teaches you what is stable. Keep product-specific workflows close to the product; make the good path easier than the custom path. The goal is not to create a library that can render every possible interface.",
        },
        {
          type: "p",
          text: "The goal is to help teams spend less time rebuilding solved problems and more time solving the user’s actual problem.",
        },
      ],
    },
  ],
};
