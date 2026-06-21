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

        {/* hide-scrollbar utility is defined in globals.css */}
        <div className="flex w-full overflow-x-auto pb-4 -mb-4 hide-scrollbar">
          <div className="flex items-center gap-3 whitespace-nowrap min-w-max">
            {coreStack.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-pill text-bodySm font-medium text-primary"
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
                className="px-4 py-2 bg-surface border border-[var(--color-borderCustom)] rounded-pill text-bodySm font-medium text-textSecondary"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
