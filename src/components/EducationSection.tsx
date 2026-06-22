'use client';

import React from 'react';
import { useReveal } from '@/hooks/useReveal';

export default function EducationSection() {
  const ref = useReveal();

  const certifications = [
    'Applied Artificial Intelligence (Microsoft & SAP)',
    'Python for Data Science & Machine Learning',
    'Data Science & Analytics (HP)',
    'Data Visualization with Business Intelligence (Tata Forage)',
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 px-4 md:px-8 xl:px-0"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
            03 / About
          </span>
          <h2
            id="about-heading"
            className="text-h2 font-semibold text-textPrimary"
          >
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Education */}
          <div className="glass-panel rounded-card p-6">
            <div className="flex flex-col">
              <h3 className="text-h3 font-semibold text-textPrimary mb-2">
                B.Tech, Computer Science Engineering
              </h3>
              <span className="text-body text-textSecondary mb-4">
                Data Science specialization
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center text-bodySm text-textTertiary gap-2 sm:gap-4">
                <span>ITM Vocational University, Vadodara</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>2022–2026</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span className="font-semibold text-textPrimary">CGPA 9.24</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel rounded-card p-6">
            <h2 className="text-h2 font-semibold text-textPrimary mb-8">
              Certifications
            </h2>
            <ul className="space-y-4" role="list">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start" role="listitem">
                  <span className="text-primary mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </span>
                  <span className="text-body text-textSecondary" style={{ lineHeight: 1.65 }}>
                    {cert}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
