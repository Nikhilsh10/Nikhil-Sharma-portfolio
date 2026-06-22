'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const NeuralCanvas = dynamic(() => import('./NeuralCanvas'), {
  ssr: false, // Ensure canvas logic never runs on the server and is deferred until after initial hydration
});

export type NeuralPulseHeroProps = Record<string, never>;

const ROLES = ['ML Engineer', 'Data Analyst', 'Python Developer', 'AI Builder'] as const;

// ─── Shared CSS animation string builder ──────────────────────────────────
const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `nph-fade-up 0.6s ease ${delay}s both`,
});

// ─── Component ───────────────────────────────────────────────────────────
export default function NeuralPulseHero(_props: NeuralPulseHeroProps) {
  const [displayed, setDisplayed] = useState('');
  const [cursorOn,  setCursorOn]  = useState(true);

  // ── Typewriter ────────────────────────────────────────────────────────
  useEffect(() => {
    const isBot = typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isBot) {
      setDisplayed(ROLES[0]);
      return;
    }

    let ri = 0, ci = 0;
    let phase: 'type' | 'pause' | 'delete' = 'type';
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = ROLES[ri];
      if (phase === 'type') {
        ci++;
        setDisplayed(word.slice(0, ci));
        if (ci >= word.length) { phase = 'pause'; tid = setTimeout(tick, 1800); return; }
        tid = setTimeout(tick, 75 + Math.random() * 45);
      } else if (phase === 'pause') {
        phase = 'delete'; tid = setTimeout(tick, 50);
      } else {
        ci--;
        setDisplayed(word.slice(0, ci));
        if (ci <= 0) { ri = (ri + 1) % ROLES.length; phase = 'type'; tid = setTimeout(tick, 200); return; }
        tid = setTimeout(tick, 42);
      }
    };
    tid = setTimeout(tick, 600);
    return () => clearTimeout(tid);
  }, []);

  // ── Cursor blink ──────────────────────────────────────────────────────
  useEffect(() => {
    const isBot = typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isBot) return;

    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Canvas */}
      <NeuralCanvas />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">

        {/* Eyebrow badge */}
        <div style={{ ...fadeUp(0.1), marginBottom: '1.5rem' }}>
          <div style={{
            border: '1px solid rgba(176,73,31,0.3)',
            background: 'rgba(176,73,31,0.05)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '6px 18px',
          }}>
            <span style={{ fontSize: 12, letterSpacing: '0.12em', color: 'var(--color-primary)' }}>
              Machine Learning · Data · AI
            </span>
          </div>
        </div>

        {/* Name — nph-slide-up so element is partially visible immediately (LCP) */}
        <h1
          className="text-center"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 600,
            color: 'var(--color-textPrimary)',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            animation: 'nph-slide-up 0.5s ease 0.2s both',
          }}
        >
          Nikhil Sharma
        </h1>

        {/* Typewriter */}
        <div style={{ ...fadeUp(0.4), fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--color-textSecondary)' }}>I build as a </span>
          <span style={{ color: 'var(--color-primary)' }}>{displayed}</span>
          <span
            aria-hidden="true"
            style={{ color: 'var(--color-primary)', display: 'inline-block', width: 2, opacity: cursorOn ? 1 : 0, transition: 'opacity 80ms' }}
          >|</span>
        </div>

        {/* Bio */}
        <p style={{ ...fadeUp(0.55), fontSize: 15, color: 'var(--color-textSecondary)', maxWidth: 480, lineHeight: 1.7, textAlign: 'center', marginBottom: '2rem' }}>
          Turning raw data into decisions. Neural nets to dashboards.
        </p>

        {/* CTAs */}
        <div style={{ ...fadeUp(0.7), display: 'flex', gap: 12, pointerEvents: 'auto' }}>
          <a
            href="#work"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 8,
              padding: '11px 28px',
              fontSize: 14,
              fontWeight: 500,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 200ms, transform 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '1px solid rgba(176,73,31,0.4)',
              borderRadius: 8,
              padding: '11px 28px',
              fontSize: 14,
              fontWeight: 500,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 200ms, border-color 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(176,73,31,0.1)'; e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(176,73,31,0.4)'; }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          ...fadeUp(0.9),
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <div style={{ position: 'relative', width: 2, height: 36, background: 'rgba(176,73,31,0.2)', borderRadius: 1, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              marginLeft: -2.5,
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              animation: 'nph-scroll-dot 1.4s ease-in-out infinite',
            }}
          />
        </div>
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(176,73,31,0.6)', textTransform: 'uppercase', paddingLeft: '0.15em' }}>
          scroll
        </span>
      </div>
    </section>
  );
}
