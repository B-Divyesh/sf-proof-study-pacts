# Adversarial first-read review 6

**Product:** Proof Pact  
**Live URL:** https://proof-study-pacts.sociobot.in  
**Reviewed:** 2026-08-29  
**Live build:** `ff457a0886a3f440da8d14f3876d1bf5981b711d`  
**Source reviewed:** `ff457a0886a3f440da8d14f3876d1bf5981b711d`

## Verdict: FAIL

One minor finding remains. The live product is clear on first read, the demo is
genuinely usable and isolated, every declared claim test passes from a fresh
clone, and all earlier findings are fixed. A PASS requires zero findings. The
README's only H1 is the unexplained brand name, which fails the plain-words
heading rule for documentation.

## 1. Cold first read

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900, with no
scrolling before this assessment. Both returned 200, made only same-origin
requests, and recorded no console errors.

- **What it does:** two Lean learners choose one proof, keep their separate
  attempts and proof states, and export a shared Markdown note.
- **For whom:** independent Lean learners who are studying with a partner.
- **Click first:** **Try it with sample data**.

The full first-screen evidence at both sizes was:

> Work one Lean proof with a partner

> For independent Lean learners who need a weekly routine for attempts, proof
> states, and explanations in their own words.

> Try it with sample data

> A ready pact opens in one click.

The action and all three facts — “Free to use,” “Partner-visible notes need
consent,” and “Records work; run Lean to check it” — fit in the initial 390 px
viewport. This gate passes.

## 2. Copy audit

Counts treat a hyphenated word, a URL, and a code identifier as one word.
Visible sentence clusters are split at sentence-ending punctuation. There are
no landing sentences over 22 words and no banned marketing terms.

### Landing page sentences

| Words | Exact text | Result |
| ---: | --- | --- |
| 7 | Work one Lean proof with a partner | Clear H1 |
| 19 | For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words. | Clear audience and change |
| 7 | A ready pact opens in one click. | Clear result of action |
| 3 | Free to use | Claim: `free-access` |
| 4 | Partner-visible notes need consent | Claim: `paired-roles` |
| 7 | Records work; run Lean to check it | Claim: `records-without-checking` |
| 9 | Two proof-work instruments connected to one shared theorem dial. | Useful image alt text |
| 8 | Two attempts become one shared Markdown note. | Claim: `markdown-export` |
| 4 | Choose one public exercise. | Clear instruction |
| 5 | One person is Prover. | Clear role definition |
| 5 | The other is Explainer. | Clear role definition |
| 11 | I agree that my partner can read the notes I add to this pact. | Clear consent |
| 7 | This browser saves your private access link. | Claim: `real-access-link-storage` |
| 9 | Pick a public Lean exercise and send the invite link. | Clear instruction |
| 4 | The Prover records code. | Clear role instruction |
| 6 | The Explainer names each reasoning step. | Clear role instruction |
| 10 | Keep the proof states, attempts, and explanations in Markdown. | Claim: `markdown-export` |
| 4 | Proof Pact records your work. | Claim: `records-without-checking` |
| 6 | Run Lean to check it. | Claim: `records-without-checking` |
| 8 | Partners decide whether an explanation makes sense. | Clear limitation |
| 6 | Weekly Lean proof work for pairs. | Clear footer description |

### Landing headings and controls

| Words | Type | Exact text | Result |
| ---: | --- | --- | --- |
| 3 | section label | Weekly Lean routine | Literal and useful |
| 5 | action | Try it with sample data | Result-naming action |
| 3 | section label | Create a pact | Literal section label |
| 4 | h2 | Make this week’s pact | Clear task heading |
| 4 | action | Create pact and invite | Result-naming action |
| 2 | section label | Three steps | Names the count and structure |
| 5 | h2 | How the pair routine works | Clear section heading |
| 4 | h3 | Commit to one theorem | Clear step heading |
| 3 | h3 | Bring separate attempts | Clear step heading |
| 4 | h3 | Export the shared note | Clear step heading |
| 6 | section label | What Proof Pact does not do | Literal boundary label |
| 6 | h2 | A routine, not a proof judge | Explains the capability boundary |
| 1 | nav link | Demo | Clear destination |
| 3 | nav link | Make a pact | Clear destination |
| 1 | nav link | Privacy | Clear destination |
| 2 | footer links | Privacy; Terms | Clear destinations |

### README sentences

| Words | Exact text | Result |
| ---: | --- | --- |
| 8 | Work through one Lean proof with a partner. | Clear product summary |
| 14 | Proof Pact is for independent Lean 4 learners who want a small weekly routine. | Clear audience |
| 12 | Each pair chooses a public exercise and gets Prover and Explainer roles. | Supported by `paired-roles` |
| 9 | They record separate attempts and export one Markdown note. | Supported by recording/export claims |
| 5 | Proof Pact records study work. | Supported by `records-without-checking` |
| 6 | Run Lean to check it. | Supported by `records-without-checking` |
| 5 | Open the demo at proof-study-pacts.sociobot.in/demo. | Clear action |
| 11 | The demo has two learners, two attempts, and saved proof states. | Supported by `demo-sandbox` |
| 6 | Demo workspaces expire within 24 hours. | Claim: `demo-expiry` |
| 11 | One learner chooses a public Lean exercise and names a partner. | Clear procedure |
| 11 | The partner opens the invite and agrees to share pact notes. | Supported by `paired-roles` |
| 11 | Each learner opens a private access link and records an attempt. | Supported by private-link and recording claims |
| 13 | The pair exports the theorem, roles, attempts, explanations, and proof states as Markdown. | Claim: `markdown-export` |
| 10 | Both partners can read each saved note and its author. | Claim: `partner-note-sharing` |
| 7 | Only a private access link opens pact notes. | Claim: `private-notes` |
| 9 | The app loads no third-party analytics, fonts, or scripts. | Claim: `same-origin-privacy` |
| 4 | See Privacy and Terms. | Clear destinations |
| 5 | Install Node.js, npm, and Rust. | Clear setup instruction |
| 2 | Then run: | Introduces the exact commands |
| 2 | Open http://localhost:8080. | Clear local action |
| 7 | For frontend-only work, run npm run dev. | Clear local action |
| 6 | The claim contract is in .factory/claims.json. | Accurate pointer |
| 6 | The factory deploys the root Dockerfile. | Accurate deployment scope |
| 9 | Mount /data when pacts must persist. | Clear deployment instruction |
| 9 | .factory/design.md records the product-specific visual system and artwork provenance. | Accurate pointer |
| 7 | .factory/demo.md documents demo isolation and reset behavior. | Accurate pointer |
| 8 | .factory/copy-audit.md records the landing-page language check. | Accurate pointer |
| 10 | The project is available under the MIT License in LICENSE. | Accurate legal pointer |

README headings and command labels are **Proof Pact** (H1, 2), **How it
works** (3), **Run locally** (2), **Test** (1), **Container** (1), **Deploy**
(1), and **Project notes** (2). The H1 is the finding below. All other
headings name their section; every action button names its result.

## 3. Demo and sandbox

This passes. From a fresh 390 × 844 context, `/?demo=1` replaced the URL with
`/demo` and immediately showed the actual seeded workspace, not a marketing
interstitial. The initial viewport included:

- the persistent **Demo — sample data, nothing is saved** banner;
- **Reset demo** and **Start for real**;
- **Mira — Prover** and **Theo — Explainer**; and
- Mira’s realistic saved `induction n with` attempt and explanation.

Saving a third attempt survived reload. **Reset demo** created a different
`demo-*` workspace and returned it to two seeded attempts. A real-data local
storage sentinel remained unchanged through save and reset; demo used only the
`sessionStorage['demo:pact']` namespace. **Start for real** removed that demo
key and opened the real pact form. The request log across landing, demo,
save, reset, export, and real-mode exit contained only
`https://proof-study-pacts.sociobot.in`.

## 4. Claim contract

I made a fresh clone at `/tmp/proof-pact-review-6.igWtWu`, ran `npm ci`, and
ran every exact command named in `.factory/claims.json` independently. All
passed. The first rerun of the demo command encountered a just-released local
Playwright server port; its immediate clean rerun passed and is the result
recorded below.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS |
| `markdown-export` | `npm test -- --grep @claim:markdown-export` | PASS |
| `same-origin-privacy` | `npm test -- --grep @claim:same-origin-privacy` | PASS |
| `demo-expiry` | `npm test -- --grep @claim:demo-expiry` | PASS |
| `private-notes` | `npm test -- --grep @claim:private-notes` | PASS |
| `paired-roles` | `npm test -- --grep @claim:paired-roles` | PASS |
| `real-access-link-storage` | `npm test -- --grep @claim:real-access-link-storage` | PASS |
| `records-without-checking` | `npm test -- --grep @claim:records-without-checking` | PASS |
| `partner-note-sharing` | `npm test -- --grep @claim:partner-note-sharing` | PASS |
| `stored-data-inventory` | `npm test -- --grep @claim:stored-data-inventory` | PASS |
| `offline-shell` | `npm test -- --grep @claim:offline-shell` | PASS |

`npm test` also passed in that clone: Vite produced `frontend/dist/`, Rust ran
three passing tests, and Playwright ran 30 passing checks. Production initial
JavaScript is 28.27 kB raw / 9.16 kB gzip. The README and landing
claim-like sentences above map to a declared observable test; no unlisted
landing or README claim was found.

## 5. Earlier findings rechecked

Every earlier review, polish record, and handoff was read. The following is a
fresh live-and-code confirmation, not acceptance of the earlier status labels.

| Earlier ID | Fresh confirmation |
| --- | --- |
| F-1-1 | Live caption says “Two attempts become one shared Markdown note”; downloaded demo Markdown contains the exported material. |
| F-1-2 | Live Privacy → Back restores landing scroll, focuses the landing H1, and announces the landing route. |
| F-1-3 | Live unknown route returns HTTP 404 and renders the designed page. |
| F-1-4 | All visible controls on `/`, `/demo`, `/privacy`, `/terms`, and 404 measure at least 44 px at 390 px. |
| F-1-5 | Real pact creation writes only a namespaced private-link key; the claim test passes. |
| F-1-6 | Invalid Lean is recorded with no checker result or external request. |
| F-1-7 | README retains runnable commands without obsolete runtime guarantees. |
| F-1-8 | Every checked route updates title, description, canonical, OG, and Twitter title. |
| F-1-9 | No README sentence exceeds 22 words. |
| F-1-10 | The landing label is the literal “Weekly Lean routine.” |
| F-1-11 | The pact section/action is literally named “Create a pact.” |
| F-1-12 | Landing defines Prover and Explainer; the role workflow passes. |
| F-1-13 | The procedure label is “Three steps.” |
| F-1-14 | The limit section has the literal “What Proof Pact does not do” label. |
| F-1-15 | `/demo` and `?demo=1` work with the persistent banner, reset, and real-mode exit. |
| F-1-16 | The credential wording is consistently “private access link.” |
| F-1-17 | Visible and metadata export language uses “Markdown note.” |
| F-1-18 | The live verifier completes a pact and confirms the prefilled next-week pact action. |
| F-2-1 | Fresh HTTP clients create, read, save, reload, and export the same demo workspace; the live verifier performs 16 reads. |
| F-2-2 | A stale demo session is replaced with a seeded demo; 404 and 410 local tests pass. |
| F-2-3 | Export test asserts both proof bodies, explanations, roles, and snapshots. |
| F-2-4 | Two independent browser contexts share an attributed saved note after reload. |
| F-2-5 | Privacy inventory test rejects an email field and the schema test passes. |
| F-2-6 | First screen says “explanations in their own words,” not “clear explanations.” |
| F-3-1 | Every selectable public exercise URL is requested by the release-gate test. |
| F-4-1 | The live missing-page H1 is “Page not found,” not an instrument metaphor. |
| F-4-2 | Missing pact/invitation pages use literal error headings, a reason, and a recovery action. |
| F-5-1 | The mobile initial demo viewport contains banner, both roles, and the complete sample-attempt preview. |

No earlier finding is reopened.

## 6. Structure, privacy, links, identity, and leverage

- Root, demo, privacy, terms, and the unknown route have one H1, a route title
  in the required pattern, a plain meta description, canonical, OG/Twitter
  metadata, favicon, and an original 1200 × 630 social image. The unknown URL
  has the expected `/404` canonical and a 404 status.
- `robots.txt`, `sitemap.xml`, favicon, touch icon, service worker, and all
  collected internal and external page links returned 200. The sitemap lists
  all public routes. Header/footer navigation and Privacy/Terms are consistent.
- Direct deep links, reload, browser Back, focus restoration, route live
  announcement, keyboard primary-action access, offline saved-policy view, and
  no serious/critical axe violations all pass.
- Response headers include a same-origin CSP with `frame-ancestors 'none'`,
  `nosniff`, strict-origin referrer policy, and restrictive permissions. Live
  request capture confirms no third-party analytics, fonts, scripts, or model
  traffic.
- The warm enamel, ink, brass, red-signal instrument panel, original console
  art, asymmetric hero, and reduced-motion CSS are visibly distinct from a
  generic SaaS template and match `.factory/design.md`.
- The brief does not imply an AI step: the useful core is an accountable pair
  routine, and Lean remains the external proof checker. Export and live partner
  sharing already cover the implied portability and sync needs. No decorative
  or key-embedding AI feature exists.

## 7. Finding

### Minor

#### F-6-1 — README H1 is a brand name, not a useful document heading

**Location/quote:** `README.md:1`: “Proof Pact”.

**Why this fails:** read alone, the first heading says neither what the
repository does nor who it is for. The plain-words rule applies to README
headings and requires headings to name the section. This is a small but real
first-read failure for someone opening the repository rather than the site.

**Concrete fix:** replace the H1 with `Work through one Lean proof with a
partner` and put `Proof Pact` in the first sentence, for example: “Proof Pact
helps two Lean learners work through one proof together.” Keep the existing
short product summary below it if it adds information after that rewrite.

## What would make this perfect

Make the README H1 describe the job in plain words. With that one change, the
review would have no remaining finding.
