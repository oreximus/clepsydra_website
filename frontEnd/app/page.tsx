import type { Metadata } from "next";
import LandingPageClient from "@/components/landing-page-client";

export const metadata: Metadata = {
  title: "Clepsydra Technologies — Software Services & ORVOPS ERP Suite",
  description:
    "Clepsydra Technologies is a software services and custom engineering company — and the creator and owner of ORVOPS, our ERP & management software suite for hospitals, mess kitchens, hotels, and inventory teams.",
  openGraph: {
    title: "Clepsydra Technologies — Software Services & ORVOPS ERP Suite",
    description:
      "Custom software engineering by Clepsydra Technologies, plus ORVOPS — our own ERP & management software suite for hospitals, mess kitchens, hotels, and inventory.",
    url: "https://clepsydratechnologies.com",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clepsydra Technologies — Software Services & ORVOPS ERP Suite",
    description:
      "Custom software engineering and ORVOPS — Clepsydra's own ERP & management software suite.",
  },
};

export default function Page() {
  return <LandingPageClient />;
}
