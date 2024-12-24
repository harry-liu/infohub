export interface TrendingProject {
  name: string;
  url: string;
  description: string;
  customDescription?: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  starsToday: number;
  avatar?: string;
}
