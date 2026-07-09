'use client';

/**
 * HeroFallback — Always rendered as the hero background layer.
 *
 * Dual role:
 * 1. When 3D canvas IS active: provides the atmospheric copper glow that
 *    radiates behind the transparent canvas, adding depth to the lattice.
 * 2. When 3D canvas is ABSENT (prefers-reduced-motion / saveData / slow network):
 *    This is the sole visual — radial glow breathes slowly (9s cycle) in the
 *    same copper/terracotta family.
 *
 * Animation is gated by the .hero-glow-anim class which globals.css disables
 * when prefers-reduced-motion: reduce is set.
 */
export default function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-main pointer-events-none"
    >
      {/* Primary radial glow — right-center, where the lattice would sit */}
      <div
        className="hero-glow-anim"
        style={{
          position: 'absolute',
          width: '65%',
          height: '85%',
          top: '8%',
          left: '33%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(217,123,63,0.20) 0%, rgba(176,73,31,0.10) 45%, transparent 72%)',
          animation: 'hero-glow-breathe 9s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />

      {/* Secondary diffuse glow — slightly offset for organic feel */}
      <div
        className="hero-glow-anim"
        style={{
          position: 'absolute',
          width: '40%',
          height: '55%',
          top: '22%',
          left: '48%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(232,145,95,0.12) 0%, transparent 65%)',
          animation: 'hero-glow-breathe 9s ease-in-out infinite 1.5s',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
