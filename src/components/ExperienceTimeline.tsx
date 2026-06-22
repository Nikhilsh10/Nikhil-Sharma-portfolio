'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useMouseGlow } from '@/hooks/useMouseGlow';

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight * 0.6;
      const height = rect.height;
      let p = -start / height;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollRef: ref, progress };
}

export default function ExperienceTimeline() {
  const ref = useReveal();
  const { scrollRef, progress } = useScrollProgress();

  const experiences = [
    {
      role: 'AI/ML Intern',
      company: 'Tejaskp AI Software, Vadodara',
      period: 'Jan 2026 – Present',
      description:
        'Develop and optimize classification/regression models with hyperparameter tuning. Build end-to-end preprocessing pipelines (Pandas, NumPy) — EDA, feature engineering, encoding, normalization. Evaluate models via cross-validation, ROC-AUC, precision-recall.',
    },
    {
      role: 'Data Analytics Intern',
      company: 'Trainity (Remote)',
      period: 'Apr 2025 – Jul 2025',
      description:
        'Performed EDA and statistical analysis on social media user data using Python and SQL to surface engagement insights and support data-driven decisions.',
    },
  ];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 px-4 md:px-8 xl:px-0"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
            02 / Experience
          </span>
          <h2
            id="experience-heading"
            className="text-h2 font-semibold text-textPrimary"
          >
            Experience
          </h2>
        </div>

        <div ref={scrollRef} className="relative border-l border-[var(--color-borderCustom)] ml-3 md:ml-4">
          {/* Animated fill line */}
          <div 
            className="absolute left-[-1px] top-0 w-[1px] bg-primary transition-all duration-100 origin-top"
            style={{ height: `${progress * 100}%` }}
          />
          {experiences.map((exp, index) => {
            const isActive = progress > (index / experiences.length);
            return (
              <div key={index} className="mb-12 ml-8 relative group">
                {/* Timeline dot */}
                <span className={`absolute -left-[41px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-500 ${isActive ? 'bg-primary border-primary' : 'bg-surface border-[var(--color-borderHover)] group-hover:border-primary'}`} />

                <ExperienceCard exp={exp} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: any }) {
  const { ref, handleMouseMove } = useMouseGlow();
  
  return (
    <div 
      ref={ref as any}
      onMouseMove={handleMouseMove}
      className="glass-panel rounded-card p-6 relative overflow-hidden group/card"
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100 z-0" 
        style={{ 
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(176,73,31,0.08), transparent 40%)' 
        }} 
      />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
          <h3 className="text-h3 font-semibold text-textPrimary">
            {exp.role}{' '}
            <span className="text-textTertiary font-normal">
              · {exp.company}
            </span>
          </h3>
          <time className="text-caption text-textSecondary mt-1 sm:mt-0 whitespace-nowrap font-medium tracking-wide">
            {exp.period}
          </time>
        </div>

        <p
          className="text-body text-textSecondary max-w-3xl"
          style={{ lineHeight: 1.65 }}
        >
          {exp.description}
        </p>
      </div>
    </div>
  );
}
