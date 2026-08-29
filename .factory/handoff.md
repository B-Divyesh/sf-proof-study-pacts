# Proof Pact polish round 5 handoff

## Outcome

Round 5 is complete with no known gap. The released demo now proves the
product on its first 390 × 844 screen: the persistent sandbox banner, both
partner roles, and Mira's saved attempt appear before theorem details. The
warm enamel and dark-green proof-console identity is unchanged.

All findings from reviews 1–5 are mapped to code and evidence in
`.factory/polish-5.md`. The cumulative fixes for claims, copy, routing, titles,
metadata, focus, 404 status, legal links, demo isolation, partner sharing,
mobile targets, exercise links, errors, offline behavior, and rate limiting
remain covered.

## How to run and verify

```sh
npm ci
npm test
cargo build --release --locked
npm run verify:live
```

Every exact claim command is listed in `.factory/claims.json`. The direct demo
URLs are `/?demo=1` and `/demo`. Reset uses a new `demo-*` workspace and never
touches real pact keys.

## Exact evidence

- Clean clone `/tmp/proof-pact-polish-5-clean.t6ecyW`: all 12 claim commands
  passed independently; `npm test` passed 3 Rust and 30 Playwright tests.
- Release build: `cargo build --release --locked` passed. Vite emitted
  28.27 kB raw / 9.16 kB gzip JavaScript and 19.58 kB raw / 5.12 kB gzip CSS.
- Dependency audit: zero known vulnerabilities.
- Live URL: https://proof-study-pacts.sociobot.in.
- Deployed source: `8228b18bcaf698f253d4759c61c31741be69fe73`;
  `/health` reports that exact SHA.
- Live container revision: `sf-proof-study-pacts--0000017`, constrained to
  one replica for SQLite consistency.
- Live cold mobile bounds: role labels y=282; saved-attempt preview y=337–512
  in a 390 × 844 viewport. Screenshot:
  `.factory/evidence/polish-5/demo-mobile-live.png`.
- `npm run verify:live`: passed with zero browser errors and 16
  fresh-connection reads. It also covered demo save/reload/export/reset,
  partner sync, titles, metadata, Back focus and announcement, 404, legal
  links, same-origin privacy, axe, touch targets, and offline policy reload.
- `/opt/fleet/lib/verify-url.sh`: passed; evidence is
  `/tmp/proof-pact-polish-5-verify/verify.json`.
- Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; FCP 1.2 s, LCP 1.4 s, TBT 80 ms, CLS 0.
- Load smoke: 100 health requests returned 100 × 200 in 319 ms (313 rps).
  Rate-limit smoke: 20 × 200 and 8 × 429; every 429 returned `Retry-After: 1`.

## Known gaps and next steps

None. The deployment must remain at one replica while it uses local SQLite;
the deployed configuration is `minReplicas=1`, `maxReplicas=1`.
