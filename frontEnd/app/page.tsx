import type { Metadata } from "next";
import LandingPageClient from "@/components/landing-page-client";

export const metadata: Metadata = {
  title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
  description:
    "Clepsydra Technologies delivers timeless precision through modern software solutions for web, mobile, AI automation, data analytics, and more.",
  openGraph: {
    title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
    description:
      "We turn complex ideas into elegant, scalable solutions. From web and mobile to AI automation — Clepsydra delivers with timeless precision.",
    url: "https://clepsydratechnologies.com",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
    description:
      "We turn complex ideas into elegant, scalable solutions. From web and mobile to AI automation.",
  },
};

export default function Page() {
  return <LandingPageClient />;
}
