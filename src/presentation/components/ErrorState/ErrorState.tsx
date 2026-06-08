"use client"; 

import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry: () => void;
  digest?: string;
}


export function ErrorState({
  title,
  message,
  onRetry,
  digest,
}: ErrorStateProps) {
  return (
    <div className={styles.container} role="alert" aria-live="assertive">
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>

        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Retry
        </button>

        {digest && <p className={styles.digest}>Error Code: {digest}</p>}
      </div>
    </div>
  );
}