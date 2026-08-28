# Review 3 handoff

## Outcome

This review made no product-code changes. It wrote `.factory/review-3.md` and found one remaining major issue: the selectable “Theorem Proving in Lean — Rewriting” exercise uses a URL that returns HTTP 404. The review verdict is **FAIL** until that dead link is replaced and protected by a release test.

## Verification

- Fresh live cold-read checks passed at 390 × 844 and 1440 × 900: the job, audience, and sample-data action are clear before scrolling.
- `npm run verify:live`: PASS against the deployed URL, including demo reset, fresh-connection persistence, partner sharing, route metadata, 404, mobile targets, axe, privacy traffic, and offline shell behavior.
- From clean clone `/tmp/proof-pact-review-3.HeNMeZ`: `npm test` passed with three Rust tests and 26 Playwright tests; all 12 exact claim commands passed independently; `npm run build` produced `dist/`.
- Direct link crawl found the configured Lean rewriting URL returning HTTP 404; the replacement `https://lean-lang.org/theorem_proving_in_lean4/Tactics/` returned HTTP 200.

## Run locally

```sh
npm ci
npm test
npm run verify:live
```

## Known gap and next step

Replace the stale rewriting-exercise URL in `frontend/src/main.ts` and add an automated availability check for every selectable public exercise. Then rerun the review and claim suite.
