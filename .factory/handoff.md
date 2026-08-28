# Polish round 1 handoff

## Outcome

Resolved F-1-1 through F-1-18 from `.factory/review-1.md`. The repaired commit
is the repository `HEAD`; it is built as the container image tag matching its
12-character Git SHA.

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
limit response headers. Production JS is 26.89 KB raw / 8.77 KB gzip.

## Deployment

The factory container work order uses `Dockerfile`, `PORT=8080`, ACR image
`sociobotregistry.azurecr.io/sf-proof-study-pacts:<git-sha>`, and Container App
`sf-proof-study-pacts` in resource group `sociobot`. Cold-live verification is
performed after the image update at
`https://proof-study-pacts.sociobot.in`.

## Known gaps

None. There are no AI features because the product’s job is deliberate human
proof explanation, and the reviewed next-step need is now covered by the
next-week pact flow.
