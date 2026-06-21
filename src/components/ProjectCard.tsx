'use client';

import { IconBrandGithub } from '@tabler/icons-react';

export interface ProjectData {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  githubUrl: string;
  featured?: boolean;
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="group relative flex flex-col justify-between h-full bg-surface dark:bg-main border border-[var(--color-borderCustom)] rounded-card p-6 hover:border-[var(--color-borderHover)] hover:-translate-y-0.5 transition-all duration-200 ease-out">
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-h3 font-semibold text-textPrimary leading-tight pr-4">
            {project.title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-micro text-micro font-semibold whitespace-nowrap ${
              project.featured
                ? 'bg-[#BA7517]/10 text-[#BA7517] dark:bg-[#EF9F27]/10 dark:text-[#EF9F27]'
                : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
            }`}
          >
            {project.badge}
          </span>
        </div>

        <p className="text-bodySm text-textSecondary mb-6 line-clamp-3" style={{ lineHeight: 1.65 }}>
          {project.description}
        </p>
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
