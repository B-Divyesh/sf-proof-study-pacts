# Polish round 5 — zero-finding closure

**Reviewed release candidate:** `0603252c504ab1590aed45a121ba19abfd99f0d7`  
**Review input:** `ed9c1690aa429612126ef7d0d65b596b28faed51`  
**Application repair:** `cd41527188cdd0e3a334c6564c743d7c104e30c7`  
**Live URL:** https://proof-study-pacts.sociobot.in

## Result

**PASS.** `F-5-1` is fixed, and every earlier finding was rechecked. The
one-click mobile demo now puts its banner, session title, both named roles, and
a complete saved-attempt preview in the initial 390 × 844 viewport. Full
theorem and source details follow below it. No finding remains open.

## Finding map

| Finding | Change made or preserved | Evidence |
| --- | --- | --- |
| `F-1-1` | Kept the accurate shared Markdown-note caption and complete export. | `@claim:markdown-export`; live export in `npm run verify:live`. |
| `F-1-2` | Kept History API scroll restoration, destination h1 focus, and route announcement. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live Back check. |
| `F-1-3` | Kept the designed missing page with a real HTTP 404 response. | `routes have titles, one h1, working deep links, and no console errors`; live `/missing-page`. |
| `F-1-4` | Kept every public-route control at least 44 px, including policy email links and demo actions. | `every visible interactive target is at least 44px on every public route`; live route sweep. |
| `F-1-5` | Kept real private-access-link storage namespaced in local storage. | `@claim:real-access-link-storage`; live real-pact flow. |
| `F-1-6` | Kept the recording-only boundary and acceptance of invalid Lean without a correctness claim. | `@claim:records-without-checking`; same-origin request audit. |
| `F-1-7` | Kept README instructions free of unsupported guarantees. | Clean-clone `npm test`; `cargo build --release --locked`; container health check. |
| `F-1-8` | Kept route-specific title, description, canonical, Open Graph, and Twitter metadata. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live route sweep. |
| `F-1-9` | Kept the former 23-word README sentence split. | `.factory/copy-audit.md`; source review. |
| `F-1-10` | Kept the literal first-screen label “Weekly Lean routine.” | `.factory/copy-audit.md`; live landing screenshot. |
| `F-1-11` | Kept the pact form label “Create a pact.” | `.factory/copy-audit.md`; live landing. |
| `F-1-12` | Kept Prover and Explainer named before pact creation. | `@claim:paired-roles`; live two-partner flow. |
| `F-1-13` | Kept “Three steps” as the procedure label. | `.factory/copy-audit.md`; live landing. |
| `F-1-14` | Kept the literal capability boundary “What Proof Pact does not do.” | `@claim:records-without-checking`; live landing. |
| `F-1-15` | Kept one-click entry through `/demo` and `?demo=1`, the persistent banner, Reset demo, and Start for real. | `@claim:demo-sandbox`; live `/?demo=1`; `.factory/evidence/polish-5/demo-mobile-live.png`. |
| `F-1-16` | Kept “private access link” as the sole credential term. | `@claim:private-notes`; `@claim:real-access-link-storage`. |
| `F-1-17` | Kept “Markdown note” in visible copy and metadata. | `@claim:markdown-export`; route metadata test. |
| `F-1-18` | Kept the prefilled next-week action and local recent-pact history. | `completed pact starts a prefilled next-week pact and keeps local history`; live completion flow. |
| `F-2-1` | Kept fresh-connection persistence and the deployed SQLite service at one replica. | `fresh HTTP connections preserve demo create, read, save, reload, and export`; 16 live reads; live scale `1/1`. |
| `F-2-2` | Kept automatic replacement of stale demo sessions after 404 or 410. | `a saved demo returning 404 is replaced automatically`; 410 sibling; live stale-session recovery. |
| `F-2-3` | Kept export assertions for both proof bodies, both explanations, both roles, and every proof state. | `@claim:markdown-export`; live downloaded Markdown check. |
| `F-2-4` | Kept cross-browser partner sharing with exact author and note fields. | `@claim:partner-note-sharing`; live partner save and reload. |
| `F-2-5` | Kept the declared storage inventory, email rejection, and schema check. | `@claim:stored-data-inventory`; Rust `stored_data_schema_matches_privacy_inventory`; live API rejection. |
| `F-2-6` | Kept “explanations in their own words” on the first screen. | `.factory/copy-audit.md`; live first-screen check. |
| `F-3-1` | Kept every selectable exercise in one source list and checked every destination. | `release gate: every selectable public Lean exercise URL is available`; live selector crawl. |
| `F-4-1` | Kept “Page not found” as the 404 h1 and the dial as decoration only. | `routes have titles, one h1, working deep links, and no console errors`; live 404 check. |
| `F-4-2` | Kept literal pact and invitation error headings, reasons, and recovery actions without mood labels. | `pact and invitation errors use specific recovery copy without decorative labels`; live error-state checks. |
| `F-5-1` | Added an evidence-first demo summary, compact mobile banner, both exact role labels, a real saved-attempt preview, and deferred theorem details. Strengthened the demo claim and live verifier with complete initial-viewport bounds. | `one-click demo shows both roles and saved sample work in the first mobile viewport`; `@claim:demo-sandbox`; local and live screenshots in `.factory/evidence/polish-5/`; live preview y=337–512 within 844 px. |

## Verification evidence

- Clean clone: `/tmp/proof-pact-polish-5-clean.t6ecyW` at application commit
  `cd41527188cdd0e3a334c6564c743d7c104e30c7`.
- Every exact command in `.factory/claims.json` passed independently. All 12
  claim tags occur exactly once. Log: `/tmp/proof-pact-polish-5-claims.log`.
- Clean full `npm test` passed: 3 Rust tests and 30 Playwright tests. Log:
  `/tmp/proof-pact-polish-5-full.log`.
- `cargo build --release --locked` and `npm audit --audit-level=high` passed.
- Initial JavaScript is 28.27 kB raw / 9.16 kB gzip. CSS is 19.58 kB raw /
  5.12 kB gzip.
- The live verifier passed with zero console errors, 16 fresh-connection reads,
  demo save/reload/export/reset, partner sharing, route metadata, legal links,
  404 status, axe, 44 px targets, focus restoration, and offline reload. Log:
  `/tmp/proof-pact-polish-5-live-check.log`.
- Worker URL verification passed at
  `/tmp/proof-pact-polish-5-verify/verify.json`.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.2 s, LCP 1.4 s, TBT 80 ms, CLS 0. Report:
  `/tmp/proof-pact-polish-5-lighthouse-mobile.json`.
- Live load smoke returned 100 × 200 in 319 ms (313 requests/second). A
  28-request write burst returned 20 × 200 and 8 × 429; every 429 had
  `Retry-After: 1`.

No finding of any severity remains unresolved.
