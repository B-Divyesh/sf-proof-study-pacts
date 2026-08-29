# Adversarial first-read review 5

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-29  
**Source reviewed:** `0603252c504ab1590aed45a121ba19abfd99f0d7`

## Verdict: FAIL

There is one blocking finding. The landing page is clear, every declared claim
test passes from a clean clone, and the demo is isolated. At the required 390
px viewport, however, the first completed demo viewport does not show the
product being used with its sample data. A visitor must scroll before seeing
either saved attempt or either partner role.

## 1. Cold first read

Fresh browser contexts were used at 390 × 844 and 1440 × 900. Nothing was
scrolled before recording this result.

- What it does: it gives two Lean learners one proof to work through, records
  their separate attempts and proof states, and exports the result as Markdown.
- Who it is for: independent Lean learners who have a study partner.
- What to click first: **Try it with sample data**.

The required first-screen lines are visible at both sizes:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and explanations in their own words.

> Try it with sample data

This gate passes. The 390 px viewport had no horizontal overflow, console
error, or third-party request on first load.

## 2. Copy audit

Counts treat a hyphenated term, URL, and number as one word. All landing and
README sentences are listed below. No sentence exceeds 22 words and no banned
marketing word appears. Buttons use result-naming verbs; terms are consistent.

### Landing page

| Words | Sentence |
| ---: | --- |
| 7 | Work one Lean proof with a partner. |
| 19 | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. |
| 7 | A ready pact opens in one click. |
| 3 | Free to use. |
| 4 | Partner-visible notes need consent. |
| 7 | Records work; run Lean to check it. |
| 8 | Two attempts become one shared Markdown note. |
| 4 | Make this week’s pact. |
| 5 | Choose one public exercise. |
| 4 | One person is Prover. |
| 4 | The other is Explainer. |
| 14 | I agree that my partner can read the notes I add to this pact. |
| 8 | This browser saves your private access link. |
| 6 | How the pair routine works. |
| 5 | Commit to one theorem. |
| 10 | Pick a public Lean exercise and send the invite link. |
| 3 | Bring separate attempts. |
| 4 | The Prover records code. |
| 6 | The Explainer names each reasoning step. |
| 5 | Export the shared note. |
| 10 | Keep the proof states, attempts, and explanations in Markdown. |
| 6 | A routine, not a proof judge. |
| 5 | Proof Pact records your work. |
| 6 | Run Lean to check it. |
| 8 | Partners decide whether an explanation makes sense. |
| 6 | Weekly Lean proof work for pairs. |

### README

| Words | Sentence |
| ---: | --- |
| 8 | Work through one Lean proof with a partner. |
| 14 | Proof Pact is for independent Lean 4 learners who want a small weekly routine. |
| 12 | Each pair chooses a public exercise and gets Prover and Explainer roles. |
| 9 | They record separate attempts and export one Markdown note. |
| 5 | Proof Pact records study work. |
| 5 | Run Lean to check it. |
| 5 | Open the demo at proof-study-pacts.sociobot.in/demo. |
| 11 | The demo has two learners, two attempts, and saved proof states. |
| 6 | Demo workspaces expire within 24 hours. |
| 10 | One learner chooses a public Lean exercise and names a partner. |
| 11 | The partner opens the invite and agrees to share pact notes. |
| 11 | Each learner opens a private access link and records an attempt. |
| 13 | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. |
| 10 | Both partners can read each saved note and its author. |
| 8 | Only a private access link opens pact notes. |
| 9 | The app loads no third-party analytics, fonts, or scripts. |
| 4 | See Privacy and Terms. |
| 7 | Install Node.js, npm, and Rust. |
| 2 | Then run. |
| 2 | Open http://localhost:8080. |
| 8 | For frontend-only work, run npm run dev. |
| 6 | The claim contract is in .factory/claims.json. |
| 6 | The factory deploys the root Dockerfile. |
| 9 | Mount /data when pacts must persist. |
| 9 | .factory/design.md records the product-specific visual system and artwork provenance. |
| 8 | .factory/demo.md documents demo isolation and reset behavior. |
| 8 | .factory/copy-audit.md records the landing-page language check. |
| 8 | The project is available under the MIT License in LICENSE. |

No copy finding is raised. The limit section has the literal label **What Proof
Pact does not do**, and its h2 gives a concrete boundary rather than brand lore.

## 3. Demo and sandbox

The primary landing action reached `/demo` in one click. The live demo seeded
Mira and Theo on Natural Number Game’s `add_zero` theorem, displayed the
persistent **Demo — sample data, nothing is saved** banner, and had two saved
attempts after load. **Reset demo** produced a different `demo-*` workspace and
left a `localStorage` real-data sentinel unchanged. The only observed requests
through the demo save/reset flow were same-origin.

The storage implementation matches `.factory/demo.md`: demo credentials are in
`sessionStorage` as `demo:pact`; real access links use distinct `localStorage`
keys. This does not pass the first-viewport requirement; see `F-5-1`.

## 4. Claim contract

`.factory/claims.json` contains 12 entries. In clean clone
`/tmp/proof-pact-review-5.q3MEVu`, each listed command was run separately and
passed:

| Claim id | Result |
| --- | --- |
| free-access | PASS |
| demo-sandbox | PASS |
| markdown-export | PASS |
| same-origin-privacy | PASS |
| demo-expiry | PASS |
| private-notes | PASS |
| paired-roles | PASS |
| real-access-link-storage | PASS |
| records-without-checking | PASS |
| partner-note-sharing | PASS |
| stored-data-inventory | PASS |
| offline-shell | PASS |

The clean clone’s full `npm test` passed: build, 3 Rust tests, and 28
Playwright tests. The live request audit observed only
`https://proof-study-pacts.sociobot.in`. Landing and README claim-like
sentences map to the declared capabilities above; no additional unlisted claim
was confirmed.

## 5. Earlier finding audit

Every prior review, polish record, and handoff was read. Each earlier finding
was checked again on the deployed site and in the current source/test suite.

| Earlier finding | Live and code confirmation |
| --- | --- |
| F-1-1 | Fixed: the caption says one shared Markdown note and export produces it. |
| F-1-2 | Fixed: Back restores scroll, focuses the destination h1, and announces it. |
| F-1-3 | Fixed: an unknown route renders the designed page with HTTP 404. |
| F-1-4 | Fixed: public-route controls, including policy email links, meet 44 px. |
| F-1-5 | Fixed: real access links are namespaced and claim-tested. |
| F-1-6 | Fixed: invalid Lean text is recorded without a correctness result. |
| F-1-7 | Fixed: unsupported README runtime guarantees remain absent. |
| F-1-8 | Fixed: direct routes set title, description, canonical, OG, and Twitter metadata. |
| F-1-9 | Fixed: the former 23-word README sentence remains split. |
| F-1-10 | Fixed: the hero label is now “Weekly Lean routine.” |
| F-1-11 | Fixed: the form section says “Create a pact.” |
| F-1-12 | Fixed: Prover and Explainer appear before creation. |
| F-1-13 | Fixed: the procedure label is “Three steps.” |
| F-1-14 | Fixed: the limit label literally says what Proof Pact does not do. |
| F-1-15 | Fixed: `/demo` and `?demo=1` enter the same named demo. |
| F-1-16 | Fixed: “private access link” is consistently used. |
| F-1-17 | Fixed: visible and metadata copy says “Markdown note.” |
| F-1-18 | Fixed: completing a real pact offers a prefilled next-week pact and recent history. |
| F-2-1 | Fixed: clean-suite fresh-connection create/read/save/reload/export passes. |
| F-2-2 | Fixed: stale demo 404 and 410 sessions reseed automatically. |
| F-2-3 | Fixed: export assertions cover both roles, attempts, explanations, and proof states. |
| F-2-4 | Fixed: two isolated partners read an attributed saved note after reload. |
| F-2-5 | Fixed: the disclosed storage inventory is tested and email is rejected. |
| F-2-6 | Fixed: the first screen retains “explanations in their own words.” |
| F-3-1 | Fixed: all selectable public-exercise URLs return 200 in the release test. |
| F-4-1 | Fixed: the live 404 h1 is “Page not found.” |
| F-4-2 | Fixed: pact and invitation errors use literal headings and recovery actions. |

None of these earlier findings is reopened. `F-5-1` is a separate first-screen
demo failure that earlier tests did not measure.

## 6. Structure, links, identity, and leverage

- `/`, `/demo`, `/privacy`, and `/terms` return 200; an unknown route returns
  404. Required pages have one h1, route-specific titles, descriptions,
  canonical URLs, OG/Twitter tags, favicon, and `lang="en"`.
- Header, footer, skip link, Privacy, and Terms are consistent. Internal links,
  legal mail links, the factory link, and the public exercise link resolved.
- The deployed response has a restrictive CSP and security headers; fresh
  browser contexts reported no console errors.
- The warm enamel, proof-console art, and instrument controls follow the
  recorded product-specific design rather than a generic SaaS template.
- No AI feature is implied by the brief. Export and partner sharing are present;
  proof checking is intentionally delegated to Lean.

## 7. Finding

### F-5-1 — BLOCKING: the mobile demo opens above the sample work

**Location and observed text:** live `/demo`, fresh 390 × 844 context, directly
after **Try it with sample data**. The completed viewport contains:

> Demo — sample data, nothing is saved

> Natural Number Game — Add zero

> theorem add_zero (n : ℕ) : n + 0 = n := by

> Open the public exercise

The first actual sample section starts only with the **Pair channel** label at
y=756. Neither Mira’s/ Theo’s roles nor either saved attempt is visible in the
844 px viewport; the `Mira’s attempt` card is below it.

**Why this fails:** The demo is one click, but it does not immediately prove
what the application does. On the target phone, the visitor sees a theorem
header and an external-source link, not partners comparing recorded work. This
fails the required “first screen after clicking already show the product being
used with realistic sample data” check.

**Concrete fix:** Keep the persistent demo banner, but make the first mobile
demo viewport include a real sample attempt card and the two role names. For
example, compact the workspace heading/theorem on demo only, move the role
strip and the two seeded attempt summaries directly below the h1, and defer the
full theorem/source block below them. Add a Playwright test at 390 × 844 that
asserts at least one named sample attempt and both `Mira — Prover` and
`Theo — Explainer` have bounding boxes fully inside the initial viewport after
the landing action.

## What would make this perfect

The demo’s first mobile screen would show the banner, clear session title,
both roles, and a realistic saved attempt without scrolling. The existing
isolation, reset, privacy, claim coverage, routing, and distinctive visual
system would then make the product immediately verifiable.
