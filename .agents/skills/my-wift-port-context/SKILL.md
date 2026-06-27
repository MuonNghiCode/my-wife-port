---
name: my-wift-port-context
description: >-
  Provides complete context, architecture, design system, colors, and asset
  details for the my-wift-port (PortfolioOS) Next.js project.
---

# My Wift Port (PortfolioOS) Context Skill

## Overview
This skill provides comprehensive context, architectural specifications, design system details, and development guidelines for the **my-wift-port** repository (also known as **PortfolioOS**). Antigravity and other agentic coding assistants must refer to this skill whenever modifying or extending this codebase.

---

## 🛠️ Project Stack & Libraries
* **Framework**: Next.js 16 (App Router with TypeScript)
* **Styling**: Tailwind CSS v4 & PostCSS (Using CSS variables inside `globals.css` to govern theme styling)
* **Animations**: Framer Motion
* **State Management**: Zustand
* **Icons**: Lucide React
* **Audio**: Custom synthesized sound effects (synthesized dynamically using **Web Audio API** in browser) + regular audio stream.

---

## 🎨 Design System & Colors
The project utilizes a solid-color, high-contrast, clean pastel aesthetic. The primary configurations are located in [globals.css](file:///d:/Workspace/code/my-wift-port/app/globals.css):

### ☀️ Light Theme (Default)
* **Desktop Base Background**: `#d2e0f0` (Dusty pastel blue)
* **Window/Card Surface**: `#ffffff` (Pure white)
* **Accent Pink (Active/Highlight)**: Soft: `#fdf2f8`, Bright: `#fbcfe8`, Vivid: `#ec4899` (Hot pink)
* **Accent Blue (Active/Highlight)**: Soft: `#f0f9ff`, Bright: `#bae6fd`, Vivid: `#0ea5e9` (Bright blue)
* **Text**: Primary: `#111827` (Dark slate), Secondary: `#374151`, Muted: `#6b7280`

### 🌙 Dark Theme (Active via `.dark` class on `html`)
* **Desktop Base Background**: `#182232` (Deep warm dusty blue)
* **Window/Card Surface**: `#1e293b` (Dark slate slate-800)
* **Accent Pink (Darker variation)**: Soft: `#2d1624`, Bright: `#4c283c`
* **Accent Blue (Darker variation)**: Soft: `#102234`, Bright: `#1b354d`
* **Text**: Primary: `#f8fafc` (Slate-50), Secondary: `#cbd5e1`, Muted: `#94a3b8`

### 🚫 Strict Visual Design Rules
These rules are **mandatory** for all UI work on this project. Violating them will produce results that feel "AI-generated" and off-brand.

1. **NO gradients**: Use **solid flat colors only** everywhere — backgrounds, buttons, progress bars, borders, text. The `globals.css` line 46 explicitly states `/* Solid Colors for Layouts (No gradients) */`. This means NO `linear-gradient`, NO `radial-gradient`, NO `conic-gradient` anywhere in components.
2. **Stay on-palette**: Only use colors defined in the CSS variables above. The base background is always `#d2e0f0` (light) or `#182232` (dark). Never introduce dark sci-fi colors like `#0f172a`, `#1a1a2e`, or neon glows.
3. **Physical & Immersive feel**: Design elements should feel like tangible objects you can touch — laptops on desks, USB sticks in your hand, paper cards, real buttons. Avoid abstract geometric shapes (floating hexagons, diamond rotations, glowing particles, scanning lines).
4. **Subtle over flashy**: Use soft box-shadows (`rgba(0,0,0,0.06)`), thin solid borders (`1px solid #e5e7eb`), and gentle spring animations. Avoid glow effects (`box-shadow` with bright colors), neon borders, or pulsing light shows.
5. **Typography hierarchy**: Use `var(--font-display)` (Playfair Display) for headings, `var(--font-ui)` (Inter) for body text, and `var(--font-mono)` (JetBrains Mono) only for actual code/system text. Colors for text: dark slate `#111827` for primary, `#6b7280` for muted, `#ec4899` for accent labels.
6. **Laptop/Hardware colors**: The laptop chassis uses `#334155` (dark slate) with `#1e293b` borders, `#475569` keys, `#d1d5db` metal parts. The USB body is `#bae6fd` (pastel blue) with `#7dd3fc` border. These are intentionally realistic hardware tones.

---

## 🖼️ Static Assets & Image Map
All local visual assets are located in the `public/` directory:
* **Lockscreen / Desktop Wallpaper**: `/marketing_desktop_wallpaper.png`
* **Project Campaign Images**:
  * Brand Relaunch Campaign: `/images/projects/brand.jpg`
  * Product Launch (Skincare collection): `/images/projects/launch.jpg`
  * Social Media Transformation: `/images/projects/social.jpg`
  * Integrated Holiday Campaign: `/images/projects/campaign.jpg`

---

## 🔄 Boot Sequence & Phases
The booting sequence is governed by [bootStore.ts](file:///d:/Workspace/code/my-wift-port/store/bootStore.ts) using the following phases:
1. `idle`: Displays Laptop CSS illustration and floating USB drive. Requires user click.
2. `inserting`: USB drive slides into the laptop port.
3. `powering-on`: White flash transition.
4. `bios`: BIOS booting log message list (e.g., *"Loading your story..."*). Plays `boot` sound.
5. `loading`: OS-themed progress loading bar (0% to 100%).
6. `login`: Lockscreen login panel with clock, avatar ("NP"), and entry button. Plays `login` sound.
7. `desktop`: The interactive Windows-like workspace containing icons, taskbar, start menu, and windows.
8. `shutting-down`: Displays the red power animation overlay for 3 seconds before reverting to `idle`. Plays `shutdown` sound.

---

## 📂 Key Code & Architecture Map

### 1. State Stores (`store/`)
* [bootStore.ts](file:///d:/Workspace/code/my-wift-port/store/bootStore.ts): Manages OS boot states (`phase`, `bootProgress`, etc.).
* [desktopStore.ts](file:///d:/Workspace/code/my-wift-port/store/desktopStore.ts): Manages all open windows (opening, closing, focus z-index, resizing, positions).
  * *Behavior Rule*: By default, all applications initialized via `openWindow` open in **maximized** state (`isMaximized: true`).
* [soundStore.ts](file:///d:/Workspace/code/my-wift-port/store/soundStore.ts): Handles volume, mute state, music track streaming, and synthesizes OS sounds (clicks, opens, boots) using the browser's Web Audio API oscillators.

### 2. Workspace Applications (`features/`)
Each desktop icon opens a corresponding window feature:
* `about`: About Nguyễn Ngọc Phương + interactive timelines and typing subtitles.
* `projects`: Visual grid of marketing portfolios, GTM strategies, and results.
* `skills`: Visual progress bar categories of marketing expertise.
* `experience`, `education`, `certificates`, `achievements`: CV components styled inside desktop windows.
* `contact`: Interactive feedback and email collaboration form.
* `music`: SoundCloud simulation. Combines stream tracks with **Web Audio API synthesized ambient noise generators** (Rain pink noise, Campfire crackling oscillators, Forest birds chirping oscillators).
* `browser`: In-frame webpage viewport with a specialized LinkedIn security shield overlay.
* `secret`: Password-protected room (Password: `portfolio`) displaying fun personal facts.

---

## ⚠️ Critical Development Rules (ESLint/React 19 Compatibility)
To ensure the project builds correctly without ESLint errors:
1. **Purity in React Components**: Never call impure functions (like `Math.random()`) inside a component render block. Instead:
   * Declare static random arrays outside the component at the module level.
   * Or initialize random state inside `useMemo` or state handlers (never directly inside the render loop).
2. **Safe useEffect Updates**: Avoid calling state updates (`setState`) synchronously inside `useEffect` on mount. This triggers compilation and cascade errors. Wrap client-side initializers (such as theme classes or local storage syncing) in `setTimeout(() => { setState(...) }, 0)`.
3. **Typography Escaping**: Always escape quotes (`'` and `"`) in raw JSX text elements using HTML entities (`&apos;` and `&quot;`).
4. **Typing dynamic Lucide Icons**: To load dynamic Lucide React icons dynamically by string keys, cast `Icons` object safely:
   `const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]`
   Avoid using type `any` to prevent `@typescript-eslint/no-explicit-any` errors.
5. **Web Audio Closures**: When using `setInterval` or callbacks inside Web Audio hooks that reference React state (such as volume levels), wrap the state variables in a mutable React `Ref` (`volumesRef`) to prevent stale closures.
