# Polish round 2 handoff

## Outcome

All findings in `.factory/review-1.md` and `.factory/review-2.md` are resolved.
The mid-century instrument-panel identity is unchanged. The production release
includes repair implementation `067068962eebc04a59039daa0bc19e9315e5b748` at
`https://proof-study-pacts.sociobot.in`.

The demo now replaces missing or expired sessions automatically. Reset and
Start for real remain isolated from real browser data. Production is fixed at
one replica so its local SQLite store cannot split across responders. Raising
the replica count requires a shared datastore first.

The claim contract now includes partner note sharing, the stored-data
inventory, and offline page access. Export coverage asserts both exact
attempts, explanations, roles, the theorem, and every proof state. Privacy
copy lists persisted operational fields, and requests containing an email
field are rejected.

## Verification

- `npm test`: PASS — 3 Rust tests and 26 Playwright tests.
- `npm run build`: PASS — `frontend/dist/` produced 27.29 kB raw / 8.94 kB
  gzip JavaScript and 16.88 kB raw / 4.61 kB gzip CSS.
- Every one of the 12 exact `.factory/claims.json` commands: PASS from clean
  clone `/tmp/proof-pact-polish-2-clean.wY5UA3`. Full output:
  `/tmp/proof-pact-polish-2-claims.log`.
- `npm run verify:live`: PASS against the cold live URL. It covers first-screen
  copy, demo isolation/reset/reload/export, stale recovery, 16 fresh-connection
  reads, partner sync, next-week prefill, all-route titles/canonicals/social
  metadata/404s, history focus/announcement/scroll, 44 px targets, axe,
  same-origin traffic, email rejection, offline reload, and console errors.
- `/opt/fleet/lib/verify-url.sh`: PASS. Evidence:
  `/tmp/proof-pact-polish-2-verify/verify.json` and its desktop/mobile images.
- Lighthouse 12.8.2 mobile: performance 100, accessibility 100, LCP 1.3 s,
  CLS 0, TBT 20 ms. Desktop: performance 100, accessibility 100, LCP 0.4 s,
  CLS 0, TBT 0 ms.
- Live load smoke: 100 concurrent `/health` requests completed in 334 ms
  (300 requests/second), all with HTTP 200. Evidence:
  `/tmp/proof-pact-polish-2-load.json`.
- Final ACR build `chm5`: PASS. `/health` returns build SHA
  `b37ebdb8a24933e24750295c3c2e01b853c911c2`.
- Azure revision `sf-proof-study-pacts--0000006`: min replicas 1, max replicas
  1. Eight reads before and eight reads after a cross-connection save all
  retained the demo; cross-connection export retained the new proof state.
- Live screenshots: `/tmp/proof-pact-polish-2-live/landing-mobile.png`,
  `/tmp/proof-pact-polish-2-live/landing-desktop.png`, and
  `/tmp/proof-pact-polish-2-live/demo-mobile.png`.

## Run locally

```sh
npm ci
npm test
```

Run the deployed release gate with:

```sh
npm run verify:live
```

## Known gaps

None for this work order. Keep the production replica maximum at one while the
service uses local SQLite.
