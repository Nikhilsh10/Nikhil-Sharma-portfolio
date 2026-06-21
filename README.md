# Nikhil Sharma — Portfolio v2

A high-performance, single-page developer portfolio featuring a custom 3D Data Lattice hero centerpiece, built with Next.js 15, React 18, Tailwind CSS, and raw Three.js.

## Overview
This repository contains the v2 rewrite of Nikhil Sharma's portfolio. The architecture has been streamlined into a highly optimized, anchor-scroll single-page application (SPA).

The site is designed with a **"Graphite & Ember"** aesthetic—utilizing deep `#121212` backgrounds, `#1C1C1C` surfaces, and a striking `#E8915F` terracotta accent color.

## Key Features & Architecture

### 1. 3D "Data Lattice" Centerpiece (`src/components/HeroCanvas.tsx`)
The hero section features a sparse, asymmetric cluster of connected wireframe nodes simulating an organic data network.
- **Tech Stack**: Built with raw `three.js` in a `useEffect` hook to bypass `react-three-fiber` compatibility issues with Next.js 15 and React 18.
- **Performance Guardrails**:
  - Lazily loaded via `next/dynamic` to avoid blocking the critical rendering path.
  - Pauses rendering natively when the hero section scrolls out of view using `IntersectionObserver`.
  - Pauses animation when the browser tab loses focus via the Page Visibility API.
  - Honors `prefers-reduced-motion` to disable the 3D rendering entirely in favor of an atmospheric CSS breathing glow (`HeroFallback.tsx`).
  - Bypassed entirely for users on slow networks (`slow-2g`, `2g`) or with "Data Saver" mode enabled.
  - Deferred initialization using `requestIdleCallback` to reduce Total Blocking Time (TBT).

### 2. UI / UX Design System
- **Components**: Separated cleanly into modular React components (`NavBar`, `Hero`, `TechStackStrip`, `ProjectCard`, `ExperienceTimeline`, `EducationSection`, `ContactSection`).
- **Styling**: Tailwind CSS with custom global utility classes (`src/app/globals.css`). 
- **Typography & Casing**: Adheres strictly to Sentence Case for readability.
- **Theme**: Full native Dark/Light mode support with a local storage toggle.
- **Dependencies Removed**: `framer-motion` was completely stripped out of the core layout and replaced with CSS transitions to shave 36 kB off the critical path JavaScript bundle.

### 3. Accessibility (a11y) & SEO — 100/100
- **Semantic HTML**: Features a single solitary `<h1>` tag in the hero, with sequentially descending `<h2>` and `<h3>` elements for all underlying sections.
- **Contrast**: Passes strict WCAG contrast ratios (e.g., using dark text on the primary terracotta button in dark mode for a 9.3:1 contrast ratio).
- **Screen Reader Support**: All icons and SVGs use `aria-hidden="true"`, buttons and links utilize `aria-label`s or descriptive visible text to prevent label-mismatch errors. Skip links (`#main-content`) are implemented.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 18
- **Styling**: Tailwind CSS
- **3D Engine**: Three.js (v0.170+)
- **Icons**: Tabler Icons React
- **Deployment**: Vercel (recommended)

## Running Locally

1. Install dependencies (requires legacy peer deps due to strict React 19 constraints in Next 15 vs ecosystem libraries):
   ```bash
   npm install --legacy-peer-deps
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Performance
- **Optimized Build**: The production build first-load JS is heavily optimized down to ~121 kB.
- **Lighthouse**: Consistently scores 100 on Accessibility and SEO, with heavily-throttled mobile performance hovering around high 60s to 70s due to the heavy JavaScript-focused WebGL requirements (which are already deferred to idle time).
