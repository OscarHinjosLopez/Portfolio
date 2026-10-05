export interface ProjectAction {
  readonly label: string;
  readonly url: string;
  readonly type: 'internal' | 'external';
  readonly variant: 'primary' | 'secondary';
}
export type ProjectStatus = 'live' | 'development';
export interface Project {
  readonly slug: string;
  readonly index: string;
  readonly category: 'FEATURED' | 'PRODUCT' | 'ENTERPRISE PRODUCT';
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
  readonly actions: readonly ProjectAction[];
  readonly visual: 'portfolio' | 'sentinel' | 'scenario';
}
export const PROJECT_STATUS_LABELS: Readonly<Record<ProjectStatus, string>> = {
  live: 'LIVE',
  development: 'IN DEVELOPMENT · En desarrollo',
};
