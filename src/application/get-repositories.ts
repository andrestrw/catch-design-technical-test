import { MAX_PAGES, type Repository } from "../domain/repository";
import { fetchOrgRepositories } from "../infrastructure/github/github-client";
import { mapToRepositories } from "../infrastructure/github/repository-mapper";

export interface GetRepositoriesResult {
    repos: Repository[];
    hasNextPage: boolean;
}

export async function getRepositories(
    page: number
): Promise<GetRepositoriesResult> {
    const safePage = Math.min(Math.max(page, 1), MAX_PAGES);

    const { body, link } = await fetchOrgRepositories(safePage);

    const repos = mapToRepositories(body);

    const hasNextPage = link.hasNext && safePage < MAX_PAGES;

    return { repos, hasNextPage };
}
