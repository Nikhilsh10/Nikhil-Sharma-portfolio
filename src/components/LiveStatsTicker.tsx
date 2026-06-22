export default function LiveStatsTicker() {
  const stats = [
    '3 ML models deployed',
    '94.2% TypeScript',
    'Lighthouse SEO: 100',
    'Python',
    'Next.js',
    'TensorFlow',
  ];

  // We duplicate the array to allow seamless infinite scrolling
  const tickerItems = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="w-full overflow-hidden border-y border-[var(--color-borderCustom)] bg-main/80 dark:bg-surface/80 backdrop-blur-md py-2 relative z-20">
      <div className="flex w-[200%] animate-marquee">
        <div className="flex w-1/2 justify-around items-center">
          {tickerItems.slice(0, tickerItems.length / 2).map((stat, i) => (
            <div key={i} className="flex items-center gap-6 whitespace-nowrap px-4">
              <span className="text-micro font-semibold text-textSecondary uppercase tracking-widest">
                {stat}
              </span>
              <span className="text-primary/40">·</span>
            </div>
          ))}
        </div>
        <div className="flex w-1/2 justify-around items-center">
          {tickerItems.slice(tickerItems.length / 2).map((stat, i) => (
            <div key={i} className="flex items-center gap-6 whitespace-nowrap px-4">
              <span className="text-micro font-semibold text-textSecondary uppercase tracking-widest">
                {stat}
              </span>
              <span className="text-primary/40">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
