# Proof Pact polish round 4 handoff

## Outcome

Polish round 4 is complete with no known unresolved finding. The live product
at https://proof-study-pacts.sociobot.in serves application source
`41c2c3fbf7946ebae24469eb19be33509c0e90fd` from revision
`sf-proof-study-pacts--0000012`.

The 404 now says “Page not found.” Pact and invitation errors no longer show
the decorative “The signal stopped” label. Focused local and live checks lock
both repairs in place. All earlier review repairs remain intact, including the
plain first screen, isolated demo, claims, routing, metadata, mobile controls,
partner workflow, Markdown export, offline shell, and public exercise links.

The catalog description now reads: “Build a weekly Lean proof routine with a
partner, then export both attempts as a Markdown note.” It is verb-first and
95 characters.

## Verification

- Clean clone `/tmp/proof-pact-polish-4-clean.sw8Wo7`: `npm ci` passed.
- Every exact `.factory/claims.json` command passed independently (12/12).
  Evidence: `/tmp/proof-pact-polish-4-claims.log`.
- Clean-clone `npm test` passed: production build, 3 Rust tests, and 28
  Playwright tests. Evidence: `/tmp/proof-pact-polish-4-full.log`.
- `cargo build --release --locked` passed. Evidence:
  `/tmp/proof-pact-polish-4-cargo-release.log`.
- Build sizes: JavaScript 27.20 kB raw / 8.91 kB gzip; CSS 16.88 kB raw /
  4.61 kB gzip. Output is `frontend/dist/`.
- Local `/opt/fleet/lib/verify-url.sh` passed with no console errors and all
  structural checks. Evidence: `/tmp/proof-pact-polish-4-local-verify/verify.json`.
- Live `npm run verify:live` passed from a cold browser context. It covered
  `?demo=1`, reset, export, same-origin traffic, stale-demo recovery, route
  titles and metadata, 404 status and copy, both generic error paths, h1 focus,
  legal links, 44 px targets, axe, offline reload, two-partner sharing, and 16
  fresh-connection reads. Evidence:
  `/tmp/proof-pact-polish-4-live-check-final.log`.
- Live `/opt/fleet/lib/verify-url.sh` passed. Evidence:
  `/tmp/proof-pact-polish-4-live-verify/verify.json`.
- Live mobile Lighthouse scored 100 Performance, 100 Accessibility, 100 Best
  Practices, and 100 SEO. FCP was 1.1 s, LCP 1.3 s, TBT 20 ms, and CLS 0.
  Evidence: `/tmp/proof-pact-polish-4-live-lighthouse-mobile.json`.
- Live load smoke returned 100/100 health responses in 282 ms. A 28-request
  write burst returned 8 rate-limited responses, all with `Retry-After: 1`.
  Evidence: `/tmp/proof-pact-polish-4-runtime.json`.
- Live routes returned 200 for `/`, `/demo`, `/privacy`, `/terms`,
  `/robots.txt`, and `/sitemap.xml`; an unknown route returned 404.
- `GET /health` reports the exact deployed application source SHA.
- ACR build `chq0` succeeded. The deployed image is
  `sociobotregistry.azurecr.io/sf-proof-study-pacts:41c2c3fbf794`.
- Deployment scale is `minReplicas=1`, `maxReplicas=1`. Evidence:
  `/tmp/proof-pact-polish-4-deploy.json`.

Screenshots are in `/tmp/proof-pact-polish-4-live-final/`: landing mobile and
desktop, demo mobile, 404 mobile, pact-error mobile, and invitation-error
mobile.

## Run and verify

```sh
npm ci
npm test
cargo build --release --locked
npm run verify:live
```

## Known gaps and next steps

No known product or review gap remains. Keep the service at one replica while
it uses local SQLite; moving above one replica requires a shared datastore.
