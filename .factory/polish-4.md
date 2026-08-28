# Polish round 4 — zero-finding closure

**Reviewed release candidate:** `6813dbe2725699f71939f731ff0841cd961bfdf5`  
**Review input:** `f1100cf279e6d79cb73bbcda80bfd47a86716c36`  
**Deployed application source:** `41c2c3fbf7946ebae24469eb19be33509c0e90fd`  
**Live revision:** `sf-proof-study-pacts--0000012`  
**Live URL:** https://proof-study-pacts.sociobot.in

## Result

**PASS.** Both round-4 findings are fixed, and every finding from rounds 1–3
was rechecked. No known finding remains open. The live health endpoint reports
the deployed application source SHA. The SQLite deployment is fixed at one
replica (`minReplicas=1`, `maxReplicas=1`).

## Finding map

| Finding | Change made or preserved | Evidence |
| --- | --- | --- |
| `F-1-1` | Kept the accurate shared Markdown-note caption and complete export. | `@claim:markdown-export`; live export in `npm run verify:live`; `/tmp/proof-pact-polish-4-live-final/demo-mobile.png`; live `/demo`. |
| `F-1-2` | Kept History API scroll restoration, destination h1 focus, and route announcement. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live Back check in `/tmp/proof-pact-polish-4-live-check-final.log`; live `/privacy` → Back. |
| `F-1-3` | Kept the designed missing page and a real HTTP 404 response. | `routes have titles, one h1, working deep links, and no console errors`; `/tmp/proof-pact-polish-4-live-final/not-found-mobile.png`; live `/missing-page` returned 404. |
| `F-1-4` | Kept every public-route control at least 44 px, including legal email links. | `every visible interactive target is at least 44px on every public route`; live route measurements in `npm run verify:live`; live `/privacy` and `/terms`. |
| `F-1-5` | Kept real private-access-link storage namespaced in local storage. | `@claim:real-access-link-storage`; exact clean-clone command log; live real-pact flow. |
| `F-1-6` | Kept the recording-only boundary and accepts invalid Lean without claiming a result. | `@claim:records-without-checking`; live same-origin request audit; live `/demo`. |
| `F-1-7` | Kept README instructions free of unsupported environment and runtime promises. | Clean-clone `npm test`; `cargo build --release --locked`; successful ACR build `chq0`. |
| `F-1-8` | Kept route-specific title, description, canonical, Open Graph, and Twitter metadata. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live public-route sweep. |
| `F-1-9` | Kept the former 23-word README sentence split into short sentences. | `.factory/copy-audit.md`; README source review. |
| `F-1-10` | Kept the first-screen label “Weekly Lean routine.” | `.factory/copy-audit.md`; `/tmp/proof-pact-polish-4-live-final/landing-mobile.png`; live `/`. |
| `F-1-11` | Kept the pact form label “Create a pact.” | `.factory/copy-audit.md`; landing screenshot; live `/#make`. |
| `F-1-12` | Kept Prover and Explainer named before pact creation. | `@claim:paired-roles`; live two-partner workflow. |
| `F-1-13` | Kept the process label “Three steps.” | `.factory/copy-audit.md`; `/tmp/proof-pact-polish-4-live-final/landing-desktop.png`. |
| `F-1-14` | Kept the literal capability boundary “What Proof Pact does not do.” | `@claim:records-without-checking`; landing screenshots; live `/`. |
| `F-1-15` | Kept one-click sample entry through `/demo` and `?demo=1`, with the persistent banner, reset, and real-mode exit. | `@claim:demo-sandbox`; live `/?demo=1` flow; `/tmp/proof-pact-polish-4-live-final/demo-mobile.png`. |
| `F-1-16` | Kept “private access link” as the sole credential term. | `@claim:private-notes`; `@claim:real-access-link-storage`; live workspace. |
| `F-1-17` | Kept “Markdown note” in visible copy and metadata. | `@claim:markdown-export`; route metadata test; live export. |
| `F-1-18` | Kept the prefilled next-week action and local recent-pact history. | `completed pact starts a prefilled next-week pact and keeps local history`; live two-partner completion flow. |
| `F-2-1` | Kept fresh-connection persistence and restored the deployed one-replica setting after rollout. | `fresh HTTP connections preserve demo create, read, save, reload, and export`; 16 live reads in `/tmp/proof-pact-polish-4-live-check-final.log`; `/tmp/proof-pact-polish-4-deploy.json`. |
| `F-2-2` | Kept automatic replacement of stale demo sessions after 404 or 410. | `a saved demo returning 404 is replaced automatically`; 410 sibling test; live stale-session check. |
| `F-2-3` | Kept export assertions for the theorem, roles, both proof bodies, both explanations, and every proof state. | `@claim:markdown-export`; exact clean-clone command; live downloaded Markdown check. |
| `F-2-4` | Kept cross-browser partner sharing with exact author and note fields. | `@claim:partner-note-sharing`; live two-partner save and reload. |
| `F-2-5` | Kept the declared storage inventory, email rejection, and schema check. | `@claim:stored-data-inventory`; Rust `stored_data_schema_matches_privacy_inventory`; live API rejection. |
| `F-2-6` | Kept “explanations in their own words” on the first screen. | `.factory/copy-audit.md`; first-screen assertion in `npm run verify:live`; landing screenshots. |
| `F-3-1` | Kept all selectable exercise URLs in one source list and checked every destination. | `release gate: every selectable public Lean exercise URL is available`; live selector crawl in `npm run verify:live`. |
| `F-4-1` | Removed “Reading 404,” changed the h1 to “Page not found,” and retained the broken dial only as hidden decorative art. | `routes have titles, one h1, working deep links, and no console errors`; live verifier exact-h1 assertion; `/tmp/proof-pact-polish-4-live-final/not-found-mobile.png`; live `/missing-page` returned 404. |
| `F-4-2` | Removed “The signal stopped” from generic errors while keeping each specific h1, reason, and recovery link. | `pact and invitation errors use specific recovery copy without decorative labels`; live `/pact/missing-review-4` and `/join/missing-review-4`; `/tmp/proof-pact-polish-4-live-final/pact-error-mobile.png`; `/tmp/proof-pact-polish-4-live-final/join-error-mobile.png`. |

## Claim and quality evidence

- Fresh clone: `/tmp/proof-pact-polish-4-clean.sw8Wo7`.
- Every exact command in `.factory/claims.json` passed independently; all 12
  `@claim:` tags occur exactly once. Combined output:
  `/tmp/proof-pact-polish-4-claims.log`.
- Full clean-clone `npm test` passed: 3 Rust tests and 28 Playwright tests.
  Output: `/tmp/proof-pact-polish-4-full.log`.
- `cargo build --release --locked` passed. Output:
  `/tmp/proof-pact-polish-4-cargo-release.log`.
- Production output is in `frontend/dist/`: initial JavaScript is 27.20 kB
  raw / 8.91 kB gzip; CSS is 16.88 kB raw / 4.61 kB gzip.
- Playwright axe found zero serious or critical violations on `/`, `/demo`,
  `/privacy`, `/terms`, and the missing route. Keyboard, 390 px fit, 44 px
  targets, offline policy reload, and same-origin request tests passed.
- Worker URL verification passed with no console errors:
  `/tmp/proof-pact-polish-4-live-verify/verify.json`.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 1.3 s, TBT 20 ms, CLS 0. Report:
  `/tmp/proof-pact-polish-4-live-lighthouse-mobile.json`.
- Live load smoke: 100 concurrent health requests returned 100 × 200 in
  282 ms. A 28-request write burst returned 20 × 200 and 8 × 429; every 429
  included `Retry-After: 1`. Evidence:
  `/tmp/proof-pact-polish-4-runtime.json`.

No finding of any severity remains unresolved.
