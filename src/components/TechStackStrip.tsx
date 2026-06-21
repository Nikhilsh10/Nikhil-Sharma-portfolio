'use client';

export default function TechStackStrip() {
  const coreStack = [
    'Python', 'Scikit-learn', 'TensorFlow', 'Pandas',
    'NumPy', 'LangChain', 'RAG', 'FAISS',
  ];
  const supportStack = [
    'Docker', 'FastAPI', 'GitHub Actions', 'MLflow',
    'AWS', 'SQL', 'Power BI',
  ];

  return (
    <section
      id="stack"
      aria-label="Tech stack and expertise"
      className="py-8 border-y border-[var(--color-borderCustom)] overflow-hidden bg-main"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-0 flex flex-col items-start">
        <span className="text-micro text-textSecondary uppercase tracking-widest mb-4 font-semibold">
          Stack &amp; expertise
        </span>

        <div className="relative w-full overflow-hidden flex py-4">
          <div className="flex animate-marquee w-max">
            {/* Duplicated for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 whitespace-nowrap min-w-max pr-3">
                {coreStack.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-pill text-bodySm font-medium text-primary shadow-[0_0_12px_rgba(232,145,95,0.25)] dark:shadow-[0_0_12px_rgba(232,145,95,0.15)] hover:-translate-y-[2px] hover:shadow-[0_0_16px_rgba(232,145,95,0.4)] dark:hover:shadow-[0_0_16px_rgba(232,145,95,0.3)] transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}

                <div
                  className="w-px h-6 bg-[var(--color-borderCustom)] mx-1"
                  aria-hidden="true"
                />

                {supportStack.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-surface border border-[var(--color-borderCustom)] rounded-pill text-bodySm font-medium text-textSecondary hover:-translate-y-[2px] transition-transform duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
