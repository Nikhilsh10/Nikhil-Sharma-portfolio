'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" aria-label="Hero Section" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 xl:px-0">
      <div className="max-w-[1280px] mx-auto flex flex-col items-start text-left">
        
        {/* Availability Badge */}
        <div className="flex items-center space-x-2 bg-surface border border-borderCustom rounded-pill px-3 py-1.5 mb-8">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-success"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-micro font-medium text-textSecondary uppercase tracking-wide">
            open to AI/ML internship & entry-level roles · Vadodara / remote
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-display text-textPrimary tracking-tight mb-6 max-w-4xl leading-tight">
          building machine learning systems that ship.
        </h1>

        {/* Subheadline */}
        <p className="text-bodyLg text-textSecondary max-w-2xl mb-10 leading-relaxed">
          Final-year CS undergraduate specializing in data science, building end-to-end ML systems — from data pipelines and model training to production deployment and MLOps. Experience across NLP/RAG, computer vision, and CI/CD-driven ML infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white text-body font-medium rounded-btn hover:bg-opacity-90 active:scale-[0.98] transition-all duration-btn-hover focus-ring"
          >
            view résumé 
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </a>
          <a 
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-textPrimary border border-borderCustom text-body font-medium rounded-btn hover:bg-surface active:scale-[0.98] transition-all duration-btn-hover focus-ring"
          >
            see projects
          </a>
        </div>

        {/* Stat Bar */}
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-8 border-t border-borderCustom w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-h1 font-medium text-textPrimary">6</span>
            <span className="text-caption text-textTertiary">ML/AI projects shipped</span>
          </div>
          <div className="flex flex-col">
            <span className="text-h1 font-medium text-textPrimary">9.2</span>
            <span className="text-caption text-textTertiary">CGPA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-h1 font-medium text-textPrimary">2</span>
            <span className="text-caption text-textTertiary">internships completed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
