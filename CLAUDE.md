# 3D Portfolio — CLAUDE.md

Project context, architectural decisions, and implementation notes for Claude Code sessions.

---

## Stack

- **React 18 + Vite 6** — frontend framework and build tool
- **Three.js** via `@react-three/fiber` (R3F) + `@react-three/drei`
- **Framer Motion** — page/section animations
- **Tailwind CSS v3** — utility styling
- **emailjs** — contact form
- **react-tilt** — card hover tilt effects
- **@chenglou/pretext** — fast DOM-free text layout (see section below)

---

## Key Files

| File | Purpose |
|---|---|
| `src/components/canvas/Computers.jsx` | Hero 3D scene: Rubik's cube only |
| `src/components/canvas/Ball.jsx` | Tech stack spheres with Pretext-powered label sprites |
| `src/components/canvas/Earth.jsx` | Contact section globe |
| `src/components/canvas/Stars.jsx` | Background star field |
| `src/components/Tech.jsx` | Technologies section — renders one BallCanvas per tech |
| `src/components/Hero.jsx` | Hero section layout |
| `src/hoc/SectionWrapper.jsx` | Animation HOC wrapping most sections |
| `src/constants/index.js` | All portfolio data — each technology now has `name`, `icon`, `color`, `tag` |
| `src/styles.js` | Shared Tailwind class strings |

---

## Architecture Notes

### Canvas frameloop modes

- `frameloop="always"` on Computers canvas — needed for `useFrame`-driven animations (cube auto-rotate)
- `frameloop="demand"` on Ball/Earth canvases — renders on interaction; OrbitControls `autoRotate` keeps invalidating

### Ball canvas camera

- `camera={{ position: [0, 0, 6.5], fov: 65 }}` — pulled back from R3F default (z=5, fov=75) so the label sprite below the ball is fully within the camera frustum

### Ball label sprite placement

- The `<sprite>` lives **outside** `<Float>` in the Ball component. This is critical — if placed inside Float, the rotational oscillation (`rotationIntensity`) would orbit the sprite's world position around the Float center, causing the label to fly around instead of staying below the ball.
- Ball bottom ≈ y=-2.75 (scale 2.75, icosahedron radius 1). Sprite at y=-3.5 clears with ~0.4 unit gap.

### Lights

- Lights live at Canvas/scene level, **not** inside `Float` or mesh groups

### Works.jsx

- Exports `Works` directly (no SectionWrapper)
- Two internal branches: `WorksPlain` and `WorksAnimated`, each handling their own section wrapper/ID

### Tilt

- `options` prop on `<Tilt>`, not on child divs

### Social icons in mobile nav

- Use `<li>`, not `<h1>`

### Bounds component (Computers.jsx)

- `<Bounds fit clip observe margin={1.15}>` auto-fits camera to enclose the Rubik's cube
- Place any non-cube 3D elements **outside** `<Bounds>` so they don't affect camera fitting

---

## Pretext Integration (`@chenglou/pretext`)

**What it is:** A 15KB zero-dependency library by Cheng Lou that measures and lays out multiline text _without touching the DOM_. Uses `Canvas.measureText()` once (the `prepare` phase) then all wrapping is pure arithmetic (the `layout` phase) — ~300–600× faster than DOM reflow measurement.

**Why it's ideal here:** Three.js / WebGL canvases have no DOM layout engine. Any text rendered onto a `CanvasTexture` needs to be manually measured and wrapped. Pretext handles this perfectly.

**Two-phase API:**
```js
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

// Phase 1 — EXPENSIVE (do once, cache the result)
const prepared = prepareWithSegments(text, 'bold 15px system-ui, sans-serif');

// Phase 2 — CHEAP pure math (call as often as needed)
const { lines, lineCount, height } = layoutWithLines(prepared, maxWidth, lineHeight);
// lines[i].text  — the actual string for each wrapped line
// lines[i].width — exact pixel width of that line (used for precise positioning)
```

**Key exports from `@chenglou/pretext`:**

- `prepare(text, font)` → `PreparedText` — dimensions only (no segment data)
- `prepareWithSegments(text, font)` → `PreparedTextWithSegments` — required for `layoutWithLines` / `walkLineRanges` / `layoutNextLine`
- `layout(prepared, maxWidth, lineHeight)` → `{ lineCount, height }` — cheap, no line text
- `layoutWithLines(prepared, maxWidth, lineHeight)` → `{ lineCount, height, lines[] }` — line text + per-line width
- `walkLineRanges(prepared, maxWidth, cb)` — low-level iterator (avoids string allocation)
- `layoutNextLine(prepared, cursor, maxWidth)` → `LayoutLine | null` — variable-width layout
- `clearCache()` — clear internal measurement cache if needed

**No `inline-flow` sub-export exists in v0.0.4** — simulate inline-flow with separate `prepareWithSegments` calls per font run (see Ball.jsx pattern).

---

## Feature: Tech Stack Ball Labels (Idea #5) ✅

### What it does
Each tech ball in the Technologies section has a billboard label sprite floating below it. The label is a `THREE.CanvasTexture` (320×88px offscreen canvas) rendered using Pretext to achieve pixel-perfect mixed-font layout without any DOM involvement:

- **Colored dot** (tech accent color)
- **Tech name** in `bold 15px system-ui`
- **Tag chip** (version/category) in `11px system-ui`, colored border and fill

### Files

- `src/components/canvas/Ball.jsx` — `makeLabelTexture()` + updated `Ball` + `BallCanvas`
- `src/components/Tech.jsx` — passes `name` and `tag` to `BallCanvas`; div is `w-28 h-36`
- `src/constants/index.js` — `tag` field added to every technology entry

### Inline-flow simulation with Pretext
`@chenglou/pretext` has no `prepareInlineFlow` export (v0.0.4). The pattern used in `makeLabelTexture`:

```js
// Prepare each font run separately
const namePrepared = prepareWithSegments(name, NAME_F);  // bold 15px
const tagPrepared  = prepareWithSegments(tag,  TAG_F);   // 11px

// layout() with huge maxWidth = no wrapping → lines[0].width = exact natural text width
const nameW = layoutWithLines(namePrepared, 4000, TEXT_LH).lines[0].width;
const tagW  = layoutWithLines(tagPrepared,  4000, TEXT_LH).lines[0].width;

// Use exact widths to:
// 1. Size the pill background = contentW + padding (no guessing)
// 2. Center the tag text within its chip = chipX + (chipW - tagW) / 2
// 3. Lay out dot → name → chip sequentially with exact x positions
```

### Key decisions

1. **`useMemo([name, tag, color])`** — Pretext `prepare` runs once per ball at mount; Three.js texture is stable
2. **Sprite outside `<Float>`** — prevents label from orbiting due to Float's `rotationIntensity`
3. **`spriteMaterial depthWrite={false}`** — prevents label from z-fighting with the ball geometry
4. **`lines[0].width` trick** — passing `maxWidth=4000` to `layoutWithLines` prevents wrapping, so `lines[0].width` is the natural (unwrapped) pixel width of the text — Pretext's exact measurement
5. **`lighten(hex, ratio)` helper** — brightens the tech color for the tag chip text so it's legible against the dark chip background

### Visual design

- Pill background: `rgba(6, 8, 16, 0.90)` (near-black, slightly transparent)
- Pill border: tech color at 31% opacity
- Name text: `#f2f2f2` bold
- Tag chip fill: tech color at 13% opacity; border at 33%
- Tag text: tech color lightened 30%

---

## Planned Pretext Features (not yet implemented)

- **Idea 3:** Editorial text wrapping around Earth globe (`layoutNextLine` with variable widths that narrow around the globe's silhouette)
- **Idea 4:** Reflow-free masonry in Works section (`layout()` for card heights before Framer Motion animates to exact target height)
