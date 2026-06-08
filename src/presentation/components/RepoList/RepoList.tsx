import type { Repository } from "../../../domain/repository";
import { RepoCard } from "../RepoCard/RepoCard";
import styles from "./RepoList.module.css";

interface RepoListProps {
    repos: Repository[];
}

export function RepoList({ repos }: RepoListProps) {
    if (repos.length === 0) {
        return <p className={styles.empty}>No repositories found.</p>;
    }

    return (
        <ul className={styles.list}>
            {repos.map((repo) => (
                <li key={repo.id} className={styles.item}>
                    <RepoCard repo={repo} />
                </li>
            ))}
        </ul>
    );
}
