'use client';

export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base — matches --bg-base token */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--bg-base)' }}
      />

      {/* Orb 1 — large, lower-left, primary ember */}
      <div
        className="orb-1 absolute rounded-full opacity-100 dark:opacity-100"
        style={{
          width: '65vw',
          height: '65vw',
          bottom: '-15vw',
          left: '-10vw',
          background:
            'radial-gradient(circle, rgba(176,73,31,0.18) 0%, rgba(176,73,31,0.06) 45%, transparent 70%)',
          animation: 'orb-float-1 18s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />

      {/* Orb 2 — medium, upper-right, copper */}
      <div
        className="orb-2 absolute rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          top: '-10vw',
          right: '-8vw',
          background:
            'radial-gradient(circle, rgba(217,123,63,0.14) 0%, rgba(217,123,63,0.04) 50%, transparent 70%)',
          animation: 'orb-float-2 22s ease-in-out infinite',
          filter: 'blur(50px)',
        }}
      />

      {/* Orb 3 — small, mid-page accent spark — copper family only, NOT amber */}
      <div
        className="orb-3 absolute rounded-full"
        style={{
          width: '30vw',
          height: '30vw',
          top: '45%',
          left: '30%',
          background:
            'radial-gradient(circle, rgba(232,145,95,0.10) 0%, transparent 65%)',
          animation: 'orb-float-3 14s ease-in-out infinite',
          filter: 'blur(35px)',
        }}
      />
    </div>
  );
}
