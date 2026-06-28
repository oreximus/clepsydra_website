import type { Metadata } from "next";
import PortfolioPageClient from "./client";

export const metadata: Metadata = {
  title: "Portfolio — Clepsydra Technologies",
  description:
    "Explore our portfolio of live websites including TailsInfo, Trikal Security, and Gulshan Khalkho Studio, plus the types of solutions we build — e-commerce, SaaS dashboards, and corporate websites.",
  openGraph: {
    title: "Portfolio — Clepsydra Technologies",
    description:
      "Websites and platforms built by Clepsydra Technologies. See live projects: TailsInfo, Trikal Security, and Gulshan Khalkho Studio. We also build e-commerce, SaaS, and corporate websites.",
    url: "https://clepsydratechnologies.com/portfolio",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://clepsydratechnologies.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Clepsydra Technologies",
    description:
      "Websites, platforms, and applications built by Clepsydra Technologies.",
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
