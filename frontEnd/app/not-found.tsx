import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Clepsydra Technologies",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-sky/10 mb-6">
            <span className="font-heading text-4xl font-bold text-brand-blue">?</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-navy-deep mb-4">
            404
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
