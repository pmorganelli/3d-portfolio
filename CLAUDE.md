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
| `src/components/canvas/Computers.jsx` | Hero canvas + DOM HUD (moves, timer, Scramble/Undo/Reset/Done) for the playable Rubik's cube |
| `src/components/canvas/RubiksCube.jsx` | Procedural, fully turnable 3×3×3 cube: drag-to-turn, scramble, undo, solved detection |
| `src/components/canvas/Ball.jsx` | Bare tech ball mesh — rendered via drei `<View>` in TechBallGrid's shared canvas |
| `src/components/canvas/TechBallGrid.jsx` | Mobile tech grid: one shared `<Canvas>` + a `<View>` per cell |
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

### Lazy-loaded 3D

- Every canvas component is imported with `React.lazy` from its own file (`./canvas/Stars`, `./canvas/Computers`, …) so three.js stays out of the entry bundle (~360 kB instead of ~1.4 MB). There is no `canvas/index.js` barrel — a barrel import would pull three.js back into the entry chunk
- Sections themselves are **not** lazy: GooeyNav's scroll spy looks up section anchors once on mount
- The Earth canvas and the Tech scene (solar system / ball grid) only *mount* once their section is within ~1000px of the viewport (`useInView(..., { once: true })` on an untransformed wrapper) — this defers the 2.9 MB globe model and the SolarSystem chunk until they're needed

### Canvas frameloop modes

- Computers, SolarSystem and TechBallGrid switch `frameloop` between `always` and `never` with framer's `useInView`, so nothing renders while scrolled off screen; Earth gets `active` → `autoRotate` for the same reason

- `always` (while in view) on Computers + SolarSystem + mobile tech grid canvases — needed for `useFrame`-driven animations
- `frameloop="demand"` on the Earth canvas — renders on interaction; drei OrbitControls `autoRotate` keeps invalidating (note: this only works for drei **OrbitControls**; yomotsu camera-controls has no `autoRotate` API)

### Mobile tech grid (single shared canvas)

- `Ball` is a bare mesh component (`imgUrl`, `color`) — no Canvas, no label sprite, no Pretext
- TechBallGrid.jsx renders ONE `<Canvas>` with `<View.Port />` and a drei `<View>` per grid cell — a canvas per ball previously put the page at the browser's WebGL context limit (evicted canvases on mobile)
- Each `<View>` carries its own lights; cell `onClick` opens the bottom sheet; the Canvas overlay is `pointer-events: none`

### Lights

- Lights live at Canvas/scene level, **not** inside `Float` or mesh groups

### Works.jsx

- `WorksContent` is the inner component; `Works = SectionWrapper(WorksContent, 'projects')`
- `noDemo` prop guards the project title/image from opening an undefined `demo_link` as a demo link
- Each `ProjectCard` has its own `whileInView` (stagger by column) — inheriting the section's variants made late cards wait `index * 0.5s`
- Tilt is only mounted when `useCanHover()` is true; touch devices get a plain div (tap left cards stuck tilted)
- Optional `gallery: [{ src, alt }]` on a project renders extra images in the Learn More modal
- `breakAtSlash()` inserts `​` after `/` in project names so titles like "Image Compressor/Decompressor" wrap at the slash; titles also have `break-words`

### SolarSystem camera (camera-controls, NOT OrbitControls)

- yomotsu camera-controls has **no autoRotate** — idle rotation is driven manually via `useFrame` → `cc.rotate(IDLE_ROTATE_SPEED * delta, 0, false)`
- `cc.rotate` must be called with `enableTransition = true` — `false` copies the end angles onto the current ones, which snaps the glide back home and strips damping from drags
- While a planet is selected, `useFrame` re-targets `setLookAt(..., true)` every frame from the shared `planetPositions` map — smooth damped follow that keeps the orbiting planet in frame
- Orbit angles are accumulated with `delta` in a ref, **not** derived from `clock.elapsedTime` — R3F zeroes the clock whenever `frameloop` changes, which teleported every planet back to its start angle on scroll-in
- Deselect is the Canvas's `onPointerMissed` (no backdrop div), so clicking another planet switches straight to it; Escape also closes the card
- Hovering any body slows the orbits (shared `hoverCount` / `timeScale` refs); planets have a larger invisible hit sphere
- A row of DOM chips under the canvas selects planets (keyboard / screen-reader path); the canvas container is `calc(100vh - 96px)` so the chips stay on screen below the fixed navbar

### SectionWrapper

- `initial="hidden"` + `whileInView="show"` — sections must start hidden or none of the fadeIn/slideIn/stagger entrance animations play (a past `initial={false}` silently disabled all of them)
- `viewport` uses a bottom `margin`, **not** `amount` — a fraction of the section's height can exceed a phone's viewport (stacked Projects grid), and the section then never reveals

### Tilt

- `options` prop on `<Tilt>`, not on child divs

### Reduced motion

- `<MotionConfig reducedMotion="user">` wraps the app; canvases read framer's `useReducedMotion()` to stop auto-rotation, orbits and ball spin (Stars switches to `frameloop="demand"`); CSS disables smooth scroll

### GooeyNav scroll spy

- `activeIndex` is `-1` above the first section (hero) — no pill
- A click on a nav link locks the spy so the pill doesn't hop through every section the smooth scroll passes. The lock is released by a rAF loop once `scrollY` has been still for ~150ms of smooth frames — **not** by timers or `scroll`/`scrollend` events, which a busy main thread delays (a 300ms timer used to expire first and snap the pill back to the old section)
- At the very bottom of the page the last section is active — on a tall window Contact can't scroll up to the navbar, so "topmost visible" would pick Projects
- The pill is positioned in the click handler / a layout effect, and particles are added in one synchronous batch (no per-particle timers)

### Social icons

- Mobile nav: use `<li>`, not `<h1>`
- Desktop nav: use plain `<a>` tags, not wrapped in `<h1>`

### Playable Rubik's cube (RubiksCube.jsx + Computers.jsx)

- The cube is built in code (26 cubies sharing one body geometry + sticker materials) — the old `public/rubiks_cube` GLTF was a single fused mesh and has been deleted
- Two modes: idle (auto-rotate, a click on the cube enters play mode and scrambles a solved cube) and play (`interactive`): dragging on the cube turns a layer, dragging empty space orbits, Escape / Done exits
- Game state (cubie `pos`/`quat`, current turn, move queue, history) lives in refs and is applied imperatively in `useFrame` — cubie groups take **no** position props, so React re-renders can't snap a half-dragged layer back
- One invisible 3×3×3 box receives all pointer hits; the hit point gives the face (largest |coord|) and the layer. The drag direction is matched against the face's two tangent axes projected to screen space
- The cube group must stay un-rotated at the origin — the turn maths assumes local == world. Change the starting view with the camera position instead
- R3F's pointerdown runs before OrbitControls' listener, so setting `controls.enabled = false` there suppresses orbiting for that gesture
- Solved = every direction shows one colour (orientation-agnostic, since slice turns move centres); only announced after a scramble
- `FitCamera` sets camera distance from the cube's bounding sphere and the canvas aspect. drei `<Bounds>` is not used here
- In play mode the canvas drops `scroll-safe` and uses `touch-action: none` so touch drags can turn layers vertically

### Contact form

- The globe container has a fixed height at every breakpoint — if it stretches to the form's height, resizing the textarea resizes the canvas

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

`src/components/canvas/labelTexture.js` builds a `THREE.CanvasTexture` (320×88 logical px, drawn at 2×) for each planet/sun using Pretext. Layout: colored dot → tech name (bold 15px) → version tag chip (11px). Used exclusively by `SolarSystem.jsx`.

Key decisions:
- **`useMemo([name, tag, color])`** — Pretext `prepare` runs once per planet at mount
- **Sprite outside the mesh group** — no Float in SolarSystem planets, so no orbiting issue
- **Screen-space sizing** — the `Label` component rescales the sprite every frame from its camera distance (62% of native size idle, 100% hovered/selected) and hangs it along the camera's down axis; world-sized labels were ~2px text from the home camera
- **`spriteMaterial depthWrite={false}`** — prevents z-fighting with the planet geometry
- **`lighten(hex, ratio)` helper** — brightens tech color for tag chip text legibility

---

## Planned Pretext Features (not yet implemented)

- **Editorial flow:** Rubik's cube embedded in hero bio text; `layoutNextLine` with variable widths so text flows around the cube as the user drags it
- **Idea 3:** Editorial text wrapping around Earth globe (`layoutNextLine` with variable widths that narrow around the globe's silhouette)
