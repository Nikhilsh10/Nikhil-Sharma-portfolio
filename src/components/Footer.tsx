export default function Footer() {
  const socialLinks = [
    { label: 'GitHub',   href: 'https://github.com/Nikhilsh10' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-sh10/' },
    { label: 'X',        href: 'https://x.com/Nikhil_Sharam10' },
    { label: 'Kaggle',   href: 'https://kaggle.com/nikhilsh10' },
  ];

  return (
    <footer
      className="w-full border-t py-8 px-4 md:px-8 xl:px-0"
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
      }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 font-mono bg-main dark:bg-surface border border-[var(--color-borderHover)] px-4 py-2.5 rounded-micro relative overflow-hidden group shadow-sm transition-transform hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-primary" />
          <span className="text-[10px] font-medium text-textTertiary flex items-center gap-1.5">
            <span className="text-primary font-bold">❯</span> sys.status()
          </span>
          <span className="text-micro font-semibold text-textPrimary tracking-tight flex items-center">
            Nikhil Sharma v1.0 <span className="w-1.5 h-1.5 rounded-full bg-success ml-2 mr-1 animate-pulse" /> <span className="text-success">Online</span>
          </span>
          <span className="text-[10px] text-textTertiary uppercase tracking-widest flex items-center gap-2 mt-1 border-t border-[var(--color-borderCustom)] pt-1.5">
            Epoch: 4/4 <span className="text-primary/40">·</span> Loss: 0.042 <span className="text-success font-bold text-[10px]">↓</span>
          </span>
        </div>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-6" role="list">
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-textTertiary hover:text-primary transition-colors focus-ring rounded-micro"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
