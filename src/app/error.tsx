"use client"; // Los error boundaries en el App Router deben ser Client Components.

import { useEffect } from "react";
import { ErrorState } from "../presentation/components/ErrorState/ErrorState";

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main>
            <ErrorState
                title="We couldn't load the repositories"
                message="You may have hit GitHub's API rate limit or experienced a network error. Please try again shortly."
                onRetry={() => unstable_retry()}
                digest={error.digest}
            />
        </main>
    );
}
