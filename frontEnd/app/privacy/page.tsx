import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Clepsydra Technologies — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Last updated: January 2025
          </p>

          <div className="prose prose-gray max-w-none font-body">
            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              1. Introduction
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Clepsydra Technologies (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you fill out a contact form, submit a project proposal, or register for an account. This may include:
            </p>
            <ul className="list-disc pl-6 text-[#374151] leading-relaxed mb-4 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project details and requirements</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-[#374151] leading-relaxed mb-4 space-y-1">
              <li>Respond to your inquiries and project proposals</li>
              <li>Provide our services and support</li>
              <li>Improve our website and services</li>
              <li>Send relevant communications about our services</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              4. Data Protection
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              We may use third-party services (such as Google Forms for project proposals) that collect, use, and process your information according to their own privacy policies. We encourage you to review their policies.
            </p>

            <h2 className="font-heading text-xl font-semibold text-brand-navy-deep mt-8 mb-3">
              6. Contact Us
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
