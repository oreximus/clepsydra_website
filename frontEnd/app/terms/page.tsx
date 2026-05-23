import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Clepsydra Technologies — the terms governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy-deep mb-6">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Last updated: January 2025
          </p>

          <div className="prose prose-gray max-w-none font-body">
            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              By accessing or using the Clepsydra Technologies website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              2. Services
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Clepsydra Technologies provides software development, consulting, and related digital services. The scope, timeline, and pricing of specific projects are defined in separate project proposals or agreements.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              3. Intellectual Property
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Upon full payment for services, we transfer all intellectual property rights for the delivered work to you. We retain the right to display the work in our portfolio unless otherwise agreed.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              4. Limitation of Liability
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Clepsydra Technologies shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid for the specific service giving rise to the claim.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              5. Privacy
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Your use of our services is also governed by our{" "}
              <Link href="/privacy" className="text-brand-blue hover:underline">
                Privacy Policy
              </Link>.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              6. Contact
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              For questions about these terms, contact us at{" "}
              <a href="mailto:clepsydratechnologies@gmail.com" className="text-brand-blue hover:underline">
                clepsydratechnologies@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
