'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 640) return;
    const handleResize = () => {
      if (window.innerWidth >= 640) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Work',       href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'About',      href: '#about' },
    { name: 'Contact',    href: '#contact' },
  ];

  const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  );

  return (
    <>
      {/* Nav bar — CSS-only transitions, no framer-motion in critical path */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-[52px] border-b-[0.5px] px-4 md:px-8 xl:px-0 transition-all duration-200 ease-out"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--glass-border)' : 'transparent',
          backdropFilter: scrolled ? 'var(--glass-blur-strong)' : 'none',
          WebkitBackdropFilter: scrolled ? 'var(--glass-blur-strong)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 var(--glass-highlight) inset, 0 4px 24px rgba(0,0,0,0.15)'
            : 'none',
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            className="text-[18px] font-semibold tracking-tight hover:opacity-75 transition-opacity focus-ring rounded-micro"
          >
            Nikhil.
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1 text-bodySm">
            {/* Ambient indicator */}
            <div className="group relative flex items-center gap-2 mr-4 text-textSecondary cursor-default px-2 py-1 rounded-micro hover:bg-surfaceHover transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-micro tracking-widest uppercase font-semibold">Training</span>
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none bg-surface border border-[var(--color-borderCustom)] rounded-card px-4 py-3 shadow-lg z-50 origin-top">
                <div className="text-micro font-semibold text-textPrimary mb-0.5">Project: Neural Network Tuning</div>
                <div className="text-[10px] text-textTertiary uppercase tracking-wide">Started: June 2026</div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-textSecondary hover:text-textPrimary transition-colors focus-ring rounded-micro"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-11 h-11 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors focus-ring rounded-micro ml-1"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>

            {/* Résumé CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary text-white dark:text-[#111111] text-bodySm font-semibold rounded-btn hover:opacity-85 active:scale-[0.97] transition-all focus-ring"
            >
              Résumé
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
              </svg>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile ambient indicator (no tooltip) */}
            <div className="flex items-center gap-1.5 mr-2 text-textSecondary px-2 py-1 rounded-micro bg-surfaceHover/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-bold">Training</span>
            </div>

            <button
              onClick={toggleTheme}
              className="w-11 h-11 flex items-center justify-center text-textSecondary focus-ring rounded-micro"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-textPrimary focus-ring rounded-micro"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mobileMenuOpen ? (
                  <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                ) : (
                  <><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — CSS transition only */}
      <div
        id="mobile-nav"
        className="fixed inset-0 z-40 bg-main pt-16 px-6 flex flex-col sm:hidden transition-opacity duration-200 ease-out"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-4 text-[28px] font-semibold border-b border-[var(--color-borderCustom)] text-textPrimary hover:text-primary transition-colors"
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            {link.name}
          </Link>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-[#111111] text-body font-semibold rounded-btn self-start"
          tabIndex={mobileMenuOpen ? 0 : -1}
        >
          Résumé
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
          </svg>
        </a>
      </div>
    </>
  );
}
