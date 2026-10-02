export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly startLabel: string;
  readonly endLabel: string;
  readonly sector: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly prominence: 'primary' | 'standard' | 'compact';
}
