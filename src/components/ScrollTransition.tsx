'use client';

import { useEffect, useState } from 'react';

export default function ScrollTransition() {
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      setScrollDepth(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // We want opacity to peak at around 50% scroll (the middle of the page)
  // At 0% (hero), opacity is 0. At 50% (projects/skills), opacity is 1. At 100% (footer), opacity is 0 again.
  // We use a parabola-like formula: 1 - Math.abs(scrolled - 0.5) * 2
  // Or simply map ranges.
  
  let transitionOpacity = 0;
  if (scrollDepth > 0.1 && scrollDepth < 0.9) {
    if (scrollDepth <= 0.4) {
      transitionOpacity = (scrollDepth - 0.1) / 0.3; // fades in
    } else if (scrollDepth <= 0.6) {
      transitionOpacity = 1; // max intensity in middle
    } else {
      transitionOpacity = 1 - ((scrollDepth - 0.6) / 0.3); // fades out
    }
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-300 ease-out"
      style={{
        opacity: Math.max(0, Math.min(1, transitionOpacity)),
      }}
    >
      {/* 
        This adds a cinematic "deepening" effect behind the main content.
        Uses primary color tinted strongly with surface darkness. 
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10"></div>
    </div>
  );
}
