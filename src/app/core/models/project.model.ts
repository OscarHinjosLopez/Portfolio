export type ProjectStatus = 'live' | 'development' | 'coming-soon';
export interface Project {
  readonly slug: string;
  readonly index: string;
  readonly category: 'FEATURED' | 'PRODUCT' | 'CONCEPT';
  readonly title: string;
  readonly shortDescription: string;
  readonly problem: string;
  readonly solution: string;
  readonly technologies: readonly string[];
  readonly stackStatus: 'implemented' | 'planned';
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly currentProject?: boolean;
  readonly repositoryUrl?: string;
  readonly liveUrl?: string;
}
export const PROJECT_STATUS_LABELS: Readonly<Record<ProjectStatus, string>> = {
  live: 'LIVE',
  development: 'IN DEVELOPMENT · En desarrollo',
  'coming-soon': 'COMING SOON · Próximamente',
};
