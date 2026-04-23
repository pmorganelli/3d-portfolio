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
- **@chenglou/pretext** — fast DOM-free text layout (used by SolarSystem label sprites)

---

## Key Files

| File | Purpose |
|---|---|
| `src/components/canvas/Computers.jsx` | Hero 3D scene: Rubik's cube only |
| `src/components/canvas/Ball.jsx` | Tech stack spheres (mobile grid, no labels) |
| `src/components/canvas/SolarSystem.jsx` | Solar system (desktop tech section, has Pretext labels) |
| `src/components/canvas/labelTexture.js` | `makeLabelTexture()` using Pretext — used by SolarSystem only |
| `src/components/canvas/Earth.jsx` | Contact section globe |
| `src/components/canvas/Stars.jsx` | Background star field |
| `src/components/Tech.jsx` | Technologies section — solar system on desktop, 3D ball grid on mobile |
| `src/components/Hero.jsx` | Hero section layout |
| `src/hoc/SectionWrapper.jsx` | Animation HOC wrapping most sections |
| `src/constants/index.js` | All portfolio data — technologies have `name`, `icon`, `color`, `tag`, `info` |
| `src/styles.js` | Shared Tailwind class strings |

---

## Architecture Notes

### Canvas frameloop modes

- `frameloop="always"` on Computers + SolarSystem canvases — needed for `useFrame`-driven animations
- `frameloop="demand"` on Ball/Earth canvases — renders on interaction; OrbitControls `autoRotate` keeps invalidating

### Ball canvas (mobile)

- `Ball` component takes `imgUrl` and `color` only — no label sprite, no Pretext
- Default R3F camera (no explicit camera prop)
- Mobile tech grid: 3-column grid of `h-28` cells; transparent overlay div captures taps without blocking WebGL

### Lights

- Lights live at Canvas/scene level, **not** inside `Float` or mesh groups

### Works.jsx

- `WorksContent` is the inner component; `Works = SectionWrapper(WorksContent, 'projects')`
- `noDemo` prop guards the project title/image from opening an undefined `demo_link` as a demo link

### Tilt

- `options` prop on `<Tilt>`, not on child divs

### Social icons

- Mobile nav: use `<li>`, not `<h1>`
- Desktop nav: use plain `<a>` tags, not wrapped in `<h1>`

### Bounds component (Computers.jsx)

- `<Bounds fit clip observe margin={1.15}>` auto-fits camera to enclose the Rubik's cube
- Place any non-cube 3D elements **outside** `<Bounds>` so they don't affect camera fitting

### Contact form

- Uses `status` state (`null | 'success' | 'error'`) for inline feedback — no `alert()` calls
- Form inputs use `outline-none` (not `outlined-none`) to suppress browser focus rings

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

**No `inline-flow` sub-export exists in v0.0.4** — simulate inline-flow with separate `prepareWithSegments` calls per font run.

**`lines[0].width` trick** — passing `maxWidth=4000` to `layoutWithLines` prevents wrapping, so `lines[0].width` is the exact natural (unwrapped) pixel width of the text — used for precise inline layout in `labelTexture.js`.

---

## SolarSystem Label Sprites

`src/components/canvas/labelTexture.js` builds a `THREE.CanvasTexture` (320×88px) for each planet/sun using Pretext. Layout: colored dot → tech name (bold 15px) → version tag chip (11px). Used exclusively by `SolarSystem.jsx`.

Key decisions:
- **`useMemo([name, tag, color])`** — Pretext `prepare` runs once per planet at mount
- **Sprite outside the mesh group** — no Float in SolarSystem planets, so no orbiting issue
- **`spriteMaterial depthWrite={false}`** — prevents z-fighting with the planet geometry
- **`lighten(hex, ratio)` helper** — brightens tech color for tag chip text legibility

---

## Planned Pretext Features (not yet implemented)

- **Editorial flow:** Rubik's cube embedded in hero bio text; `layoutNextLine` with variable widths so text flows around the cube as the user drags it
- **Idea 3:** Editorial text wrapping around Earth globe (`layoutNextLine` with variable widths that narrow around the globe's silhouette)
