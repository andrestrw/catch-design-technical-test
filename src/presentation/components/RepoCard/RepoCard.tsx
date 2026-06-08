import type { Repository } from "../../../domain/repository";
import styles from "./RepoCard.module.css";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.name}>          
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameLink}
          >
            {repo.name}
          </a>
        </h2>
        <span className={styles.visibility}>
          {repo.isPrivate ? "Private" : "Public"}
        </span>
      </header>

      <p className={styles.description}>
        {repo.description ?? "No description provided."}
      </p>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Language</dt>
          <dd className={styles.factValue}>
            {repo.languageProgramming ?? "—"}
          </dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Stars</dt>
          <dd className={styles.factValue}>{repo.stars}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Forks</dt>
          <dd className={styles.factValue}>{repo.forks}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Issues</dt>
          <dd className={styles.factValue}>{repo.issues}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>License</dt>
          <dd className={styles.factValue}>{repo.license ?? "—"}</dd>
        </div>
      </dl>
    </article>
  );
}