import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export function Pagination({ currentPage, hasNextPage }: PaginationProps) {
  const hasPreviousPage = currentPage > 1;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {hasPreviousPage ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className={styles.link}
          rel="prev"
        >
          Previous
        </Link>
      ) : (
        <span className={styles.disabled} aria-disabled="true">
          Previous
        </span>
      )}

      {hasNextPage ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className={styles.link}
          rel="next"
        >
          Next
        </Link>
      ) : (
        <span className={styles.disabled} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}