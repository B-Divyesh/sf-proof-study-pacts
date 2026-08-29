# Adversarial first-read review 7

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-29  
**Live and source build:** `e2276f9386ac790552f9dc41b33e14c00b401f3b`

## Summary

Zero findings remain. Fresh mobile and desktop first reads are clear, the
one-click demo immediately shows realistic work in an isolated workspace, all
12 declared claim commands pass independently from a clean clone, no claim is
untested, and every earlier finding remains fixed. The route, accessibility,
privacy, link, metadata, and visual-identity checks also pass.

## 1. Cold first read

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900.
Neither page was scrolled before recording the result.

- What it does: two Lean learners work on one proof, record separate attempts
  and proof states, and export one shared Markdown note.
- Who it is for: independent Lean learners who want a weekly partner routine.
- What to click first: **Try it with sample data**.

The exact first-screen copy supporting those answers is:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and explanations in their own words.

> Try it with sample data

> A ready pact opens in one click.

The three facts—**Free to use**, **Partner-visible notes need consent**, and
**Records work; run Lean to check it**—also fit above the fold. On mobile their
bottom edge is 621 px; on desktop it is 798 px. Both contexts stayed at
`scrollY = 0`, had no horizontal overflow, made only same-origin requests, and
recorded no console or page error.

Evidence:

- `/tmp/proof-pact-review-7-mobile-cold.png`
- `/tmp/proof-pact-review-7-desktop-cold.png`

## 2. Copy audit

Counts treat hyphenated terms, URLs, numbers, and paths as one word. The tables
split visible sentence clusters at sentence-ending punctuation. Commands are
instructions rather than prose sentences. No item is over 22 words, uses a
banned marketing term, changes the established terminology, or needs a
rewrite.

### Landing-page sentences and factual fragments

| Words | Exact text | Result |
| ---: | --- | --- |
| 16 | Make a weekly Lean proof pact, compare attempts, record proof states, and export one Markdown note. | Pass; metadata description and registered capabilities |
| 19 | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. | Pass |
| 7 | A ready pact opens in one click. | Pass; `free-access`, `demo-sandbox` |
| 3 | Free to use. | Pass; `free-access` |
| 4 | Partner-visible notes need consent. | Pass; `paired-roles` |
| 7 | Records work; run Lean to check it. | Pass; `records-without-checking` |
| 9 | Two proof-work instruments connected to one shared theorem dial. | Pass; useful image alt text |
| 7 | Two attempts become one shared Markdown note. | Pass; `markdown-export` |
| 4 | Choose one public exercise. | Pass |
| 4 | One person is Prover. | Pass; `paired-roles` |
| 4 | The other is Explainer. | Pass; `paired-roles` |
| 14 | I agree that my partner can read the notes I add to this pact. | Pass; consent is explicit |
| 7 | This browser saves your private access link. | Pass; `real-access-link-storage` |
| 10 | Pick a public Lean exercise and send the invite link. | Pass |
| 4 | The Prover records code. | Pass |
| 6 | The Explainer names each reasoning step. | Pass |
| 9 | Keep the proof states, attempts, and explanations in Markdown. | Pass; `markdown-export` |
| 5 | Proof Pact records your work. | Pass; `records-without-checking` |
| 5 | Run Lean to check it. | Pass; `records-without-checking` |
| 7 | Partners decide whether an explanation makes sense. | Pass; states the human-review boundary |
| 3 | You are offline. | Pass; conditional `offline-shell` copy |
| 10 | Saved pages remain visible, but pact changes need a connection. | Pass; conditional `offline-shell` copy |
| 6 | Weekly Lean proof work for pairs. | Pass; footer description |

### Landing headings, labels, and actions

| Words | Type | Exact text | Result |
| ---: | --- | --- | --- |
| 7 | title | Proof Pact — Work through Lean proofs together | Pass; product and job |
| 3 | section label | Weekly Lean routine | Pass; literal |
| 7 | h1 | Work one Lean proof with a partner | Pass; verb-first and under nine words |
| 5 | primary action | Try it with sample data | Pass; names the result |
| 3 | section label | Create a pact | Pass; literal |
| 4 | h2 | Make this week’s pact | Pass |
| 2 | field label | Your name | Pass |
| 2 | field label | Partner name | Pass |
| 3 | field label | Public Lean exercise | Pass |
| 2 | field label | Exercise link | Pass |
| 3 | field label | Theorem to attempt | Pass |
| 2 | field label | Week of | Pass |
| 4 | action | Create pact and invite | Pass; names the result |
| 2 | section label | Three steps | Pass; literal |
| 5 | h2 | How the pair routine works | Pass |
| 4 | h3 | Commit to one theorem | Pass |
| 3 | h3 | Bring separate attempts | Pass |
| 4 | h3 | Export the shared note | Pass |
| 6 | section label | What Proof Pact does not do | Pass; literal boundary |
| 6 | h2 | A routine, not a proof judge | Pass; names the checking boundary |
| 3 | conditional label | Your recent work | Pass |
| 5 | conditional h2 | Return to a saved pact | Pass |

Navigation labels (**Demo**, **Make a pact**, **Privacy**, and **Terms**) name
destinations. Exercise choices use their source names consistently. The stable
product terms are pact, partner, Prover, Explainer, attempt, proof state,
Markdown note, demo, and private access link.

### README sentences

| Words | Exact text | Result |
| ---: | --- | --- |
| 13 | Proof Pact helps two independent Lean 4 learners keep a small weekly routine. | Pass |
| 12 | Each pair chooses a public exercise and gets Prover and Explainer roles. | Pass; `paired-roles` |
| 9 | They record separate attempts and export one Markdown note. | Pass; `markdown-export` |
| 5 | Proof Pact records study work. | Pass; `records-without-checking` |
| 5 | Run Lean to check it. | Pass; `records-without-checking` |
| 5 | Open the demo at proof-study-pacts.sociobot.in/demo. | Pass; direct action |
| 11 | The demo has two learners, two attempts, and saved proof states. | Pass; `demo-sandbox` |
| 6 | Demo workspaces expire within 24 hours. | Pass; `demo-expiry` |
| 11 | One learner chooses a public Lean exercise and names a partner. | Pass |
| 11 | The partner opens the invite and agrees to share pact notes. | Pass; `paired-roles` |
| 11 | Each learner opens a private access link and records an attempt. | Pass; private-link and sharing claims |
| 13 | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | Pass; `markdown-export` |
| 10 | Both partners can read each saved note and its author. | Pass; `partner-note-sharing` |
| 8 | Only a private access link opens pact notes. | Pass; `private-notes` |
| 9 | The app loads no third-party analytics, fonts, or scripts. | Pass; `same-origin-privacy` |
| 4 | See Privacy and Terms. | Pass; both are linked |
| 5 | Install Node.js, npm, and Rust. | Pass; setup instruction |
| 2 | Then run: | Pass; introduces exact commands |
| 2 | Open http://localhost:8080. | Pass; local action |
| 7 | For frontend-only work, run npm run dev. | Pass; local action |
| 6 | The claim contract is in .factory/claims.json. | Pass; inspectable pointer |
| 6 | The factory deploys the root Dockerfile. | Pass; deployment instruction |
| 6 | Mount /data when pacts must persist. | Pass; deployment instruction |
| 9 | .factory/design.md records the product-specific visual system and artwork provenance. | Pass; inspectable pointer |
| 7 | .factory/demo.md documents demo isolation and reset behavior. | Pass; inspectable pointer |
| 8 | .factory/copy-audit.md records the landing-page language check. | Pass; inspectable pointer |
| 10 | The project is available under the MIT License in LICENSE. | Pass; inspectable legal pointer |

The README h1, **Work through one Lean proof with a partner** (8 words), names
the job. Its other headings—**How it works**, **Run locally**, **Test**,
**Container**, **Deploy**, and **Project notes**—name their sections. README has
no buttons. There are no copy findings and therefore no proposed rewrites.

## 3. Demo

The demo gate passes. One click on **Try it with sample data** opened `/demo`
from a fresh 390 × 844 landing context. The completed initial viewport showed:

- the persistent **Demo — sample data, nothing is saved** banner;
- **Reset demo** and **Start for real**;
- **Mira — Prover** and **Theo — Explainer**; and
- Mira’s saved `induction n with` attempt and its realistic explanation.

The complete preview occupied y=337–512, fully inside the first viewport.
Evidence is in `/tmp/proof-pact-review-7-live-rerun/` and
`/tmp/proof-pact-review-7-demo-cold.png`.

## 4. Claims

A no-local-worktree clone was created at
`/tmp/proof-pact-review-7.yLNDJM/source` at the reviewed SHA. After `npm ci`,
every exact command from `.factory/claims.json` ran independently.

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
| `partner-note-sharing` | `npm test -- --grep @claim:partner-note-sharing` | PASS |
| `stored-data-inventory` | `npm test -- --grep @claim:stored-data-inventory` | PASS |
| `offline-shell` | `npm test -- --grep @claim:offline-shell` | PASS |

Each ID occurs in exactly one tagged test. The full clean-clone `npm test`
passed: production build, 3 Rust tests, and 32 Playwright checks. The build
wrote `frontend/dist/`; initial JavaScript is 28.27 kB raw / 9.16 kB gzip and
CSS is 19.58 kB raw / 5.12 kB gzip. `cargo build --release --locked` passed,
and `npm audit --audit-level=high` reported zero vulnerabilities.

The landing, workspace, policy, and README claims map to the registered tests:
free/accountless access, demo contents and isolation, Markdown export,
same-origin loading, 24-hour demo expiry, private-link access, consent and
roles, browser link storage, recording without proof checking, partner note
sharing, stored fields/no email, and the offline shell. No unlisted claim-like
sentence or untested registered claim was found.

## 5. Sandbox behavior

Save survived reload. Reset created a different `demo-*` workspace and
restored two seeded attempts. Start for real removed
`sessionStorage['demo:pact']`, removed the banner, and opened the real pact
form. A preloaded real-data local-storage sentinel remained unchanged through
the demo flow. The browser used the `demo:pact` session-storage namespace; no
real pact key was created.

The complete live request log for landing, demo, save, reload, export, reset,
and exit contained only `https://proof-study-pacts.sociobot.in`. No analytics,
font CDN, script CDN, AI, Azure, or other provider request occurred. The
offline check kept a saved policy page visible and accurately said that pact
changes need a connection. Backend demo IDs use the separate `demo-*`
namespace and expire within the tested 24-hour limit.

## 6. Earlier finding audit

Every prior review, polish record, verification note, and handoff was read.
Each earlier finding was checked against the live product and current source or
regression test; prior status labels were not accepted as evidence.

| Earlier ID | Round-7 confirmation |
| --- | --- |
| `F-1-1` | Fixed: live copy promises one shared Markdown note; the downloaded export contains both attempts and explanations. |
| `F-1-2` | Fixed: live Privacy → Back restores landing scroll, focuses the h1, and updates the route announcement. |
| `F-1-3` | Fixed: an unknown live route renders the designed page with HTTP 404. |
| `F-1-4` | Fixed: the route-wide 390 px check finds no visible target below 44 px, including policy email links. |
| `F-1-5` | Fixed: real pact creation writes one namespaced private-link key and preserves unrelated storage. |
| `F-1-6` | Fixed: deliberately invalid Lean is recorded without a correctness result or external checker request. |
| `F-1-7` | Fixed: unsupported runtime promises remain absent; clean build, tests, release build, and container-facing health checks pass. |
| `F-1-8` | Fixed: every public route updates title, description, canonical, Open Graph, and Twitter metadata. |
| `F-1-9` | Fixed: no README sentence exceeds 22 words. |
| `F-1-10` | Fixed: the live hero label is **Weekly Lean routine**. |
| `F-1-11` | Fixed: the form section label is **Create a pact**. |
| `F-1-12` | Fixed: Prover and Explainer are named before pact creation and assigned after consent. |
| `F-1-13` | Fixed: the process label is **Three steps**. |
| `F-1-14` | Fixed: the limit label is **What Proof Pact does not do**. |
| `F-1-15` | Fixed: `/demo` and `?demo=1` enter the same bannered demo with reset and real-mode exit. |
| `F-1-16` | Fixed: **private access link** remains the sole credential term. |
| `F-1-17` | Fixed: visible and metadata copy consistently use **Markdown note**. |
| `F-1-18` | Fixed: a completed pact offers a prefilled next-week pact and remains in local recent history. |
| `F-2-1` | Fixed: the live verifier completed create, 16 fresh-connection reads, save, reload, and export without data loss. |
| `F-2-2` | Fixed: stale demo IDs returning 404 or 410 are discarded and automatically replaced with seeded workspaces. |
| `F-2-3` | Fixed: export assertions cover the theorem, both roles, proof bodies, explanations, and every proof state. |
| `F-2-4` | Fixed: two isolated browser contexts share a uniquely attributed note after reload. |
| `F-2-5` | Fixed: the exact stored-field inventory is schema-tested and an undeclared email field returns 422. |
| `F-2-6` | Fixed: the first screen says **explanations in their own words**, not the subjective **clear explanations**. |
| `F-3-1` | Fixed: all three selectable public-exercise destinations returned successful responses in the release and live checks. |
| `F-4-1` | Fixed: the missing-page h1 is **Page not found**; the dial is decorative only. |
| `F-4-2` | Fixed: missing pact and invitation routes use specific headings, reasons, and recovery actions with no mood label. |
| `F-5-1` | Fixed: banner, both role labels, and the complete saved-attempt preview fit in the initial 390 × 844 demo viewport. |
| `F-6-1` | Fixed: README now opens with the job-specific h1 **Work through one Lean proof with a partner**. |

No earlier finding is reopened.

## 7. Structure, accessibility, links, and identity

| Check | Result |
| --- | --- |
| Titles | PASS: root follows “Product — job”; Demo, Privacy, Terms, and 404 have route-specific titles under 60 characters. |
| Metadata | PASS: plain descriptions, canonicals, route-specific OG/Twitter fields, theme color, SVG favicon, 180 px touch icon, and 1200 × 630 social image are present. |
| Semantics | PASS: `lang=en`, one h1, one main, ordered headings, landmarks, skip link, labels, and image alt text. |
| Routing | PASS: public deep links return 200, unknown paths return 404, and Back restores focus, announcement, and scroll. |
| 404/errors | PASS: the styled 404 and dynamic error states have literal headings, reasons, and recovery actions. |
| Links | PASS: the fragment-aware crawl found every in-page target; all navigational links returned 2xx and mail links were explicitly classified. All selectable exercise URLs also passed. |
| Keyboard/touch | PASS: the primary action is keyboard reachable, focus is visible, and every visible public-route control is at least 44 px. |
| Accessibility | PASS: Playwright axe found no serious or critical issue on `/`, `/demo`, `/privacy`, `/terms`, or the missing route. |
| Motion | PASS: `prefers-reduced-motion` removes smooth scrolling, animation, and transitions. |
| Privacy/security | PASS: the CSP and security headers are live; demo traffic is same-origin and storage namespaces remain separate. |
| Discovery | PASS: `robots.txt` and `sitemap.xml` return 200 and the sitemap lists all public routes. |
| Visual identity | PASS: asymmetric warm-enamel panels, paired proof instruments, brass rules, red signal controls, serif proof copy, and original console art follow `.factory/design.md` and are not a generic SaaS template. |

The worker URL verifier passed and wrote
`/tmp/proof-pact-review-7-verify/verify.json`: one h1, `lang=en`, a main
landmark, complete image alt text, labelled buttons, and zero console errors.

## 8. Missed leverage

No missed-leverage finding is warranted. The brief's useful adjacent needs are
already present: backend partner sync, complete Markdown export, a next-week
path, and maintained public exercise links. Import is not implied by this
single-session workflow. An AI proof suggestion would conflict with the
deliberate independent-attempt and human-explanation job, so the absence of AI
is appropriate. There is no decorative AI feature or embedded provider key.

## 9. Verdict

**PASS.** There are zero findings of any severity and no untested claim.

### What would make this perfect

Nothing remains to change for the reviewed scope. Preserve the claim registry,
fresh-connection live gate, exercise-link crawl, mobile first-viewport check,
route-wide accessibility checks, and single-replica constraint while the
backend uses SQLite. Re-run this full review after any product or deployment
change.
