# Polish round 3 — zero-finding closure

**Reviewed release candidate:** `67602fa0671b1c87c8512956d0c3cf1b0636f13a`  
**Review input:** `c1afff58932889db84fa689f59c1e37e934c7b53`  
**Released source:** `6ea8d986f8ef90c69df7caf290ed960ddb74e6db`  
**Live URL:** https://proof-study-pacts.sociobot.in

## Result

**PASS.** This round repaired `F-3-1` and rechecked every earlier finding.
The live `/health` endpoint reports the released source SHA. The deployed
SQLite service is deliberately fixed at one replica (`minReplicas=1`,
`maxReplicas=1`).

## Evidence used throughout

- Clean clone `/tmp/proof-pact-polish-3-clean`: every claim command passed
  separately; full `npm test` passed with 3 Rust and 27 Playwright tests;
  `cargo build --release --locked` passed.
- Live check passed twice: `npm run verify:live`, evidence directories
  `/tmp/proof-pact-polish-3-live-rerun` and
  `/tmp/proof-pact-polish-3-live-stability`.
- Live screenshots: `landing-mobile.png`, `demo-mobile.png`, and
  `landing-desktop.png` in the rerun directory. The repaired selector is in
  `/tmp/proof-pact-polish-3-live-rerun/rewriting-exercise.png`.
- `/opt/fleet/lib/verify-url.sh` passed with
  `/tmp/proof-pact-polish-3-verify/verify.json`.

## Finding map

| Finding | Change made or preserved | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved the accurate shared-Markdown-note caption. | `@claim:markdown-export`; live demo/export; `demo-mobile.png`. |
| F-1-2 | Preserved back-navigation scroll restoration, focused h1, and route announcement. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live `/privacy` → Back check. |
| F-1-3 | Preserved the designed unknown-route page with HTTP 404. | `routes have titles, one h1, working deep links, and no console errors`; live `/missing-page`. |
| F-1-4 | Preserved 44 px targets on every public route, including legal links. | `every visible interactive target is at least 44px on every public route`; live `/`, `/demo`, `/privacy`, `/terms`, `/missing-page`. |
| F-1-5 | Preserved namespaced private-access-link storage. | `@claim:real-access-link-storage`; live real-pact flow. |
| F-1-6 | Preserved recording without proof-checking claims or model traffic. | `@claim:records-without-checking`; live demo request log. |
| F-1-7 | Preserved runnable README instructions without unsupported guarantees. | Clean-clone `npm test`; `cargo build --release --locked`. |
| F-1-8 | Preserved route-specific title, description, canonical, OG, and Twitter metadata. | `direct routes update social metadata and history restores focus, announcement, and scroll`; live public-route sweep. |
| F-1-9 | Preserved the split README sentence. | `.factory/copy-audit.md`; README source review. |
| F-1-10 | Preserved `Weekly Lean routine` as the hero label. | `.factory/copy-audit.md`; `landing-mobile.png`. |
| F-1-11 | Preserved `Create a pact` as the form label. | `.factory/copy-audit.md`; live landing form. |
| F-1-12 | Preserved explicit Prover and Explainer roles before pact creation. | `@claim:paired-roles`; live real-pact flow. |
| F-1-13 | Preserved `Three steps` as the process label. | `.factory/copy-audit.md`; `landing-desktop.png`. |
| F-1-14 | Preserved the plain-language capability boundary. | `@claim:records-without-checking`; live landing. |
| F-1-15 | Preserved `/demo` and one-click `?demo=1` entry with consistent demo wording. | `@claim:demo-sandbox`; live `?demo=1`; `demo-mobile.png`. |
| F-1-16 | Preserved `private access link` as the sole credential term. | `@claim:private-notes`; `@claim:real-access-link-storage`; live workspace. |
| F-1-17 | Preserved `Markdown note` in visible and route metadata copy. | `@claim:markdown-export`; direct-route metadata test. |
| F-1-18 | Preserved prefilled next-week pact creation and local recent-pact history. | `completed pact starts a prefilled next-week pact and keeps local history`; live real-pact flow. |
| F-2-1 | Preserved fresh-connection persistence and deployed one-replica SQLite operation. | `fresh HTTP connections preserve demo create, read, save, reload, and export`; live 16-read check; revision `sf-proof-study-pacts--0000009`. |
| F-2-2 | Preserved automatic recovery from stale demo 404/410 sessions. | `a saved demo returning 404 is replaced automatically`; 410 sibling; live stale-demo check. |
| F-1-4 (reopened) | Rechecked the previously reopened legal and consent targets. | Public-route target test; live policy-route sweep. |
| F-2-3 | Preserved comprehensive Markdown export assertions. | `@claim:markdown-export`; live download validation. |
| F-2-4 | Preserved partner-attributed note sharing after reload. | `@claim:partner-note-sharing`; live partner round trip. |
| F-2-5 | Preserved disclosed storage inventory and email rejection. | `@claim:stored-data-inventory`; Rust `stored_data_schema_matches_privacy_inventory`; live API rejection. |
| F-2-6 | Preserved `explanations in their own words` on the first screen. | `.factory/copy-audit.md`; `landing-mobile.png`; live copy check. |
| F-3-1 | Replaced the retired Rewriting URL with Lean’s maintained Tactics page. Moved all built-in sources to `frontend/src/exercises.ts`; the release and live verifiers now request every selector URL. | Clean-clone `release gate: every selectable public Lean exercise URL is available`; live `npm run verify:live`; `rewriting-exercise.png`; selected URL returned HTTP 200. |

No finding of any severity remains open.
