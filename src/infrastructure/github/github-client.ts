import { PER_PAGE } from "../../domain/repository";
import { parseGitHubLinkHeader, type ParsedLinkHeader } from "./link-header";

const GITHUB_API_BASE = "https://api.github.com";
const ORG = "github";

/** Raw shape returned by GitHub before the mapper runs. */
export type RawGitHubRepository = Record<string, unknown>;

export interface GitHubReposResponse {
    body: RawGitHubRepository[];
    link: ParsedLinkHeader;
}

export async function fetchOrgRepositories(
    page: number
): Promise<GitHubReposResponse> {
    const url = `${GITHUB_API_BASE}/orgs/${ORG}/repos?sort=full_name&per_page=${PER_PAGE}&page=${page}`;

    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(
            `GitHub API request failed: ${response.status} ${response.statusText}`
        );
    }

    const body = (await response.json()) as RawGitHubRepository[];
    const link = parseGitHubLinkHeader(response.headers.get("Link"));

    return { body, link };
}
