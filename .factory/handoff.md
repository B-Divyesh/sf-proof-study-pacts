# Proof Pact v1 handoff

## What was built

Proof Pact is a shared weekly study utility for two independent Lean 4
learners. The shipped flow supports:

- creating a pact from a curated public Lean exercise or another allowed public
  Lean link;
- naming one partner and requiring consent before partner-visible notes are
  stored;
- automatic Prover and Explainer roles;
- separate private member links whose raw access keys are never stored by the
  server;
- proof attempts with explanations and up to eight ordered proof-state
  snapshots;
- completion only after both member keys have submitted an attempt;
- Markdown export with the theorem, pair, roles, code, explanations, and proof
  states;
- an isolated `/demo` workspace with realistic sample learners and a 24-hour
  expiry;
- responsive landing, invite, workspace, privacy, terms, loading, empty,
  offline, error, and 404 states.

The Rust axum server owns the SQLite store and serves the built Vite frontend.
It applies same-origin CSP and security headers. Every API route is rate
limited by the first `X-Forwarded-For` hop. Write routes allow a burst of 20 per
second; read routes allow 40. Limited responses include `Retry-After: 1`.

## Visual system and assets

The mid-century instrument-panel system is documented in `design.md`. The
original paired proof-console illustration was generated on 2026-08-28 with
the factory image deployment and reviewed for text, logos, anatomy, seams, and
palette fit. The exact prompt is in `assets/src/hero-console.json`.

Shipped image sizes:

- mobile hero WebP: 25,494 bytes;
- desktop hero WebP: 71,336 bytes;
- 1200 × 630 social preview WebP: 63,280 bytes.

## Run and deploy

```sh
npm ci
npm run build
PORT=8080 DATABASE_PATH=./proof-pact.db cargo run
```

The exact frontend build command is `npm run build`. Its output is
`frontend/dist/`, with `index.html` at that root.

Container build:

```sh
docker build --build-arg BUILD_SHA=<source-commit> -t proof-pact .
docker run --rm -p 8080:8080 -v proof-pact-data:/data proof-pact
```

The multi-stage image uses Node 22, Rust 1.88, and a non-root distroless
runtime. It needs only `PORT`; all other settings have defaults. Persist
`/data` in production.

## Verification completed

- `npm test`: passed on 2026-08-28.
  - Rust: 2 tests passed.
  - Playwright 1.58.2: 14 tests passed in Chromium.
  - Covered both desktop and 390 × 844 mobile viewports.
  - Axe: no serious or critical findings on landing or demo.
  - Browser console: no errors across `/`, `/demo`, `/privacy`, `/terms`, or
    the designed 404 route.
  - Direct SPA route responses: HTTP 200.
  - All seven entries in `claims.json` have tagged browser tests.
- `cargo build --release --locked`: passed.
- Release size budgets:
  - initial JavaScript: 24.40 KB raw / 8.16 KB gzip;
  - CSS: 16.18 KB raw / 4.49 KB gzip;
  - fonts: 0 bytes; system stacks only;
  - mobile hero: 25.49 KB.
- Lighthouse 12.8.2, mobile defaults, local production build:
  - Performance: 100;
  - Accessibility: 100;
  - Best Practices: 100;
  - SEO: 100;
  - FCP: 1.1 s;
  - LCP: 1.4 s;
  - total blocking time: 30 ms;
  - CLS: 0.
- Load smoke: 100 concurrent `/health` requests with distinct forwarded IPs
  completed in under one second; 100 returned HTTP 200.
- Rate-limit smoke: a 28-request write burst returned HTTP 429 responses with
  `Retry-After: 1`.
- Generated artwork was visually reviewed at full resolution. Desktop and
  mobile full-page screenshots were also reviewed.

## Known gaps and next steps

- Member links are the only recovery method in v1. There are no accounts or
  email recovery. This is intentional for a small, low-friction pair tool.
- SQLite and the in-memory rate limiter assume one application replica. Move
  both concerns to shared infrastructure before horizontal scaling.
- The worker image did not include Docker, Podman, Buildah, or nerdctl. The
  release binary and frontend were built locally, but the final Dockerfile
  could not be executed inside this worker. The factory ACR build should be the
  next verification step.
- There is no reminder service or stranger matching. Both are outside the v1
  brief.
