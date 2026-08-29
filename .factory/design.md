# Proof Pact visual thesis

## Direction

Proof Pact looks like a **mid-century instrument panel for two learners**. The
interface borrows the calm hierarchy of a 1950s laboratory console: warm
enamel, inked labels, recessed bays, brass fasteners, and a single signal lamp.
That world fits Lean practice because it makes a pact feel like a small,
repeatable procedure rather than another course catalogue. The surface is
distinctive, while the controls stay literal and readable.

The landing composition is asymmetric. A narrow copy rail sits beside a large
illustrated proof console. Ruled lines and numbered dials carry sections down
the page. The product workspace uses one continuous bench rather than a grid of
generic feature cards.

On phones, the demo bench uses evidence-first order: its brass demo strip,
session title, paired role channels, and one dark-green saved-attempt tape fit
in the first viewport. The theorem plate follows below. This preserves the
instrument-panel hierarchy while showing the pair's real work immediately.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F2E9D3` | warm page enamel |
| `--paper-deep` | `#DDD0B3` | recessed wells |
| `--ink` | `#172722` | primary text; 12.5:1 on paper |
| `--muted` | `#44524B` | secondary text; passes AA on both paper tones |
| `--panel` | `#24463D` | dark console surfaces |
| `--panel-ink` | `#FFF8E8` | text on panels; 10.4:1 |
| `--signal` | `#B83D29` | primary action and active marker; 5.1:1 with white |
| `--signal-dark` | `#8D2C1C` | focus/pressed state |
| `--brass` | `#A97824` | rules, dial edges, small accents |
| `--success` | `#176B4A` | saved/complete state with text label |
| `--warning` | `#8A5400` | warning state with text label |
| `--danger` | `#9B2D22` | destructive/error state with text label |

This is an explicitly warm, single-mode system. Dark mode is not applied
because changing the enamel-and-console relationship would weaken the visual
metaphor. The page paints every surface and keeps system theme changes from
altering contrast.

## Type

- Display and labels: `Arial Narrow`, `Aptos Narrow`, `Roboto Condensed`,
  system sans-serif. It evokes instrument labels without downloading fonts.
- Body and proof text: `Georgia`, `Charter`, serif. Code and proof states use
  `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace.
- Type scale: 16, 18, 22, 30, and `clamp(42px, 7vw, 76px)`. Body line height is
  1.55. Labels use uppercase sparingly with 0.08em tracking.

System stacks keep the first load fast and avoid third-party font requests.

## Spacing and shape

- Base unit: 8px. Section gaps: 64–112px. Control gaps: 12–24px.
- Text measure: 64 characters. Inputs and buttons are at least 48px tall.
- Panels use 6px corners, 2px ink rules, and offset shadows that resemble a
  raised metal plate. Pills are reserved for status lamps and role labels.
- Small authored SVG screws, check marks, and arrows form the icon set.

## Interaction grammar

The primary action is a red rectangular lever. Secondary actions are inked
buttons on paper. Active steps light one small signal lamp and inset the
corresponding panel. Forms reveal the next panel in place so the learner keeps
spatial context. Every save reports a short status in an `aria-live` region.

Keyboard focus uses a 3px brass ring plus a 2px paper gap. Links remain
underlined. Destructive actions name the item and require confirmation or offer
an undo path.

## Motion policy

The signature motion is **needle settle**: when a pact advances, the small dial
needle rotates once over 240ms with an ease-out curve and stops. Panels enter
with a 180ms opacity and 8px vertical shift. Nothing loops. Under
`prefers-reduced-motion: reduce`, transform motion is removed and state changes
use an immediate border and opacity change.

## Art plan and prompt sheet

The hero is an original generated illustration, then cropped and optimized to
WebP. It shows two paired proof stations connected to one central theorem dial.
There are no people, logos, or readable interface text, so the art sets the
world without pretending to show product output. Small UI icons and the pact
seal are authored as SVG in the repository.

Prompt sheet:

- Subject: paired tabletop proof-work instruments joined by a cable, central
  theorem dial, two complementary stations, paper proof tape.
- World: 1950s mathematical laboratory, optimistic but workmanlike.
- Materials: cream enamel, dark green bakelite, oxidized brass, red signal lamp,
  textured paper.
- Light: soft directional studio light with shallow physical shadows.
- Lens/composition: elevated three-quarter view, wide horizontal framing,
  complete objects, quiet negative space.
- Palette words: warm parchment, forest green, brick red, aged brass, charcoal.
- Negative list: no text, no letters, no numbers, no watermark, no logos, no
  people, no hands, no screens, no neon, no gradients, no futuristic UI.

Provenance: generated for Proof Pact on 2026-08-28 using the factory image
deployment through `/opt/fleet/lib/gen-image.sh`. The exact prompt is stored
beside the source image in `assets/src/hero-console.json`. The generated image
is original to this product and is disclosed in the footer.
