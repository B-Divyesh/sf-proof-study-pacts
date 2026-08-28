# Adversarial first-read review 1

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-28  
**Live build:** `dd9453fa8cf1c85c1d596349c37301d8ef6d4acd`  
**Source reviewed:** `81fc321dc63353c60531918a6587ebdd72cc49f9`

## Verdict: FAIL

There are 18 findings: 4 blocking, 3 major, and 11 minor. The declared claim
tests pass, the one-click demo works, and the first screen is clear. The result
is still FAIL because the live product has broken route restoration, serves a
false HTTP status for missing pages, misses the 44 px touch-target baseline,
and describes an output it does not create. It also has unlisted claims and
copy/metadata defects. PASS requires zero findings and no untested claim.

## 1. Cold first read

Fresh browser contexts were used at 390 × 844 and 1440 × 900. Nothing was
scrolled before recording the answer.

- What it does, in my words: it gives two Lean learners one weekly exercise,
  records their attempts and proof states, and exports a Markdown record.
- Who it is for: independent Lean learners working with a partner.
- What to click first: **Try it with sample data**.

The decisive first-screen text was:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and clear explanations.

> Try it with sample data

> A ready pact opens in one click.

All four lines were above the fold at both sizes. The three facts were also
above the fold. Both viewports had no horizontal overflow and no console error.
This gate passes.

## 2. Copy audit

Counts exclude punctuation-only tokens, count hyphenated terms once, and count
URLs or inline code once. Code samples and populated URL/date values are not
sentences. Identical footer/nav labels are listed once. The tables include
headings, labels, actions, metadata, and fragments so the requested heading and
button checks are explicit.

### Landing page

| Words | Type | Exact text | Flag |
| ---: | --- | --- | --- |
| 7 | title | Proof Pact — Work through Lean proofs together | — |
| 17 | meta description | Make a weekly Lean proof pact, compare attempts, record proof states, and export one clear session note. | F-1-17 |
| 14 | OG/Twitter description | Make a weekly Lean proof pact, compare attempts, and export one clear session note. | F-1-17 |
| 4 | link | Skip to main content | — |
| 2 | wordmark | Proof Pact | — |
| 1 | nav link | Demo | F-1-15 |
| 3 | nav link | Make a pact | — |
| 1 | nav link | Privacy | — |
| 3 | eyebrow | Pair protocol 01 | F-1-10 |
| 7 | h1 | Work one Lean proof with a partner | — |
| 16 | sentence | For independent Lean learners who need a weekly routine for attempts, proof states, and clear explanations. | — |
| 5 | action | Try it with sample data | F-1-15 |
| 7 | sentence | A ready pact opens in one click. | —; exercised by demo tests |
| 3 | fact | Free to use | —; `free-access` |
| 4 | fact | Partner-visible notes need consent | —; `paired-roles` |
| 7 | fact | Lean checks the proof, not this app | F-1-6 |
| 9 | image alt | Two proof-work instruments connected to one shared theorem dial. | — |
| 6 | caption | Two attempts feed one shared explanation. | F-1-1 |
| 4 | eyebrow | Set the weekly dial | F-1-11 |
| 4 | h2 | Make this week’s pact | — |
| 4 | sentence | Choose one public exercise. | — |
| 6 | sentence | Your partner gets the complementary role. | F-1-12 |
| 2 | label | Your name | — |
| 2 | label | Partner name | — |
| 3 | label | Public Lean exercise | — |
| 5 | option | Natural Number Game — Add zero | — |
| 5 | option | Theorem Proving in Lean — Rewriting | — |
| 6 | option | Mathematics in Lean — Sets and Functions | — |
| 2 | label | Exercise link | — |
| 3 | label | Theorem to attempt | — |
| 2 | label | Week of | — |
| 14 | sentence | I agree that my partner can read the notes I add to this pact. | — |
| 4 | action | Create pact and invite | — |
| 8 | sentence | Your private editing link stays in this browser. | F-1-5, F-1-16 |
| 2 | eyebrow | Three readings | F-1-13 |
| 5 | h2 | How the pair routine works | — |
| 4 | h3 | Commit to one theorem | — |
| 10 | sentence | Pick a public Lean exercise and send the invite link. | — |
| 3 | h3 | Bring separate attempts | — |
| 4 | sentence | The Prover records code. | — |
| 6 | sentence | The Explainer names each reasoning step. | — |
| 4 | h3 | Export the shared note | — |
| 9 | sentence | Keep the proof states, attempts, and explanations in Markdown. | —; `markdown-export` |
| 2 | eyebrow | Instrument limits | F-1-14 |
| 6 | h2 | A routine, not a proof judge | — |
| 9 | sentence | Proof Pact does not solve, grade, or match strangers. | F-1-6 |
| 5 | sentence | Lean decides whether code checks. | F-1-6 |
| 7 | sentence | Partners decide whether an explanation makes sense. | — |
| 6 | footer | Weekly Lean proof work for pairs. | — |
| 1 | footer link | Terms | — |
| 6 | footer link | Built by Param Factory (external site) | — |
| 5 | footer | Version 1.0 · Original generated illustration | — |

### README

| Words | Type | Exact text | Flag |
| ---: | --- | --- | --- |
| 2 | h1 | Proof Pact | — |
| 8 | sentence | Work through one Lean proof with a partner. | — |
| 14 | sentence | Proof Pact is for independent Lean 4 learners who want a small weekly routine. | — |
| 23 | sentence | Each pair chooses a public exercise, gets complementary Prover and Explainer roles, records separate attempts and proof states, and exports one Markdown note. | F-1-9 |
| 5 | sentence | Lean remains the proof checker. | F-1-6 |
| 6 | sentence | Try the isolated sample at proof-study-pacts.sociobot.in/demo. | F-1-15 |
| 11 | sentence | The sample has two learners, two attempts, and saved proof states. | F-1-15; covered by demo/export tests |
| 6 | sentence | Demo workspaces expire within 24 hours. | —; `demo-expiry` |
| 3 | h2 | How it works | — |
| 11 | sentence | One learner chooses a public Lean exercise and names a partner. | —; `paired-roles` |
| 11 | sentence | The partner opens the invite and agrees to share pact notes. | —; `paired-roles` |
| 11 | sentence | Each learner opens a private member link and records an attempt. | F-1-16 |
| 13 | sentence | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | —; `markdown-export` |
| 7 | sentence | Pact notes require the private member key. | F-1-16; `private-notes` covers the access requirement |
| 9 | sentence | The app loads no third-party analytics, fonts, or scripts. | —; `same-origin-privacy` |
| 4 | sentence | See Privacy and Terms. | — |
| 2 | h2 | Run locally | — |
| 7 | sentence | Requirements: Node.js 22+, npm, and Rust 1.88+. | F-1-7 |
| 2 | sentence | Open http://localhost:8080. | — |
| 12 | sentence | The server uses /data/proof-pact.db when DATABASE_PATH is absent and /data is writable. | F-1-7 |
| 7 | sentence | For frontend-only work, run npm run dev. | — |
| 7 | sentence | API actions still need the Rust server. | F-1-7 |
| 1 | h2 | Test | — |
| 15 | sentence | This builds frontend/dist/, runs Rust unit tests, and runs Playwright 1.58.2 against the full app. | F-1-7 |
| 6 | sentence | The claim contract is in .factory/claims.json. | — |
| 1 | h2 | Container | — |
| 18 | sentence | The container runs as a non-root user and serves both the API and frontend on PORT (default 8080). | F-1-7 |
| 6 | sentence | GET /health returns the build SHA. | F-1-7 |
| 1 | h2 | Deploy | — |
| 6 | sentence | The factory builds the root Dockerfile. | F-1-7 |
| 9 | sentence | Persist /data if real pacts must survive container replacement. | F-1-7 |
| 11 | sentence | No DNS, billing, or infrastructure changes are part of this repository. | F-1-7 |
| 2 | h2 | Project notes | — |
| 9 | bullet | .factory/design.md records the product-specific visual system and artwork provenance. | —; directly inspectable pointer |
| 7 | bullet | .factory/demo.md documents demo isolation and reset behavior. | —; directly inspectable pointer |
| 6 | bullet | .factory/copy-audit.md records the landing-page language check. | —; directly inspectable pointer |
| 10 | sentence | The project is available under the MIT License in LICENSE. | —; directly inspectable legal pointer |

No visitor-facing action button lacks a result-naming verb. No banned marketing
word appears. One sentence exceeds 22 words. The terminology and metaphor flags
are detailed below.

## 3. Demo and sandbox

**PASS for entry and behavior.** From the mobile landing page, one click on
**Try it with sample data** opened `/demo`. The first completed screen showed:

- the theorem “Natural Number Game — Add zero”;
- Mira as Prover and Theo as Explainer;
- two realistic attempts and saved proof-state snapshots;
- the persistent “Demo — sample data, nothing is saved” banner;
- **Reset demo** and **Start for real**.

Saving a third attempt worked. Reset changed the workspace from
`demo-mcy7ujjx` to `demo-vnfurpzm` and restored two seeded attempts. Start for
real removed `demo:pact`, removed the banner, and opened `/#make`. A pre-seeded
`pact:real-sentinel:token` local-storage value was unchanged throughout. The
request log contained eight requests, all to
`https://proof-study-pacts.sociobot.in`; save and reset used only same-origin
API calls. The demo uses a `demo-*` pact with a 24-hour expiry and a
`demo:pact` session-storage key. No Azure/OpenAI or other provider request was
made.

## 4. Claim contract

The repository was cloned without shared worktree files into
`/tmp/proof-pact-review-clone.kNBOGi`, then installed with `npm ci`. Each exact
command from `.factory/claims.json` was run separately. Every command rebuilt
the frontend and reran the Rust tests before its tagged Playwright test.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS |
| `markdown-export` | `npm test -- --grep @claim:markdown-export` | PASS |
| `same-origin-privacy` | `npm test -- --grep @claim:same-origin-privacy` | PASS |
| `demo-expiry` | `npm test -- --grep @claim:demo-expiry` | PASS |
| `private-notes` | `npm test -- --grep @claim:private-notes` | PASS |
| `paired-roles` | `npm test -- --grep @claim:paired-roles` | PASS |

Each claim ID occurs exactly once in the test source. The full repository
`npm test` also passed: 2 Rust tests and 14 Playwright tests. Production output
was generated in `frontend/dist/`; initial JS is 24.40 KB raw / 8.16 KB gzip.
The declared suite therefore has no failing claim test. F-1-5 through F-1-7
cover statements that are not declared in the contract.

## 5. History check

There is no earlier `.factory/review-*.md` or `.factory/polish-*.md` in the
repository. I read the current handoff and `.factory/verification.md`. They
contain no earlier finding IDs to re-open. Their positive assertions were not
accepted on trust: the claim suite, live build identity, demo save/export,
same-origin request log, 390 px layout, links, headings, metadata, console,
security headers, and source implementation were rechecked. The defects below
were omitted by those earlier documents rather than marked fixed.

## 6. Findings

### Blocking

#### F-1-1 — The landing page promises an output that does not exist

**Location/quote:** landing hero caption, `frontend/src/main.ts:97`: “Two
attempts feed one shared explanation.”

**Why this fails:** the live demo has a separate explanation on Mira’s attempt
and Theo’s attempt. The data model, workspace, and Markdown export have no
shared explanation field or merge step. A first-time visitor is promised a
specific synthesis that the product never creates.

**Concrete fix:** change the caption to “Two attempts become one shared
Markdown note.” That is accurate and already covered by `markdown-export`.

#### F-1-2 — Back navigation loses focus, announcement, and scroll state

**Location/evidence:** live SPA navigation; `landing()` at
`frontend/src/main.ts:80` never calls `focusHeading()`, while `popstate` only
calls `render()` at line 356. After navigating from the landing page to
Privacy and pressing Back, `document.activeElement` was `BODY`, scroll was
reset to 0, and `#route-status` still said “Privacy for pact partners.”

**Why this fails:** keyboard and screen-reader users return to a visually new
route with stale announced context and no useful focus. The required back
button behavior is therefore broken.

**Concrete fix:** make route rendering use one lifecycle that records scroll
and focused element in history state, focuses/announces the new h1 on forward
navigation, and restores saved focus and scroll on `popstate`. Add a Playwright
test that navigates Landing → Privacy → Back and asserts all three values.

#### F-1-3 — A missing route returns HTTP 200

**Location/evidence:** `GET /review-unknown-route` on the live deployment
returned `HTTP/2 200` while rendering “This dial points nowhere.” The Rust
server uses `ServeDir.fallback(ServeFile(index.html))` at `src/main.rs:208-220`,
so the checked-in static-host `responseOverrides` file does not control this
deployment.

**Why this fails:** the page looks like a designed 404 to a person but tells
browsers, crawlers, and monitoring that the missing resource succeeded. This
is broken routing rather than a valid 404.

**Concrete fix:** serve the SPA shell with status 404 for unknown routes while
retaining 200 for `/`, `/demo`, `/privacy`, `/terms`, and valid dynamic
`/pact/:id` and `/join/:id` deep links. Change the route test to expect 404 for
an unknown URL.

#### F-1-4 — Core mobile links miss the 44 px touch-target baseline

**Location/evidence:** live 390 px layout. The home mark measured 40 × 40;
header **Demo** 39 × 22; **Make a pact** 80 × 22; **Privacy** 50 × 22; the demo
exercise link 176 × 17; footer links were 25 px high. The same undersized
header links occur on every checked route.

**Why this fails:** these are primary navigation controls on a phone and do
not meet the attached accessibility requirement of at least 44 × 44 px. Axe
reported no ruleset violations, but it does not make this product-specific
measurement pass.

**Concrete fix:** give header, footer, policy, and in-workspace text links a
minimum 44 px clickable box with padding; enlarge the home link to at least
44 × 44. Add bounding-box assertions at 390 px.

### Major

#### F-1-5 — The browser-storage promise is an unlisted privacy claim

**Location/quote:** landing form, `frontend/src/main.ts:114`: “Your private
editing link stays in this browser.”

**Why this fails:** a visitor can read “stays” as a privacy guarantee. No
`.factory/claims.json` entry tests real-mode key storage or outbound handling.
The existing `demo-sandbox` test covers demo session storage only.

**Concrete fix:** rewrite to “This browser saves your private access link.” Add
a `real-access-link-storage` claim and test that creates a real pact, verifies
the namespaced local-storage value, confirms no unrelated storage changes, and
records the allowed same-origin requests.

#### F-1-6 — Proof-checking and excluded-capability statements are unlisted claims

**Locations/quotes:** landing: “Lean checks the proof, not this app”; “Proof
Pact does not solve, grade, or match strangers”; “Lean decides whether code
checks.” README: “Lean remains the proof checker.”

**Why this fails:** these statements define a safety boundary a learner may
rely on, but no claim entry verifies it. The existing tests never submit
invalid Lean and confirm that it is merely recorded, and they do not contract
the absence of solving, grading, or stranger matching.

**Concrete fix:** consolidate the copy to “Proof Pact records your work; run
Lean to check it.” Add a `records-without-checking` claim that saves invalid
Lean, proves it is stored without a correctness result, and asserts that no
model/checker request occurs. Remove the broader “match strangers” clause or
give it a separately testable interface/API contract.

#### F-1-7 — README operational promises are outside the claim contract

**Location/quotes:** README lines 29-66 state all of the following without
claim entries: “Requirements: Node.js 22+, npm, and Rust 1.88+”; “The server
uses `/data/proof-pact.db` when `DATABASE_PATH` is absent and `/data` is
writable”; “API actions still need the Rust server”; “This builds
`frontend/dist/`, runs Rust unit tests, and runs Playwright 1.58.2 against the
full app”; “The container runs as a non-root user and serves both the API and
frontend on `PORT` (default `8080`)”; “GET `/health` returns the build SHA”;
“The factory builds the root `Dockerfile`”; “Persist `/data` if real pacts must
survive container replacement”; and “No DNS, billing, or infrastructure
changes are part of this repository.”

**Why this fails:** operators can rely on these concrete version, storage,
security, build, health, and persistence assertions. Source inspection or a
passing run today is not a repeatable claim contract.

**Concrete fix:** add tagged build/container tests for supported toolchains,
default DB selection, output path, non-root UID, `PORT`, health SHA, and volume
persistence. Rewrite external-process statements as instructions where no
sandbox test is possible, for example “Deploy with the root Dockerfile.”

### Minor

#### F-1-8 — Open Graph metadata stays on the landing page for every route

**Location/evidence:** live `/demo`, `/privacy`, `/terms`, and the 404 route all
kept `og:title` “Proof Pact — Work through Lean proofs together,” landing-page
`og:description`, and root `og:url`. `setMeta()` updates only title,
description, and canonical at `frontend/src/main.ts:54-58`.

**Why this fails:** copying a privacy, demo, or missing-page URL produces a
mislabelled landing-page card rather than route-specific metadata.

**Concrete fix:** have `setMeta()` update OG and Twitter title, description,
and URL for each route. Add direct-route metadata assertions.

#### F-1-9 — README has a 23-word sentence

**Location/quote:** README lines 6-8: “Each pair chooses a public exercise,
gets complementary Prover and Explainer roles, records separate attempts and
proof states, and exports one Markdown note.”

**Why this fails:** it exceeds the 22-word hard cap and combines selection,
role assignment, recording, and export.

**Concrete fix:** “Each pair chooses a public exercise and gets Prover and
Explainer roles. They record separate attempts and export one Markdown note.”

#### F-1-10 — “Pair protocol 01” is unexplained jargon

**Location/quote:** landing hero eyebrow, “Pair protocol 01.”

**Why this fails:** “01” implies a sequence that does not exist, and “protocol”
adds ceremony without helping a new learner understand the job.

**Concrete fix:** “Weekly Lean routine.”

#### F-1-11 — “Set the weekly dial” uses metaphor instead of the task

**Location/quote:** landing pact-form eyebrow, “Set the weekly dial.”

**Why this fails:** the visitor is about to create a pact, not operate a dial.
The visual identity can carry the instrument metaphor without making the
instruction indirect.

**Concrete fix:** “Create a pact.”

#### F-1-12 — “Complementary role” hides the two actual roles

**Location/quote:** landing pact form, “Your partner gets the complementary
role.”

**Why this fails:** a first-time visitor has not yet been told what the roles
are, so “complementary” is vague.

**Concrete fix:** “One person is Prover. The other is Explainer.”

#### F-1-13 — “Three readings” does not name the section

**Location/quote:** landing procedure eyebrow, “Three readings.”

**Why this fails:** the section contains three actions, not three readings.
The phrase does not make sense out of context.

**Concrete fix:** “Three steps.”

#### F-1-14 — “Instrument limits” obscures a useful boundary

**Location/quote:** landing limits eyebrow, “Instrument limits.”

**Why this fails:** the section explains product boundaries, not hardware.
The metaphor delays the important limitation.

**Concrete fix:** “What Proof Pact does not do.”

#### F-1-15 — The same demo is called “Demo,” “sample data,” and an “isolated sample”

**Locations/quotes:** landing nav “Demo”; landing action “Try it with sample
data”; README “Try the isolated sample” and “The sample has two learners.”

**Why this fails:** the user must infer that all three names lead to the same
sandbox. “Isolated sample” is also implementation language.

**Concrete fix:** keep **Try it with sample data** as the required action, then
call the mode “demo” elsewhere: “Open the demo…” and “The demo has…”.

#### F-1-16 — Access-link terminology changes three times

**Locations/quotes:** landing “private editing link”; README “private member
link”; README “private member key.” The privacy page uses “private access
link,” adding a fourth location to the inconsistency.

**Why this fails:** a learner cannot tell whether these are different secrets
or one credential.

**Concrete fix:** use “private access link” everywhere. Rewrite the README
claim as “Only a private access link opens pact notes.”

#### F-1-17 — “Clear session note” is subjective and changes the export term

**Location/quote:** landing meta description and static HTML: “export one clear
session note.” Visible copy and README call it a “Markdown note.”

**Why this fails:** “clear” is untestable, and “session note” introduces a
second name for the same export.

**Concrete fix:** “Make a weekly Lean proof pact, compare attempts, record
proof states, and export one Markdown note.”

#### F-1-18 — A weekly routine has no next-week action or history

**Location/evidence:** the brief describes a recurring pair protocol and
measures three weekly sessions, but a completed workspace offers only export
and completion. Starting another week means returning home and re-entering the
partner and exercise from scratch.

**Why this fails:** repetition is the obvious next job after completing the
first pact. The product supports isolated weekly pacts but not the routine it
describes.

**Concrete fix:** after completion, add **Create next week’s pact**. Prefill the
same partner, advance the week, let the pair choose a new exercise, and show a
local list of prior pact links. Keep it non-AI; AI would weaken the deliberate
human explanation goal. Markdown export and backend partner sync already cover
the other obvious leverage points.

## 7. Structure, accessibility, and links

| Check | Result |
| --- | --- |
| Route titles, ≤60 characters | PASS |
| One main h1 and ordered headings | PASS |
| `lang`, main/header/nav/footer, skip link | PASS |
| Meta description and canonical per route | PASS |
| OG/Twitter metadata per route | FAIL — F-1-8 |
| SVG favicon, 180 px apple icon, 1200 × 630 social image | PASS |
| Designed visual 404 | PASS visually; FAIL HTTP status — F-1-3 |
| Deep-link reloads | PASS |
| Back/forward scroll, focus, announcement | FAIL — F-1-2 |
| Link crawl | PASS: every discovered non-mailto link returned 200 |
| Consistent header/footer with Privacy and Terms | PASS |
| Distinct visual identity | PASS: asymmetric mid-century instrument panel, original art, no generic card/gradient hero |
| Axe on `/`, `/demo`, `/privacy`, `/terms`, unknown route | PASS: zero violations |
| 44 px touch targets | FAIL — F-1-4 |
| Reduced-motion rule | PASS in source |
| 390 px horizontal fit | PASS |
| Console/page errors on checked routes | PASS |

The link crawl included all internal header/footer routes, the demo exercise,
and Sociobot; all returned 200. `mailto:` links were recognized and not fetched.
The invalid application route is excluded from that “dead link” result and is
covered by F-1-3.

## What would make this perfect

Resolve all 18 findings, then rerun this review from a fresh context and clean
clone. Perfection here means the caption describes the real Markdown output;
history navigation restores and announces state; unknown URLs return 404;
every mobile target is at least 44 px; every public/README claim is declared
and tested or removed; route social metadata is accurate; every copy flag is
gone; and a completed pair can start the next week without re-entering the
same setup. No AI feature is warranted for this product: the brief explicitly
values independent human attempts and explanations, while export and shared
backend sync are already present.
