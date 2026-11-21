---
name: StandBy 6s
description: Quiet matte-dark bedside StandBy instrument for iPhone 6s landscape displays with Vietnamese solar/lunar calendar, outdoor telemetry, and narrow-spectrum Night Red mode.
colors:
  accent: "#E86C3A"
  accent-ink: "#0B0B0D"
  accent-soft: "rgba(232, 108, 58, 0.16)"
  status-ok: "#46B87A"
  status-warn: "#E5A440"
  bg-canvas: "#050506"
  bg-panel: "#0E0F12"
  bg-elevated: "#16181E"
  border-subtle: "#1E2028"
  border-active: "#343846"
  text-primary: "#F4F4F0"
  text-secondary: "#9A9EA9"
  text-muted: "#7F8390"
  night-bg-canvas: "#000000"
  night-bg-panel: "#080202"
  night-bg-elevated: "#120505"
  night-border-subtle: "#2A0808"
  night-border-active: "#521010"
  night-text-primary: "#FF2D2A"
  night-text-secondary: "#F0352E"
  night-text-muted: "#E62E2D"
  night-accent: "#FF3B30"
  night-accent-ink: "#050000"
  night-accent-soft: "rgba(255, 59, 48, 0.16)"
  night-status-ok: "#FF3B30"
  night-status-warn: "#E62E2D"
typography:
  display:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(4.2rem, 11.2vw, 9.2rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.03em"
    fontFeature: '"tnum" 1'
  headline:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.9rem, 4.6vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: '"tnum" 1'
  title:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(0.84rem, 1.9vw, 1.05rem)"
    fontWeight: 600
    fontFeature: '"tnum" 1'
  body:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(0.74rem, 1.8vw, 0.92rem)"
    fontWeight: 500
    fontFeature: '"tnum" 1'
  label:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    fontFeature: '"tnum" 1'
rounded:
  track: "2px"
  cell: "7px"
  sm: "8px"
  digit-card: "10px"
  panel: "14px"
  pill: "999px"
spacing:
  2xs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  2xl: "24px"
  shell-y: "clamp(8px, 2.2vh, 20px)"
  shell-x: "clamp(10px, 2.2vw, 24px)"
  grid-gap: "clamp(8px, 1.8vw, 16px)"
  stack-gap: "clamp(8px, 1.8vh, 14px)"
components:
  top-pill:
    backgroundColor: "{colors.bg-panel}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "6px 12px"
  top-pill-active:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "6px 12px"
  top-pill-icon:
    backgroundColor: "{colors.bg-panel}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "6px 10px"
  panel:
    backgroundColor: "{colors.bg-panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.panel}"
    padding: "12px 14px"
  button-secondary:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "30px"
    padding: "5px 10px"
  button-text-close:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  input-city:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: "30px"
    padding: "5px 10px"
  chip-city:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  chip-city-active:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  segmented-button:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "5px 6px"
  segmented-button-active:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "5px 6px"
  calendar-cell-today:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.cell}"
    padding: "2px 3px"
  clock-card-unit:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.digit-card}"
    padding: "0.09em 0.12em"
  telemetry-bar-fill:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.track}"
    height: "4px"
---

# Design System: StandBy 6s

## Overview

**Creative North Star: "The Quiet Bedside Instrument"**

StandBy 6s translates the calm physical clarity of a Braun desktop chronometer and Apple StandBy utility into a dedicated always-on landscape display for an iPhone 6s (`667×375` baseline). Every decision serves effortless glanceability from 1–3 meters away in daylight or a pitch-black bedroom, pairing oversized tabular numerals on flat matte charcoal surfaces with disciplined 1px structural hairlines and zero decorative clutter.

Thermal and visual restraint are inseparable here. The surface rejects glassmorphism, neon glows, drop shadows, gradients, 3D skeuomorphic bevels, and continuous 60fps animation loops so the hardware stays cool on 24/7 charging power while remaining visually serene. When darkness falls, the entire token layer pivots cleanly into narrow-spectrum Night Red mode—eliminating cool wavelengths without sacrificing WCAG AA legibility.

**Key Characteristics:**
- Flat matte dark surface layering separated by crisp 1px hairlines rather than drop shadows or blur
- Oversized tabular numerals in self-hosted Be Vietnam Pro engineered for 1–3 meter readability and crisp Vietnamese diacritics
- Single warm Signal Orange accent for live temporal and telemetry anchors, paired with a full narrow-spectrum Night Red theme
- Hardware-sympathetic motion limited to brief state transitions, once-per-second time updates, and a 10-minute ±1px LCD pixel shift

## Colors

A restrained matte-obsidian neutral stack anchored by a single warm Signal Orange accent, with an isomorphic narrow-spectrum crimson token set for Night Red mode.

### Primary
- **Signal Orange** (`#E86C3A`): Primary active accent for today's calendar highlight fill, Sunday headers and dates, special lunar markers (1st and 15th), hairline seconds and humidity progress fills, active segmented/chip borders, focus outlines, inline close/retry actions, and dimmer range thumb.
- **Accent Deep Ink** (`#0B0B0D`): High-contrast dark ink rendered atop solid Signal Orange fills (today's solar and lunar numerals).
- **Signal Orange Wash** (`rgba(232, 108, 58, 0.16)`): Translucent 16% accent fill for active segmented control buttons and text selection highlights.
- **Night Signal Red** (`#FF3B30`): Night Red mode override for the primary accent across active indicators, today's calendar cell, progress bars, active borders, and focus outlines.
- **Night Accent Ink** (`#050000`): Near-black crimson ink rendered atop solid Night Signal Red fills.
- **Night Signal Wash** (`rgba(255, 59, 48, 0.16)`): Translucent 16% red fill for active segmented buttons and text selection in Night Red mode.

### Secondary
- **Wake-Lock Emerald** (`#46B87A`): Functional hardware telemetry exclusively for the 7px wake-lock indicator dot when screen keep-awake is active.
- **Standby Amber** (`#E5A440`): Functional hardware telemetry exclusively for the 7px wake-lock indicator dot when keep-awake awaits user interaction.
- **Night Wake-Lock Red** (`#FF3B30`): Night Red mode override collapsing the active wake-lock dot into narrow-spectrum red.
- **Night Standby Crimson** (`#E62E2D`): Night Red mode override collapsing the standby wake-lock dot into narrow-spectrum red.

### Neutral
- **Pitch Obsidian Canvas** (`#050506`): Root viewport background and PWA chrome theme color framing all panels.
- **Matte Charcoal Panel** (`#0E0F12`): Primary surface for top-bar utility pills and all main Bento panels (Clock, Calendar, Weather, Humidity, Settings).
- **Elevated Slate** (`#16181E`): Raised inner matte surface for split-card clock digit tiles, hover/pressed top-bar pills, inputs, secondary buttons, chips, segmented controls, and empty progress bar tracks.
- **Hairline Slate** (`#1E2028`): Default `1px` structural stroke around every panel, pill, input, chip, and weekday divider.
- **Active Slate Border** (`#343846`): Emphasized `1px` border on hovered/pressed top-bar pills, hovered secondary buttons, and custom scrollbar thumbs.
- **Warm Ivory** (`#F4F4F0`): High-contrast primary ink for clock numerals, temperature/humidity figures, panel titles, solar dates, and active control text.
- **Muted Cool Slate** (`#9A9EA9`): Secondary ink for clock seconds, day period, weather conditions, metric units, lunar date subtitles, and resting control labels.
- **Subtle Slate** (`#7F8390`): Tertiary ink for weekday column headers, clock style tags, environmental metadata, top-bar separators, and input placeholders (passing ≥ 4.5:1 on Matte Charcoal Panel).
- **Night Pitch Black** (`#000000`): Root Night Red viewport canvas and full-screen software LCD dimmer overlay (`0%`–`75%` opacity).
- **Night Crimson Panel** (`#080202`): Primary panel surface in Night Red mode.
- **Night Burgundy Elevated** (`#120505`): Elevated control and split-card tile surface in Night Red mode.
- **Night Crimson Hairline** (`#2A0808`): Default `1px` structural border in Night Red mode.
- **Night Active Crimson Border** (`#521010`): Hover and active `1px` control border in Night Red mode.
- **Night Primary Crimson** (`#FF2D2A`): Primary luminous red ink for clock numerals, headings, and solar dates in Night Red mode.
- **Night Secondary Crimson** (`#F0352E`): Secondary red ink for dates, weather conditions, and resting labels in Night Red mode.
- **Night Muted Crimson** (`#E62E2D`): Tertiary red metadata ink tuned to maintain WCAG AA contrast (≥ 4.5:1) against Night Crimson Panel.

### Named Rules
**The Single Signal Accent Rule.** Warm Signal Orange (`#E86C3A`) is reserved strictly for active temporal anchors and live telemetry—today's calendar badge, Sundays, lunar 1st/15th markers, hairline progress fills, active settings controls, focus rings, and inline actions. No secondary decorative accent competes with it; the only non-orange chromatic elements are the 7px wake-lock hardware status dots (`#46B87A` active, `#E5A440` standby).

**The Narrow-Spectrum Night Rule.** When Night Red mode is active (manually or automatically between 22:00 and 06:00), every canvas, panel, border, text ink, accent, and wake-lock dot collapses exclusively into narrow-spectrum crimson (`#FF2D2A`–`#E62E2D` on `#000000`–`#120505`) while maintaining WCAG AA contrast (≥ 4.5:1) and zero blue/green wavelength emission.

## Typography

**Display Font:** Be Vietnam Pro (self-hosted WOFF2 subsets for Vietnamese, Latin-Ext, and Latin across weights 400, 500, 600, 700; fallback `-apple-system, BlinkMacSystemFont, sans-serif`)
**Body Font:** Be Vietnam Pro (same single-family system for zero extra font overhead on iOS 15)

**Character:** Clean geometric humanist sans-serif engineered natively for stacked Vietnamese diacritics, pairing tight-tracked bold tabular numerals with calm, legible UI metadata from a single offline typeface.

### Hierarchy
- **Display** (700, `clamp(4.2rem, 11.2vw, 9.2rem)`, line-height `0.94`, tracking `-0.03em`): Primary clock hours and minutes in default Minimal style. Clock style variants adjust scale cleanly: Split Cards scales to `clamp(3.5rem, 9.2vw, 7.6rem)` inside framed tiles; Bold hides seconds and scales to `clamp(4.9rem, 13.2vw, 10.5rem)`. Subordinate seconds render at weight 600, `clamp(1.25rem, 3.2vw, 2.4rem)`, tracking `-0.02em`.
- **Headline** (700, `clamp(1.9rem, 4.6vw, 3.8rem)`, line-height `1`, tracking `-0.03em`): Primary outdoor temperature and relative humidity figures, paired with baseline-aligned units (`°C`, `%`) at weight 600, `clamp(0.95rem, 2vw, 1.45rem)`.
- **Title** (600, `clamp(0.84rem, 1.9vw, 1.05rem)`): Primary panel and date headings, including the full solar date line, monthly calendar header (`clamp(0.82rem, 1.75vw, 1rem)`), Settings panel header (`0.88rem`), and day-period label (`clamp(0.78rem, 1.7vw, 0.96rem)`).
- **Body** (500, `clamp(0.74rem, 1.8vw, 0.92rem)`): Top-bar solar/lunar summary, outdoor weather/humidity condition descriptions (`clamp(0.74rem, 1.45vw, 0.92rem)`), calendar solar dates (weight 600, `clamp(0.72rem, 1.45vw, 0.88rem)`), lunar full date subtitle (weight 400, `clamp(0.73rem, 1.55vw, 0.88rem)`), and city search input (`0.76rem`, weight 400).
- **Label** (500–600, `0.72rem`–`0.75rem`): Compact utility chrome including top-bar pills (`0.75rem`), settings labels and secondary buttons (`0.74rem`), weekday headers, segmented control options, preset city chips, and environmental metadata (`0.72rem`–`0.82rem`). Inside the dense 42-cell month grid, subordinate lunar day subscripts render at weight 400, `clamp(0.56rem, 1vw, 0.66rem)` (weight 600 on 1st/15th lunar days).

### Named Rules
**The Tabular Lock Rule.** Every numeric figure across the clock, Vietnamese solar/lunar dates, monthly calendar cells, temperature, humidity, and dimmer readout enforces tabular numerals (`font-variant-numeric: tabular-nums` and `"tnum" 1`), with fixed `0.62em` hour/minute digit slots and `0.64em` second slots so ticking time never causes horizontal layout jitter.

**The Three-Meter Hierarchy Rule.** Primary time (`clamp(4.2rem, 11.2vw, 9.2rem)` bold) and outdoor telemetry (`clamp(1.9rem, 4.6vw, 3.8rem)` bold) carry the visual weight for across-the-room reading, while dates, conditions, and compact utility controls stay quiet in medium-weight slate (`0.72rem`–`1.05rem`).

## Layout

StandBy 6s is a single-screen, non-scrolling (`overflow: hidden`) full-viewport fixed shell designed around the `667×375` iPhone 6s landscape baseline, using fluid `clamp()` spacing and equal-split CSS Grid tracks so nothing overflows or squeezes across phone, tablet, or desktop viewports.

- **Outer Shell & Rhythm:** Fixed full-viewport flex column with fluid padding (`clamp(8px, 2.2vh, 20px)` vertical, `clamp(10px, 2.2vw, 24px)` horizontal) and vertical gap (`clamp(6px, 1.8vh, 14px)`). An ambient pixel-shift transform translates the shell ±1px every 10 minutes to prevent LCD image retention during 24/7 mounting.
- **Top Status Bar:** Fixed-height header (`clamp(28px, 7.5vh, 38px)`) with a left-aligned single-line Vietnamese weekday, solar date, and lunar badge and a right-aligned horizontal cluster of utility pills (`6px` gap).
- **Equal 50/50 Bento Grid:** Two equal `minmax(0, 1fr)` columns separated by `clamp(8px, 1.8vw, 16px)`. The left column houses the full-height Clock panel (`14px 18px` padding). The right column stacks the Monthly Calendar (`flex: 1.32`) above a 2-column environmental telemetry row (`flex: 0.92`, equal `minmax(0, 1fr)` Weather and Humidity panels separated by `clamp(8px, 1.6vw, 14px)`).
- **Inline Settings Swap:** Opening Settings replaces the Calendar and Weather/Humidity panels inside the right column (`flex: 1`, vertical internal scroll if needed) while keeping the left Clock panel live and uninterrupted.
- **Responsive Breakpoints & Orientation Lock:**
  - **Force-Landscape 90° Mode:** Rotates the shell `90deg` with swapped `100vh × 100vw` bounds so landscape layout persists even when iOS portrait orientation lock is enabled.
  - **Compact Portrait (`max-width: 560px` and `orientation: portrait`):** Stacks the Bento grid into a single column (`grid-template-rows: auto minmax(0, 1fr)`), wraps the top bar, collapses the 2-column settings grid to one column, and fixes clock numerals (`4.2rem` Minimal / `3.4rem` Cards / `4.8rem` Bold).
  - **Wide Desktop (`min-width: 1024px`):** Opens internal panel padding generously (`24px 28px` clock, `18px 20px` calendar and telemetry panels, `20px 24px` settings).

## Elevation & Depth

StandBy 6s is strictly flat and matte. Zero `box-shadow`, `backdrop-filter`, or gradient treatments exist anywhere in the interface. Visual depth comes solely from stepping surface luminance up from the obsidian canvas (`#050506`) to matte charcoal panels (`#0E0F12`) and elevated inset controls (`#16181E`), reinforced by crisp `1px` hairline borders (`#1E2028` resting, `#343846` active, `#E86C3A` selected/focused). A full-screen black dimmer overlay sits above the shell (`z-index: 900`, `pointer-events: none`) to reduce LCD brightness software-side (`0%`–`75%` opacity) in dark bedrooms.

### Named Rules
**The Zero-Shadow Tonal Plane Rule.** Surfaces never cast drop shadows, ambient glows, or backdrop blur. Spatial depth is established strictly through three flat matte surface steps (`#050506` canvas, `#0E0F12` panel, `#16181E` elevated tile) separated by crisp `1px` hairline borders (`#1E2028` at rest, `#343846` active).

**The Event-Driven Motion Rule.** Never run continuous 60fps animations or decorative loops. Transitions are short, functional state responses (`150ms`–`300ms`), accompanied only by a once-per-second colon opacity pulse (`180ms`) and a `600ms` ±1px LCD pixel-shift once every 10 minutes.

## Shapes

Form language balances precision instrument geometry with quiet corner softness across a disciplined six-step radius hierarchy and uniform stroke iconography.

- **Corner Hierarchy:** Hairline progress tracks and fills use tight rounded caps (`2px`); calendar date highlights use crisp compact cells (`7px`); inputs, secondary buttons, close controls, and segmented buttons share a small utility radius (`8px`, with `6px` for stacked search result items); split-card clock digit tiles step up slightly (`10px`); every top-level Bento panel uses a calm matte container curve (`14px`); and top-bar utility controls and preset city chips use full capsules (`999px`). Status indicator dots are exact circles (`50%`, `7px × 7px`).
- **Borders & Dividers:** Structural framing is uniformly `1px solid` (`#1E2028` resting, `#343846` active, `#E86C3A` selected). Internal dividers appear only where a header separates from dense tabular data (under calendar weekday headers and settings header).
- **Iconography:** All icons are custom inline monochrome stroke SVGs (`14px × 14px` in top-bar pills, `clamp(16px, 2.4vw, 22px)` in weather/humidity headers) drawn with uniform `1.85px` stroke width, round linecaps, round linejoins, and `fill: none`.

## Components

Controls are tactile, flat, and compact—sized for deliberate setup touches without stealing viewport area from across-the-room time and telemetry. Every interactive element carries an explicit `2px solid` accent `:focus-visible` ring offset by `2px`.

### Buttons
- **Shape:** Small utility corners (`8px` radius) for settings actions and segmented options; full capsules (`999px` radius) for top-bar utility pills.
- **Top-Bar Utility Pill:** Compact `30px`-tall capsule (`6px 12px` padding; `6px 10px` icon-only) on Matte Charcoal Panel (`#0E0F12`) with `1px` Hairline Slate border and Muted Cool Slate (`#9A9EA9`) text/icon. Hover, pressed (`aria-pressed="true"`), and expanded (`aria-expanded="true"`) states lift to Elevated Slate (`#16181E`), Active Slate Border (`#343846`), and Warm Ivory (`#F4F4F0`) over `150ms ease-out`.
- **Secondary Action Button:** Compact `30px`-tall rectangle (`5px 10px` padding, `8px` radius) on Elevated Slate (`#16181E`) with `1px` Hairline Slate border and weight-600 Warm Ivory text; hover shifts border to Active Slate Border (`#343846`).
- **Segmented Control:** Horizontal button group (`4px` gap) of equal-width `8px`-radius options (`5px 6px` padding) on Elevated Slate (`#16181E`) with `1px` Hairline Slate border. The active selection applies Signal Orange Wash (`rgba(232, 108, 58, 0.16)`), `1px` Signal Orange border (`#E86C3A`), and Warm Ivory text.
- **Inline Text Action:** Borderless Signal Orange (`#E86C3A`) text button (`3px 8px` padding, `8px` radius, `0.78rem` weight 600) for dismissing inline Settings; retry errors in environmental metadata switch to underlined Signal Orange (`2px` underline offset).

### Chips
- **Style:** Full capsule (`999px` radius, `4px 9px` padding) on Elevated Slate (`#16181E`) with `1px` Hairline Slate border and Muted Cool Slate (`#9A9EA9`) text (`0.72rem` weight 500).
- **State:** Active preset city or hovered chip shifts border directly to Signal Orange (`#E86C3A`) and text to Warm Ivory (`#F4F4F0`).

### Cards / Containers
- **Corner Style:** Soft instrument curve (`14px` radius).
- **Background:** Matte Charcoal Panel (`#0E0F12`) in day mode; Night Crimson Panel (`#080202`) in Night Red mode.
- **Shadow Strategy:** Strictly flat (`box-shadow: none`); relies on tonal step above canvas plus `1px` Hairline Slate border (`#1E2028`).
- **Internal Padding:** `12px 14px` base (`14px 18px` Clock, `10px 14px 12px` Calendar, `12px 14px 14px` Settings), expanding to `18px 20px`–`24px 28px` above `1024px`.

### Inputs / Fields
- **Style:** Compact `30px`-tall matte field (`5px 10px` padding, `8px` radius) on Elevated Slate (`#16181E`) with `1px` Hairline Slate border, Warm Ivory input text (`0.76rem`), Subtle Slate placeholder (`#7F8390`), and Signal Orange caret.
- **Focus:** `2px solid` Signal Orange (`#E86C3A`) outline with `2px` offset (`:focus-visible`).
- **Range Slider:** Native full-width dimmer slider (`24px` height) themed via `accent-color` set to Signal Orange (`#E86C3A`), paired with a right-aligned tabular percentage readout (`32px` min-width, weight 600).

### Navigation
- **Top Status Bar:** Single-row `clamp(28px, 7.5vh, 38px)` header pairing non-interactive solar/lunar date context on the left with five interactive utility pills on the right (Location selector, Wake-Lock status with 7px dot, 90° Force-Landscape lock, Night Red toggle, and Inline Settings trigger). Wraps cleanly on narrow portrait screens.

### Signature Clock & Hairline Telemetry
- **Interactive Clock Readout:** Centered tabular `HH:MM` + subordinate seconds readout supporting tap/keyboard cycling across three styles (`Tối giản` minimal numerals, `Thẻ đôi` elevated `10px`-radius framed hour/minute tiles, and `Đậm nét` oversized hours/minutes hiding seconds). The colon pulses opacity (`1` to `0.28`, `180ms ease-out`) every second above a `2px`-tall full-width seconds track (`250ms linear` Signal Orange fill).
- **Vietnamese Solar/Lunar Calendar Grid:** Fixed 7-column × 6-row (`42`-cell) Monday-first grid with `max-height: 30px` cells combining bold solar day numbers and subordinate lunar day markers (`1/M` on lunar month start). Adjacent-month days fade to `0.35` opacity; Sundays and lunar 1st/15th dates highlight in Signal Orange (`#E86C3A`); today renders as a solid Signal Orange `7px`-radius badge with Accent Deep Ink (`#0B0B0D`) solar and lunar numerals.
- **Environmental Telemetry Cards:** Twin 50/50 matte panels displaying stroke weather/droplet icons, Vietnamese condition or comfort labels, bold tabular temperature (`°C`) or humidity (`%`) metrics, a `4px`-tall humidity progress bar (`300ms ease-out`), and muted high/low, feels-like, dew point, and sync timestamp footers.

## Do's and Don'ts

### Do:
- **Do** enforce `tabular-nums` (`"tnum" 1`) and fixed character slots on all live numerals so clock ticks and telemetry refreshes never shift neighboring text.
- **Do** preserve the three-step flat matte hierarchy (`#050506` canvas, `#0E0F12` panel, `#16181E` elevated control) framed by `1px` hairlines (`#1E2028` / `#343846`).
- **Do** route every color through CSS custom properties so Night Red mode (`body[data-night="true"]`) collapses the entire interface cleanly into narrow-spectrum crimson at ≥ 4.5:1 contrast.
- **Do** use Signal Orange (`#E86C3A`) sparingly for temporal anchors, active selections, focus outlines, and linear telemetry fills.
- **Do** keep motion strictly event-driven (`150ms`–`300ms` transitions, once-per-second colon/bar tick, 10-minute `600ms` ±1px pixel shift) to protect Apple A9 thermals and LCD longevity.

### Don't:
- **Don't** introduce drop shadows (`box-shadow`), glassmorphism (`backdrop-filter`), neon glows, gradients, or 3D bevels anywhere in the UI.
- **Don't** add secondary decorative accent colors or allow white, green, blue, or amber elements to leak into Night Red mode.
- **Don't** run continuous `requestAnimationFrame` loops or decorative idle animations that heat up the device during 24/7 plugged-in operation.
- **Don't** replace self-hosted Be Vietnam Pro with a display face lacking crisp Vietnamese diacritics or tabular figure support.
- **Don't** introduce modal overlays that obscure the primary clock when compact controls can swap cleanly inside the right column.
