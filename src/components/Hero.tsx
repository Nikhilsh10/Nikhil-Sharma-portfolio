'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HeroFallback from './HeroFallback';

/* Lazy-load the 3D canvas — never runs on server, doesn't block hero paint */
const HeroCanvas = dynamic(
  () => import('./HeroCanvas'),
  { ssr: false },
);

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background layers (absolute, behind content) ── */}

      {/* Layer 1: atmospheric glow — always present, handles fallback state */}
      <HeroFallback />

      {/* Layer 2: 3D Data Lattice — conditionally rendered (see HeroCanvas guards) */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[52%] opacity-[0.35] md:opacity-100 pointer-events-none">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Layer 3: radial vignette — subtle edge darkening for lattice depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.07) 100%)',
        }}
      />

      {/* Layer 4: text scrim — guarantees 4.5:1 contrast over the 3D canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, var(--color-main) 32%, rgba(0,0,0,0) 62%)',
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8 xl:px-0 pt-32 pb-20">

        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-2 bg-surface/80 border border-[var(--color-borderCustom)] backdrop-blur-sm rounded-pill px-3.5 py-2 mb-8"
          role="status"
          aria-live="polite"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-success status-pulse-anim"
            style={{ animation: 'status-pulse 2.2s ease-in-out infinite' }}
          />
          <span className="text-micro font-medium text-textSecondary uppercase tracking-widest">
            Open to AI/ML internship &amp; entry-level roles · remote / India
          </span>
        </div>

        {/* H1 — one per page, hero headline with accent word */}
        <h1
          className="font-bold tracking-tight text-textPrimary mb-6 max-w-3xl leading-tight"
          style={{ fontSize: 'clamp(2.75rem, 5vw, 3.5rem)' }}
        >
          Machine learning systems,{' '}
          <span
            style={{ color: 'var(--color-primary)' }}
            aria-label="shipped end to end"
          >
            shipped
          </span>{' '}
          end to end.
        </h1>

        {/* Subheadline */}
        <p
          className="text-bodyLg text-textSecondary max-w-xl mb-10"
          style={{ lineHeight: 1.65 }}
        >
          Final-year CS undergraduate specializing in data science — building
          end-to-end ML systems from data pipelines and model training to
          production deployment and MLOps. Experience across NLP/RAG, computer
          vision, and CI/CD-driven ML infrastructure. Currently interning at
          Tejaskp AI Software.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-[#111111] text-body font-semibold rounded-btn hover:opacity-90 active:scale-[0.97] transition-all focus-ring"
            aria-label="View résumé (opens in new tab)"
          >
            View résumé
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>
          </a>

          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-6 h-[44px] glass-panel text-textPrimary text-body font-medium rounded-btn active:scale-[0.97] focus-ring"
          >
            See projects
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap items-center gap-x-12 gap-y-6 glass-panel rounded-card px-6 pt-8 pb-6"
          role="list"
          aria-label="Key statistics"
        >
          {[
            { value: '6', label: 'ML/AI projects shipped' },
            { value: '9.24', label: 'CGPA' },
            { value: '2', label: 'Internships completed' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col" role="listitem">
              <span
                className="font-semibold text-textPrimary"
                style={{ fontSize: '1.75rem', lineHeight: 1.1 }}
              >
                {value}
              </span>
              <span className="text-caption text-textTertiary mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-down indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
      >
        <span className="text-micro text-textSecondary tracking-widest uppercase">scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-textSecondary animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}
