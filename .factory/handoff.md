# Proof Pact polish round 6 handoff

## Outcome

Round 6 is complete with zero known findings. The README now opens with the
job-specific h1 “Work through one Lean proof with a partner,” fixing `F-6-1`.
A new documentation test protects that heading, the verb-first catalog line,
the 120-character catalog limit, and the one-test-per-claim contract.

The deployed application commit is
`7eead27263a1d560b9819abf37d71b974670e0bc`. Azure revision
`sf-proof-study-pacts--0000019` serves it at
https://proof-study-pacts.sociobot.in, and `/health` returns that exact SHA.
Deployment scale is `minReplicas=1`, `maxReplicas=1` so the SQLite-backed pact
store is not split across instances.

## Verification

- Clean clone: `/tmp/proof-pact-polish-6-clean.buB7WL/source`.
- All 12 claim commands from `.factory/claims.json`: passed independently.
- `npm test`: passed — production build, 3 Rust tests, and 32 Playwright
  checks. Log: `/tmp/proof-pact-polish-6-full.log`.
- `cargo build --release --locked`: passed.
- `npm audit --audit-level=high`: passed with zero vulnerabilities.
- Build output: `frontend/dist/`; JS 28.27 kB raw / 9.16 kB gzip; CSS
  19.58 kB raw / 5.12 kB gzip.
- `npm run verify:live`: passed on the deployed SHA with zero console errors,
  16 fresh-connection reads, demo save/reload/export/reset, stale-demo
  recovery, partner sharing, route metadata, legal links, a true 404, all-route
  axe checks, 44 px targets, Back focus restoration, privacy, and offline
  reload. Log: `/tmp/proof-pact-polish-6-live-rerun.log`.
- Worker URL verification: passed; report at
  `/tmp/proof-pact-polish-6-verify/verify.json`.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100,
  SEO 100; FCP 1.2 s, LCP 1.4 s, TBT 100 ms, CLS 0. Report:
  `/tmp/proof-pact-polish-6-lighthouse-mobile.json`.
- Load/rate smoke: 100 health requests returned 100 × 200 in 313 ms; a
  28-write burst returned 20 × 200 and 8 × 429, all with `Retry-After: 1`.
- Cold live status sweep: `/`, `/demo`, `/?demo=1`, `/privacy`, and `/terms`
  returned 200; `/missing-page` returned 404; `robots.txt` and `sitemap.xml`
  returned 200. CSP and security headers are present.
- Screenshots: `.factory/evidence/polish-6/`.

Run locally with `npm ci && npm test`. Build the release container from the
root `Dockerfile` with `BUILD_SHA` set to the source commit.

## Known gaps and next steps

None. `.factory/polish-6.md` maps every cumulative finding to its repair and
fresh evidence. No severity is deferred.
