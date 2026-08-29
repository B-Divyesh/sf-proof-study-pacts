# Copy audit

Audited 2026-08-29 during polish round 6. Counts treat hyphenated terms as one
word. No sentence is over 22 words. No banned word appears in visitor-facing
landing or README copy.

| Words | Sentence |
| ---: | --- |
| 7 | Work one Lean proof with a partner. |
| 19 | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. |
| 7 | A ready pact opens in one click. |
| 3 | Free to use. |
| 4 | Partner-visible notes need consent. |
| 7 | Records work; run Lean to check it. |
| 9 | Two proof-work instruments connected to one shared theorem dial. |
| 7 | Two attempts become one shared Markdown note. |
| 4 | Make this week’s pact. |
| 4 | Choose one public exercise. |
| 4 | One person is Prover. |
| 4 | The other is Explainer. |
| 14 | I agree that my partner can read the notes I add to this pact. |
| 7 | This browser saves your private access link. |
| 5 | How the pair routine works. |
| 4 | Commit to one theorem. |
| 10 | Pick a public Lean exercise and send the invite link. |
| 3 | Bring separate attempts. |
| 4 | The Prover records code. |
| 6 | The Explainer names each reasoning step. |
| 4 | Export the shared note. |
| 10 | Keep the proof states, attempts, and explanations in Markdown. |
| 6 | A routine, not a proof judge. |
| 5 | Proof Pact records your work. |
| 5 | Run Lean to check it. |
| 7 | Partners decide whether an explanation makes sense. |
| 3 | You are offline. |
| 10 | Saved pages remain visible, but pact changes need a connection. |
| 5 | Return to a saved pact. |
| 6 | Weekly Lean proof work for pairs. |

## README first read

| Words | Type | Exact text | Result |
| ---: | --- | --- | --- |
| 8 | h1 | Work through one Lean proof with a partner | Names the repository's job. |
| 13 | sentence | Proof Pact helps two independent Lean 4 learners keep a small weekly routine. | Names the product and audience. |
| 12 | sentence | Each pair chooses a public exercise and gets Prover and Explainer roles. | Covered by `paired-roles`. |
| 9 | sentence | They record separate attempts and export one Markdown note. | Covered by `markdown-export`. |
| 5 | sentence | Proof Pact records study work. | Covered by `records-without-checking`. |
| 5 | sentence | Run Lean to check it. | Covered by `records-without-checking`. |
| 5 | sentence | Open the demo at proof-study-pacts.sociobot.in/demo. | Direct action. |
| 11 | sentence | The demo has two learners, two attempts, and saved proof states. | Covered by `demo-sandbox`. |
| 6 | sentence | Demo workspaces expire within 24 hours. | Covered by `demo-expiry`. |
| 11 | sentence | One learner chooses a public Lean exercise and names a partner. | Describes the first step. |
| 11 | sentence | The partner opens the invite and agrees to share pact notes. | Covered by `paired-roles`. |
| 11 | sentence | Each learner opens a private access link and records an attempt. | Covered by `private-notes` and `partner-note-sharing`. |
| 13 | sentence | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | Covered by `markdown-export`. |
| 10 | sentence | Both partners can read each saved note and its author. | Covered by `partner-note-sharing`. |
| 8 | sentence | Only a private access link opens pact notes. | Covered by `private-notes`. |
| 9 | sentence | The app loads no third-party analytics, fonts, or scripts. | Covered by `same-origin-privacy`. |
| 4 | sentence | See Privacy and Terms. | Direct links. |
| 5 | sentence | Install Node.js, npm, and Rust. | Setup instruction. |
| 2 | sentence | Then run: | Introduces commands. |
| 2 | sentence | Open http://localhost:8080. | Local action. |
| 7 | sentence | For frontend-only work, run npm run dev. | Development instruction. |
| 6 | sentence | The claim contract is in .factory/claims.json. | Inspectable pointer. |
| 6 | sentence | The factory deploys the root Dockerfile. | Deployment instruction. |
| 6 | sentence | Mount /data when pacts must persist. | Deployment instruction. |
| 9 | sentence | .factory/design.md records the product-specific visual system and artwork provenance. | Inspectable pointer. |
| 7 | sentence | .factory/demo.md documents demo isolation and reset behavior. | Inspectable pointer. |
| 8 | sentence | .factory/copy-audit.md records the landing-page language check. | Inspectable pointer. |
| 10 | sentence | The project is available under the MIT License in LICENSE. | Inspectable legal pointer. |

The README begins with the job rather than the unexplained product name. No
README sentence is over 22 words or uses a banned term.

## First-screen read-aloud

“Work one Lean proof with a partner. For independent Lean learners who need a
weekly routine for attempts, proof states, and explanations in their own words.
Try it with sample data; a ready pact opens in one click.”

This states the job, audience, change, and first action in one breath.

## Terminology

| Concept | One term |
| --- | --- |
| two-person weekly commitment | pact |
| person writing the Lean code | Prover |
| person describing the reasoning | Explainer |
| recorded Lean goal at one moment | proof state |
| one learner’s submitted work | attempt |
| downloadable record | Markdown note |
| isolated seeded workspace | demo |
| other learner | partner |
| saved credential | private access link |

## Error pages

| Words | Type | Exact text |
| ---: | --- | --- |
| 3 | 404 h1 | Page not found. |
| 10 | 404 recovery | The page may have moved, or the pact link is incomplete. |
| 4 | 404 action | Return to Proof Pact. |
| 5 | pact error h1 | Your pact did not load. |
| 5 | invitation error h1 | This invitation did not load. |
| 11 | missing-pact reason | This pact was not found. Ask your partner for a fresh link. |
| 2 | error action | Return home. |

Error pages have no decorative mood labels. Each heading names the problem,
and each page gives a specific reason and recovery action.

Catalog description (102 characters): “Work through one Lean proof with a
partner, record both attempts, and export the shared Markdown note.”
