'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Theme initialization
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
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
    { name: 'work', href: '#projects' },
    { name: 'experience', href: '#experience' },
    { name: 'about', href: '#education' },
    { name: 'contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ backgroundColor: 'rgba(255, 255, 255, 0)', borderBottomColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ 
        backgroundColor: scrolled ? 'var(--color-nav)' : 'rgba(255, 255, 255, 0)',
        borderBottomColor: scrolled ? 'var(--color-borderCustom)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)'
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center h-[52px] border-b-[0.5px] px-4 md:px-8 xl:px-0`}
    >
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="#top" className="text-[18px] font-medium tracking-tight hover:opacity-80 transition-opacity focus-ring rounded-micro">
          nikhil.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-6 text-bodySm">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-textSecondary hover:text-textPrimary transition-colors focus-ring rounded-micro"
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme} 
            className="w-11 h-11 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors focus-ring rounded-micro"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              )}
            </motion.div>
          </button>

          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-bodySm font-medium text-textPrimary hover:opacity-70 transition-opacity focus-ring rounded-micro ml-2"
          >
            résumé <svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="w-11 h-11 flex items-center justify-center text-textSecondary focus-ring rounded-micro"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            )}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center focus-ring rounded-micro"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-main pt-16 px-4 flex flex-col sm:hidden">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 text-h2 font-medium border-b border-custom text-textPrimary"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="py-4 text-h2 font-medium flex items-center text-textPrimary"
          >
            résumé <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </a>
        </div>
      )}
    </motion.nav>
  );
}
