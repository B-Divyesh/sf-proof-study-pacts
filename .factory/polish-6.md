# Polish round 6 — zero-finding closure

**Released candidate:** `ff457a0886a3f440da8d14f3876d1bf5981b711d`  
**Review input:** `c5c7f5d1d9bbe9e24c7cad482fa518231e4a02cd`  
**Application repair:** `7eead27263a1d560b9819abf37d71b974670e0bc`  
**Live revision:** `sf-proof-study-pacts--0000019`  
**Live URL:** https://proof-study-pacts.sociobot.in

## Result

**PASS.** `F-6-1` is fixed and protected by a repository-copy regression test.
Every finding from rounds 1–5 was rechecked through the clean suite and the
deployed product. The live health endpoint reports the application repair SHA,
and the SQLite service is fixed at one replica (`min=1`, `max=1`). No finding
of any severity remains open.

## Finding map

The evidence cells give the regression test, a retained screenshot path, and
the post-deploy live check. Bare screenshot filenames resolve under
`.factory/evidence/polish-6/`.

| Finding | Change made or preserved | Evidence: test · screenshot · live check |
| --- | --- | --- |
| `F-1-1` | Kept the accurate shared Markdown-note wording and complete export. | `@claim:markdown-export` · `.factory/evidence/polish-6/demo-mobile.png` · `/demo` download contained the theorem, roles, attempts, explanations, and proof states. |
| `F-1-2` | Kept History API scroll restoration, destination-h1 focus, and route announcement. | `direct routes update social metadata and history restores focus, announcement, and scroll` · `landing-mobile.png` · live Privacy → Back restored focus, announcement, and scroll. |
| `F-1-3` | Kept the designed missing page with a real HTTP 404 response. | `routes have titles, one h1, working deep links, and no console errors` · `not-found-mobile.png` · `/missing-page` returned 404. |
| `F-1-4` | Kept every visible public-route control at least 44 px. | `every visible interactive target is at least 44px on every public route` · `landing-mobile.png`, `demo-mobile.png`, `not-found-mobile.png` · live route sweep passed. |
| `F-1-5` | Kept real private-access-link storage namespaced in local storage. | `@claim:real-access-link-storage` · `landing-mobile.png` · live real-pact creation stored one namespaced key and preserved unrelated data. |
| `F-1-6` | Kept the recording-only boundary and acceptance of invalid Lean without a checker result. | `@claim:records-without-checking` · `demo-mobile.png` · live demo traffic stayed same-origin. |
| `F-1-7` | Kept README instructions free of unsupported guarantees; the root Dockerfile built in ACR. | clean `npm test`, `cargo build --release --locked`, and ACR run `chs4` · `landing-desktop.png` · `/health` returned the repair SHA. |
| `F-1-8` | Kept route-specific title, description, canonical, Open Graph, and Twitter metadata. | `direct routes update social metadata and history restores focus, announcement, and scroll` · `not-found-mobile.png` · live `/`, `/demo`, `/privacy`, `/terms`, and missing-route sweep passed. |
| `F-1-9` | Kept the former long README sentence split. | `README opens with the job and the catalog description is verb-first` · `landing-desktop.png` · live root copy remained within the audited limits. |
| `F-1-10` | Kept the literal first-screen label “Weekly Lean routine.” | mobile landing test · `landing-mobile.png` · visible on live `/`. |
| `F-1-11` | Kept the pact-form label “Create a pact.” | full browser suite · `landing-mobile.png` · visible on live `/#make`. |
| `F-1-12` | Kept Prover and Explainer named before pact creation. | `@claim:paired-roles` · `landing-mobile.png` · live real-pact flow assigned both roles after consent. |
| `F-1-13` | Kept “Three steps” as the process label. | copy audit and full browser suite · `landing-mobile.png` · visible on live `/`. |
| `F-1-14` | Kept the literal “What Proof Pact does not do” boundary. | `@claim:records-without-checking` · `landing-mobile.png` · visible on live `/`. |
| `F-1-15` | Kept direct `/demo` and `?demo=1` entry, the persistent banner, reset, and real-mode exit. | `@claim:demo-sandbox` · `demo-mobile.png` · live `/?demo=1` entered `/demo`, reset to a new ID, and left real data unchanged. |
| `F-1-16` | Kept “private access link” as the sole credential term. | `@claim:private-notes` and `@claim:real-access-link-storage` · `landing-mobile.png` · live private-link flow passed. |
| `F-1-17` | Kept “Markdown note” in visible copy and metadata. | `@claim:markdown-export` and route metadata test · `demo-mobile.png` · live export passed. |
| `F-1-18` | Kept the prefilled next-week action and local recent-pact history. | `completed pact starts a prefilled next-week pact and keeps local history` · `landing-mobile.png` · live completion flow restored both names. |
| `F-2-1` | Kept durable fresh-connection behavior and restored the deployed SQLite scale to `1/1`. | `fresh HTTP connections preserve demo create, read, save, reload, and export` · `demo-mobile.png` · live verifier completed 16 reads; revision settings report `1/1`. |
| `F-2-2` | Kept automatic replacement of stale demo sessions after 404 or 410. | `a saved demo returning 404 is replaced automatically` and its 410 sibling · `demo-mobile.png` · live stale ID was replaced with seeded data. |
| `F-2-3` | Kept export assertions for both proof bodies, explanations, roles, and every proof state. | `@claim:markdown-export` · `demo-mobile.png` · live downloaded Markdown passed the complete content check. |
| `F-2-4` | Kept cross-browser partner sharing with exact author and note fields. | `@claim:partner-note-sharing` · `demo-mobile.png` · live partner save and creator reload showed author, proof, explanation, and state. |
| `F-2-5` | Kept the disclosed data inventory, email rejection, and schema check. | `@claim:stored-data-inventory` and Rust `stored_data_schema_matches_privacy_inventory` · `landing-mobile.png` · live email field returned 422. |
| `F-2-6` | Kept “explanations in their own words” on the first screen. | mobile landing test and copy audit · `landing-mobile.png` · visible above the fold on live `/`. |
| `F-3-1` | Kept all selectable public exercises in one source list and checked every destination. | `release gate: every selectable public Lean exercise URL is available` · `landing-mobile.png` · the live verifier requested every selected URL successfully. |
| `F-4-1` | Kept “Page not found” as the missing-page h1 and the dial as decoration. | route test · `not-found-mobile.png` · live missing route returned 404 with the literal h1. |
| `F-4-2` | Kept literal pact and invitation error headings, reasons, and actions. | `pact and invitation errors use specific recovery copy without decorative labels` · `pact-error-mobile.png`, `join-error-mobile.png` · both live error routes passed. |
| `F-5-1` | Kept the banner, session title, both roles, and saved-attempt preview inside the first 390 × 844 demo viewport. | `one-click demo shows both roles and saved sample work in the first mobile viewport` and `@claim:demo-sandbox` · `demo-mobile.png` · all four live bounds were within 844 px. |
| `F-6-1` | Replaced the README brand-only h1 with “Work through one Lean proof with a partner,” rewrote the first sentence to name Proof Pact and its audience, and added a regression test. | `README opens with the job and the catalog description is verb-first` · `landing-desktop.png` confirms the product identity was preserved · live `/` recheck found no collateral copy or layout regression. |

## Verification evidence

- No-local-worktree clone: `/tmp/proof-pact-polish-6-clean.buB7WL/source` at
  `7eead27263a1d560b9819abf37d71b974670e0bc`.
- Every exact command in `.factory/claims.json` passed independently. The new
  registry gate also proves all 12 IDs are unique and occur in exactly one
  tagged test.
- Clean `npm test` passed: 3 Rust tests and 32 Playwright checks. Log:
  `/tmp/proof-pact-polish-6-full.log`.
- Clean `cargo build --release --locked` and `npm audit --audit-level=high`
  passed. Production JS is 28.27 kB raw / 9.16 kB gzip; CSS is 19.58 kB raw /
  5.12 kB gzip.
- Final `npm run verify:live` passed with no console errors and wrote the six
  screenshots above. Log: `/tmp/proof-pact-polish-6-live-rerun.log`.
- Worker verification passed with one h1, `lang=en`, a main landmark, complete
  alt text, labelled buttons, and no console errors:
  `/tmp/proof-pact-polish-6-verify/verify.json`.
- Live Lighthouse mobile: Performance 99, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.2 s, LCP 1.4 s, TBT 100 ms, CLS 0. Report:
  `/tmp/proof-pact-polish-6-lighthouse-mobile.json`.
- Live load smoke returned 100 × 200 in 313 ms (319 requests/second). A
  28-request write burst returned 20 × 200 and 8 × 429; every 429 included
  `Retry-After: 1`.

No finding of any severity remains unresolved.
