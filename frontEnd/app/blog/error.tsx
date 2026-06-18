"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { AlertTriangle } from "lucide-react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="size-8 text-red-400" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-3">
            Something went wrong
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            We could not load the blog. Please try again.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="px-5 py-2.5 bg-brand-blue text-white font-body text-sm font-medium rounded-lg hover:bg-brand-navy transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 font-body text-sm font-medium text-brand-blue hover:text-brand-navy transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
