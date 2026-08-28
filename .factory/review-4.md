# Adversarial first-read review 4

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-28  
**Live and source build:** `6813dbe2725699f71939f731ff0841cd961bfdf5`

## Verdict: FAIL

Two minor findings remain. The product is clear on first read, the one-click
demo is useful and isolated, all 12 declared claim commands pass from a clean
clone, and the full workflow and site structure work. The designed 404 and the
generic error state still use instrument-panel metaphors instead of plain error
copy. The required standard is zero findings, so this round cannot pass.

## 1. Cold first read

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900.
Nothing was scrolled before these answers were recorded.

- What it does: it gives two Lean learners one proof exercise, records their
  separate attempts and proof states, and exports a shared Markdown note.
- Who it is for: independent Lean learners who want a weekly partner routine.
- What to click first: **Try it with sample data**.

The exact first-screen copy supporting those answers was:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and explanations in their own words.

> Try it with sample data

> A ready pact opens in one click.

The action and all three plain facts were fully visible without scrolling at
both widths. The 390 px page had no horizontal overflow. No console or page
error occurred on either cold load. Evidence:
`/tmp/review-4-mobile-cold.png` and
`/tmp/review-4-desktop-cold.png`.

## 2. Copy audit

Counts treat a hyphenated term, URL, version, or file path as one word.
Punctuation-only marks are excluded. Code blocks are commands rather than
sentences. The landing audit includes conditional offline and returning-user
copy. No landing or README sentence exceeds 22 words, uses a banned marketing
word, or changes the established product terms.

### Landing-page sentences

| Words | Exact sentence | Flag |
| ---: | --- | --- |
| 16 | Make a weekly Lean proof pact, compare attempts, record proof states, and export one Markdown note. | None (`markdown-export`) |
| 19 | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. | None |
| 7 | A ready pact opens in one click. | None (`free-access`, `demo-sandbox`) |
| 3 | Free to use. | None (`free-access`) |
| 4 | Partner-visible notes need consent. | None (`paired-roles`) |
| 7 | Records work; run Lean to check it. | None (`records-without-checking`) |
| 7 | Two attempts become one shared Markdown note. | None (`markdown-export`) |
| 4 | Choose one public exercise. | None |
| 4 | One person is Prover. | None (`paired-roles`) |
| 4 | The other is Explainer. | None (`paired-roles`) |
| 14 | I agree that my partner can read the notes I add to this pact. | None (`paired-roles`, `partner-note-sharing`) |
| 7 | This browser saves your private access link. | None (`real-access-link-storage`) |
| 10 | Pick a public Lean exercise and send the invite link. | None |
| 4 | The Prover records code. | None |
| 6 | The Explainer names each reasoning step. | None |
| 9 | Keep the proof states, attempts, and explanations in Markdown. | None (`markdown-export`) |
| 5 | Proof Pact records your work. | None (`records-without-checking`) |
| 5 | Run Lean to check it. | None (`records-without-checking`) |
| 7 | Partners decide whether an explanation makes sense. | None |
| 3 | You are offline. | None (`offline-shell`) |
| 10 | Saved pages remain visible, but pact changes need a connection. | None (`offline-shell`) |
| 6 | Weekly Lean proof work for pairs. | None |

### Landing-page headings, labels, actions, and other fragments

| Words | Type | Exact text | Flag |
| ---: | --- | --- | --- |
| 7 | title / social title | Proof Pact — Work through Lean proofs together | None |
| 4 | skip link | Skip to main content | None |
| 2 | wordmark | Proof Pact | None |
| 1 | nav link | Demo | None |
| 3 | nav link | Make a pact | None |
| 1 | nav link | Privacy | None |
| 3 | section label | Weekly Lean routine | None |
| 7 | h1 | Work one Lean proof with a partner | None |
| 5 | primary action | Try it with sample data | None; result-naming verb |
| 9 | image alt | Two proof-work instruments connected to one shared theorem dial. | None |
| 3 | section label | Create a pact | None |
| 4 | h2 | Make this week’s pact | None |
| 2 | field label | Your name | None |
| 2 | field label | Partner name | None |
| 3 | field label | Public Lean exercise | None |
| 5 | option | Natural Number Game — Add zero | None |
| 5 | option | Theorem Proving in Lean — Rewriting | None |
| 6 | option | Mathematics in Lean — Sets and Functions | None |
| 2 | field label | Exercise link | None |
| 3 | field label | Theorem to attempt | None |
| 2 | field label | Week of | None |
| 4 | action | Create pact and invite | None; result-naming verb |
| 2 | section label | Three steps | None |
| 5 | h2 | How the pair routine works | None |
| 4 | h3 | Commit to one theorem | None |
| 3 | h3 | Bring separate attempts | None |
| 4 | h3 | Export the shared note | None |
| 6 | section label | What Proof Pact does not do | None |
| 6 | h2 | A routine, not a proof judge | None; names the checking boundary |
| 3 | conditional label | Your recent work | None |
| 5 | conditional h2 | Return to a saved pact | None |
| 1 | footer link | Terms | None |
| 6 | footer link | Built by Param Factory (external site) | None |
| 5 | footer note | Version 1.0 · Original generated illustration | None |

### README sentences

| Words | Exact sentence | Flag |
| ---: | --- | --- |
| 8 | Work through one Lean proof with a partner. | None |
| 14 | Proof Pact is for independent Lean 4 learners who want a small weekly routine. | None |
| 12 | Each pair chooses a public exercise and gets Prover and Explainer roles. | None (`paired-roles`) |
| 9 | They record separate attempts and export one Markdown note. | None (`markdown-export`) |
| 5 | Proof Pact records study work. | None (`records-without-checking`) |
| 5 | Run Lean to check it. | None (`records-without-checking`) |
| 5 | Open the demo at proof-study-pacts.sociobot.in/demo. | None |
| 11 | The demo has two learners, two attempts, and saved proof states. | None (`demo-sandbox`) |
| 6 | Demo workspaces expire within 24 hours. | None (`demo-expiry`) |
| 11 | One learner chooses a public Lean exercise and names a partner. | None (`paired-roles`) |
| 11 | The partner opens the invite and agrees to share pact notes. | None (`paired-roles`) |
| 11 | Each learner opens a private access link and records an attempt. | None (`private-notes`) |
| 13 | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | None (`markdown-export`) |
| 10 | Both partners can read each saved note and its author. | None (`partner-note-sharing`) |
| 8 | Only a private access link opens pact notes. | None (`private-notes`) |
| 9 | The app loads no third-party analytics, fonts, or scripts. | None (`same-origin-privacy`) |
| 4 | See Privacy and Terms. | None |
| 5 | Install Node.js, npm, and Rust. | None |
| 2 | Then run: | None |
| 2 | Open http://localhost:8080. | None |
| 7 | For frontend-only work, run npm run dev. | None |
| 6 | The claim contract is in .factory/claims.json. | None; directly inspectable pointer |
| 6 | The factory deploys the root Dockerfile. | None; deployment instruction |
| 6 | Mount /data when pacts must persist. | None; deployment instruction |
| 9 | .factory/design.md records the product-specific visual system and artwork provenance. | None; directly inspectable pointer |
| 7 | .factory/demo.md documents demo isolation and reset behavior. | None; directly inspectable pointer |
| 6 | .factory/copy-audit.md records the landing-page language check. | None; directly inspectable pointer |
| 10 | The project is available under the MIT License in LICENSE. | None; directly inspectable legal pointer |

README headings are **Proof Pact**, **How it works**, **Run locally**, **Test**,
**Container**, **Deploy**, and **Project notes**. Each names its section without
jargon or mood copy. README has no buttons. The stable terminology is: pact,
partner, Prover, Explainer, attempt, proof state, Markdown note, demo, and
private access link.

The two non-plain error labels outside the landing and README are findings
`F-4-1` and `F-4-2`.

## 3. Demo and sandbox

The demo gate passes.

From the mobile landing page, one click on **Try it with sample data** opened
`/demo`. The first completed screen already showed:

- Natural Number Game — Add zero;
- Mira as Prover and Theo as Explainer;
- two distinct Lean attempts with realistic explanations;
- two proof-state snapshots;
- the persistent **Demo — sample data, nothing is saved** banner;
- **Reset demo** and **Start for real**.

Reset changed the workspace from `demo-r76qnk6e` to `demo-m5fldrea` and
restored two sample attempts. **Start for real** removed `demo:pact`, removed
the banner, and scrolled to `/#make`. Preloaded real values
`pact:real-sentinel:token` and `unrelated` were unchanged throughout. The demo
used only `sessionStorage['demo:pact']`; it did not create a real pact key in
local storage.

The complete manual request log for landing, demo entry, and reset contained
only the product origin. The live verifier additionally saved sample work and
confirmed same-origin traffic. No analytics, font CDN, AI, Azure, or other
provider request occurred. Evidence: `/tmp/review-4-demo-mobile.png` and the
passing `npm run verify:live` result.

## 4. Claims

A no-local-worktree clone was created at
`/tmp/proof-pact-review-4-clean.FgJjaY` at the reviewed SHA. After `npm ci`,
every exact command from `.factory/claims.json` was run separately.

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

Each claim tag occurs exactly once in test source. The full clean-clone
`npm test` also passed: 3 Rust tests and 27 Playwright tests. The production
build wrote `frontend/dist/`; initial JavaScript is 27.29 kB raw / 8.95 kB
gzip. No claim is untested.

The claim-like landing, workspace, policy, and README statements map to the 12
entries above: price/account access, demo isolation and contents, export,
same-origin privacy, 24-hour demo expiry, private-link access, consent and
roles, browser link storage, recording without checking, partner sharing,
stored fields/no email, and the offline shell. No additional product claim was
found outside the contract.

## 5. Earlier finding audit

Every prior review, polish note, verification note, and handoff was read. Each
earlier finding was checked against both the live product and current source.

| Earlier ID | Round-4 result and evidence |
| --- | --- |
| `F-1-1` | Fixed: the live caption promises one shared Markdown note, and export creates it. |
| `F-1-2` | Fixed: SPA Back restores scroll, focuses the landing h1, and updates the live announcement. |
| `F-1-3` | Fixed: an unknown live route renders the designed page with HTTP 404. |
| `F-1-4` | Fixed: the route-wide 390 px test and live verifier cover every visible target, including policy email links. |
| `F-1-5` | Fixed: real access-link storage is namespaced and claim-tested. |
| `F-1-6` | Fixed: deliberately invalid Lean is recorded without a correctness result or checker request. |
| `F-1-7` | Fixed: the unsupported runtime guarantees remain absent from README. |
| `F-1-8` | Fixed: Demo, Privacy, Terms, and 404 update title, description, canonical, OG, and Twitter metadata. |
| `F-1-9` | Fixed: the former 23-word README sentence remains split. |
| `F-1-10` | Fixed: “Weekly Lean routine” remains in place. |
| `F-1-11` | Fixed: “Create a pact” remains in place. |
| `F-1-12` | Fixed: Prover and Explainer are named before the form. |
| `F-1-13` | Fixed: “Three steps” names the procedure label. |
| `F-1-14` | Fixed: the limit label says “What Proof Pact does not do.” |
| `F-1-15` | Fixed: the one-click action and `?demo=1` enter `/demo`; demo terms are consistent. |
| `F-1-16` | Fixed: “private access link” remains the only credential term. |
| `F-1-17` | Fixed: visible and metadata copy use “Markdown note.” |
| `F-1-18` | Fixed: a completed real pact offers a prefilled next-week pact and remains in local history. |
| `F-2-1` | Fixed: the live verifier completed 16 fresh-connection reads plus save, reload, and export. |
| `F-2-2` | Fixed: stale demo 404 and 410 sessions are replaced automatically. |
| `F-2-3` | Fixed: export assertions cover both proof bodies, both explanations, both roles, and every proof state. |
| `F-2-4` | Fixed: two isolated partner contexts share a uniquely attributed note after reload. |
| `F-2-5` | Fixed: the disclosed field inventory and rejection of an email field are claim-tested. |
| `F-2-6` | Fixed: the first screen says “explanations in their own words.” |
| `F-3-1` | Fixed: all three current selectable exercise URLs returned HTTP 200; the release gate checks every option. |

No earlier ID is reopened.

## 6. Structure, accessibility, links, and identity

| Check | Result |
| --- | --- |
| Route titles | PASS: root uses “Product — job”; Demo, Privacy, Terms, and 404 use route-specific titles under 60 characters. |
| Metadata | PASS: route descriptions, canonicals, OG/Twitter fields, theme color, SVG favicon, 180 px apple icon, and 1200 × 630 social image are present. |
| Semantics | PASS: `lang=en`, one h1, one main, ordered headings, header/nav/main/footer, skip link, and alt text. |
| Routing | PASS: public deep links return 200, unknown paths return 404, and SPA Back restores focus, announcement, and scroll. |
| 404 content | **FAIL: `F-4-1` uses metaphor for the h1.** |
| Links | PASS: every landing link and all three selectable Lean exercise URLs returned 200. Privacy and Terms are in the consistent footer. |
| Keyboard/touch | PASS: visible focus exists; the full mobile regression checks every public-route target at 44 px or more. |
| Accessibility | PASS: Playwright axe found no serious or critical issue on `/`, `/demo`, `/privacy`, `/terms`, or the missing route. |
| Motion | PASS: the reduced-motion rule disables smooth scrolling, animation, and transitions. |
| Console/root load | PASS: no console or page error on cold mobile or desktop root load. |
| Security/privacy | PASS: same-origin CSP and restrictive response headers are live; no third-party demo request was observed. |
| Discovery | PASS: `robots.txt` and `sitemap.xml` return 200 and list all public routes. |
| Visual identity | PASS: the asymmetric warm-enamel proof console, paired instrument art, dial shapes, narrow labels, and serif proof copy are specific to this product rather than a generic SaaS card template. |

`/opt/fleet/lib/verify-url.sh` passed with evidence at
`/tmp/proof-pact-review-4-verify.NXyl7z/verify.json`. The shipped live verifier
also passed with 16 fresh-connection reads and no recorded error.

## 7. Missed leverage

No missing feature finding is warranted. The brief's obvious adjacent needs
are already covered: partner consent and sharing, Markdown export, selectable
public exercises, and a next-week path. An AI proof suggestion would weaken
the product's deliberate independent-attempt routine and is not implied by the
brief. There is no decorative AI feature and no provider key in the product.

## 8. Findings

### Minor

#### F-4-1 — The 404 h1 is an instrument metaphor, not the page name

**Location / exact quote:** live unknown route, for example
`/review-4-missing`; `frontend/src/main.ts:326`: eyebrow **“Reading 404”** and
h1 **“This dial points nowhere.”**

**Why this fails:** a visitor who follows a bad link must translate the visual
dial metaphor before learning that the page was not found. The browser title
is plain, but the only visible h1 does not name the error. This violates the
requirement that a heading make sense on its own.

**Concrete fix:** delete “Reading 404,” change the h1 to **“Page not found,”**
and retain “The page may have moved, or the pact link is incomplete.” Keep the
designed broken dial as decorative art. Update the route test to assert the
plain h1.

#### F-4-2 — Generic error pages add a decorative mood label

**Location / exact quote:** live `/pact/missing-review-4` and
`/join/missing-review-4`; `frontend/src/main.ts:337`: **“The signal stopped.”**

**Why this fails:** the line does not identify what failed or tell the visitor
what to do. It is brand-lore copy that could appear above any error, while the
h1 and recovery sentence already carry the useful information.

**Concrete fix:** remove the eyebrow entirely. Keep the specific h1, reason,
and recovery action for each error. Add an error-state copy assertion so a
generic metaphor cannot return.

## What would make this perfect

Replace the two instrument metaphors in `F-4-1` and `F-4-2` with literal error
copy, add the two focused copy assertions, and rerun this complete review. No
other defect or missing feature was confirmed in this round.
