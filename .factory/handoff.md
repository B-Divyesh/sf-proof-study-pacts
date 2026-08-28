# Adversarial review 2 handoff

## Outcome

Completed a read-only product review of live build
`5d6343eb462b6bd2cb89548401e148150a4014df`. The verdict in
`.factory/review-2.md` is **FAIL**: six new findings and reopened `F-1-4`.
No product code was changed.

The primary blocker is deployed backend state: a demo created successfully on
one request returns 404 on the next authenticated read. A cold browser reload
changed a complete sample workspace into “The sample pact did not load.” The
behavior reproduced across six fresh demo IDs and can also prevent export.

## Verification performed

- Cold live visits at 390 × 844 and 1440 × 900, before scrolling.
- One-click demo entry, seeded data, banner, Reset demo, Start for real,
  storage namespace, and real-data sentinel checks.
- Live request logging through demo save/export; all requests were same-origin.
- Live route metadata, 404 status, history focus/announcement/scroll, link
  crawl, viewport fit, and interactive-target measurements.
- Axe checks on `/`, `/demo`, `/privacy`, `/terms`, and a missing route: zero
  serious or critical violations.
- `/opt/fleet/lib/verify-url.sh`: PASS with no console errors.
- Fresh clone at `/tmp/proof-pact-review-2-clean.YCirwY`: every exact command
  in `.factory/claims.json` passed separately after `npm ci`.
- Full fresh-clone `npm test`: PASS — two Rust tests and 20 Playwright tests.
- Production build output: 26.89 kB JS raw / 8.77 kB gzip.
- Every `F-1-1` through `F-1-18` finding was rechecked against live behavior
  and source; `F-1-4` is reopened because policy email links remain 17 px high.

Run the repository checks with:

```sh
npm ci
npm test
```

Run any individual claim with its exact command from `.factory/claims.json`,
for example `npm test -- --grep @claim:demo-sandbox`.

## Known gaps and next steps

See `.factory/review-2.md` for exact evidence and fixes. In priority order:

1. Move live pact state to a datastore shared by every replica, then gate the
   deployment with a fresh-connection create/read/save/export test.
2. Clear or replace stale demo IDs on 404/410 and keep a working Reset demo
   action in the error state.
3. Finish the 44 px target repair on Privacy and Terms.
4. Strengthen the Markdown claim test and add claim coverage for partner note
   sharing and the privacy data inventory.
5. Replace the subjective phrase “clear explanations.”

No AI feature is recommended. Export, partner sync, and recurring pacts are
the correct leverage points; the existing sync must become reliable first.
