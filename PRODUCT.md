# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/Vanilla JS PWA (delegated & confirmed for zero-overhead performance on iPhone 6s running iOS 15 Safari/WebKit)

## Users

An iPhone 6s owner running iOS 15 who mounts the phone horizontally on permanent wall/desk charging power as a dedicated always-on ambient clock, Vietnamese calendar, and outdoor weather/humidity display.

## Product Purpose

Turn an older iPhone 6s (iOS 15, 4.7-inch 667×375 landscape viewport) into a zero-maintenance, always-on horizontal StandBy display showing time, Gregorian + Vietnamese Lunar calendar, outdoor temperature/weather, and relative humidity at a glance from 1–3 meters away.

## Positioning

Purpose-built for iOS 15 WebKit and the exact 667×375 landscape proportions of iPhone 6s: pure typographic restraint and calm physical-instrument clarity with an iOS 15 video-loop wake lock, automatic CSS landscape fallback when portrait orientation lock is active, pixel-shift LCD protection, offline Vietnamese Lunar calendar computation, and zero-key Open-Meteo weather/humidity updates.

## Operating Context

- Mounted horizontally in a room, plugged into continuous power 24/7.
- Viewed from across a desk or room (1–3 meters) in both daylight and pitch-black night conditions.
- Runs as a full-screen standalone Home Screen PWA (`apple-mobile-web-app-capable`) on iOS 15 without Safari chrome.

## Capabilities and Constraints

- Four core modules on a single horizontal Bento screen (`667×375` baseline, responsive across landscape viewports): Clock (with tap-to-switch minimal styles), Calendar (Gregorian + Vietnamese Lunar calendar in Vietnamese), Outdoor Weather, and Outdoor Relative Humidity (fetched from Open-Meteo API without API keys, cached in `localStorage` for offline resilience).
- Night Red mode (monochromatic deep red/amber on pitch black for dark rooms, manual toggle or scheduled) plus a software brightness dimmer.
- Strict visual restraint explicitly required by user: ultra-minimal, neat, clean, lightweight. No neon, no 3D effects, no flashy glass/glow gimmicks, no heavy animations that heat up the Apple A9 CPU/GPU.

## Brand Commitments

- Pure minimalism, neatness, cleanliness, and lightweight execution ("tối giản, gọn gàng, sạch, nhẹ").
- Explicit bans from user brief: no "modern" flashy tropes, no neon colors, no 3D effects, no visual clutter.

## Evidence on Hand

- Live outdoor temperature, weather condition code, high/low range, apparent temperature, relative humidity, and dew point from Open-Meteo API (`api.open-meteo.com`).
- Algorithmic Vietnamese Lunar calendar (Hồ Ngọc Đức GMT+7 algorithm) computed locally offline.
- System clock from the device.

## Product Principles

1. **Distance legibility over decoration:** Every numeral and label must be effortlessly readable from 2–3 meters away without visual noise.
2. **Absolute minimalism and calm:** Flat, matte dark surfaces, crisp borders, and disciplined typographic hierarchy—never neon, 3D, or gratuitous blur.
3. **24/7 hardware sympathy for iPhone 6s:** Zero continuous 60fps loops, minimal DOM updates (once per second for time, once per 15 minutes for weather), subtle pixel shift every 10 minutes, and low thermal footprint.
4. **Offline-first resilience:** Clock and solar/lunar calendar work 100% offline; weather and humidity gracefully retain last-known cached values when Wi-Fi drops.
