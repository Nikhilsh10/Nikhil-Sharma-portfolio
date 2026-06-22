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
        <span className="text-caption text-textTertiary">
          &copy; 2026 Nikhil Sharma
        </span>
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
