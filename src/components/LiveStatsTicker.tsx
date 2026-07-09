export default function LiveStatsTicker() {
  const stats = [
    '3 ML models deployed',
    '94.2% TypeScript',
    'Lighthouse SEO: 100',
    'Python',
    'Next.js',
    'TensorFlow',
  ];

  // Render original stats array exactly twice to allow 50% translation for a seamless loop.
  // By rendering the exact same sequence twice, when we translate -50%, it seamlessly jumps back.
  const half = stats.concat(stats).concat(stats); // ensure it's wide enough for ultra-wide screens

  return (
    <div className="w-full overflow-hidden border-y border-[var(--color-borderCustom)] bg-main/80 dark:bg-surface/80 backdrop-blur-md py-2.5 relative z-20 flex">
      <div className="flex animate-marquee min-w-max">
        {half.map((stat, i) => (
          <div key={i} className="flex items-center gap-6 whitespace-nowrap px-6">
            <span className="text-micro font-semibold text-textSecondary uppercase tracking-widest">
              {stat}
            </span>
            <span className="text-primary/40">·</span>
          </div>
        ))}
        {half.map((stat, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-6 whitespace-nowrap px-6">
            <span className="text-micro font-semibold text-textSecondary uppercase tracking-widest">
              {stat}
            </span>
            <span className="text-primary/40">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
