import NavBar from '@/components/NavBar';
import NeuralPulseHero from '@/components/NeuralPulseHero';
import LiveStatsTicker from '@/components/LiveStatsTicker';
import ProjectCard from '@/components/ProjectCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import PageBackground from '@/components/PageBackground';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ScrollTransition from '@/components/ScrollTransition';

import { projects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <PageBackground />
      <ScrollTransition />
      <NavBar />
      <main className="flex flex-col min-h-screen">
        {/* ── Hero ── */}
        <NeuralPulseHero />

        {/* ── Live Stats Ticker ── */}
        <LiveStatsTicker />

        {/* ── Featured Projects (home teaser — all 6) ── */}
        <section
          id="work"
          aria-labelledby="work-heading"
          className="py-24 px-4 md:px-8 xl:px-0"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-2 mb-12">
              <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
                01 / Work
              </span>
              <div className="flex items-baseline justify-between">
                <h2
                  id="work-heading"
                  className="text-h2 font-semibold text-textPrimary"
                >
                  Featured projects
                </h2>
                <a
                  href="https://github.com/Nikhilsh10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bodySm text-textSecondary hover:text-primary transition-colors focus-ring rounded-micro inline-flex items-center gap-1"
                >
                  All on GitHub
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={
                    idx < 2
                      ? 'sm:col-span-2 lg:col-span-2'
                      : 'col-span-1 sm:col-span-1 lg:col-span-1'
                  }
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <ExperienceTimeline />

        {/* ── Skills Architecture Diagram ── */}
        <ArchitectureDiagram />

        {/* ── Education & Certifications ── */}
        <EducationSection />

        {/* ── Contact ── */}
        <ContactSection />

        {/* ── Footer ── */}
        <Footer />
      </main>
    </>
  );
}
