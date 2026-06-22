export interface Metric {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accuracy?: number;
  metrics?: Metric[];
}

export interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}
