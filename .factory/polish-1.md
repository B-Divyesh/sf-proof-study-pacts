# Polish round 1

Base reviewed: `dd9453fa8cf1c85c1d596349c37301d8ef6d4acd`. Review source:
`.factory/review-1.md` at `f531a230387bad2fc382c8effc873ea9d2a8aae0`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Replaced the false shared-explanation caption with the actual shared Markdown output. | `@claim:markdown-export` |
| F-1-2 | Stored per-route scroll, restored it on `popstate`, and focused/announced the destination h1. | `direct routes update social metadata and history restores focus, announcement, and scroll` |
| F-1-3 | Explicit SPA routes return 200; the designed fallback shell returns HTTP 404. | `routes have titles, one h1, working deep links, and no console errors` |
| F-1-4 | Made header, footer, public-exercise, and wordmark links 44 px targets. | `primary links and controls meet the 44px touch target baseline` |
| F-1-5 | Used “private access link” consistently and declared/tested browser storage. | `@claim:real-access-link-storage` |
| F-1-6 | Rewrote the safety boundary as “records your work; run Lean to check it” and tested invalid Lean recording. | `@claim:records-without-checking` |
| F-1-7 | Removed untestable version/runtime promises from README; retained runnable instructions. | README copy audit and `npm test` |
| F-1-8 | Route metadata now updates title, description, canonical, OG, Twitter title/description, and URL. | `direct routes update social metadata and history restores focus, announcement, and scroll` |
| F-1-9 | Split the README’s 23-word sentence. | `.factory/copy-audit.md` |
| F-1-10 | Changed “Pair protocol 01” to “Weekly Lean routine.” | `.factory/copy-audit.md` |
| F-1-11 | Changed “Set the weekly dial” to “Create a pact.” | `.factory/copy-audit.md` |
| F-1-12 | Names the Prover and Explainer roles before the form. | `.factory/copy-audit.md`; `@claim:paired-roles` |
| F-1-13 | Changed “Three readings” to “Three steps.” | `.factory/copy-audit.md` |
| F-1-14 | Changed “Instrument limits” to “What Proof Pact does not do.” | `.factory/copy-audit.md` |
| F-1-15 | Kept the required action wording and calls the sandbox “demo” everywhere else. `?demo=1` enters it directly. | `@claim:demo-sandbox` |
| F-1-16 | Standardized all access credential copy as “private access link.” | `@claim:private-notes`; `@claim:real-access-link-storage` |
| F-1-17 | Replaced subjective “clear session note” metadata with “Markdown note.” | direct-route metadata test |
| F-1-18 | Completed real pacts now offer “Create next week’s pact,” prefilled with the partner and next date; prior pacts appear locally. | `completed pact starts a prefilled next-week pact and keeps local history` |

Local evidence: `npm test` passed (2 Rust tests and 20 Playwright tests), including axe checks, privacy request checks, 390 px layout, keyboard, rate limiting, routing, and every claim tag. A fresh clone at `/tmp/proof-pact-clean.YhYjoH` ran all nine exact claim commands after `npm ci`. ACR build `chjp` deployed `c0e1d3dedd3d` to the Container App. Cold-live checks at `https://proof-study-pacts.sociobot.in` passed: `/` 200, `/?demo=1` → `/demo` with banner, and `/missing-page` 404. Screenshots: `/tmp/proof-pact-polish-1-live-mobile.png` and `/tmp/proof-pact-polish-1-live-demo.png`.
