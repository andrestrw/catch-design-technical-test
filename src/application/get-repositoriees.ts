import { MAX_PAGES, type Repository } from "../domain/repository";
import { fetchOrgRepositories } from "../infrastructure/github/github-client";
import { mapToRepositories } from "../infrastructure/github/repository-mapper";

export interface GetRepositoriesResult {
  repos: Repository[];
  hasNextPage: boolean;
}

export async function getRepositories(
  page: number,
): Promise<GetRepositoriesResult> {
  const { body, link } = await fetchOrgRepositories(page);
  const repos = mapToRepositories(body);
  const hasNextPage = link.hasNext && page < MAX_PAGES;

  return { repos, hasNextPage };
}