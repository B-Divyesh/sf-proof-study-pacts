# Polish round 2

Base reviewed: `613a068b338cf3eaa31788667a345185f88efadd`.
Repair implementation: `067068962eebc04a59039daa0bc19e9315e5b748`.
Live URL: `https://proof-study-pacts.sociobot.in`.

## Round 2 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| `F-2-1` | Constrained the deployed SQLite service to one replica. Added a release gate that creates, reads 16 times through fresh HTTP clients, saves, reloads, and exports. | `fresh HTTP connections preserve demo create, read, save, reload, and export`; `npm run verify:live`; Azure revision `sf-proof-study-pacts--0000006` reports min/max `1/1`; `/tmp/proof-pact-polish-2-live/demo-mobile.png`; live `/demo`. |
| `F-2-2` | Demo reads now detect `404` and `410`, discard only `sessionStorage['demo:pact']`, and provision a fresh seeded demo without dropping the banner. | `a saved demo returning 404 is replaced automatically`; equivalent `410` test; `@claim:demo-sandbox`; live missing-ID recovery in `npm run verify:live`; `/tmp/proof-pact-polish-2-live/demo-mobile.png`; live `/demo`. |
| `F-1-4` | Enlarged both legal-page email links and consent controls to at least 44 px. The regression now measures every visible control on all public routes at 390 px. | `every visible interactive target is at least 44px on every public route`; live route-wide measurement in `npm run verify:live`; `/tmp/proof-pact-polish-2-live/landing-mobile.png`; live `/privacy` and `/terms`. |
| `F-2-3` | Expanded the export claim test to assert the theorem, both roles, both proof bodies, both exact explanations, exactly two attempt sections, and every seeded proof state. | `@claim:markdown-export`; clean-clone log `/tmp/proof-pact-polish-2-claims.log`; live download check in `npm run verify:live`; live `/demo`. |
| `F-2-4` | Added `partner-note-sharing`. Two isolated browser contexts now prove that an Explainer's exact attempt, explanation, proof state, and author reach the Prover after reload. | `@claim:partner-note-sharing`; live two-partner round trip in `npm run verify:live`; `/tmp/proof-pact-polish-2-live/demo-mobile.png`; live `/`. |
| `F-2-5` | Declared the complete storage inventory, reject undeclared JSON fields such as email, and added schema plus browser contract tests. | `@claim:stored-data-inventory`; Rust `stored_data_schema_matches_privacy_inventory`; live email-field rejection in `npm run verify:live`; live `/privacy`. |
| `F-2-6` | Replaced “clear explanations” with “explanations in their own words” and refreshed the copy audit. | `.factory/copy-audit.md`; landing assertion in `npm run verify:live`; `/tmp/proof-pact-polish-2-live/landing-mobile.png`; live `/`. |

## Earlier findings rechecked

| Finding | Preserved change | Evidence |
| --- | --- | --- |
| `F-1-1` | The caption describes one shared Markdown note, which the exporter creates. | `@claim:markdown-export`; live export check; demo screenshot. |
| `F-1-2` | History navigation restores scroll, focuses the h1, and announces the route. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live history check; landing screenshot. |
| `F-1-3` | Unknown routes render the designed page with HTTP 404. | `routes have titles, one h1, working deep links, and no console errors`; live `curl` returned `404`; live `/definitely-missing-polish-2`. |
| `F-1-4` | All earlier navigation, footer, exercise, and new legal targets meet 44 px. | Route-wide mobile target test and live check; mobile screenshot. |
| `F-1-5` | Real pact access remains namespaced in browser storage and sent only same-origin. | `@claim:real-access-link-storage`; live real-pact check; live `/`. |
| `F-1-6` | The product records invalid Lean without presenting a correctness result or contacting a checker. | `@claim:records-without-checking`; clean-clone claim log; live `/demo`. |
| `F-1-7` | README keeps runnable instructions and omits unsupported runtime promises. The Dockerfile now tracks `rust:1`. | Clean ACR build `chm0`; `npm test`; source inspection. |
| `F-1-8` | Every route updates title, description, canonical, Open Graph, and Twitter metadata. | Direct-route metadata test; live metadata checks; live `/demo`, `/privacy`, `/terms`, and `/missing-page`. |
| `F-1-9` | The long README sentence remains split. | `.factory/copy-audit.md`; README source check. |
| `F-1-10` | The hero label remains “Weekly Lean routine.” | Live first-screen check; landing screenshots. |
| `F-1-11` | The form label remains “Create a pact.” | Live landing check; desktop screenshot. |
| `F-1-12` | The form names Prover and Explainer before input. | `@claim:paired-roles`; live two-partner check. |
| `F-1-13` | The process section remains “Three steps.” | Live landing check; desktop screenshot. |
| `F-1-14` | The boundary label remains “What Proof Pact does not do.” | `@claim:records-without-checking`; live landing check. |
| `F-1-15` | “Try it with sample data” enters `/demo`; the mode is called demo elsewhere. | `@claim:demo-sandbox`; live `/?demo=1` check; demo screenshot. |
| `F-1-16` | “Private access link” remains the sole credential term. | `@claim:private-notes`; `@claim:real-access-link-storage`; live real-pact check. |
| `F-1-17` | Metadata and visible copy consistently say “Markdown note.” | Direct-route metadata test; `@claim:markdown-export`; live export check. |
| `F-1-18` | Completed pacts still offer a next-week action with partner/date prefill and recent history. | `completed pact starts a prefilled next-week pact and keeps local history`; live two-partner completion check. |

## Additional acceptance evidence

- Full suite: `npm test` — 3 Rust tests and 26 Playwright tests passed.
- Every command in `.factory/claims.json` passed separately from clean clone
  `/tmp/proof-pact-polish-2-clean.wY5UA3`; combined output is
  `/tmp/proof-pact-polish-2-claims.log`.
- Playwright axe: zero serious or critical violations on `/`, `/demo`,
  `/privacy`, `/terms`, and a missing route.
- Worker URL verification: `/tmp/proof-pact-polish-2-verify/verify.json`; no
  console errors, one h1, `lang=en`, main landmark, complete image alt text.
- Lighthouse 12.8.2 mobile: performance 100, accessibility 100, LCP 1.3 s,
  CLS 0, TBT 20 ms. Desktop: performance 100, accessibility 100, LCP 0.4 s,
  CLS 0, TBT 0 ms. Reports are `/tmp/proof-pact-polish-2-lighthouse-mobile.json`
  and `/tmp/proof-pact-polish-2-lighthouse.json`.
- Initial production JavaScript is 27.29 kB raw / 8.94 kB gzip. CSS is
  16.88 kB raw / 4.61 kB gzip.

No review finding remains open.
