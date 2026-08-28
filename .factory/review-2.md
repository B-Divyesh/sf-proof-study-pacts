# Adversarial first-read review 2

**Product:** Proof Pact

**Live URL:** https://proof-study-pacts.sociobot.in

**Reviewed:** 2026-08-28

**Live and source build:** `5d6343eb462b6bd2cb89548401e148150a4014df`

## Verdict: FAIL

There are seven findings: three blocking, three major, and one minor. Six are
new and `F-1-4` is reopened. The cold first screen is clear, the initial demo
is useful, every declared claim command passes locally, and the visual system
is distinct. The live backend nevertheless loses a newly created demo between
requests. A reload failed, and an export failed with `404`. The demo's error
recovery is also unsafe, and the earlier touch-target fix omitted policy-page
email links. PASS requires zero findings and no partly tested claim.

## 1. Cold first read

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900. Nothing was
scrolled before recording these answers.

- What it does: it gives two Lean learners a weekly proof exercise, records
  their separate attempts and proof states, and exports one Markdown note.
- Who it is for: independent Lean learners working with a partner.
- What to click first: **Try it with sample data**.

The exact first-screen copy was:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and clear explanations.

> Try it with sample data

> A ready pact opens in one click.

The action and all three facts were above the fold at both sizes. The 390 px
page had no horizontal overflow. Neither context logged a console or page
error. This gate passes, subject to the copy finding `F-2-6`.

## 2. Copy audit

Counts treat hyphenated terms, URLs, versions, and file paths as one word.
Punctuation-only marks are excluded. Repeated header/footer copy is listed
once. The tables include headings, labels, actions, metadata, and conditional
landing copy so the heading and button rules are explicit.

### Landing page

| Words | Type | Exact text | Flag |
| ---: | --- | --- | --- |
| 7 | title / social title | Proof Pact — Work through Lean proofs together | — |
| 16 | meta / social description | Make a weekly Lean proof pact, compare attempts, record proof states, and export one Markdown note. | — |
| 4 | skip link | Skip to main content | — |
| 2 | wordmark | Proof Pact | — |
| 1 | nav link | Demo | — |
| 3 | nav link | Make a pact | — |
| 1 | nav link | Privacy | — |
| 3 | section label | Weekly Lean routine | — |
| 7 | h1 | Work one Lean proof with a partner | — |
| 16 | sentence | For independent Lean learners who need a weekly routine for attempts, proof states, and clear explanations. | `F-2-6` |
| 5 | action | Try it with sample data | — |
| 7 | sentence | A ready pact opens in one click. | —; exercised by `free-access` |
| 3 | fact | Free to use | —; `free-access` |
| 4 | fact | Partner-visible notes need consent | —; `paired-roles` |
| 7 | fact | Records work; run Lean to check it | —; `records-without-checking` |
| 9 | image alt | Two proof-work instruments connected to one shared theorem dial. | — |
| 7 | caption | Two attempts become one shared Markdown note. | —; `markdown-export` |
| 3 | section label | Create a pact | — |
| 4 | h2 | Make this week’s pact | — |
| 4 | sentence | Choose one public exercise. | — |
| 4 | sentence | One person is Prover. | — |
| 4 | sentence | The other is Explainer. | — |
| 2 | label | Your name | — |
| 2 | label | Partner name | — |
| 3 | label | Public Lean exercise | — |
| 5 | option | Natural Number Game — Add zero | — |
| 5 | option | Theorem Proving in Lean — Rewriting | — |
| 6 | option | Mathematics in Lean — Sets and Functions | — |
| 2 | label | Exercise link | — |
| 3 | label | Theorem to attempt | — |
| 2 | label | Week of | — |
| 14 | consent | I agree that my partner can read the notes I add to this pact. | —; `paired-roles` |
| 4 | action | Create pact and invite | — |
| 7 | sentence | This browser saves your private access link. | —; `real-access-link-storage` |
| 2 | section label | Three steps | — |
| 5 | h2 | How the pair routine works | — |
| 4 | h3 | Commit to one theorem | — |
| 10 | sentence | Pick a public Lean exercise and send the invite link. | — |
| 3 | h3 | Bring separate attempts | — |
| 4 | sentence | The Prover records code. | — |
| 6 | sentence | The Explainer names each reasoning step. | — |
| 4 | h3 | Export the shared note | — |
| 9 | sentence | Keep the proof states, attempts, and explanations in Markdown. | —; `markdown-export` |
| 6 | section label | What Proof Pact does not do | — |
| 6 | h2 | A routine, not a proof judge | —; the boundary is explained immediately below |
| 5 | sentence | Proof Pact records your work. | —; `records-without-checking` |
| 5 | sentence | Run Lean to check it. | —; `records-without-checking` |
| 7 | sentence | Partners decide whether an explanation makes sense. | —; same checking boundary |
| 3 | conditional label | Your recent work | — |
| 5 | conditional h2 | Return to a saved pact | — |
| 3 | conditional item label | Week of [date] | — |
| 6 | footer sentence | Weekly Lean proof work for pairs. | — |
| 1 | footer link | Terms | — |
| 6 | footer link | Built by Param Factory (external site) | — |
| 5 | footer note | Version 1.0 · Original generated illustration | —; provenance is in `.factory/design.md` |

### README

| Words | Type | Exact text | Flag |
| ---: | --- | --- | --- |
| 2 | h1 | Proof Pact | — |
| 8 | sentence | Work through one Lean proof with a partner. | — |
| 14 | sentence | Proof Pact is for independent Lean 4 learners who want a small weekly routine. | — |
| 12 | sentence | Each pair chooses a public exercise and gets Prover and Explainer roles. | —; `paired-roles` |
| 9 | sentence | They record separate attempts and export one Markdown note. | —; `markdown-export` |
| 5 | sentence | Proof Pact records study work. | —; `records-without-checking` |
| 5 | sentence | Run Lean to check it. | —; `records-without-checking` |
| 5 | sentence | Open the demo at proof-study-pacts.sociobot.in/demo. | — |
| 11 | sentence | The demo has two learners, two attempts, and saved proof states. | —; demo/export tests |
| 6 | sentence | Demo workspaces expire within 24 hours. | —; `demo-expiry` |
| 3 | h2 | How it works | — |
| 11 | sentence | One learner chooses a public Lean exercise and names a partner. | —; `paired-roles` |
| 11 | sentence | The partner opens the invite and agrees to share pact notes. | —; `paired-roles` |
| 11 | sentence | Each learner opens a private access link and records an attempt. | `F-2-4` |
| 13 | sentence | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | `F-2-3` |
| 8 | sentence | Only a private access link opens pact notes. | —; `private-notes` |
| 9 | sentence | The app loads no third-party analytics, fonts, or scripts. | —; `same-origin-privacy` |
| 4 | sentence | See Privacy and Terms. | — |
| 2 | h2 | Run locally | — |
| 5 | sentence | Install Node.js, npm, and Rust. | — |
| 2 | instruction | Then run: | — |
| 2 | sentence | Open http://localhost:8080. | — |
| 7 | sentence | For frontend-only work, run npm run dev. | — |
| 1 | h2 | Test | — |
| 6 | sentence | The claim contract is in .factory/claims.json. | — |
| 1 | h2 | Container | — |
| 1 | h2 | Deploy | — |
| 6 | sentence | The factory deploys the root Dockerfile. | —; deployment instruction |
| 6 | sentence | Mount /data when pacts must persist. | —; deployment instruction |
| 2 | h2 | Project notes | — |
| 9 | bullet | .factory/design.md records the product-specific visual system and artwork provenance. | —; inspectable pointer |
| 7 | bullet | .factory/demo.md documents demo isolation and reset behavior. | —; inspectable pointer |
| 6 | bullet | .factory/copy-audit.md records the landing-page language check. | —; inspectable pointer |
| 10 | sentence | The project is available under the MIT License in LICENSE. | —; inspectable pointer |

No sentence exceeds 22 words. No banned plain-words term appears. Both landing
action buttons use result-naming verbs, and terminology is consistent: pact,
partner, Prover, Explainer, attempt, proof state, Markdown note, demo, and
private access link. The only copy flag is the subjective adjective in
`F-2-6`.

## 3. Demo and sandbox

The initial path is strong but the live session is not reliable.

From the mobile landing page, one click on **Try it with sample data** opened
`/demo`. Its first completed screen already showed the Natural Number Game
`add_zero` theorem, Mira as Prover, Theo as Explainer, two realistic attempts,
and two proof-state snapshots. The persistent banner said “Demo — sample data,
nothing is saved” and exposed **Reset demo** and **Start for real**.

Reset changed the ID from `demo-rulxummf` to `demo-c1ud157h` and restored the
two seeded attempts. Start for real removed `demo:pact`, removed the banner,
and opened `/#make`. Pre-seeded local values `pact:real-sentinel:token` and
`unrelated` remained unchanged throughout. Demo credentials used only the
`demo:pact` session-storage key; route-scroll state was separate.

The complete live request log for loading a fresh demo, saving a third attempt,
and requesting an export contained seven requests. Every URL was same-origin;
no analytics, font, script, AI, Azure, or other provider request occurred.

The blocker appears on the next request. A newly created live demo returned
the complete sample in the creation response, but a reload produced:

> The sample pact did not load

> This pact was not found. Ask your partner for a fresh link.

Six independent API probes reproduced the split: every `POST /api/demo`
returned 200, every immediately following authenticated
`GET /api/pacts/<new-id>` returned 404, and a following export request could
return 200 from the instance that created the row. In browser flows, export
also returned 404 and the visible download did not start. This is consistent
with multiple live instances using separate SQLite files. See `F-2-1` and
`F-2-2`.

## 4. Claim contract

A no-local-worktree clone was made at
`/tmp/proof-pact-review-2-clean.YCirwY` from the reviewed commit. After
`npm ci`, every exact command in `.factory/claims.json` was run separately.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS |
| `markdown-export` | `npm test -- --grep @claim:markdown-export` | PASS |
| `same-origin-privacy` | `npm test -- --grep @claim:same-origin-privacy` | PASS |
| `demo-expiry` | `npm test -- --grep @claim:demo-expiry` | PASS |
| `private-notes` | `npm test -- --grep @claim:private-notes` | PASS |
| `paired-roles` | `npm test -- --grep @claim:paired-roles` | PASS |
| `real-access-link-storage` | `npm test -- --grep @claim:real-access-link-storage` | PASS |
| `records-without-checking` | `npm test -- --grep @claim:records-without-checking` | PASS |

Each claim tag occurs exactly once in the test source. The full clean-clone
`npm test` also passed: two Rust tests and 20 Playwright tests. The build wrote
`frontend/dist/`; initial JavaScript is 26.89 kB raw / 8.77 kB gzip.

Local test evidence is at
`/tmp/proof-pact-review-2-clean.YCirwY/playwright-report/index.html`. Live
evidence is at `/tmp/proof-pact-review-2-mobile-cold.png`,
`/tmp/proof-pact-review-2-desktop-cold.png`,
`/tmp/proof-pact-review-2-demo-initial.png`,
`/tmp/proof-pact-review-2-demo-reload.png`, and
`/tmp/proof-pact-review-2-live-audit.json`. Multi-request and live-save logs
are `/tmp/proof-pact-review-2-replica-check.json` and
`/tmp/proof-pact-review-2-deep-live-3.jsonl`.

Passing against one local server does not prove the deployed multi-instance
behavior. The live session failure contradicts `demo-sandbox` and can break
`markdown-export`; see `F-2-1`. The export test also omits one field named in
its claim; see `F-2-3`. Two additional public privacy/collaboration statements
have no adequate claim entry; see `F-2-4` and `F-2-5`.

## 5. Earlier finding audit

Every item in `.factory/review-1.md`, `.factory/polish-1.md`, and the prior
handoff was checked against the deployed SHA and source. “Fixed” was not
accepted without observable or source evidence.

| Earlier ID | Round-2 result | Evidence |
| --- | --- | --- |
| `F-1-1` | FIXED | Live caption says “Two attempts become one shared Markdown note”; exporter emits one Markdown document. |
| `F-1-2` | FIXED | Back navigation focuses and announces the landing h1; scroll 1400 restored to 1400 within one second at mobile and desktop. |
| `F-1-3` | FIXED | Unknown live route returned HTTP 404; explicit routes returned 200. |
| `F-1-4` | **REOPENED / BLOCKING** | Header, footer, and exercise links were enlarged, but Privacy and Terms email links remain 17 px high. |
| `F-1-5` | FIXED | Copy, `real-access-link-storage`, and its namespaced-storage test are present. |
| `F-1-6` | FIXED | Boundary copy is consolidated; deliberately invalid Lean is recorded without a correctness result. |
| `F-1-7` | FIXED | The earlier unsupported runtime/version assertions were removed from README. |
| `F-1-8` | FIXED | Demo, Privacy, Terms, and 404 update title, description, canonical, OG, and Twitter metadata. |
| `F-1-9` | FIXED | The 23-word README sentence was split into 12- and 9-word sentences. |
| `F-1-10` | FIXED | “Pair protocol 01” is now “Weekly Lean routine.” |
| `F-1-11` | FIXED | “Set the weekly dial” is now “Create a pact.” |
| `F-1-12` | FIXED | The form names Prover and Explainer before input. |
| `F-1-13` | FIXED | “Three readings” is now “Three steps.” |
| `F-1-14` | FIXED | The section label now says “What Proof Pact does not do.” |
| `F-1-15` | FIXED | Demo terminology is consistent; `?demo=1` enters `/demo`. |
| `F-1-16` | FIXED | “Private access link” is used consistently. |
| `F-1-17` | FIXED | Metadata says “Markdown note,” not “clear session note.” |
| `F-1-18` | FIXED | Deployed source includes a prefilled next-week action and local recent-pact list; the end-to-end clean-clone test passes. |

## 6. Findings

### Blocking

#### F-2-1 — Live demo workspaces disappear between requests

**Location/quote:** live `/demo`; banner “Demo — sample data, nothing is
saved,” output promise “The Markdown note includes the theorem, both roles,
every attempt, and each proof state,” and **Export Markdown note**. Source uses
a local SQLite path in `src/main.rs:122-139`; the Docker image declares local
`/data` in `Dockerfile:22-27`.

**Evidence:** in six clean live probes, a newly created demo returned 200, but
the immediately following authenticated read of that ID returned 404 every
time. A browser reload changed a complete Mira/Theo demo into “The sample pact
did not load.” In two browser flows, export returned 404 and no download
started. Alternating requests could still reach the instance holding the row.

**Why this fails:** a first-time visitor can see the sample, add work, then
lose access on reload or export. The core pair workflow and the declared demo
sandbox are not end-to-end reliable on the actual deployment.

**Concrete fix:** use one shared production datastore for every replica (for
example PostgreSQL), or constrain the service to one persistent replica until
shared storage exists. Do not depend on request affinity for correctness. Add
a production-like test that creates a demo through one connection, then reads,
saves, reloads, and exports it through fresh connections. Run that test against
the deployed URL as a release gate.

#### F-2-2 — A missing or expired demo ID has no reliable reset path

**Location/quote:** `frontend/src/main.ts:179-195` catches a failed saved-demo
read and calls the generic error page. The live error says “This pact was not
found. Ask your partner for a fresh link.” The action says **Try the sample
again**.

**Why this fails:** the generic error page drops the required demo banner and
does not remove `sessionStorage['demo:pact']`. The action navigates back to
`/demo`, where the same stale ID is read again. This is guaranteed after the
advertised 24-hour expiry and was exposed immediately by `F-2-1`. Asking for a
partner link is also wrong for sample data.

**Concrete fix:** on demo read responses 404 or 410, remove `demo:pact` and
provision a fresh demo automatically, or keep the demo banner and make
**Reset demo** create a new workspace. Add a test that preloads a missing and
an expired demo ID, follows the recovery action once, and sees the seeded pact
with a new ID.

#### F-1-4 — REOPENED: policy email links remain below 44 px

**Location/evidence:** live 390 px `/privacy` link
`privacy@sociobot.in` and `/terms` link `support@sociobot.in`. Each measured
133.4 × 17 px. `frontend/src/styles.css:53` enlarges header, footer, workspace,
and recent-pact links, but not `.policy-page a`. The mobile regression test
checks only one footer link and never visits either policy email link.

**Why this fails:** these are the only removal and support actions on their
pages. They miss the attached 44 × 44 px touch-target baseline. The previous
finding explicitly required policy links, so the repair was partial.

**Concrete fix:** give `.policy-page a` an inline-flex hit area at least 44 px
high without breaking paragraph flow. Extend the 390 px bounding-box test to
every visible interactive target on `/`, `/demo`, `/privacy`, `/terms`, and
the 404 route.

### Major

#### F-2-3 — The Markdown claim test does not test explanations

**Location/quote:** `.factory/claims.json:18` promises “attempts,
explanations, and proof states as Markdown.” `tests/claims.spec.ts:32-45`
asserts the title, two author/role headings, “Proof-state snapshots,” and one
snapshot label. It never asserts either proof body or explanation.

**Why this fails:** the command passes even if every explanation—the part the
product distinguishes from a proof answer—is omitted from the export. That
leaves part of a listed claim untested.

**Concrete fix:** assert both sample proof bodies, both exact explanations,
the theorem, both roles, and every seeded proof state. Also assert exactly one
attempt section per sample attempt.

#### F-2-4 — Partner-visible saved notes are an unlisted claim

**Location/quotes:** workspace: “Both partners can read saved notes.” Privacy:
“Anyone with that link can read and change the pact.” README: “Each learner
opens a private access link and records an attempt.”

**Why this fails:** `private-notes` only sends a wrong key and expects 403.
`paired-roles` stops after role assignment. No declared claim proves that one
partner's saved attempt becomes visible to the other partner or that changes
are attributed to the correct member. This is the product's collaboration
promise and is especially material given `F-2-1`.

**Concrete fix:** add a `partner-note-sharing` claim. In two clean browser
contexts, let both partners consent, have one save a uniquely identifiable
attempt, reload the other partner's private link, and assert the exact attempt,
explanation, proof state, and author. Run the same flow in a multi-instance
environment.

#### F-2-5 — The privacy data inventory is unlisted

**Location/quote:** live `/privacy`: “Proof Pact stores names, exercise
details, proof attempts, explanations, proof states, consent, and session
dates. It does not ask for email addresses.”

**Why this fails:** this is a privacy statement a learner may use to decide
whether to enter work. No claim entry or tagged test verifies the stored-field
inventory or the absence of email collection.

**Concrete fix:** add a `stored-data-inventory` claim and integration test that
creates and reads a pact, inspects the persisted schema/record, and asserts
that only the disclosed fields are stored and no email field is accepted.
Keep the sentence only while that test passes.

### Minor

#### F-2-6 — “Clear explanations” is subjective copy

**Location/quote:** landing hero: “For independent Lean learners who need a
weekly routine for attempts, proof states, and clear explanations.”

**Why this fails:** the product records explanations but explicitly leaves
their quality to partners. “Clear” is an untestable adjective in the first
screen.

**Concrete fix:** “For independent Lean learners who need a weekly routine for
attempts, proof states, and explanations in their own words.”

## 7. Structure, accessibility, and links

| Check | Result |
| --- | --- |
| Route title pattern and ≤60 characters | PASS on `/`, `/demo`, `/privacy`, `/terms`, and missing route |
| One main h1 and ordered headings | PASS |
| `lang`, header/nav/main/footer, skip link | PASS |
| Description, canonical, OG/Twitter metadata | PASS and route-specific |
| SVG favicon, 180 px apple icon, 1200 × 630 social image | PASS |
| Designed 404 and HTTP status | PASS; unknown route returned 404 |
| Deep links | PASS structurally; demo data continuity FAILS under `F-2-1` |
| Back focus, announcement, scroll | PASS after scroll animation settles |
| Link crawl | PASS: all HTTP links returned 200; mail links were recognized explicitly |
| Header/footer consistency with Privacy and Terms | PASS |
| 390 px horizontal fit | PASS |
| 44 px touch targets | FAIL — reopened `F-1-4` |
| Axe serious/critical scan | PASS: zero on all five checked routes |
| Reduced motion | PASS in source |
| Console/page errors on normal route loads | PASS |
| Visual identity | PASS: asymmetric mid-century proof console, authored marks, original art, no generic SaaS card/gradient hero |

The worker `verify-url.sh` also passed: HTTP 200, title, `lang`, one h1, main
landmark, image alt coverage, labelled buttons, and no console errors. The
landing links, all standard routes, `/404`, `robots.txt`, `sitemap.xml`, the
Natural Number Game exercise, and Sociobot returned 200.

## 8. Missed leverage

No separate missed-leverage finding is warranted. The product already has the
brief's useful export, partner sync, and next-week repetition path. An AI step
would weaken the deliberate independent-proof and human-explanation job, so it
should not be added. The backend sync that already exists must first be made
reliable across replicas under `F-2-1`.

## What would make this perfect

Use shared production storage and prove create → reload → partner save → other
partner read → export across fresh connections. Make stale or expired demo
sessions reset in one action while keeping the demo banner. Enlarge every
policy-page action to 44 px. Complete the export assertions, add the missing
collaboration and privacy claims, and remove “clear.” Then rerun every claim
command and this entire live checklist from fresh contexts. There is nothing
else to add; the remaining work is to make the product's existing promise
reliable and fully proved.
