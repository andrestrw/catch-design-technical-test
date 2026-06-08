import { getRepositories } from "../application/get-repositories";
import { RepoList } from "../presentation/components/RepoList/RepoList";
import { Pagination } from "../presentation/components/Pagination/Pagination";

interface HomeProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    // throw new Error("Error simulation");
    const { page } = await searchParams;
    const currentPage = Number.parseInt(page ?? "", 10) || 1;
    const { repos, hasNextPage } = await getRepositories(currentPage);

    return (
        <main>
            <h1>GitHub Repositories</h1>
            <RepoList repos={repos} />
            <Pagination currentPage={currentPage} hasNextPage={hasNextPage} />
        </main>
    );
}
