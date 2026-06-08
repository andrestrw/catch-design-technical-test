import { getRepositories } from "../application/get-repositories";
import { RepoList } from "../presentation/components/RepoList/RepoList";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = Number.parseInt(page ?? "", 10) || 1;
  const { repos } = await getRepositories(currentPage);

  return (
    <main>
      <h1>GitHub Repositories</h1>
      <RepoList repos={repos} />
    </main>
  );
}