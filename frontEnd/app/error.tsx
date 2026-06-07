"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-red-50 to-red-100 mb-6">
            <span className="font-heading text-4xl font-bold text-red-400">!</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-navy-deep mb-4">
            Something went wrong
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-8">
            An unexpected error occurred. Please try again or return home.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-[#E5EAF4] text-brand-navy-deep font-heading font-semibold hover:bg-surface-off transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
