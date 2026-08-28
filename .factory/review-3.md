# Adversarial first-read review 3

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-28  
**Source reviewed:** `67602fa0671b1c87c8512956d0c3cf1b0636f13a`

## Verdict: FAIL

One finding remains. The landing form offers a public Lean exercise whose URL returns HTTP 404. This is a dead link in the core pact-creation flow. The cold-read gate, demo, declared claims, prior repairs, accessibility, metadata, routing, and visual-identity checks otherwise pass. PASS requires zero findings.

## 1. Cold first read

Fresh Chromium contexts were opened directly at the live root at 390 × 844 and 1440 × 900. No scrolling occurred before recording the result.

- **What it does:** two Lean learners work on one proof, record their attempts and proof states, then export a Markdown note.
- **Who it is for:** independent Lean learners who are working with a partner.
- **What to click first:** **Try it with sample data**.

The exact first-screen text was:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words.

> Try it with sample data

> A ready pact opens in one click.

The action is a 350 × 48 px target at 390 px. All three facts are visible by 621 px of the 844 px viewport. There is no horizontal overflow and no console or page error at either size. This gate passes.

## 2. Copy audit

Word counts treat hyphenated terms and URLs as one word. The landing table includes every sentence plus headings/actions so that the plain-language, heading, and button checks are explicit. No listed copy is over 22 words, uses a banned marketing adjective, relies on an unexplained metaphor, or uses an inconsistent term. All action labels name a result.

### Landing page

| Words | Type | Exact text | Result |
| ---: | --- | --- | --- |
| 7 | title | Proof Pact — Work through Lean proofs together | Pass |
| 16 | description / social description | Make a weekly Lean proof pact, compare attempts, record proof states, and export one Markdown note. | Pass |
| 4 | skip link | Skip to main content | Pass |
| 2 | wordmark | Proof Pact | Pass |
| 1 / 3 / 1 | navigation | Demo; Make a pact; Privacy | Pass |
| 3 | section label | Weekly Lean routine | Pass |
| 7 | h1 | Work one Lean proof with a partner | Pass |
| 19 | sentence | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. | Pass |
| 5 | primary action | Try it with sample data | Pass |
| 7 | sentence | A ready pact opens in one click. | Pass — `free-access` |
| 3 / 4 / 7 | facts | Free to use; Partner-visible notes need consent; Records work; run Lean to check it | Pass — declared claims |
| 9 | image alt | Two proof-work instruments connected to one shared theorem dial. | Pass |
| 7 | caption | Two attempts become one shared Markdown note. | Pass — `markdown-export` |
| 3 / 4 | section label / h2 | Create a pact; Make this week’s pact | Pass |
| 4 / 4 / 4 | sentences | Choose one public exercise. One person is Prover. The other is Explainer. | Pass |
| 2 / 2 / 3 / 2 / 3 / 2 | form labels | Your name; Partner name; Public Lean exercise; Exercise link; Theorem to attempt; Week of | Pass |
| 5 / 5 / 6 | options | Natural Number Game — Add zero; Theorem Proving in Lean — Rewriting; Mathematics in Lean — Sets and Functions | Copy passes; link failure is F-3-1 |
| 14 | consent | I agree that my partner can read the notes I add to this pact. | Pass — `paired-roles` |
| 4 | action | Create pact and invite | Pass |
| 8 | sentence | This browser saves your private access link. | Pass — `real-access-link-storage` |
| 2 / 5 | section label / h2 | Three steps; How the pair routine works | Pass |
| 4 / 3 / 4 | h3 | Commit to one theorem; Bring separate attempts; Export the shared note | Pass |
| 10 | sentence | Pick a public Lean exercise and send the invite link. | Pass |
| 4 / 6 | sentences | The Prover records code. The Explainer names each reasoning step. | Pass |
| 9 | sentence | Keep the proof states, attempts, and explanations in Markdown. | Pass — `markdown-export` |
| 6 / 6 | section label / h2 | What Proof Pact does not do; A routine, not a proof judge | Pass |
| 5 / 6 / 8 | sentences | Proof Pact records your work. Run Lean to check it. Partners decide whether an explanation makes sense. | Pass — `records-without-checking` |
| 6 | footer sentence | Weekly Lean proof work for pairs. | Pass |
| 1 / 6 | footer links | Terms; Built by Param Factory (external site) | Pass |
| 5 | footer note | Version 1.0 · Original generated illustration | Pass — provenance documented |

### README

| Words | Exact sentence or heading | Result |
| ---: | --- | --- |
| 2 | Proof Pact | Pass |
| 8 | Work through one Lean proof with a partner. | Pass |
| 14 | Proof Pact is for independent Lean 4 learners who want a small weekly routine. | Pass |
| 12 | Each pair chooses a public exercise and gets Prover and Explainer roles. | Pass — `paired-roles` |
| 9 | They record separate attempts and export one Markdown note. | Pass — `markdown-export` |
| 5 | Proof Pact records study work. | Pass — `records-without-checking` |
| 6 | Run Lean to check it. | Pass — `records-without-checking` |
| 5 | Open the demo at proof-study-pacts.sociobot.in/demo. | Pass |
| 11 | The demo has two learners, two attempts, and saved proof states. | Pass — `demo-sandbox`, `markdown-export` |
| 6 | Demo workspaces expire within 24 hours. | Pass — `demo-expiry` |
| 3 | How it works | Pass |
| 11 | One learner chooses a public Lean exercise and names a partner. | Pass — `paired-roles` |
| 11 | The partner opens the invite and agrees to share pact notes. | Pass — `paired-roles` |
| 11 | Each learner opens a private access link and records an attempt. | Pass — `partner-note-sharing` |
| 13 | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | Pass — `markdown-export` |
| 9 | Both partners can read each saved note and its author. | Pass — `partner-note-sharing` |
| 8 | Only a private access link opens pact notes. | Pass — `private-notes` |
| 9 | The app loads no third-party analytics, fonts, or scripts. | Pass — `same-origin-privacy` |
| 4 | See Privacy and Terms. | Pass |
| 2 | Run locally | Pass |
| 5 | Install Node.js, npm, and Rust. | Pass — instruction |
| 2 | Then run: | Pass — instruction |
| 2 | Open http://localhost:8080. | Pass — instruction |
| 7 | For frontend-only work, run npm run dev. | Pass — instruction |
| 1 | Test | Pass |
| 6 | The claim contract is in .factory/claims.json. | Pass |
| 1 / 1 | Container; Deploy | Pass |
| 6 | The factory deploys the root Dockerfile. | Pass — instruction |
| 6 | Mount /data when pacts must persist. | Pass — instruction |
| 2 | Project notes | Pass |
| 9 | .factory/design.md records the product-specific visual system and artwork provenance. | Pass — inspectable pointer |
| 7 | .factory/demo.md documents demo isolation and reset behavior. | Pass — inspectable pointer |
| 6 | .factory/copy-audit.md records the landing-page language check. | Pass — inspectable pointer |
| 10 | The project is available under the MIT License in LICENSE. | Pass — inspectable pointer |

## 3. Demo and sandbox

**Pass.** One click from the mobile landing page opened `/demo`. The first completed screen already showed the Natural Number Game `add_zero` theorem, Mira as Prover, Theo as Explainer, two realistic attempts, and proof-state snapshots. The persistent banner reads **“Demo — sample data, nothing is saved”** and includes **Reset demo** and **Start for real**.

Saving an attempt, reloading, exporting, and resetting worked on the live deployment. Reset created a different `demo-*` session and restored two attempts. Start for real removed `sessionStorage['demo:pact']`, removed the banner, returned to the real pact form, and left a real-data local-storage sentinel unchanged. The live release check also made 16 fresh-connection reads around a save and export; all retained the demo data.

The live request log for the complete demo flow contained only `https://proof-study-pacts.sociobot.in` requests. The service-worker offline check showed a saved Privacy page and the accurate offline notice. No demo data was written to real browser storage.

## 4. Claim contract

I cloned the reviewed source into `/tmp/proof-pact-review-3.HeNMeZ`, ran `npm ci`, and ran every exact command in `.factory/claims.json` independently. All 12 passed. The full `npm test` also passed from that clone: production build, three Rust tests, and 26 Playwright tests. The build emitted `dist/` with 27.29 kB raw / 8.94 kB gzip JavaScript.

| Claim ID | Result |
| --- | --- |
| free-access | Pass |
| demo-sandbox | Pass |
| markdown-export | Pass |
| same-origin-privacy | Pass |
| demo-expiry | Pass |
| private-notes | Pass |
| paired-roles | Pass |
| real-access-link-storage | Pass |
| records-without-checking | Pass |
| partner-note-sharing | Pass |
| stored-data-inventory | Pass |
| offline-shell | Pass |

Each `@claim:` tag occurs exactly once in the test source. Landing and README claims map to the entries above; no additional unlisted landing/README claim was found.

## 5. Earlier finding audit

Every finding in the prior reviews was rechecked live and in source rather than accepted from its polish note.

| Earlier finding | Result and confirmation |
| --- | --- |
| F-1-1 | Fixed: the caption promises a shared Markdown note, and export creates one. |
| F-1-2 | Fixed: Back restores the landing heading focus, live announcement, and scroll. |
| F-1-3 | Fixed: an unknown live route renders the designed page with HTTP 404. |
| F-1-4 | Fixed: every visible control on public routes, including policy email links, is at least 44 px. |
| F-1-5 | Fixed: browser-link storage is namespaced and claim-tested. |
| F-1-6 | Fixed: invalid Lean is recorded without a checking result. |
| F-1-7 | Fixed: unsupported runtime guarantees were removed from README. |
| F-1-8 | Fixed: direct routes update canonical, OG, and Twitter metadata. |
| F-1-9 | Fixed: the README long sentence remains split. |
| F-1-10 | Fixed: “Weekly Lean routine” replaces unexplained hero jargon. |
| F-1-11 | Fixed: the form section is named “Create a pact.” |
| F-1-12 | Fixed: Prover and Explainer are named before the form. |
| F-1-13 | Fixed: the process label is “Three steps.” |
| F-1-14 | Fixed: the limit section names what the product does not do. |
| F-1-15 | Fixed: the one-click action enters `/demo`; demo terminology is consistent. |
| F-1-16 | Fixed: “private access link” is used consistently. |
| F-1-17 | Fixed: visible and metadata copy say “Markdown note.” |
| F-1-18 | Fixed: a completed real pact can prefill next week and remains in local history. |
| F-2-1 | Fixed: live fresh-connection create/read/save/reload/export checks pass. |
| F-2-2 | Fixed: a stale demo 404 or 410 provisions a new seeded demo. |
| F-2-3 | Fixed: export assertions cover both attempts, explanations, roles, and proof states. |
| F-2-4 | Fixed: two isolated partners can read an attributed saved note. |
| F-2-5 | Fixed: storage inventory and email rejection are claim-tested. |
| F-2-6 | Fixed: the first screen says “explanations in their own words.” |

## 6. Findings

### Major

#### F-3-1 — A selectable public Lean exercise has a dead link

**Location / exact quote:** landing pact form option **“Theorem Proving in Lean — Rewriting”**; `frontend/src/main.ts:30-31` configures `https://leanprover.github.io/theorem_proving_in_lean4/tactics.html`.

**Evidence:** a direct fresh request to that exact configured URL returned `HTTP 404`. The maintained destination `https://lean-lang.org/theorem_proving_in_lean4/Tactics/` returned `HTTP 200`.

**Why this fails:** a visitor can choose this advertised public exercise, create a pact, and then press **Open the public exercise** only to reach a missing page. That blocks the selected study material in the core workflow and fails the no-dead-links requirement.

**Concrete fix:** replace the configured URL with the current 200 destination above, then add a release test that visits every built-in exercise URL and requires a successful response before presenting it as a selectable exercise.

## 7. Structure, accessibility, and links

| Check | Result |
| --- | --- |
| Route titles, descriptions, canonical, OG/Twitter, favicon, `lang` | Pass |
| One h1, landmarks, heading order, skip link, visible focus | Pass |
| Designed 404, status 404, deep links, back focus/announcement/scroll | Pass |
| Header/footer and Privacy/Terms links | Pass |
| Mobile fit, 44 px targets, keyboard, reduced motion, axe serious/critical | Pass |
| Same-origin CSP and no third-party demo traffic | Pass |
| Internal links, sitemap, robots, assets, Param Factory link | Pass |
| Built-in exercise links | **Fail — F-3-1** |
| Visual identity | Pass: the asymmetric mid-century proof-console art and controls are product-specific, not a generic SaaS layout. |

## 8. Missed leverage

No additional feature finding is warranted. The brief calls for a deliberately human, independent-proof routine; an AI answer step would conflict with that job. The useful implied capabilities—private partner sharing, Markdown export, and a next-week path—are present and tested.

## What would make this perfect

Repair F-3-1 and verify all selectable exercise sources in the release suite. After that, rerun this full cold-read review and the claim commands from a clean clone. There is no other confirmed product gap in this round.
