'use client';

import { IconBrandGithub } from '@tabler/icons-react';

export interface ProjectData {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  githubUrl: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  accuracy?: number;
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className={`group relative flex flex-col justify-between h-full glass-panel rounded-card p-6 hover:-translate-y-1 transition-all duration-300 ease-out border border-[var(--glass-border)] hover:border-primary/50 hover:shadow-[0_0_24px_rgba(176,73,31,0.15)] ${project.featured ? ' featured-card-glow' : ''}`}>
      <div>
        <div className="flex items-start justify-between mb-3 border-b border-[var(--color-borderCustom)] pb-3">
          <div>
            <h3 className="text-h3 font-semibold text-textPrimary leading-tight mb-1">
              {project.title}
            </h3>
            <div className="text-micro text-textSecondary uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Task: {project.badge}
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        {project.metrics && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-surface border border-[var(--color-borderCustom)] rounded-micro px-2 py-1 flex items-center gap-1.5">
                <span className="text-[10px] text-textTertiary uppercase tracking-wider">{m.label}</span>
                <span className="text-micro font-bold text-primary">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-bodySm text-textSecondary mb-6 line-clamp-3" style={{ lineHeight: 1.65 }}>
          {project.description}
        </p>

        {/* Animated Accuracy Bar */}
        {project.accuracy && (
          <div className="mb-6">
            <div className="flex justify-between text-micro mb-1">
              <span className="text-textSecondary uppercase tracking-wider font-semibold">Model Accuracy</span>
              <span className="text-primary font-bold">{project.accuracy}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden border border-[var(--color-borderCustom)]">
              <div 
                className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out"
                style={{ maxWidth: `${project.accuracy}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-borderCustom)]">
        <div className="flex items-center gap-2 overflow-hidden">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-micro text-textTertiary bg-main dark:bg-surface px-2 py-1 rounded-micro border border-[var(--color-borderCustom)] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-micro text-textTertiary">
              +{project.tags.length - 2}
            </span>
          )}
        </div>

        <a
          href={`https://${project.githubUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 -mr-2 text-textSecondary hover:text-primary transition-colors focus-ring rounded-micro"
          aria-label={`View ${project.title} on GitHub`}
        >
          <IconBrandGithub size={18} stroke={1.5} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
