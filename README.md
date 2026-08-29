# Work through one Lean proof with a partner

Proof Pact helps two independent Lean 4 learners keep a small weekly routine.
Each pair chooses a public exercise and gets Prover and Explainer roles.
They record separate attempts and export one Markdown note.
Proof Pact records study work. Run Lean to check it.

Open the demo at
[proof-study-pacts.sociobot.in/demo](https://proof-study-pacts.sociobot.in/demo).
The demo has two learners, two attempts, and saved proof states. Demo
workspaces expire within 24 hours.

## How it works

1. One learner chooses a public Lean exercise and names a partner.
2. The partner opens the invite and agrees to share pact notes.
3. Each learner opens a private access link and records an attempt.
4. The pair exports the theorem, roles, attempts, explanations, and proof states
   as Markdown.

Both partners can read each saved note and its author.
Only a private access link opens pact notes. The app loads no third-party
analytics, fonts, or scripts. See [Privacy](https://proof-study-pacts.sociobot.in/privacy)
and [Terms](https://proof-study-pacts.sociobot.in/terms).

## Run locally

Install Node.js, npm, and Rust. Then run:

```sh
npm ci
npm run build
PORT=8080 DATABASE_PATH=./proof-pact.db cargo run
```

Open `http://localhost:8080`. For frontend-only work, run `npm run dev`.

## Test

```sh
npm test
```

The claim contract is in `.factory/claims.json`.

## Container

```sh
docker build --build-arg BUILD_SHA=dev -t proof-pact .
docker run --rm -p 8080:8080 -v proof-pact-data:/data proof-pact
```


## Deploy

The factory deploys the root Dockerfile. Mount `/data` when pacts must persist.

## Project notes

- `.factory/design.md` records the product-specific visual system and artwork
  provenance.
- `.factory/demo.md` documents demo isolation and reset behavior.
- `.factory/copy-audit.md` records the landing-page language check.
- The project is available under the MIT License in `LICENSE`.
