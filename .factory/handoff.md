# Polish round 3 handoff — PASS

## Outcome

The released product is repaired and live. Deployed source commit
`6ea8d986f8ef90c69df7caf290ed960ddb74e6db` replaces the stale selectable
Theorem Proving in Lean Rewriting URL with the maintained
`https://lean-lang.org/theorem_proving_in_lean4/Tactics/` page. The selectable
exercise list is now a single source module and a release test requests every
listed source, so a dead built-in exercise link blocks release.

The service reports that exact source commit at
`https://proof-study-pacts.sociobot.in/health`. It is deployed as Container App
revision `sf-proof-study-pacts--0000009` with one minimum and one maximum
replica, which preserves the SQLite-backed demo and pact persistence contract.

## Verification

- Clean clone: `/tmp/proof-pact-polish-3-clean` at
  `6ea8d986f8ef90c69df7caf290ed960ddb74e6db`; `npm ci --no-audit --no-fund`
  passed.
- Every exact command in `.factory/claims.json` passed separately from that
  clone: `free-access`, `demo-sandbox`, `markdown-export`,
  `same-origin-privacy`, `demo-expiry`, `private-notes`, `paired-roles`,
  `real-access-link-storage`, `records-without-checking`,
  `partner-note-sharing`, `stored-data-inventory`, and `offline-shell`.
- Clean-clone `npm test`: PASS — production build, 3 Rust tests, and 27
  Playwright tests. This includes the new
  `release gate: every selectable public Lean exercise URL is available` test.
  Production assets: JavaScript 27.29 kB raw / 8.95 kB gzip; CSS 16.88 kB raw
  / 4.61 kB gzip.
- Clean-clone `cargo build --release --locked`: PASS.
- Live `npm run verify:live`: PASS twice, with no browser errors, against the
  deployed URL. Evidence: `/tmp/proof-pact-polish-3-live-rerun` and
  `/tmp/proof-pact-polish-3-live-stability`. It verifies the cold first screen,
  `?demo=1`, isolated/resettable demo data, Markdown export, stale-demo
  recovery, partner sharing, titles/canonicals/social metadata, 404 status,
  44 px controls, focus/history restoration, route axe checks, same-origin
  traffic, and the offline shell.
- The live verifier switches every selector option, reads the displayed URL,
  and requires its public source to return 2xx/3xx. The Rewriting selection was
  separately checked at HTTP 200; screenshot:
  `/tmp/proof-pact-polish-3-live-rerun/rewriting-exercise.png`.
- `/opt/fleet/lib/verify-url.sh https://proof-study-pacts.sociobot.in
  /tmp/proof-pact-polish-3-verify`: PASS — title, `lang=en`, one h1, main
  landmark, complete image alt text, and no console errors. Its evidence is
  `/tmp/proof-pact-polish-3-verify/verify.json`.
- Playwright axe checks found zero serious or critical findings on `/`,
  `/demo`, `/privacy`, `/terms`, and the designed missing-page route, locally
  and live.
- Live Lighthouse mobile report:
  `/tmp/proof-pact-polish-3-lighthouse-mobile.json` — Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.4 s,
  CLS 0, TBT 0 ms.
- Live write-rate burst: 28 `/api/demo` requests yielded 20 × 200 and 8 × 429;
  every 429 returned `Retry-After: 1`.

## Run locally

```sh
npm ci
npm test
cargo build --release --locked
```

Run the deployed-product verifier with:

```sh
npm run verify:live
```

## Known gaps

None. The standalone `@axe-core/cli` could not launch its Selenium Chrome in
this worker image, so accessibility was verified through the shipped
Playwright axe integration and the live route verifier instead.

## Next steps

Keep the built-in exercise release gate in the normal release suite. It will
fail promptly if an upstream public Lean lesson moves again.
