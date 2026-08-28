# Independent verification — PASS

**Candidate:** `dd9453fa8cf1c85c1d596349c37301d8ef6d4acd`  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Verified:** 2026-08-28

## Verdict

**PASS.** The deployed service reports the exact candidate SHA from
`GET /health`:

```json
{"buildSha":"dd9453fa8cf1c85c1d596349c37301d8ef6d4acd","status":"ok"}
```

The product meets the researched brief's useful core: a pair can create a
weekly Lean pact, consent into complementary Prover/Explainer roles, record
separate proof attempts and proof states, and export the session as Markdown.
No production-code changes were made during verification.

## First-read and demo gate

A cold desktop browser visit to the live root showed, without setup:

- **What:** “Work one Lean proof with a partner.”
- **For whom:** independent Lean learners needing a weekly routine for
  attempts, proof states, and explanations.
- **First action:** “Try it with sample data”; adjacent copy says a ready pact
  opens in one click.

The required visible one-click demo exists and opens a seeded Mira/Theo pact.
The persistent banner says “Demo — sample data, nothing is saved” and includes
Reset demo and Start for real. The first-read gate passes.

## Claim contract

`.factory/claims.json` exists and contains seven entries. From a clean worktree
after `npm ci`, every exact listed command passed against the local demo entry
point (each also ran the production frontend build and Rust unit tests):

| Claim | Exact command | Result |
| --- | --- | --- |
| free access | `npm test -- --grep @claim:free-access` | PASS |
| demo sandbox | `npm test -- --grep @claim:demo-sandbox` | PASS |
| Markdown export | `npm test -- --grep @claim:markdown-export` | PASS |
| same-origin privacy | `npm test -- --grep @claim:same-origin-privacy` | PASS |
| demo expiry | `npm test -- --grep @claim:demo-expiry` | PASS |
| private notes | `npm test -- --grep @claim:private-notes` | PASS |
| paired roles | `npm test -- --grep @claim:paired-roles` | PASS |

The initial pre-install invocation could not find `tsc`, as expected in the
dependency-free checkout; it was not counted as a test result. The strict
post-install rerun above is the release-gate result.

## Local build and automated checks

- `npm ci`: PASS.
- `npm run build`: PASS. Output is `frontend/dist/`.
  - JS: 24.40 kB raw / 8.16 kB gzip.
  - CSS: 16.18 kB raw / 4.49 kB gzip.
- `npm test`: PASS — 2 Rust unit tests and 14 Playwright tests, including
  desktop and 390 × 844 mobile, claims, axe, titles/landmarks/routes, console,
  privacy request logging, and rate limiting.
- `cargo build --release --locked`: PASS.
- No separate lint script is defined; TypeScript type checking is part of
  `npm run build`.
- Docker/Podman/Buildah are not installed in this verifier image, so the
  Dockerfile could not be executed locally. The live health build identity
  above independently confirms this exact candidate is deployed.

## Independent live-product exercise

Using a fresh Playwright context on the live deployment:

- Opened `/demo`, saved a valid third attempt, and observed “3 attempts”.
- Exported `proof-pact-demo-*.md`; its contents included the theorem, Mira —
  Prover, Theo — Explainer, and proof-state snapshots.
- Invalid pact creation returned `422` with a plain recovery message (“Your
  name needs at least 2 characters.”).
- Local lifecycle check created a pact, restarted the server with the same
  SQLite path, and successfully read it back (`200`, same pact ID, Ada, two
  members). A 100-concurrent-request `/health` smoke returned 100 × `200`.
- The live 28-request single-client write burst produced 20 × `200` and 8 ×
  `429`; every limited response had `Retry-After: 1`. Observed write allowance:
  20 requests per client per second. `/health` is intentionally exempt.
- The live `/health` response includes the candidate build SHA and returns
  `200`.

## Privacy, security, accessibility, and resilience

- Complete live landing/demo request log contained only
  `https://proof-study-pacts.sociobot.in`; no third-party analytics, fonts, or
  scripts loaded while saving demo work.
- Live CSP is same-origin (`default-src 'self'`, `connect-src 'self'`) and
  headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  strict-origin referrer policy, and restrictive Permissions-Policy.
- Hashed JS assets send `Cache-Control: public, max-age=31536000, immutable`.
- Axe on live `/`, `/demo`, `/privacy`, `/terms`, and an unknown route found
  zero serious/critical violations. Each had exactly one main-page `h1`,
  correct title, and no console/page errors.
- At 390 px the live root had `scrollWidth === innerWidth === 390`.
- Keyboard Tab reached “Try it with sample data”; its computed visible focus
  ring is a 3 px brass outline with 3 px offset.
- Service worker is active at `/sw.js`, uses versioned `proof-pact-v1` cache,
  and an offline reload after first visit returned the landing page with HTTP
  200. Calling `registration.update()` succeeded.
- Live Lighthouse mobile run: Performance 99, Accessibility 100, Best
  Practices 100, SEO 100; FCP 1.1 s, LCP 1.3 s, TBT 90 ms, CLS 0. A prior run
  had a browser-tab crash and a non-representative 89 performance score; the
  successful rerun used Chromium with `--disable-dev-shm-usage --disable-gpu`.
- All live landing-page links were crawled successfully (same-origin routes
  and the Param Factory external link all returned 200; mail links are not on
  the landing page).

## Defects by severity

- **Critical:** none.
- **High:** none.
- **Medium:** none.
- **Low:** none.

## Verification limitation

Only the local container-engine execution was unavailable. This is not a
release blocker here because the independently queried live backend is serving
the candidate's exact build SHA; the source Dockerfile was also reviewed and
uses a non-root distroless runtime with `PORT` and `BUILD_SHA` defaults.
