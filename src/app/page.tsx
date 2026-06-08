import { getRepositories } from "../application/get-repositories";
import { RepoList } from "../presentation/components/RepoList/RepoList";
import { Pagination } from "../presentation/components/Pagination/Pagination";
import styles from "./page.module.css";

interface HomeProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    // throw new Error("Error simulation");
    const { page } = await searchParams;
    const currentPage = Number.parseInt(page ?? "", 10) || 1;
    const { repos, hasNextPage } = await getRepositories(currentPage);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>GitHub Repositories</h1>
            <RepoList repos={repos} />
            <Pagination currentPage={currentPage} hasNextPage={hasNextPage} />
        </main>
    );
}
