# DigiDifference Design System

## Core Aesthetic
- **Vibe:** Cinematic, dark-mode, luxury studio.
- **Canvas Base:** True Black (`bg-black`).
- **Foreground:** Pure White (`text-white`). Secondary text heavily relies on opacity (`white/60`, `text-gray-400`).
- **Pacing:** Defined by fluid GSAP staggered timelines.

## Typography
1. **Primary Setup (Sans-serif):** `Montserrat`
   - Weight: 400 (Base), 600 (Hero Title).
   - Usage: All UI labels, header buttons, hero text, taglines. Always tracked wide (`tracking-widest`).
2. **Display Setup (Serif):** `Cormorant`
   - Usage: Used for accent blocks (e.g., italicized loading screen rotating words).

## Interactive Components & Tooling

### Menu Overlay
- **Trigger:** Solid absolute takeover. Screen is `#0a0a0a`.
- **Items Construction:** Hidden masking wrappers. Oversized links (`text-[10rem]`). Subtly bordered with 1px `#333` lines.
- **Hover Micro-interaction:** Custom dual-span structural setup copying vertical translation strings identically without scaling.

### Hero 
- **The "D" Element:** A CSS/Layout native SVG geometry wrapper that animates `width` directly via GSAP (`2.4em` layout width shift) avoiding visual `font-weight` ballooning seen in raw `scaleX` transforms.
- **Background Visuals:** `<ColorBends />` component. Rendered with dark purple (`#a855f7`), blend mode `mix-blend-screen` overlaying True Black.

### Fluid Load Sequence
- **Pre-loader:** Framer-motion driven. Coordinates with central rotating array (`Design -> Create -> Inspire`) spanning 2700ms tied physically to an interpolated bottom gradient progress bar `['#89AACC', '#4E85BF']`.
- **Exit Handoff:** Pre-loader fades `0.6s`. Root `<main>` layout opacity activates strictly dependent on `isLoading` resolution ensuring zero animation conflict.
