import type { Metadata } from "next";
import { ClepsydraLinksClient } from "@/components/clepsydra-links-client";

export const metadata: Metadata = {
  title: "Links — Clepsydra Technologies",
  description:
    "Connect with Clepsydra Technologies — explore our services, submit a project proposal, or reach out via WhatsApp, email, or phone.",
  openGraph: {
    title: "Links — Clepsydra Technologies",
    description:
      "Connect with Clepsydra Technologies — explore our services, submit a project proposal, or reach out via WhatsApp, email, or phone.",
    url: "https://clepsydratechnologies.com/clepsydra_links",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://clepsydratechnologies.com/clepsydra_links",
  },
  twitter: {
    card: "summary_large_image",
    title: "Links — Clepsydra Technologies",
    description:
      "Connect with Clepsydra Technologies — explore our services, submit a project proposal, or reach out via WhatsApp, email, or phone.",
  },
};

export default function ClepsydraLinksPage() {
  return <ClepsydraLinksClient />;
}
