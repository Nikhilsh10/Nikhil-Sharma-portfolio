'use client';

export default function ExperienceTimeline() {
  const experiences = [
    {
      role: 'AI/ML Intern',
      company: 'Tejaskp AI Software, Vadodara',
      period: 'Jan 2026 – Present',
      description: 'Develop and optimize classification/regression models with hyperparameter tuning. Build end-to-end preprocessing pipelines (Pandas, NumPy) — EDA, feature engineering, encoding, normalization. Evaluate models via cross-validation, ROC-AUC, precision-recall.',
    },
    {
      role: 'Data Analytics Intern',
      company: 'Trainity (Remote)',
      period: 'Apr 2025 – Jul 2025',
      description: 'Performed EDA and statistical analysis on social media user data using Python and SQL to surface engagement insights and support data-driven decisions.',
    }
  ];

  return (
    <section id="experience" aria-label="Experience Timeline" className="py-24 px-4 md:px-8 xl:px-0">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-h2 font-medium text-textPrimary mb-12">experience</h2>
        
        <div className="relative border-l border-borderCustom ml-3 md:ml-4">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 ml-8 relative group">
              <span className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-primary group-hover:bg-primary transition-colors duration-300"></span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-h3 font-medium text-textPrimary">
                  {exp.role} <span className="text-textTertiary font-normal">· {exp.company}</span>
                </h3>
                <time className="text-caption text-textSecondary mt-1 sm:mt-0 whitespace-nowrap">
                  {exp.period}
                </time>
              </div>
              
              <p className="text-body text-textSecondary leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
