# Polish round 1 handoff

## Outcome

Resolved F-1-1 through F-1-18 from `.factory/review-1.md`. The deployed repair
commit is `c0e1d3dedd3daa77ba9b05d4338e0d016902c6b2`; its image tag is
`c0e1d3dedd3d`.

## Run and verify

```sh
npm ci
npm test
docker build --build-arg BUILD_SHA=$(git rev-parse HEAD) -t proof-pact .
docker run --rm -p 8080:8080 -v proof-pact-data:/data proof-pact
```

`npm test` passed locally: Vite production build, 2 Rust unit tests, and 20
Playwright tests. Those tests cover all nine declared claims, demo query entry,
reset/real-mode isolation, Markdown export, request-origin privacy, invalid
Lean recording, 404 status, route metadata, history focus/announcement/scroll,
mobile 44 px targets, keyboard access, axe serious/critical issues, and rate
limit response headers. Production JS is 26.89 KB raw / 8.77 KB gzip. A fresh
clone at `/tmp/proof-pact-clean.YhYjoH` ran every exact `.factory/claims.json`
command separately after `npm ci`; all nine completed.

## Deployment

The factory container work order uses `Dockerfile`, `PORT=8080`, ACR image
`sociobotregistry.azurecr.io/sf-proof-study-pacts:<git-sha>`, and Container App
`sf-proof-study-pacts` in resource group `sociobot`. ACR build `chjp` succeeded
on 2026-08-28 and the live `/health` response reports the full deployed SHA.

Cold-live browser verification at `https://proof-study-pacts.sociobot.in`:

- `/` returned 200 with the plain-language first screen and 44 px mobile nav;
  screenshot: `/tmp/proof-pact-polish-1-live-mobile.png`.
- `/?demo=1` entered `/demo`, loaded sample data, and showed the persistent
  reset/start-real banner; screenshot: `/tmp/proof-pact-polish-1-live-demo.png`.
- `/missing-page` returned HTTP 404 with the designed recovery screen.
- Playwright Axe found zero serious or critical violations on `/`, `/demo`,
  `/privacy`, and `/terms`.

## Known gaps

None. There are no AI features because the product’s job is deliberate human
proof explanation, and the reviewed next-step need is now covered by the
next-week pact flow.
