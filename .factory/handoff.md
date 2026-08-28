# Review round 4 handoff — FAIL

## Outcome

Adversarial review 4 is recorded in `.factory/review-4.md` against live and
source build `6813dbe2725699f71939f731ff0841cd961bfdf5`. The product works end to
end, but the review remains FAIL because two minor plain-language findings
remain: the designed 404 h1 says “This dial points nowhere,” and generic error
pages add “The signal stopped.” No product code was changed.

## Verification

- Cold live checks passed at 390 × 844 and 1440 × 900.
- The one-click demo opened realistic Mira/Theo work, reset to a new isolated
  workspace, preserved real local storage, and used only same-origin requests.
- Every exact command in `.factory/claims.json` passed separately from clean
  clone `/tmp/proof-pact-review-4-clean.FgJjaY`.
- Full clean-clone `npm test` passed: 3 Rust tests and 27 Playwright tests.
- `npm run verify:live` passed, including 16 fresh-connection reads.
- `/opt/fleet/lib/verify-url.sh` passed; evidence is
  `/tmp/proof-pact-review-4-verify.NXyl7z/verify.json`.
- Live axe checks found no serious or critical findings on the root, demo,
  Privacy, Terms, or missing route.
- All landing links and all three selectable public Lean exercise URLs
  returned HTTP 200. An unknown product route returned HTTP 404.

## Remaining work

Resolve `F-4-1` and `F-4-2` exactly as specified in the review, add focused
copy assertions, then rerun the entire review. These are the only confirmed
gaps in round 4.

## Reproduce

```sh
npm ci
npm test
npm run verify:live
```
