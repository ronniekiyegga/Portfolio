# Workflow-state modelling (draft source material)

Not published. Moved out of `what-10000-rows-actually-means` during the
structural pass because it answers a different question from that article.
Kept verbatim as source material for a possible future article.

---

A workflow-heavy product is a different shape. Onboarding, booking, checkout,
case management, approvals and multi-step admin flows often do not care about
10,000 rows.

The harder problems are the current step, which transitions are valid,
persisting progress, recovering after a refresh or a dropped request,
validation, duplicate submits, keeping people out of impossible states,
permissions, and keeping client state honest against the server.

A bag of booleans is how those products get into trouble:

```ts
{
  submitted: true,
  approved: false,
  completed: true
}
```

Depending on the workflow, that combination should not exist. Making the status
explicit is usually enough:

```ts
type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "completed";
```

That is not an argument for a state machine library on every form. It is an
argument for not encoding a workflow as independent flags.

A product can be both. A case-management system might have a data-heavy
dashboard of thousands of cases, while each case follows a workflow with strict
states, permissions and transitions.

In that situation I do not start with which React optimisation to use. I start
with what the screen is doing, and where it is constrained.
