import type { Metadata } from "next";
import PortfolioPageClient from "./client";

export const metadata: Metadata = {
  title: "Portfolio — Clepsydra Technologies",
  description:
    "Explore our portfolio of live websites and platforms — TailsInfo, Trikal Security, Gulshan Khalkho Studio, Hotel The Mumbai Resort, Dabbik, Worm Cleaner, ORVOPS HMS and Clepsydra ERP — plus the solutions we build: e-commerce, SaaS dashboards, and corporate websites.",
  openGraph: {
    title: "Portfolio — Clepsydra Technologies",
    description:
      "Websites and platforms built by Clepsydra Technologies: TailsInfo, Trikal Security, Gulshan Khalkho Studio, Hotel The Mumbai Resort, Dabbik, Worm Cleaner, ORVOPS HMS and Clepsydra ERP.",
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
