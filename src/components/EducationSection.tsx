'use client';

export default function EducationSection() {
  const certifications = [
    'Applied Artificial Intelligence (Microsoft & SAP)',
    'Python for Data Science & Machine Learning',
    'Data Science & Analytics (HP)',
    'Data Visualization with Business Intelligence (Tata Forage)'
  ];

  return (
    <section id="education" aria-label="Education and Certifications" className="py-24 bg-surface border-y border-borderCustom px-4 md:px-8 xl:px-0">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Education */}
        <div>
          <h2 className="text-h2 font-medium text-textPrimary mb-8">education</h2>
          <div className="flex flex-col">
            <h3 className="text-h3 font-medium text-textPrimary mb-2">
              B.Tech, Computer Science Engineering
            </h3>
            <span className="text-body text-textSecondary mb-4">
              Data Science specialization
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center text-bodySm text-textTertiary gap-2 sm:gap-4">
              <span>ITM Vocational University, Vadodara</span>
              <span className="hidden sm:inline">·</span>
              <span>2022–2026</span>
              <span className="hidden sm:inline">·</span>
              <span className="font-medium text-textPrimary">CGPA 9.24</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-h2 font-medium text-textPrimary mb-8">certifications</h2>
          <ul className="space-y-4">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-3 mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                </span>
                <span className="text-body text-textSecondary">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}
