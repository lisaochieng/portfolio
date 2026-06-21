# KT One — Design System

> **"Science in vein."**
> A living-whitepaper design language for KT One — an independent research
> organization operating at the frontier of **open quantum systems** and
> **quantum artificial intelligence**, building toward Quantum AGI (QAGI).

This project is the canonical brand + UI system for KT One. An automated compiler
reads it and ships the tokens, fonts, and React components to any consuming
project. Link `styles.css` (the single global entry point) and read components
from `window.KTOneDesignSystem_670b9a`.

---

## 1. Company & product context

KT One is a small, deliberately early-stage research lab (est. Nov 2025). Its
guiding thesis: **noise is not a liability — it is the material.** Where most
quantum ML treats NISQ-era hardware noise as something to engineer away, KT One
treats dissipation, collision models, and non-Markovian dynamics as the
computational foundation. The organization runs a hybrid **human–AI R&D
pipeline**, delegating literature review and implementation checks to AI agents
so its founders can focus on deep scientific conceptualization.

The only public surface today is a single-page **marketing/landing site** — a
brutalist academic document. That site is the source of truth for this system
and is recreated faithfully in `ui_kits/landing/`.

### Sources used to build this system
- **GitHub — `KT-One/LandingPage`** (private): the production Vite + React +
  Tailwind v4 landing page. Its `DESIGN.md` is the brand bible; `src/App.jsx`
  is the canonical layout; `public/favicon.svg` is the logo mark; `public/icons.svg`
  holds the social sprite. Explore it further for additional context:
  `https://github.com/KT-One/LandingPage`
- KT One organization: `https://github.com/KT-One`

> The reader may not have access to the private repo above — values and copy
> have been transcribed into this system so it stands alone.

---

## 2. Content fundamentals — how KT One writes

The voice is that of a **technical whitepaper**: declarative, precise, unadorned.

- **Register:** Scientific and confident. Short asserted sentences. No hype, no
  hedging. _"We treat it as the computational foundation."_
- **Person:** **"We," never "I."** KT One speaks as a research organization —
  plural, collective, institutional. The reader is rarely addressed as "you."
- **Casing:** Sentence case for headings and body. **UPPERCASE** is reserved for
  monospace technical metadata (`EST. Nov 2025 // Independent Research`,
  `UNDER REVIEW // QUANTUM SCIENCE AND TECHNOLOGY`) and CTA labels.
- **Punctuation motifs:** `//` separates metadata clauses. `[ BRACKETS ]` frame
  calls to action (`[ CONTACT ]`, `[ arXiv:2602.08526 ]`). Em-dashes set off
  qualifying clauses—like this.
- **Vocabulary:** Domain-precise and unapologetically technical — *non-Markovian*,
  *Lindblad-regime*, *collision models*, *dissipative QNN*, *multipartite state
  engineering*. The terms are the brand.
- **Emoji:** **Never.** No exclamation-driven excitement, no emoji, no startup
  optimism. Restraint signals seriousness.
- **Headlines** are aphoristic and provocative: _"Science in vein."_, _"Noise is
  not a liability. It is the material."_

---

## 3. Visual foundations

A monochrome, brutalist, document-grid system. Depth comes from **borders and
value**, never elevation.

- **Color:** Strictly monochromatic grayscale (Tailwind `zinc`) on a custom
  deepest off-black canvas `#09090b`. `zinc-50` for headings/focus, `zinc-400`
  for body, `zinc-500` for metadata, `zinc-800` for the border framework. A
  single **violet accent `#aa3bff`** appears in product assets (doc/social icons)
  and is used *extremely sparingly* — links to docs, focus, rare emphasis. Never
  decorative fills or gradients.
- **Type:** Dual-typeface. A neutral grotesk **sans** for human-readable copy and
  display (hero at 72px, semibold, `-0.02em` tracking); a **monospace** for
  technical labels, navigation, and metadata (uppercase, `0.18em` tracking).
  See the font note in §5.
- **Spacing:** 4px base scale. Cell padding sits at 24px (mobile) / 32px (desktop).
  Generous hero rhythm (96px+ vertical).
- **Backgrounds:** The canvas is flat off-black — **no gradients, no images, no
  textures.** The only ornament is subtle SVG **quantum-orbital line geometry**
  (concentric circles + crosshairs) rendered at `opacity 0.2` with `zinc-500`
  strokes, tucked into hero corners.
- **Layout:** The whole site is a centered **"document"** — `max-width: 1024px`,
  bound by vertical borders, sectioned by full-width 1px lines. There are **no
  floating cards**; content lives inside CSS grids whose 1px dividers form a
  continuous skeletal framework. Sections use a signature label-left /
  content-right split (`1fr 2fr`).
- **Borders:** Always hairline (1px). `zinc-800` for structure, `zinc-700` for
  interactive outlines (buttons). The border *is* the design.
- **Corner radius:** Effectively **zero** — brutalist sharp corners everywhere.
  The single exception is the logo's app tile (`radius 20`).
- **Shadows:** **None.** The system deliberately avoids drop shadows. No
  blur, no glass, no transparency layering beyond the faint `zinc-900/30` raised
  panel fill.
- **Cards:** There are none in the conventional sense. The closest analogue is
  `Panel` — a bordered cell with no shadow and no rounding.
- **Animation:** Minimal and hard. Transitions are short linear color/border
  swaps (~120ms). No bounces, no spring, no decorative motion.
- **Hover states:** The signature interaction is a **hard invert** — elements
  flip to `bg-zinc-50 text-zinc-950` on hover. Links shift grey → `zinc-50`.
  Buttons swap fill and border instantly.
- **Press / focus:** No shrink or scale. Focus and active emphasis lean on the
  violet accent or the inverted state.
- **Imagery vibe:** Cool, monochrome, schematic. Any imagery reads as a
  scientific diagram, not a photograph.

---

## 4. Iconography

- **Library:** **Lucide** (the production site uses `lucide-react`). Style is
  **2px stroke, un-filled, geometric** — `ArrowUpRight`, `Mail`, `GitCommit`,
  `ChevronRight`, `Activity`. Use Lucide for all UI glyphs.
  - In HTML specimens/kits, either pull Lucide from CDN or use the small
    hand-matched set in `ui_kits/landing/Icons.jsx` (same 2px geometric spec).
- **Brand mark:** A **hexagonal lattice node** — a hexagon outline with six bonds
  radiating to a luminous central core. Lives in `assets/logo-mark.svg` and is
  reproduced exactly by the `Logo` component. (The user refers to it as the
  "atom" — it reads as a quantum lattice site / bonded node.)
- **Social sprite:** `assets/social-icons.svg` — a `<symbol>` sheet with
  `bluesky`, `discord`, `github`, `x`, plus violet-accented `documentation` and
  `social` glyphs. Reference symbols by id via `<use href="…#github-icon">`.
- **Emoji:** **Never used.** Unicode is limited to `//`, `[ ]`, `©`, and `—` as
  typographic devices.

---

## 5. Fonts — substitution flagged

The production site uses the browser's default `font-sans` / `font-mono` stacks
(no webfont is shipped). For a portable, consistent specimen this system
substitutes **IBM Plex Sans** + **IBM Plex Mono** (open-licensed, with a
technical/scientific heritage that matches the living-whitepaper voice), loaded
from Google Fonts in `tokens/fonts.css`.

> ⚠️ **Action for the user:** If KT One has adopted a specific brand typeface
> (Cambria was mentioned as a possibility), send the font files and I'll swap
> them into `tokens/fonts.css` + `tokens/typography.css`. I chose a grotesk +
> mono pairing over a serif like Cambria to stay true to the codebase's
> sans+mono dual-typeface system — tell me if you'd prefer the serif direction.

---

## 6. Index / manifest

**Root**
- `styles.css` — global entry point (imports only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill manifest for downloadable use.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`

**`assets/`** — `logo-mark.svg` (hexagon mark), `social-icons.svg` (sprite),
`hero.png` (product hero render)

**`components/`** — React primitives (read via `window.KTOneDesignSystem_670b9a`)
- `core/` — **Button**, **Tag**, **Panel**, **LabeledSection**
- `brand/` — **Logo**

**`ui_kits/landing/`** — full KT One landing-page recreation (`index.html`
composes the components; `Sections.jsx`, `Icons.jsx`)

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) —
rendered in the Design System tab.

---

## 7. Using this system

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Tag, Panel, LabeledSection, Logo } = window.KTOneDesignSystem_670b9a;
</script>
```

Stay monochrome. Keep corners sharp. Let the borders do the work. Use the violet
accent like a scalpel, never a brush.
