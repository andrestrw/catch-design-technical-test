export const PER_PAGE = 10;
export const MAX_PAGES = 6;

export type Repository = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  languageProgramming: string | null;
  stars: number;
  license: string | null;
  forks: number;
  issues: number;
  createdAt: string | null;
  isPrivate: boolean;
};