# Proof Pact

Work through one Lean proof with a partner.

Proof Pact is for independent Lean 4 learners who want a small weekly routine.
Each pair chooses a public exercise, gets complementary Prover and Explainer
roles, records separate attempts and proof states, and exports one Markdown
note. Lean remains the proof checker.

Try the isolated sample at
[proof-study-pacts.sociobot.in/demo](https://proof-study-pacts.sociobot.in/demo).
The sample has two learners, two attempts, and saved proof states. Demo
workspaces expire within 24 hours.

## How it works

1. One learner chooses a public Lean exercise and names a partner.
2. The partner opens the invite and agrees to share pact notes.
3. Each learner opens a private member link and records an attempt.
4. The pair exports the theorem, roles, attempts, explanations, and proof states
   as Markdown.

Pact notes require the private member key. The app loads no third-party
analytics, fonts, or scripts. See [Privacy](https://proof-study-pacts.sociobot.in/privacy)
and [Terms](https://proof-study-pacts.sociobot.in/terms).

## Run locally

Requirements: Node.js 22+, npm, and Rust 1.88+.

```sh
npm ci
npm run build
PORT=8080 DATABASE_PATH=./proof-pact.db cargo run
```

Open `http://localhost:8080`. The server uses `/data/proof-pact.db` when
`DATABASE_PATH` is absent and `/data` is writable.

For frontend-only work, run `npm run dev`. API actions still need the Rust
server.

## Test

```sh
npm test
```

This builds `frontend/dist/`, runs Rust unit tests, and runs Playwright 1.58.2
against the full app. The claim contract is in `.factory/claims.json`.

## Container

```sh
docker build --build-arg BUILD_SHA=$(git rev-parse HEAD) -t proof-pact .
docker run --rm -p 8080:8080 -v proof-pact-data:/data proof-pact
```

The container runs as a non-root user and serves both the API and frontend on
`PORT` (default `8080`). `GET /health` returns the build SHA.

## Deploy

The factory builds the root `Dockerfile`. Persist `/data` if real pacts must
survive container replacement. No DNS, billing, or infrastructure changes are
part of this repository.

## Project notes

- `.factory/design.md` records the product-specific visual system and artwork
  provenance.
- `.factory/demo.md` documents demo isolation and reset behavior.
- `.factory/copy-audit.md` records the landing-page language check.
- The project is available under the MIT License in `LICENSE`.
