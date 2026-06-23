# Nikhil Sharma — AI/ML Engineer Portfolio

A high-performance, single-page developer portfolio featuring a custom HTML5 Canvas Neural Network hero centerpiece, sophisticated micro-interactions, and a perfect Lighthouse score. 

Built with **Next.js 15**, **React 18**, and **Tailwind CSS v4**.

## 🚀 Performance: 98 / 95 / 100
This portfolio was architected from the ground up to achieve maximum performance without sacrificing visual flair.
- **Performance (98)**: Heavy JavaScript (like the neural network math) is completely decoupled from the critical rendering path using Next.js `dynamic()` imports with `ssr: false`.
- **Accessibility (95)**: Fully semantic HTML structure, proper ARIA labels, and strict WCAG color contrast ratios.
- **SEO (100)**: Proper meta tags, structured headings, and optimized static asset delivery.

## 🧠 Key Features & UI/UX

### 1. Dynamic Neural Canvas (`src/components/NeuralCanvas.tsx`)
The hero section features a mathematically symmetrical, organic data network simulation.
- **Raw HTML5 Canvas**: Replaced heavy `three.js` dependencies with a lightweight, highly-optimized 2D canvas implementation.
- **Performance Guardrails**: Automatically pauses rendering natively when the hero section scrolls out of view using `IntersectionObserver`, and completely disables the animation loop for bots/crawlers to preserve TTI (Time to Interactive).

### 2. Premium Micro-Interactions
- **Vercel-style Mouse Glows**: A custom `useMouseGlow` React hook tracks cursor coordinates to render subtle radial gradients beneath the glassmorphism project cards and experience sections.
- **Interactive Architecture Diagram**: A fully interactive ML tech stack visualizer with dynamic data-flow animations.
- **Scroll Progress Timeline**: The Experience section features a dynamic scroll line that fills up and "activates" career milestones as they enter the viewport.

### 3. Typography & Aesthetic
- **Fonts**: Utilizes the modern, geometric **Outfit** font for high-impact headlines, paired with **Inter** for pristine body copy readability.
- **ML Terminal**: Features a customized footer designed to mimic an ML engineering terminal readout (Epochs, Loss, Status).

## 🏗️ Architecture & Codebase

- **Data Layer Separation**: All project data is strictly decoupled from presentation components into `src/data/projects.ts` and strongly typed via `src/types/index.ts`.
- **Custom Hooks**: DOM and event listener logic abstracted into reusable `src/hooks/` for clean, declarative UI components.
- **CSS Hardware Acceleration**: Infinite scrolling marquees and animations utilize `translateZ(0)` and `will-change: transform` to force GPU rendering and eliminate CPU layout thrashing.

## 🚀 Deployment (Netlify)

This project is configured as a completely static site for maximum speed and reliability on Netlify. It bypasses Next.js serverless functions entirely.

1. The project includes a `next.config.js` with `output: 'export'`.
2. The root directory contains a `netlify.toml` file that automatically configures Netlify to use the `out/` directory as the publish directory.
3. Simply connect the repository to Netlify, and it will deploy instantly with zero configuration required.

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
