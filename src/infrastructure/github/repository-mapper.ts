import { Repository } from "../../domain/repository";
import { RawGitHubRepository } from "./github-client";
/**
 * Type-safe interface representing the subset of fields we expect and use
 * from the raw GitHub API repository response.
 */
interface GitHubRepositoryPayload {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string | null;
  private: boolean;
  license: {
    spdx_id?: string;
    [key: string]: unknown;
  } | null;
}
/**
 * Maps a single raw GitHub repository object to our clean domain Repository model.
 * Translates GitHub API snake_case fields and nested objects into the camelCase domain format.
 */
export function mapToRepository(raw: RawGitHubRepository): Repository {
  const item = raw as unknown as GitHubRepositoryPayload;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.html_url,
    languageProgramming: item.language,
    stars: item.stargazers_count,
    // Special Case
    license: item.license?.spdx_id ?? null,
    forks: item.forks_count,
    issues: item.open_issues_count,
    createdAt: item.created_at,
    isPrivate: item.private,
  };
}
/**
 * Maps an array of raw GitHub repository objects to an array of domain Repository models.
 */
export function mapToRepositories(
  rawList: RawGitHubRepository[],
): Repository[] {
  return rawList.map(mapToRepository);
}