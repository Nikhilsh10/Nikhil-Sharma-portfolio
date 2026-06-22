'use client';

import { useState } from 'react';

export default function ArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const pipeline = [
    {
      layer: 'Data Layer',
      color: 'border-blue-500/30 bg-blue-500/5',
      textColor: 'text-blue-400',
      tools: ['Pandas', 'NumPy', 'SQL', 'Databricks'],
    },
    {
      layer: 'Processing',
      color: 'border-purple-500/30 bg-purple-500/5',
      textColor: 'text-purple-400',
      tools: ['Spark', 'Airflow', 'Feature Store'],
    },
    {
      layer: 'Model Layer',
      color: 'border-orange-500/30 bg-orange-500/5',
      textColor: 'text-orange-400',
      tools: ['PyTorch', 'TensorFlow', 'XGBoost', 'Scikit-learn'],
    },
    {
      layer: 'Deployment',
      color: 'border-green-500/30 bg-green-500/5',
      textColor: 'text-green-400',
      tools: ['FastAPI', 'Docker', 'AWS ECS', 'MLflow'],
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 xl:px-0 border-y border-[var(--color-borderCustom)] bg-main dark:bg-surface/30">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col gap-2 mb-16">
          <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
            03 / Skills
          </span>
          <h2 className="text-h2 font-semibold text-textPrimary">
            ML Architecture Stack
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Mobile: Vertical, Desktop: Horizontal) */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-[var(--color-borderCustom)] hidden md:block -translate-y-1/2 z-0 overflow-hidden rounded-full">
            <div 
              className="h-full bg-primary opacity-30 w-1/3"
              style={{
                animation: 'architecture-flow 3s ease-in-out infinite',
                boxShadow: '0 0 10px var(--color-primary)'
              }}
            />
          </div>
          <div className="absolute top-8 bottom-8 left-[35px] w-0.5 bg-[var(--color-borderCustom)] md:hidden z-0 overflow-hidden rounded-full">
            <div 
              className="w-full bg-primary opacity-30 h-1/3"
              style={{
                animation: 'architecture-flow-y 3s ease-in-out infinite',
                boxShadow: '0 0 10px var(--color-primary)'
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
            {pipeline.map((stage, idx) => (
              <div key={idx} className="flex-1 flex flex-col pl-16 md:pl-0">
                {/* Mobile connection dot */}
                <div className={`absolute left-[31px] md:hidden w-2.5 h-2.5 rounded-full mt-6 transition-colors duration-300 ${activeStage === null || activeStage === idx ? 'bg-primary' : 'bg-[var(--color-borderCustom)]'}`} />

                <div 
                  onMouseEnter={() => setActiveStage(idx)}
                  onMouseLeave={() => setActiveStage(null)}
                  className={`border ${stage.color} rounded-card p-6 h-full backdrop-blur-sm transition-all duration-300 cursor-default ${
                    activeStage !== null && activeStage !== idx 
                      ? 'opacity-30 scale-[0.98] grayscale' 
                      : activeStage === idx 
                        ? '-translate-y-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-opacity-60 scale-100' 
                        : 'hover:-translate-y-1 scale-100'
                  }`}
                >
                  <div className={`text-micro font-bold uppercase tracking-widest mb-4 transition-colors ${activeStage !== null && activeStage !== idx ? 'text-textTertiary' : stage.textColor}`}>
                    {stage.layer}
                  </div>
                  <div className="flex flex-col gap-3">
                    {stage.tools.map((tool) => (
                      <div key={tool} className="text-bodySm font-medium text-textSecondary flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full bg-current opacity-50`}></span>
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
