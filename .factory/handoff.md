# Review 5 handoff

## Outcome

Review 5 is **FAIL** with one blocking finding: `F-5-1` in
`.factory/review-5.md`. The live one-click demo is isolated and functional, but
at the required 390 × 844 mobile viewport it initially shows only the demo
banner, header, theorem, and source link. The seeded roles and attempts are
below the fold, so the first demo screen does not prove the product is being
used with realistic sample data.

No product code was changed in this review. The only repository changes are
this handoff and `.factory/review-5.md`.

## Verification

- Fresh live landing checks at 390 × 844 and 1440 × 900 confirmed clear job,
  audience, and first action without scrolling; no console errors or
  third-party initial-load requests occurred.
- Live demo confirmed `/demo`, realistic seeded data, persistent demo banner,
  same-origin requests, reset to a new `demo-*` workspace, and no mutation of a
  real-data `localStorage` sentinel.
- Every exact command declared by `.factory/claims.json` passed independently
  in clean clone `/tmp/proof-pact-review-5.q3MEVu` (12/12).
- Full clean-clone `npm test` passed: build, 3 Rust tests, and 28 Playwright
  tests.
- Public routes, 404 status, headers, metadata, internal/external links,
  history/focus behavior, and every prior review finding were rechecked.

## Run and verify

```sh
npm ci
npm test
npm run verify:live
```

## Next step

Repair `F-5-1`: redesign the demo’s mobile above-the-fold order so both named
roles and at least one real sample attempt are visible immediately after the
landing action. Add an initial-viewport Playwright assertion for that outcome,
then rerun the complete adversarial review.
