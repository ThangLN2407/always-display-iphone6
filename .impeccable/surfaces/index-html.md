---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["styles.css","app.js","lunar.js"]
---

# Surface Brief: index.html

## Mode
Operate

## Scope & Audience
Always-on horizontal StandBy dashboard (`667×375` iPhone 6s landscape baseline) for an iOS 15 user mounting their phone on continuous charging power.

## Job & Constraints
Read current time, Gregorian + Vietnamese Lunar date, outdoor temperature/weather, and relative humidity at a glance from 1–3 meters away, day or night. Explicitly constrained to pure minimalism: flat matte dark surfaces, crisp typography, zero neon, zero 3D, zero glass/glow clutter, ultra-lightweight DOM updates for Apple A9 thermal efficiency.

## Direction contract

THESIS: Quiet Braun/Apple bedside instrument—pure typographic hierarchy and calm matte surfaces designed for 3-meter legibility, refusing flashy glassmorphism, neon glows, 3D effects, and decorative dashboard widgets.

OWN-WORLD: Pitch-black `#050506` canvas with elevated matte charcoal `#0E0F12` panels, subtle `1px solid #1E2028` hairlines, warm ivory `#F4F4F0` primary numerals, muted slate `#9A9EA9`/`#7F8390` secondary labels, and a single warm signal orange `#E86C3A` accent for today's date and active telemetry (shifting completely to narrow-spectrum crimson `#FF2D2A` / `#E62E2D` on `#000000` / `#080202` in Night Red mode, WCAG ≥ 4.5:1 across all surfaces).

STORY: The user glances across the room and immediately registers the exact hour and minute, today's Vietnamese solar and lunar date, and current outdoor temperature and humidity without visual strain or distraction.

FIRST VIEWPORT: A fixed 667×375-proportioned full-viewport horizontal split: a compact top bar with solar/lunar date on the left and location, wake-lock indicator, 90° lock, Night Red toggle, and Settings trigger on the right; a dominant left panel housing an oversized across-the-room tabular clock with tap-to-switch minimal styles (Tối giản, Thẻ đôi, Đậm nét); and a right column stacked with a clean 7-column Vietnamese monthly calendar (solar + subordinate lunar day markers) above a 2-up row pairing outdoor Temperature/Condition and Relative Humidity/Comfort level.

FORM: User-pinned ultra-minimal horizontal StandBy instrument (1st on grounded list; user-pinned restraint supersedes generic catalog roll). seed:75abea154fe0f60d

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
